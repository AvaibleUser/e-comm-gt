import React from "react";

export function Modal({ title, content, button, onClick }: any) {
  return (
    <>
      <input type="checkbox" id="modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="py-4">{content}</div>
          <div className="modal-action">
            <label htmlFor="modal" className="btn">
              Cancelar
            </label>
            <label htmlFor="modal" className="btn" onClick={onClick}>
              {button}
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
