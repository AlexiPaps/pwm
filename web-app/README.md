# 🔐 Password Manager Web App

A simple, secure, and modern password manager built with **React**, **TypeScript**, and **Rust (via WebAssembly)**.  
All passwords are **encrypted locally** — no data ever leaves your browser.

---

## ✨ Features

- 🧠 **Client-side encryption** using Rust + AES-256-GCM (WASM)
- 🗝️ **User-defined encryption key**
- 💾 **Auto-save to Local Storage** (encrypted)
- 📂 **Import / Export as encrypted JSON**
- 🔍 **Password generator** (customizable)
- 👁️ **Show / Hide / Copy passwords**
- 🧩 **Modular components with context-based state management**
- 💅 **Modern card-based UI with CSS modules**

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React (Vite + TypeScript) |
| **Encryption** | Rust → WebAssembly (WASM) |
| **Styling** | CSS Modules |
| **State** | React Context API |
| **Storage** | Browser Local Storage (encrypted) |

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/AlexiPaps/pwm.git

cd pwm/web-app
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start the Dev Server

```bash
npm run dev
```
