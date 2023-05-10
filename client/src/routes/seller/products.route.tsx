import React, { useRef } from "react";
import { InputRef } from "../../components/input.component";
import { TextAreaRef } from "../../components/textarea.component";
import SelectRef from "../../components/select.component";
import { ProductCategory, ProductState } from "e-comm-gt-api";
import { createProduct } from "../../services/product.service";
import { getUser } from "../../services/login.service";

export default function Products() {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const imageUriRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);

  const postProduct = async () => {
    if (
      !nameRef.current?.value ||
      !descriptionRef.current?.value ||
      !imageUriRef.current?.value ||
      !priceRef.current?.value ||
      isNaN(+priceRef.current.value) ||
      !amountRef.current?.value ||
      isNaN(+amountRef.current.value) ||
      !categoryRef.current?.value
    ) {
      return alert("Tiene que llenar todos los campos");
    }
    try {
      const product = await createProduct({
        seller: getUser().username,
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        imageUri: imageUriRef.current.value,
        price: +priceRef.current.value,
        amount: +amountRef.current.value,
        category:
          ProductCategory[
            categoryRef.current.value as keyof typeof ProductCategory
          ],
        state: ProductState.UNVERIFIED,
      });

      alert("El producto se creo con exito");
    } catch (e: any) {
      alert(e.response.data);
    }
  };

  return (
    <div className="bg-neutral py-8 flex flex-col w-3/4 m-auto">
      <div className="flex flex-wrap mx-4 my-2">
        <InputRef placeholder="Nombre" reference={nameRef} />
        <TextAreaRef placeholder="Descripcion" reference={descriptionRef} />
      </div>
      <div className="flex flex-wrap mx-4 my-2">
        <InputRef placeholder="Url a su imagen" reference={imageUriRef} />
        <InputRef type="number" placeholder="Precio" reference={priceRef} />
      </div>
      <div className="flex flex-wrap mx-4 my-2">
        <InputRef type="number" placeholder="Cantidad" reference={amountRef} />
        <SelectRef
          placeholder="Seleccione la categoria"
          reference={categoryRef}
          options={Object.keys(ProductCategory)}
        />
      </div>
      <div className="flex justify-center mx-4 my-2">
        <button onClick={postProduct} className="btn m-4 btn-success">
          Crear producto
        </button>
      </div>
    </div>
  );
}
