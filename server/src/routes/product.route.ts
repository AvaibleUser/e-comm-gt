import express, { Request, Response, Router } from "express";
import {
  findProductById,
  findProducts,
  insertProduct,
  updateProduct,
} from "../controllers/product.controller";
import { ProductCategory, ProductState } from "e-comm-gt-api";

export const productRoute: Router = express.Router();

productRoute.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const product = await findProductById(id);
  res.json(product);
});

productRoute.get("/", async (req: Request, res: Response) => {
  const strCategory =
    typeof req.query.category === "string"
      ? req.query.category.toUpperCase()
      : "";

  const strState =
    typeof req.query.state === "string" ? req.query.state.toUpperCase() : "";
  const productsNames =
    typeof req.query.products === "string" ? req.query.products : "";
  const seller =
    typeof req.query.seller === "string" ? req.query.seller : "";
  const notseller =
    typeof req.query.notseller === "string"
      ? { seller: { $ne: req.query.notseller } }
      : "";
  const sortBy =
    typeof req.query.sortedBy === "string" ? req.query.sortedBy : "name";

  const category = ProductCategory[strCategory as keyof typeof ProductCategory];
  const state = ProductState[strState as keyof typeof ProductState];
  const products = await findProducts(
    productsNames.replaceAll(",", "|"),
    sortBy,
    { state, category, seller, ...notseller }
  );

  return res.json(products);
});

productRoute.post("/", async (req: Request, res: Response) => {
  const product = req.body || {};

  if (!product || !product.name) {
    return res.status(400).send("You must send a product object");
  }

  try {
    const registeredProduct = await insertProduct(product);
    res.json(registeredProduct);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

productRoute.put("/", async (req: Request, res: Response) => {
  const product = req.body || {};

  if (!product || !product.id) {
    return res
      .status(400)
      .send("You must send a product object with the its identifier");
  }

  const updatedProduct = await updateProduct(product);
  res.json(updatedProduct);
});
