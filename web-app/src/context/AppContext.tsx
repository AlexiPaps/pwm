"use client"

import { decrypt, encrypt } from "@/wasm/rust_encryption_lib";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type SavedItem = {
    id: string;
    service: string;
    email: string;
    password: string;
};

type AppContextType = {
    key: string;
    setKey: (key: string) => void;
    savedData: SavedItem[];
    setSavedData: (data: SavedItem[]) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [key, setKey] = useState("");
    const [savedData, setSavedData] = useState<SavedItem[]>([]);

    // ✅ Auto-load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("encryptedPasswords");
        if (!stored) return;

        // Wait until user has entered a key
        if (!key) return;

        try {
            const encryptedArray: string[] = JSON.parse(stored);
            const decryptedList = encryptedArray
                .map((entry) => {
                    try {
                        const decrypted = decrypt(entry, key);
                        return JSON.parse(decrypted);
                    } catch {
                        return null;
                    }
                })
                .filter(Boolean);

            if (decryptedList.length > 0) {
                console.log(`✅ Loaded ${decryptedList.length} items from local storage`);
                setSavedData(decryptedList);
            }
        } catch (err) {
            console.error("❌ Failed to load or decrypt stored data:", err);
        }
    }, [key]); // runs again when key is set

    // ✅ Auto-encrypt & save whenever savedData changes
    useEffect(() => {
        if (!key || savedData.length === 0) return;

        try {
            const encryptedArray = savedData.map((item) => {
                const jsonString = JSON.stringify(item);
                return encrypt(jsonString, key);
            });

            localStorage.setItem("encryptedPasswords", JSON.stringify(encryptedArray));
            console.log("💾 Auto-saved encrypted data to localStorage");
        } catch (err) {
            console.error("❌ Failed to auto-save data:", err);
        }
    }, [savedData, key]);

    return (
        <AppContext.Provider value={{ key, setKey, savedData, setSavedData }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
}
