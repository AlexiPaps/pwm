# 🔐 PWM - Password Manager

A secure, client-side password manager built with **Rust (WebAssembly)** for encryption and **Next.js (React + TypeScript)** for the frontend. All sensitive data is encrypted locally in the browser using AES-256-GCM, ensuring privacy and security.

This project is structured as a **monorepo**, containing the Rust encryption library, the Next.js web application, and utility scripts for building.

## 📂 Monorepo Structure

The project is organized into three main folders, each with its own `README.md` for detailed instructions:

- **[`rust-encryption-lib`](./rust-encryption-lib/README.md)**: Rust library for AES-256-GCM encryption, decryption, and password generation, compiled to WebAssembly.
- **[`web-app`](./web-app/README.md)**: Next.js frontend with a modern, card-based UI for managing passwords, built with React, TypeScript, and CSS Modules.
- **[`scripts`](./scripts/README.md)**: Utility scripts, including `build-rust-wasm.sh` for compiling the Rust library to WebAssembly and generating bindings for the web app.

## ✨ Features

- **Secure Encryption**: Client-side AES-256-GCM encryption using Rust and WebAssembly.
- **Password Management**: Generate, store, and manage passwords locally in the browser.
- **Local Storage**: Encrypted passwords saved to browser Local Storage.
- **Import/Export**: Support for encrypted JSON import/export.
- **Customizable Passwords**: Generate passwords with user-defined character sets.
- **Modern UI**: Responsive, card-based interface with show/hide/copy functionality.

## 🧱 Tech Stack

- **Encryption**: Rust, WebAssembly (`wasm-bindgen`), AES-256-GCM
- **Frontend**: Next.js, React, TypeScript, CSS Modules
- **Build Tools**: Bash scripts, `wasm-bindgen`
- **Storage**: Browser Local Storage (encrypted)

## 🚀 Getting Started

### Prerequisites

- [Rust](https://www.rust-lang.org/tools/install)
- [Node.js](https://nodejs.org/) (for the Next.js app)
- [wasm-bindgen CLI](https://rustwasm.github.io/wasm-bindgen/) (for WebAssembly bindings)
- Git

### Installation

1️⃣ **Clone the Repository**:
```bash
git clone https://github.com/AlexiPaps/pwm.git
cd pwm
```

2️⃣ **Build the Rust Library:**:
```bash
./scripts/build-rust-wasm.sh
```
This outputs WebAssembly and JavaScript files to **web-app/src/wasm**

3️⃣ **Install Web App Dependencies:**:
```bash
cd web-app
npm install
```
This outputs WebAssembly and JavaScript files to **web-app/src/wasm**

4️⃣ **Run the Web App:**
```bash
npm run dev
```
Open http://localhost:3000 (or the port shown) in your browser.

### Testing

Run unit tests for the Rust library:
```bash
cd rust-encryption-lib
cargo test
```
### Development Workflow
1. Modify Rust Code: Update **rust-encryption-lib/src/lib.rs** and rebuild using **./scripts/build-rust-wasm.sh**.

2. Update Frontend: Modify the Next.js app in **web-app** and test with **npm run dev**.

3. Add Scripts: Place new automation scripts in **scripts**.
