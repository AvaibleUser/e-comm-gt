import { SaleState } from "e-comm-gt-api";
import express, { Request, Response, Router } from "express";
import {
  deleteSale,
  findSaleById,
  findSalesByState,
  insertSale,
} from "../controllers/sale.controller";
import { updateSale } from "../controllers/sale.controller";

export const saleRoute: Router = express.Router();

saleRoute.get("/", async (req: Request, res: Response) => {
  const strState = req.query.state;

  if (typeof strState !== "string") {
    return res.status(400).send(`There is no '${strState}' in sale states`);
  }

  const state = SaleState[strState as keyof typeof SaleState];
  const sales = await findSalesByState(state);

  res.json(sales);
});

saleRoute.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const sale = await findSaleById(id);
  res.json(sale);
});

saleRoute.post("/", async (req: Request, res: Response) => {
  const sale = req.body;

  if (!("state" in sale) || !sale.state) {
    return res.status(400).send("You must send a sale object");
  }

  const registeredSale = await insertSale(sale);
  res.json(registeredSale);
});

saleRoute.put("/", async (req: Request, res: Response) => {
  const sale = req.body;

  if (!("id" in sale) || !sale.id) {
    return res
      .status(400)
      .send("You must send a sale object with the its identifier");
  }

  const updatedSale = await updateSale(sale);
  res.json(updatedSale);
});

saleRoute.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedSale = await deleteSale(id);

  if (!deletedSale || !("id" in deletedSale) || !deletedSale.id) {
    return res.status(404).send("The shopping cart was not found");
  }
  res.json(deletedSale);
});
