import { EncryptAndSave } from "./EncryptAndSave";
import { DecryptAndLoad } from "./DecryptAndLoad";
import { ActionButton } from "./ActionButton";

export function SaveLoadControls() {
    return (
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2rem" }}>
            <EncryptAndSave />
            <DecryptAndLoad />
        </div>
    );
}
