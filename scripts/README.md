# Scripts

This folder contains utility scripts for building and managing the `pwm` monorepo, which includes the `rust-encryption-lib` and `web-app` components.

## Contents

- **`build-rust-wasm.sh`**: A Bash script that automates the process of:
  1. Building the `rust-encryption-lib` for WebAssembly (`wasm32-unknown-unknown` target).
  2. Generating JavaScript and WebAssembly bindings using `wasm-bindgen`.
  3. Outputting the generated files to `web-app/src/wasm` for use in the Next.js frontend.

## Usage

To build the Rust library and generate WebAssembly bindings:

```bash
./build-rust-wasm.sh
```

## Prerequisites
- Rust
- wasm-bindgen CLI
- Project structure with **rust-encryption-lib** and **web-app** folders in the parent directory.

## Notes
Ensure the script has executable permissions:

```bash
chmod +x build-rust-wasm.sh
```
The script assumes the **rust-encryption-lib** and **web-app** folders are in the parent directory (../).

