import { encrypt } from "../wasm/rust_encryption_lib";
import { useAppContext } from "@/context/AppContext";
import { ActionButton } from "./ActionButton";

export function EncryptAndSave() {
    const { key, savedData } = useAppContext();

    const encryptAndSaveHandler = () => {
        if (!key) {
            alert("Please set your encryption key first!");
            return;
        }

        if (savedData.length === 0) {
            alert("No data to save!");
            return;
        }

        const encryptedList: string[] = savedData.map((item) => {
            const jsonString = JSON.stringify(item);
            const encrypted = encrypt(jsonString, key);
            return encrypted;
        });

        // Convert to JSON string and download
        const blob = new Blob([JSON.stringify(encryptedList, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "passwords_encrypted.json";
        a.click();
        URL.revokeObjectURL(url);

        console.log("✅ Encrypted and saved:", encryptedList);
    };

    return (
        <div style={{ textAlign: "center", margin: "1rem" }}>
            <ActionButton
                icon="💾"
                label="Encrypt & Save"
                variant="secondary"
                onClick={encryptAndSaveHandler}
            />
        </div>
    );
}
