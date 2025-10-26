"use client"

import { useEffect, useState } from "react";
import init from "../wasm/rust_encryption_lib";
import { Header } from "@/components/Header";
import { PasswordGenerate } from "@/components/PasswordGenerate";
import { PasswordList } from "@/components/PasswordList";
import { SaveLoadControls } from "@/components/SaveLoadControls";

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await init();
      setLoaded(true);

      // // Test:
      // const key = '123';
      // const str = 'hey';
      // const encrypted = encrypt(str, key);
      // console.log('encrypted: ', encrypted);
      // try {
      //   const decrypted = decrypt(encrypted, key);
      //   const decryptedErr = decrypt(encrypted, 'key');
      //   console.log('decrypted: ', decrypted);
      //   console.log('decryptedErr: ', decryptedErr);
      // } catch (err) {
      //   console.log('decrypted err: ', err);
      // }
    })();
  }, []);

  if (!loaded) return <p>Loading Rust WASM...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif", textAlign: 'center' }}>
      <Header />
      <PasswordGenerate />
      <PasswordList />
      <SaveLoadControls />
    </div>
  );
}

export default App;
