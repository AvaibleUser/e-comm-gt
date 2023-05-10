import React from "react";

export function TextAreaRef({ placeholder, reference }: any) {
  return (
    <textarea
      placeholder={placeholder}
      className="textarea textarea-bordered textarea-xs flex-1"
      ref={reference}
    />
  );
}
