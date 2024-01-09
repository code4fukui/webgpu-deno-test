// add1
import { WebGPU } from "./WebGPU.js";

/*
const shaderCode = `
@group(0)
@binding(0)

// this is used as both input and output for convenience
var<storage, read_write> v_indices: array<u32>;

fn fib(n: u32) -> u32 {
  var cur: u32 = 0u;
  var bk1: u32 = 0u;
  var bk2: u32 = 1u;
  for (var i: u32 = 1u; i <= n; i++) {
    cur = bk1 + bk2;
    bk2 = bk1;
    bk1 = cur;
  }
  return cur;
}

@compute
@workgroup_size(1)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
  v_indices[global_id.x] = fib(v_indices[global_id.x]);
}
`;
*/
const shaderCode = `
fn fib(n: u32) -> u32 {
  var cur: u32 = 0u;
  for (var j: u32 = 0u; j < 1000u; j++) {
    cur = 0u;
    var bk1: u32 = 0u;
    var bk2: u32 = 1u;
    for (var i: u32 = 1u; i <= n; i++) {
      cur = bk1 + bk2;
      bk2 = bk1;
      bk1 = cur;
    }
  }
  return cur;
}

@group(0)
@binding(0)
var<storage, read_write> v_indices: array<u32>;

@compute
@workgroup_size(1)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
  v_indices[global_id.x] = fib(v_indices[global_id.x]);
}
`;


let webgpu;
export const fib2_init = async (byteLength, nWorkgroups) => {
  webgpu = await WebGPU.createCalcIntToInt(shaderCode, byteLength, nWorkgroups);
};
export const fib2 = async (numbers) => webgpu.calcIntToInt(numbers);
