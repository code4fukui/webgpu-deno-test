import { fib } from "./fib.js";
import { fib2_init, fib2 } from "./fib2.js";

// numbers: 100
//const n = 10000; // cpu: 6.2, gpu: 6.3
//const n = 50000; // cpu: 10, gpu: 7

// numbers: 120
//const n = 10000; // cpu: 3, gpu: 6.3
//const n = 50000; // cpu: 13, gpu: 7.2

// dispatchWorkgroups max 65535
const n = 65535; // cpu: 11, gpu: 10.5

// fib x1000
// Deno
// CPU 6796msec, GPU 94msec (without init 74msec)
// Chrome
// CPU 7218msec, GPU 49msec (without init 45mesc)

// buffer size max 128MB

const numbers = new Uint32Array(n);
for (let i = 0; i < numbers.length; i++) {
  numbers[i] = 100;
}

const fib_cpu = (n) => {
  let cur = 0;
  for (let j = 0; j < 1000; j++) {
    cur = 0;
    let bk1 = 0;
    let bk2 = 1;
    for (let i = 1; i <= n; i++) {
      cur = bk1 + bk2;
      bk2 = bk1;
      bk1 = cur;
    }
  }
  return cur;
}
const fib_cpu_array = (numbers) => {
  return numbers.map(i => fib_cpu(i));
};

{
  const now = performance.now();
  const res = await fib(numbers);
  //const res = await fib_cpu_array(numbers);
  const dt = performance.now() - now;
  console.log(res);
  console.log("fib by GPU", dt);
}
{
  const now = performance.now();
  //const res = await fib(numbers);
  const res = await fib_cpu_array(numbers);
  const dt = performance.now() - now;
  console.log(res);
  console.log("fib by CPU", dt);
}
{
  await fib2_init(numbers.byteLength, numbers.length);
  const now = performance.now();
  //const res = await fib(numbers);
  const res = await fib2(numbers);
  const dt = performance.now() - now;
  console.log(res);
  console.log("fib by GPU2", dt);
}
