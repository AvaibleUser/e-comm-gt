import React, { useRef } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { Product, ProductState } from "e-comm-gt-api";
import { updateProduct } from "../../services/product.service";
import ProductComponent from "../../components/product.component";

export function Verify() {
  const revalidator = useRevalidator();
  const productToVerify: Product[] = (useLoaderData() as Product[]) || [];

  const verifyProduct = async (product: Product, refused: boolean) => {
    try {
      const updatedProduct = await updateProduct({
        ...product,
        state: refused ? ProductState.REFUSED : ProductState.ONSALE,
      });
      revalidator.revalidate();
    } catch (e: any) {
      alert(e.response.data);
      console.error(e.response.data);
    }
  };

  return (
    <div className="bg-neutral py-8 flex flex-wrap">
      {productToVerify.map((product) => {
        const buttons = (
          <div>
            <button
              className="btn btn-error btn-xs mx-1"
              onClick={() => verifyProduct(product, true)}
            >
              Rechazar
            </button>
            <button
              className="btn btn-success btn-xs mx-1"
              onClick={() => verifyProduct(product, false)}
            >
              Acceptar
            </button>
          </div>
        );
        return (
          <ProductComponent key={product.id} {...product} button={buttons} />
        );
      })}
    </div>
  );
}
