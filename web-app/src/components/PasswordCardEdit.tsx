import React, { useState } from "react";
import styles from "../styles/PasswordCard.module.css";

type PasswordItem = {
    id: string;
    service: string;
    email: string;
    password: string;
};

interface Props {
    item: PasswordItem;
    onSave: (updatedItem: PasswordItem) => void;
    onCancel: () => void;
}

export default function PasswordCardEdit({ item, onSave, onCancel }: Props) {
    const [formData, setFormData] = useState({
        service: item.service,
        email: item.email,
        password: item.password,
    });

    const handleChange = (key: keyof typeof formData, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        onSave({ ...item, ...formData });
    };
    return (
        <div className={styles.cardEdit}>
            <div className={styles.left}>
                <div className={styles.icon} style={{ background: "#10b981" }}>
                    {formData.service?.[0]?.toUpperCase() || "?"}
                </div>

                <div className={styles.text}>
                    <input
                        className={styles.input}
                        placeholder="Service name"
                        value={formData.service}
                        onChange={(e) => handleChange("service", e.target.value)}
                    />

                    <input
                        className={styles.input}
                        placeholder="Email / Username"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />

                    <input
                        className={styles.input}
                        placeholder="Password"
                        type="text"
                        value={formData.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                    />

                    <div className={styles.buttonGroup}>
                        <button className={styles.btn} onClick={handleSave}>✅ Save</button>
                        <button className={styles.btn} onClick={onCancel}>❌ Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
