import React, { useEffect, useRef } from "react";
import { useState } from "react";

import ProductComponent from "../../components/product.component";

import { Product, ProductCategory, ProductState } from "e-comm-gt-api";
import SelectRef from "../../components/select.component";
import { Tabs } from "../../components/tabs.component";
import { getProducts } from "../../services/product.service";
import { getUser } from "../../services/login.service";
import { updateProductInShoppingCart } from "../../services/sales.service";
import { InputRef } from "../../components/input.component";

const addToCartSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-shopping-cart-plus"
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
    <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
    <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
    <path d="M17 17h-11v-14h-2"></path>
    <path d="M6 5l6 .429m7.138 6.573l-.143 1h-13"></path>
    <path d="M15 6h6m-3 -3v6"></path>
  </svg>
);

const searchSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const tabs = ["Comprar", "Rechazado", "Sin verificar"];
const tabsTranslate = {
  Comprar: ProductState.ONSALE,
  Rechazado: ProductState.REFUSED,
  "Sin verificar": ProductState.UNVERIFIED,
};

export default function Marketplace() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [products, setProducts] = useState<Product[]>([]);
  const [revalidate, setRevalidate] = useState<boolean>(false);
  const searchByName = useRef<HTMLInputElement>(null);
  const searchByCategory = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const seller =
      selectedTab === tabs[0]
        ? { notseller: getUser().username }
        : { seller: getUser().username };
    const state: ProductState =
      tabsTranslate[selectedTab as keyof typeof tabsTranslate];
    const name = searchByName.current?.value || undefined;
    const category =
      searchByCategory.current?.value !== "0"
        ? searchByCategory.current?.value
        : undefined;

    getProducts({ products: name, category, state, ...seller })
      .then(setProducts)
      .catch(console.error);
  }, [selectedTab, revalidate]);

  const buyItem = async (product: Product) => {
    const amount = prompt("Cuantos va a comprar", "1");
    if (!amount) {
      return;
    }
    if (+amount > 0 && +amount <= product.amount) {
      try {
        const newProduct = await updateProductInShoppingCart({
          ...product,
          amount: +amount,
        });
        alert("Ya se agrego el producto al carrito de compras");
      } catch (e: any) {
        alert(e.response.data);
      }
    } else {
      alert("Escoja una cantidad valida");
    }
  };

  const selectedProducts = products.length ? (
    products
      .filter((product) => product.amount)
      .map((product: Product) => {
        const button =
          selectedTab === tabs[0] ? (
            <button
              className="btn btn-xs btn-success"
              onClick={() => buyItem(product)}
            >
              {addToCartSvg}
            </button>
          ) : (
            <></>
          );
        return (
          <ProductComponent key={product.id} {...product} button={button} />
        );
      })
  ) : (
    <div>No hay productos</div>
  );

  const tabsFormatted = tabs.map((tabName) => ({
    tabName,
    onClick: () => setSelectedTab(tabName),
    selected: selectedTab === tabName,
  }));

  return (
    <main className="bg-neutral p-4">
      <Tabs tabs={tabsFormatted} />
      <div className="flex justify-center">
        <InputRef placeholder="Buscar" reference={searchByName} />

        <SelectRef
          reference={searchByCategory}
          placeholder="Seleccione la categoria"
          options={Object.keys(ProductCategory)}
        />
        <button
          className="btn btn-square btn-info btn-outline m-2"
          onClick={() => setRevalidate(!revalidate)}
        >
          {searchSvg}
        </button>
      </div>
      <div className="bg-neutral py-8 flex flex-wrap">{selectedProducts}</div>
    </main>
  );
}
