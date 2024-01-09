import { tbl } from "./tbl.js";

let numbers;
if (Deno.args.length > 0) {
  numbers = new Uint32Array(Deno.args.map((a) => parseInt(a)));
} else {
  numbers = new Uint32Array([1, 4, 3, 2, 0]);
}

const res = await tbl(numbers);
console.log(res);
