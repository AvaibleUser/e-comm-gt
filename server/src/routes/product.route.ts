import express, { Request, Response, Router } from "express";
import {
  findProductById,
  findProducts,
  findProductsByCategory,
  findProductsByName,
  insertProduct,
  updateProduct,
} from "../controllers/product.controller";
import { ProductCategory } from "e-comm-gt-api";

export const productRoute: Router = express.Router();

productRoute.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const product = await findProductById(id);
  res.json(product);
});

productRoute.get("/", async (req: Request, res: Response) => {
  const strCategory = req.query.category;
  const productsNames = req.query.products;
  const sortBy =
    typeof req.query.sortedBy === "string" ? req.query.sortedBy : "name";

  if (typeof strCategory === "string") {
    if (!(strCategory in ProductCategory)) {
      return res
        .status(400)
        .send(`There is no category named '${strCategory}'`);
    }

    const category =
      ProductCategory[strCategory as keyof typeof ProductCategory];
    const products = await findProductsByCategory(category, sortBy);

    return res.json(products);
  }
  if (typeof productsNames === "string") {
    const products = await findProductsByName(
      productsNames.replaceAll(",", "|"),
      sortBy
    );

    return res.json(products);
  }

  res.json(await findProducts(sortBy));
});

productRoute.post("/", async (req: Request, res: Response) => {
  const product = req.body;

  if (!("name" in product) || !product.name) {
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
  const product = req.body;

  if (!("id" in product) || !product.id) {
    return res
      .status(400)
      .send("You must send a product object with the its identifier");
  }

  const updatedProduct = await updateProduct(product);
  res.json(updatedProduct);
});
