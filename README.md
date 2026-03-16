# webgpu-deno-test
日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

This project is a set of examples demonstrating the use of WebGPU (a low-level graphics API) with Deno (a modern JavaScript/TypeScript runtime).

## Features
- Implements various WebGPU-based computations, including:
  - Performing integer-to-integer calculations using compute shaders
  - Calculating the Fibonacci sequence
  - Implementing the Collatz conjecture
  - Using various table lookup patterns in compute shaders
- Showcases different ways of structuring and organizing WebGPU code in a Deno environment

## Requirements
- Deno 1.39.2 or later
- A modern web browser that supports the WebGPU API (currently only available in certain Chromium-based browsers behind a flag)

## Usage
1. Clone the repository:
   ```
   git clone https://github.com/username/webgpu-deno-test.git
   ```
2. Change to the project directory:
   ```
   cd webgpu-deno-test
   ```
3. Run the examples using Deno:
   ```
   deno run --allow-all add1.js
   deno run --allow-all fib_main.js
   deno run --allow-all collatz.js
   deno run --allow-all tbl_main.js
   ```
   You can also open the HTML files in a compatible browser to see the examples running in the browser.

## License
This project is licensed under the [MIT License](LICENSE).
