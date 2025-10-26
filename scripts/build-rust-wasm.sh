#!/usr/bin/env bash
set -e

echo "Building Rust lib to WebAssembly..."

# Build the Rust library for the wasm target
cargo build --manifest-path=rust-encryption-lib/Cargo.toml \
  --target wasm32-unknown-unknown --release

echo "Running wasm-bindgen..."
# Generate JS + WASM bindings for the web app
wasm-bindgen rust-encryption-lib/target/wasm32-unknown-unknown/release/rust_encryption_lib.wasm \
  --target web \
  --out-dir web-app/src/wasm \

echo "✅ Build complete! Files written to web-app/src/wasm"