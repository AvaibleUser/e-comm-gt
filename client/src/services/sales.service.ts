import axios from "axios";
import { getUser } from "./login.service";
import { Product, Sale, SaleState } from "e-comm-gt-api";

const baseUrl = "/api/sale";

export async function getAllSales(state: SaleState): Promise<Sale[]> {
  const { data } = await axios.get(`${baseUrl}/`, { params: { state } });

  return data;
}

export async function getShoppingCart(): Promise<Sale> {
  const { username } = getUser();
  const { data } = await axios.get(`${baseUrl}/${username}/shopping-cart`);

  return data;
}

export async function buyShoppingCart(
  username: string,
  sale: Sale
): Promise<Sale> {
  const { data } = await axios.put(`${baseUrl}/${username}/shopping-cart`, {
    ...sale,
  });

  return data;
}

export async function updateSale(sale: Sale): Promise<Sale> {
  const { data } = await axios.put(`${baseUrl}/`, {
    ...sale,
  });

  return data;
}

export async function updateProductInShoppingCart(
  product: Product
): Promise<Sale> {
  const { username } = getUser();
  const { data } = await axios.patch(`${baseUrl}/${username}/shopping-cart`, {
    product,
  });

  return data;
}

export async function deleteShoppingCart(cartId: string): Promise<Sale> {
  const { data } = await axios.delete(`${baseUrl}/${cartId}`);

  return data;
}

export async function removeProductFromShoppingCart(
  product: string
): Promise<Sale> {
  const { username } = getUser();
  const { data } = await axios.delete(
    `${baseUrl}/${username}/shopping-cart/${product}`
  );

  return data;
}
