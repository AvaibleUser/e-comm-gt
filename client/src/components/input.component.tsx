import React from "react";

export default function InputControlled({
  label,
  placeholder,
  value,
  setValue,
  type = "text",
}: any) {
  return (
    <div className="form-control m-2">
      <label className="input-group input-group-vertical">
        <span>{label}</span>
        <input
          onChange={(event) => setValue(event.target.value)}
          value={value}
          type={type}
          placeholder={placeholder}
          className="input input-bordered"
        />
      </label>
    </div>
  );
}

export function InputRef({ placeholder, reference, type = "text" }: any) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="input input-bordered w-xs m-2 flex-1"
      ref={reference}
    />
  );
}
