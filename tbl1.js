import * as t from "https://deno.land/std/testing/asserts.ts";
import { calcIntToInt } from "./mod.js";
import { shaderCode2 } from "./shaderCode2.js";

// const out of fn
const shaderCode = `
  const table = array<u32, 5> (5u, 4u, 3u, 2u, 1u);

  fn tbl(n: u32) -> u32 {
    return table[n];
  }
`;
const numbers = new Uint32Array([0, 1, 2, 3]);
const res = await calcIntToInt(shaderCode + shaderCode2, numbers);
console.log(res);
t.assertEquals(res, new Uint32Array([5, 4, 3, 2]));
