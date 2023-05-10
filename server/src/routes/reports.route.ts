import express, { Request, Response, Router } from "express";
import {
  reportMostSelled,
  reportHighestRevenueClients,
  reportClientsWithMoreSales,
  reportClientsWithMoreOrders,
  reportClientsWithMoreProducts,
} from "../controllers/reports.controller";

export const reportsRoute: Router = express.Router();

async function getReport(func: Function, params: any) {
  const { start, end } = params;
  const { startDate, endDate } = {
    startDate: start ?? "2020-01-01",
    endDate: end ?? new Date().toISOString().split("T")[0],
  };

  return await func(startDate, endDate);
}

reportsRoute.get("/product", async (req: Request, res: Response) => {
  res.json(await getReport(reportMostSelled, req.query));
});

reportsRoute.get("/client/revenue", async (req: Request, res: Response) => {
  res.json(await getReport(reportHighestRevenueClients, req.query));
});

reportsRoute.get("/client/sale", async (req: Request, res: Response) => {
  res.json(await getReport(reportClientsWithMoreSales, req.query));
});

reportsRoute.get("/client/delivery", async (req: Request, res: Response) => {
  res.json(await getReport(reportClientsWithMoreOrders, req.query));
});

reportsRoute.get("/client/product", async (req: Request, res: Response) => {
  res.json(await getReport(reportClientsWithMoreProducts, req.query));
});
