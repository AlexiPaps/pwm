import { useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import styles from "../styles/Header.module.css";

export function Header() {
    const { setKey } = useAppContext();
    const keyRef = useRef<HTMLInputElement | null>(null);
    const [keySet, setKeySet] = useState(false);

    const handleBlur = () => {
        const value = keyRef.current?.value.trim() || "";
        if (value.length > 0) {
            setKey(value);
            setKeySet(true);
            if (keyRef.current) keyRef.current.value = ""; // clear the input
        }
    };

    return (
        <div className={styles.header}>
            <div className={styles.icon}>🔐</div>
            <h2 className={styles.title}>Password Manager</h2>
            <p className={styles.subtitle}>Store and manage your passwords securely</p>

            <p className={styles.label}>Set your encryption key</p>
            <input
                type="password"
                maxLength={32}
                placeholder="Enter key (max 32 chars)"
                className={styles.input}
                ref={keyRef}
                onBlur={handleBlur}
            />

            {keySet && <p className={styles.status}>✅ Key set for this session</p>}
        </div>
    );
}
