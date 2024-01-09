// add1
import { calcIntToInt } from "./mod.js";

const shaderCode = `
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

/*
// for benchmark
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
*/

/*
// can't use recursive call
fn fib(n: u32) -> u32 {
  if (n < 2u) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}
*/

@group(0)
@binding(0)
var<storage, read_write> v_indices: array<u32>;

@compute
@workgroup_size(1)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
  v_indices[global_id.x] = fib(v_indices[global_id.x]);
}
`;

export const fib = async (numbers) => calcIntToInt(shaderCode, numbers);
