import React from "react";

export function Sale({ purchaser, deadline, content }: any) {
  return (
    <div tabIndex={0} className="collapse m-2 rounded-lg">
      <input type="checkbox" className="peer" />
      <div className="collapse-title bg-info text-secondary-content peer-checked:bg-primary peer-checked:text-primary-content">
        <p>
          <b>Comprador:</b> {purchaser}
        </p>
        <p>
          <b>Fecha de entrega:</b> {deadline.split("T")[0]}
        </p>
      </div>
      <div className="collapse-content bg-info text-secondary-content peer-checked:bg-primary peer-checked:text-primary-content">
        {content}
      </div>
    </div>
  );
}
