import * as t from "https://deno.land/std/testing/asserts.ts";
import { calcIntToInt } from "./mod.js";
import { shaderCode2 } from "./shaderCode2.js";

Deno.test("tbl1", async () => {
  const shaderCode = `
    const table = array<u32, 5> (5u, 4u, 3u, 2u, 1u);

    fn tbl(n: u32) -> u32 {
      return table[n];
    }
  `;
  const numbers = new Uint32Array([0, 1, 2, 3]);
  const res = await calcIntToInt(shaderCode + shaderCode2, numbers);
  t.assertEquals(res, new Uint32Array([5, 4, 3, 2]));
});
Deno.test("tbl2 const in fn", async () => {
  const shaderCode = `
    fn tbl(n: u32) -> u32 {
      const table = array<u32, 5> (5u, 4u, 3u, 2u, 1u);
      return table[n];
    }
  `;
  const numbers = new Uint32Array([0, 1, 2, 3]);
  const res = await calcIntToInt(shaderCode + shaderCode2, numbers);
  t.assertEquals(res, new Uint32Array([5, 4, 3, 2]));
});
Deno.test("tbl3 let in fn", async () => {
  const shaderCode = `
    fn tbl(n: u32) -> u32 {
      let table = array<u32, 5> (5u, 4u, 3u, 2u, 1u);
      return table[n];
    }
  `;
  const numbers = new Uint32Array([0, 1, 2, 3]);
  const res = await calcIntToInt(shaderCode + shaderCode2, numbers);
  t.assertEquals(res, new Uint32Array([5, 4, 3, 2]));
});
Deno.test("tbl4 var in fn", async () => {
  const shaderCode = `
    fn tbl(n: u32) -> u32 {
      var table = array<u32, 5> (5u, 4u, 3u, 2u, 1u);
      return table[n];
    }
  `;
  const numbers = new Uint32Array([0, 1, 2, 3]);
  const res = await calcIntToInt(shaderCode + shaderCode2, numbers);
  t.assertEquals(res, new Uint32Array([5, 4, 3, 2]));
});
