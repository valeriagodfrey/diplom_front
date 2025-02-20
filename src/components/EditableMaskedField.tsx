/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/EditableMaskedField.tsx
import React from "react";
import InputMask from "react-input-mask";
import { Input } from "antd";

interface EditableMaskedFieldProps {
  label: string;
  value: string;
  isEditing: boolean;
  onChange: (newValue: string) => void;
  mask?: string;
  placeholder?: string;
}

const EditableMaskedField: React.FC<EditableMaskedFieldProps> = ({
  label,
  value,
  isEditing,
  onChange,
  mask = "(999) 999-9999", // пример маски для номера телефона
  placeholder = "Введите номер телефона",
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <span style={{ fontSize: "14px", color: "#888" }}>{label}</span>
      {isEditing ? (
        <InputMask
          mask={mask}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {(inputProps: any) => (
            <Input {...inputProps} placeholder={placeholder} />
          )}
        </InputMask>
      ) : (
        <strong style={{ fontSize: "16px", color: "#333" }}>
          {value && value.trim() !== "" ? value : "–"}
        </strong>
      )}
    </div>
  );
};

export default EditableMaskedField;
