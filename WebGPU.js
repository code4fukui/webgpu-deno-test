// Binding size (200000000) of [Buffer "Storage Buffer"] is larger than the maximum binding size (134217728 = 128MB).
export const createBufferInit = (device, label, usage, size) => {
  const alignMask = 4 - 1;
  const paddedSize = Math.max((size + alignMask) & ~alignMask, 4);
  const buffer = device.createBuffer({ label, usage, mappedAtCreation: true, size: paddedSize });
  return buffer;
};

export class WebGPU {
  static async createCalcIntToInt(shaderCode, byteLength, nWorkgroups) {
    const adapter = await navigator.gpu?.requestAdapter();
    const device = await adapter?.requestDevice();
    if (!device) throw new Error("no suitable adapter found");

    const shaderModule = device.createShaderModule({ code: shaderCode });
    
    const stagingBuffer = device.createBuffer({
      size: byteLength,
      usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
    });

    const storageBuffer = createBufferInit(device,
      "Storage Buffer",
      GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC,
      byteLength
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
    computePass.dispatchWorkgroups(nWorkgroups); // max 65535
    computePass.end();

    return new WebGPU(device, encoder, storageBuffer, stagingBuffer);
  }
  constructor(device, encoder, storageBuffer, stagingBuffer) {
    this.device = device;
    this.encoder = encoder;
    this.storageBuffer = storageBuffer;
    this.stagingBuffer = stagingBuffer;
  }
  async calcIntToInt(numbers) {
    const data = new Uint8Array(this.storageBuffer.getMappedRange());
    data.set(new Uint8Array(numbers.buffer));
    this.storageBuffer.unmap();

    this.encoder.copyBufferToBuffer(this.storageBuffer, 0, this.stagingBuffer, 0, numbers.byteLength);

    this.device.queue.submit([this.encoder.finish()]);
    await this.stagingBuffer.mapAsync(1);
    
    const arrayBufferData = this.stagingBuffer.getMappedRange();
    const uintData = new Uint32Array(arrayBufferData);
    return uintData;
  }
  destroy() {
    this.stagingBuffer.unmap();
  }
};
