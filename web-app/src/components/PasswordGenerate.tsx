import { useRef } from "react";
import { generate_password } from "../wasm/rust_encryption_lib";
import { useAppContext } from "@/context/AppContext";
import styles from "../styles/PasswordGenerate.module.css";
import { ActionButton } from "./ActionButton";

export function PasswordGenerate() {
  const { savedData, setSavedData } = useAppContext();

  const serviceNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const generatedPasswordRef = useRef<HTMLInputElement | null>(null);

  const generatePasswordHandler = () => {
    const password = generate_password(18, true, true, true, true);
    if (generatedPasswordRef.current) {
      generatedPasswordRef.current.value = password;
    }
  };

  const addToListHandler = () => {
    const service = serviceNameRef.current?.value.trim() || "";
    const email = emailRef.current?.value.trim() || "";
    const password = generatedPasswordRef.current?.value.trim() || "";

    if (!service || !email || !password) {
      alert("Please fill all fields before adding.");
      return;
    }

    const data = {
      id: Date.now().toString(),
      service,
      email,
      password,
    };

    setSavedData([...savedData, data]);

    // Clear fields after adding
    if (serviceNameRef.current) serviceNameRef.current.value = "";
    if (emailRef.current) emailRef.current.value = "";
    if (generatedPasswordRef.current) generatedPasswordRef.current.value = "";
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Add New Password</h3>

      <input
        type="text"
        placeholder="Service Name"
        ref={serviceNameRef}
        className={styles.input}
      />

      <input
        type="email"
        placeholder="Email"
        ref={emailRef}
        className={styles.input}
      />

      <div className={styles.passwordRow}>
        <input
          style={{ marginBottom: '0px' }}
          type="text"
          placeholder="Generated Password"
          ref={generatedPasswordRef}
          className={styles.input}
        />
        <ActionButton
          icon="⚡"
          label="Generate"
          variant="secondary"
          onClick={generatePasswordHandler}
        />
      </div>

      <ActionButton
        icon="📂"
        label="Add to List"
        variant="primary"
        onClick={addToListHandler}
      />
    </div>
  );
}
