// Binding size (200000000) of [Buffer "Storage Buffer"] is larger than the maximum binding size (134217728 = 128MB).
export const createBufferInit = (device, label, usage, size) => {
  const alignMask = 4 - 1;
  const paddedSize = Math.max((size + alignMask) & ~alignMask, 4);
  const buffer = device.createBuffer({ label, usage, mappedAtCreation: true, size: paddedSize });
  return buffer;
};

export const calcIntToInt = async (shaderCode, numbers) => {
  const adapter = await navigator.gpu?.requestAdapter();
  const device = await adapter?.requestDevice();
  if (!device) throw new Error("no suitable adapter found");

  const shaderModule = device.createShaderModule({ code: shaderCode });
  //console.log(await shaderModule.getCompilationInfo()); // deno 1.39.2 has not supported yet

  const size = numbers.byteLength;

  const stagingBuffer = device.createBuffer({
    size,
    usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
  });

  const storageBuffer = createBufferInit(device,
    "Storage Buffer",
    GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC,
    size
  );

  const computePipeline = device.createComputePipeline({
    layout: "auto",
    compute: {
      module: shaderModule,
      entryPoint: "main",
    },
  });


  const bindGroupLayout = computePipeline.getBindGroupLayout(0);
  const bindGroup = device.createBindGroup({
    layout: bindGroupLayout,
    entries: [
      {
        binding: 0,
        resource: {
          buffer: storageBuffer,
        },
      },
    ],
  });

  const encoder = device.createCommandEncoder();

  const computePass = encoder.beginComputePass();
  computePass.setPipeline(computePipeline);
  computePass.setBindGroup(0, bindGroup);
  computePass.insertDebugMarker("compute calcIntToInt");
  computePass.dispatchWorkgroups(numbers.length); // max 65535
  computePass.end();

  encoder.copyBufferToBuffer(storageBuffer, 0, stagingBuffer, 0, numbers.byteLength);

  const data = new Uint8Array(storageBuffer.getMappedRange());
  data.set(new Uint8Array(numbers.buffer));
  storageBuffer.unmap();

  device.queue.submit([encoder.finish()]);
  await stagingBuffer.mapAsync(1);
  
  const arrayBufferData = stagingBuffer.getMappedRange();
  const uintData = new Uint32Array(arrayBufferData);
  const res = new Uint32Array(uintData.length);
  for (let i = 0; i < uintData.length; i++) res[i] = uintData[i];
  stagingBuffer.unmap();
  return res;
};
