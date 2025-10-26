// PasswordCard.tsx
import React, { useState } from "react";
import styles from "../styles/PasswordCard.module.css";

type PasswordItem = {
    service: string;
    email: string;
    password: string;
};

interface Props {
    item: PasswordItem;
    index: number;
    onEdit?: (item: PasswordItem) => void;
}

export default function PasswordCard({ item, index, onEdit }: Props) {
    const colors = ["#ef4444", "#3b82f6", "#f59e0b", "#8b5cf6", "#111827"];
    const [visible, setVisible] = useState(false);
    const [copied, setCopied] = useState<'none' | 'email' | 'password'>('none');

    const handleCopy = async (value: string, type: 'email' | 'password') => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(type);
            setTimeout(() => setCopied('none'), 1500);
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.left}>
                <div
                    className={styles.icon}
                    style={{ background: colors[index % colors.length] }}
                >
                    {item.service?.[0]?.toUpperCase() || "?"}
                </div>

                <div className={styles.text}>
                    <span className={styles.title}>
                        {item.service || "Service"}

                        {onEdit && (
                            <button
                                className={styles.btn}
                                onClick={() => onEdit(item)}
                                title="Edit"
                            >
                                ✏️
                            </button>
                        )}
                    </span>
                    <span className={styles.subtitle}>
                        {item.email || "username/email"}

                        <button className={styles.btn} onClick={() => handleCopy(item.email, 'email')}>
                            {copied === 'email' ? '✅' : '📋'}
                        </button>
                    </span>

                    <div className={styles.passwordRow}>
                        <span className={styles.password}>
                            {visible ? item.password : "•".repeat(item.password.length)}
                        </span>

                        <div className={styles.buttonGroup}>
                            <button
                                className={styles.btn}
                                onClick={() => setVisible((v) => !v)}
                                title={visible ? "Hide password" : "Show password"}
                            >
                                {visible ? "🙈" : "👁️"}
                            </button>


                            <button className={styles.btn} onClick={() => handleCopy(item.password, 'password')}>
                                {copied === 'password' ? '✅' : '📋'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
