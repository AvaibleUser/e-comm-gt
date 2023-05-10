import React, { useRef } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";

import ProductComponent from "../../components/product.component";

import { Card, Product, Sale } from "e-comm-gt-api";
import {
  deleteShoppingCart,
  removeProductFromShoppingCart,
} from "../../services/sales.service";
import Stats from "../../components/stats.components";
import { Modal } from "../../components/modal.component";
import { InputRef } from "../../components/input.component";
import SelectRef from "../../components/select.component";
import { getUser, addCardToUser } from "../../services/login.service";
import { buyShoppingCart } from "../../services/sales.service";

const removeSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-trash"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M4 7l16 0"></path>
    <path d="M10 11l0 6"></path>
    <path d="M14 11l0 6"></path>
    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
  </svg>
);

export default function ShoppingCart() {
  const revalidator = useRevalidator();
  const user = getUser();
  const shoppingCart = useLoaderData() as Sale | null | undefined;
  const products = shoppingCart?.products || [];

  const cardRef = useRef<HTMLSelectElement>(null);
  const cardType = useRef<HTMLInputElement>(null);
  const cardNumber = useRef<HTMLInputElement>(null);
  const expirationDate = useRef<HTMLInputElement>(null);
  const cvv = useRef<HTMLInputElement>(null);

  const removeProductOnClick = async (product: string) => {
    try {
      const newShoppingCart = await removeProductFromShoppingCart(product);
      revalidator.revalidate();
      alert("Se elimino el producto del carrito de compras");
    } catch (e: any) {
      alert(e.response.data);
    }
  };

  const cancelCart = async () => {
    try {
      if (shoppingCart?.id) {
        await deleteShoppingCart(shoppingCart?.id);
        revalidator.revalidate();
      }
    } catch (e: any) {
      console.error(e.response.data);
    }
  };

  const buyCart = async () => {
    try {
      if (!shoppingCart?.id) {
      }
      let selectedCard: Card | undefined;
      if (
        !cardType.current?.value ||
        !cardNumber.current?.value ||
        +cardNumber.current.value ||
        !expirationDate.current?.value ||
        isNaN(+new Date(expirationDate.current.value)) ||
        !cvv.current?.value
      ) {
        selectedCard = user.creditCards?.filter(
          (card) => card.cardNumber === +(cardRef.current?.value || 0)
        )[0];
      } else {
        selectedCard = {
          cardType: cardType.current.value,
          cardNumber: +cardNumber.current.value,
          expirationDate: expirationDate.current.value,
          CVV: +cvv.current.value,
        };

        await addCardToUser(user, selectedCard);
        alert("Se guardo su informacion bancaria");
      }
      if (!selectedCard) {
        return alert("Debe de seleccionar una tarjeta o ingresar una nueva");
      }

      const updShoppingCart: Sale = {
        ...(shoppingCart as Sale),
        card: { ...selectedCard },
      };

      await buyShoppingCart(user.username, updShoppingCart);
      alert("La compra se realizo exitosamente");
    } catch (e: any) {
      alert(e.response.data);
      console.error(e.response.data);
    }
    revalidator.revalidate();
  };

  const selectedProducts = products.length ? (
    products.map((product: Product) => {
      const button = (
        <button
          className="btn btn-error btn-xs"
          onClick={() => removeProductOnClick(product.name)}
        >
          {removeSvg}
        </button>
      );
      return <ProductComponent key={product.id} {...product} button={button} />;
    })
  ) : (
    <div>Carrito de compras vacio</div>
  );

  const modalContent = (
    <div className="flex flex-col items-stretch">
      <SelectRef
        reference={cardRef}
        placeholder="Seleccione la tarjeta"
        options={user.creditCards?.map((card) => card.cardNumber) || []}
      />
      <div className="divider">OR</div>
      <InputRef placeholder="Tarjeta" reference={cardType} />
      <InputRef placeholder="Numero de la tarjeta" reference={cardNumber} />
      <InputRef placeholder="CVV" reference={cvv} />
      <InputRef
        date="date"
        placeholder="Fecha de expiracion"
        reference={expirationDate}
      />
    </div>
  );

  const cartInfo = [
    {
      title: "Costo Total",
      value: `Q.${products.reduce(
        (prev, cur) => prev + cur.amount * cur.price,
        0
      )}`,
      button: "",
    },
  ];

  return (
    <div className="bg-neutral p-4">
      <div className="flex justify-between items-center">
        <Stats stats={cartInfo} />
        <div className="btn-group">
          <button className="btn btn-error" onClick={cancelCart}>
            Cancelar
          </button>
          <label htmlFor="modal" className="btn btn-success">
            Comprar
          </label>
        </div>
      </div>
      <div className="bg-neutral py-8 flex flex-wrap">{selectedProducts}</div>
      <Modal
        title="Seleccione una tarjeta"
        content={modalContent}
        button="Comprar"
        onClick={buyCart}
      />
    </div>
  );
}
