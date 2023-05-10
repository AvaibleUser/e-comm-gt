import React from "react";

export default function SelectRef({
  reference,
  placeholder,
  options,
}: any) {
  return (
    <select
      ref={reference}
      className="select select-bordered select-md m-2 flex-1"
      defaultValue={0}
    >
      <option disabled value={0}>
        {placeholder}
      </option>
      {options.map((option: string) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export function Select({
  value,
  setValue,
  placeholder,
  options,
}: any) {
  return (
    <select
      value={value}
      onChange={(event) => setValue(event.target.value)}
      className="select select-bordered select-md m-2 flex-1"
      defaultValue={0}
    >
      <option disabled value={0}>
        {placeholder}
      </option>
      {options.map((option: string) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
