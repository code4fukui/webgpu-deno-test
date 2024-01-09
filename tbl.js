import { calcIntToInt } from "./mod.js";

const shaderCode = `
//const table = array<u32, 5> (5u, 4u, 3u, 2u, 1u); // must be const, NG
//const table : u32 = 3u;

fn tbl(n: u32) -> u32 {
  let table = array<u32, 5> (5u, 4u, 3u, 2u, 1u); // var: ok, let: ng, const: ng
  return table[n];
  //return table;
}

@group(0)
@binding(0)
var<storage, read_write> v_indices: array<u32>;

@compute
@workgroup_size(1)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
  v_indices[global_id.x] = tbl(v_indices[global_id.x]);
}
`;

export const tbl = async (numbers) => calcIntToInt(shaderCode, numbers);
