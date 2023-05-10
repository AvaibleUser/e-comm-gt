import React, { useEffect } from "react";
import { Product } from "e-comm-gt-api";

export default function ProductComponent({
  name,
  description,
  imageUri,
  price,
  amount,
  category,
  button,
}: any) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl image-full m-4">
      <figure>
        <img src={imageUri} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-between">
          {name}
          {button}
        </h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-primary">{category}</div>
          <div className="badge badge-secondary">
            Q.{price} c/u
          </div>
          <div className="badge badge-accent">
            {amount} unidades
          </div>
        </div>
      </div>
    </div>
  );
}
