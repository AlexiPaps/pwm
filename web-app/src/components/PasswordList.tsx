// PasswordList.tsx
import { useAppContext } from "@/context/AppContext";
import PasswordCard from "./PasswordCard";
import PasswordCardEdit from "./PasswordCardEdit";
import { useState } from "react";

export function PasswordList() {
  const { savedData, setSavedData } = useAppContext();
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (item: any) => setEditingId(item.id);
  const handleCancel = () => setEditingId(null);

  const handleSave = (updatedItem: any) => {
    const updatedList = savedData.map((data) =>
      data.id === updatedItem.id ? updatedItem : data
    );
    setSavedData(updatedList);
    setEditingId(null);
  };

  return (
    <div>
      {savedData.map((item, index) =>
        editingId === item.id ? (
          <PasswordCardEdit
            key={item.id}
            item={item}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <PasswordCard
            key={item.id}
            item={item}
            index={index}
            onEdit={handleEdit}
          />
        )
      )}
    </div>
  );
}
