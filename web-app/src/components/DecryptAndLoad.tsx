import { useRef } from "react";
import { decrypt } from "../wasm/rust_encryption_lib";
import { useAppContext } from "@/context/AppContext";
import styles from "../styles/ActionButton.module.css";

export function DecryptAndLoad() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { key, setSavedData } = useAppContext();

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!key) {
            alert("Please set your encryption key before importing.");
            fileInputRef.current!.value = "";
            return;
        }

        try {
            const text = await file.text();
            const encryptedList: string[] = JSON.parse(text);

            const decryptedObjects = encryptedList.map((entry) => {
                try {
                    const decrypted = decrypt(entry, key);
                    return JSON.parse(decrypted);
                } catch (err) {
                    console.error("Decryption failed for an entry:", err);
                    return null;
                }
            }).filter(Boolean);

            setSavedData(decryptedObjects as any[]);
            alert(`✅ Imported ${decryptedObjects.length} passwords successfully.`);
        } catch (err) {
            console.error("Failed to read or parse file:", err);
            alert("❌ Invalid or corrupted file.");
        }

        fileInputRef.current!.value = "";
    };

    return (
        <div style={{ textAlign: "center", margin: "1rem", fontSize: "13.3px" }}>
            <label className={`${styles.button} ${styles.primary}`}>
                <span style={{ fontSize: "17.6px" }}>📂</span> Decrypt & Load JSON
                <input
                    style={{ display: "none" }}
                    type="file"
                    accept="application/json"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                />
            </label>
        </div>
    );
}
