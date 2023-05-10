import { Sale, SaleState } from "e-comm-gt-api";
import express, { Request, Response, Router } from "express";
import {
  buyShoppingCart,
  deleteShoppingCart,
  findSaleById,
  findSalesByState,
  findShoppingCart,
  insertSale,
  removeProductInCart,
  updateSale,
  updateShoppingCartProduct,
} from "../controllers/sale.controller";

export const saleRoute: Router = express.Router();

saleRoute.get("/", async (req: Request, res: Response) => {
  const strState =
    typeof req.query.state === "string" ? req.query.state.toUpperCase() : "";
  const state = SaleState[strState as keyof typeof SaleState];

  if (!state) {
    return res.status(400).send(`There is no '${strState}' in sale states`);
  }

  const sales = await findSalesByState(state);

  res.json(sales);
});

saleRoute.get(
  "/:username/shopping-cart",
  async (req: Request, res: Response) => {
    const username = req.params.username;

    const sale = await findShoppingCart(username);
    res.json(sale);
  }
);

saleRoute.patch(
  "/:username/shopping-cart",
  async (req: Request, res: Response) => {
    const { username } = req.params;
    const { product } = req.body || {};

    if (!product && !product.name) {
      return res.status(400).send("You must send a product object");
    }

    const updatedSale = await updateShoppingCartProduct(username, product);
    return res.json(updatedSale);
  }
);

saleRoute.put(
  "/:username/shopping-cart",
  async (req: Request, res: Response) => {
    const { username } = req.params;
    const sale = req.body || {};

    if (!sale || !sale.id) {
      return res
        .status(400)
        .send("You must send a sale object with the its identifier");
    }

    try {
      const updatedSale = await buyShoppingCart(username, sale);
      res.json(updatedSale);
    } catch (e: any) {
      res.status(400).send(e.message);
    }
  }
);

saleRoute.delete(
  "/:username/shopping-cart/:product",
  async (req: Request, res: Response) => {
    const { username, product } = { username: "", product: "", ...req.params };

    const shoppingCart = await removeProductInCart(username, product);

    if (!shoppingCart || !("id" in shoppingCart) || !shoppingCart.id) {
      return res.status(404).send("The shopping cart was not found");
    }
    res.json(shoppingCart);
  }
);

saleRoute.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const sale = await findSaleById(id);
  res.json(sale);
});

saleRoute.post("/", async (req: Request, res: Response) => {
  const sale = req.body || {};

  if (!sale || !sale.state) {
    return res.status(400).send("You must send a sale object");
  }

  const registeredSale = await insertSale(sale);
  res.json(registeredSale);
});

saleRoute.put("/", async (req: Request, res: Response) => {
  const sale: Sale = req.body || {};

  if (!sale || !sale.id) {
    return res
      .status(400)
      .send("You must send a sale object with the its identifier");
  }

  const updatedSale = await updateSale(sale);
  res.json(updatedSale);
});

saleRoute.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedSale = await deleteShoppingCart(id);
  } catch (e: any) {
    console.error(e.message);
  }

  res.status(204).send();
});
