import axios from "axios";
import { Product } from "e-comm-gt-api";

const baseUrl = "/api/product";

export async function getProducts(params: any): Promise<Product[]> {
  const { data } = await axios.get(`${baseUrl}/`, { params: { ...params } });

  return data;
}

export async function createProduct(product: Product): Promise<Product> {
  const { data } = await axios.post(`${baseUrl}/`, product);

  return data;
}

export async function updateProduct(product: Product): Promise<Product> {
  const { data } = await axios.put(`${baseUrl}/`, product);

  return data;
}
