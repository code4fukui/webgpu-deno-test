// add1
import { calcIntToInt } from "./mod.js";

// Get some numbers from the command line, or use the default 1, 4, 3, 295.
let numbers;
if (Deno.args.length > 0) {
  numbers = new Uint32Array(Deno.args.map((a) => parseInt(a)));
} else {
  numbers = new Uint32Array([1, 4, 3, 295]);
}

const shaderCode = `
fn add1(n_base: u32) -> u32 {
  return n_base + 1u;
}

@group(0)
@binding(0)
var<storage, read_write> v_indices: array<u32>;

@compute
@workgroup_size(1)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
  v_indices[global_id.x] = add1(v_indices[global_id.x]);
}
`;

const res = await calcIntToInt(shaderCode, numbers);
console.log(res);
