import { useAppContext } from "@/context/AppContext";
import { encrypt } from "../wasm/rust_encryption_lib";
import { ActionButton } from "./ActionButton";

export function SaveToLocalStorage() {
    const { savedData, key } = useAppContext();

    const handleSave = () => {
        if (!key) {
            alert("Please set your encryption key first.");
            return;
        }

        if (savedData.length === 0) {
            alert("No data to save.");
            return;
        }

        try {
            const encryptedArray = savedData.map((item) => {
                const jsonString = JSON.stringify(item);
                return encrypt(jsonString, key);
            });

            localStorage.setItem("encryptedPasswords", JSON.stringify(encryptedArray));
            alert("✅ Encrypted passwords saved to local storage!");
        } catch (error) {
            console.error("Failed to encrypt and save:", error);
            alert("❌ Failed to save data.");
        }
    };

    return (
        <ActionButton
            icon="💾"
            label="Save Encrypted (Local)"
            variant="primary"
            onClick={handleSave}
        />
    );
}
