# Rust Encryption Library

A Rust library for encryption, decryption, and password generation, compiled to WebAssembly (WASM) for use in web applications. The library uses AES-256-GCM for encryption and decryption and provides a customizable password generator.

## Features

- **Encryption/Decryption**: Encrypts and decrypts text using AES-256-GCM with a 32-byte key.
- **Password Generation**: Generates random passwords with customizable character sets (uppercase, lowercase, numbers, symbols).
- **WebAssembly Support**: Designed to be used in web applications via `wasm-bindgen`.
- **Unit Tests**: Includes comprehensive tests for encryption, decryption, and password generation.

## Prerequisites

To build and use this library, you need:

- [Rust](https://www.rust-lang.org/tools/install) (latest stable version recommended)
- [wasm-bindgen CLI](https://rustwasm.github.io/wasm-bindgen/) for generating WebAssembly bindings
- A web application setup to integrate the WebAssembly module (optional, for web usage)

## Installation

1. Clone the project directory:

```bash
git clone https://github.com/AlexiPaps/pwm.git
cd pwm/rust-encryption-lib
```

2. Add the required dependencies to Cargo.toml:

```bash
[dependencies]
aes-gcm = "0.10"
base64 = "0.22"
getrandom = { version = "0.2", features = ["js"] }
rand = "0.8"
wasm-bindgen = "0.2"
```

## Building the Library

1. Add the WebAssembly target:

```bash
rustup target add wasm32-unknown-unknown
```

2. Build the project:

```bash
cargo build --target wasm32-unknown-unknown --release
```

3. Generate WebAssembly bindings for web use:

```bash
wasm-bindgen --target web --out-dir ../web-app/src/wasm target/wasm32-unknown-unknown/release/rust_encryption_lib.wasm
```

## Testing

The library includes unit tests for encryption, decryption, and password generation. To run the tests in a native Rust environment:

```bash
cargo test
```

## Usage

After building with wasm-bindgen, you can import and use the library in a JavaScript web application. Example:

```javascript
import init, { encrypt, decrypt, generate_password } from './wasm/rust_encryption_lib.js';

// Initialize WebAssembly module
async function run() {
    await init();

    // Encrypt and decrypt
    const plaintext = "Hello, World!";
    const key = "mysecretkey12345678901234567890"; // Must be 32 bytes
    const encrypted = encrypt(plaintext, key);
    console.log("Encrypted:", encrypted);
    const decrypted = decrypt(encrypted, key);
    console.log("Decrypted:", decrypted); // Should output "Hello, World!"

    // Generate a password
    const password = generate_password(12, true, true, true, true);
    console.log("Generated Password:", password);
}

run();
```

Ensure the wasm directory is accessible in your web application, and include the generated .wasm file and JavaScript bindings.

## In Rust (Native)

You can also use the library in a native Rust project by calling the encrypt, decrypt, and generate_password functions directly:


```rust
fn main() {
    let plaintext = "Hello, World!";
    let key = "mysecretkey12345678901234567890"; // 32 bytes
    let encrypted = rust_encryption_lib::encrypt(plaintext, key);
    let decrypted = rust_encryption_lib::decrypt(&encrypted, key).expect("Decryption failed");
    println!("Decrypted: {}", decrypted);

    let password = rust_encryption_lib::generate_password(12, true, true, true, true);
    println!("Generated Password: {}", password);
}
```