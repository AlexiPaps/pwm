import React from "react";
import styles from "../styles/ActionButton.module.css";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    icon?: string;
    variant?: "primary" | "secondary" | "danger" | "neutral";
}

export function ActionButton({
    label,
    icon,
    variant = "primary",
    ...props
}: ActionButtonProps) {
    return (
        <button className={`${styles.button} ${styles[variant]}`} {...props}>
            {icon && <span className={styles.icon}>{icon}</span>}
            {label}
        </button>
    );
}
