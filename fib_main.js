import { fib } from "./fib.js";

let numbers;
if (Deno.args.length > 0) {
  numbers = new Uint32Array(Deno.args.map((a) => parseInt(a)));
} else {
  numbers = new Uint32Array([1, 4, 3, 295]);
}

const res = await fib(numbers);
console.log(res);
