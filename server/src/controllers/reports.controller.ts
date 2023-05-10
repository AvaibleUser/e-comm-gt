import { saleModel } from "../models/sale.model";
import { productModel } from "../models/product.model";

function getDate(date: string) {
  return new Date(date)
}

export async function reportMostSelled(begin: string, end: string) {
  const products = await saleModel.aggregate([
    {
      $match: {
        saleDate: {
          $gte: getDate(begin),
          $lte: getDate(end),
        },
        state: { $ne: "shopping" },
      },
    },
    { $unwind: "$products" },
    {
      $group: {
        _id: "$products.name",
        product: { $first: "$products.name" },
        totalSold: { $sum: "$products.amount" },
      },
    },
    {
      $project: {
        _id: 0,
        product: 1,
        totalSold: 1,
      },
    },
    { $sort: { totalSold: -1 } },
    { $limit: 10 },
  ]);

  return products;
}

export async function reportHighestRevenueClients(begin: string, end: string) {
  const clients = await saleModel.aggregate([
    {
      $match: {
        saleDate: {
          $gte: getDate(begin),
          $lte: getDate(end),
        },
        state: { $ne: "shopping" },
      },
    },
    {
      $project: {
        purchaser: 1,
        totalRevenue: {
          $sum: {
            $map: {
              input: "$products",
              as: "products",
              in: { $multiply: ["$$products.price", "$$products.amount"] },
            },
          },
        },
        totalCommission: {
          $sum: {
            $map: {
              input: "$products",
              as: "products",
              in: {
                $multiply: ["$$products.price", "$$products.amount", 0.05],
              },
            },
          },
        },
      },
    },
    {
      $group: {
        _id: "$purchaser",
        purchaser: { $first: "$purchaser" },
        totalRevenue: { $sum: "$totalRevenue" },
        totalCommission: { $sum: "$totalCommission" },
      },
    },
    {
      $project: {
        _id: 0,
        purchaser: 1,
        totalRevenue: 1,
        totalCommission: 1,
      },
    },
    { $sort: { totalRevenue: -1 } },
    { $limit: 5 },
  ]);

  return clients;
}

export async function reportClientsWithMoreSales(begin: string, end: string) {
  const clients = await saleModel.aggregate([
    {
      $match: {
        saleDate: {
          $gte: getDate(begin),
          $lte: getDate(end),
        },
        state: { $ne: "shopping" },
      },
    },
    { $unwind: "$products" },
    {
      $group: {
        _id: "$products.seller",
        seller: { $first: "$products.seller" },
        count: { $sum: "$products.amount" },
      },
    },
    {
      $project: {
        _id: 0,
        seller: 1,
        count: 1,
      },
    },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);

  return clients;
}

export async function reportClientsWithMoreOrders(begin: string, end: string) {
  const clients = await saleModel.aggregate([
    {
      $match: {
        saleDate: {
          $gte: getDate(begin),
          $lte: getDate(end),
        },
        state: { $ne: "shopping" },
      },
    },
    {
      $group: {
        _id: "$purchaser",
        purchaser: { $first: "$purchaser" },
        totalOrders: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        purchaser: 1,
        totalOrders: 1,
      },
    },
    { $sort: { totalOrders: -1 } },
    { $limit: 10 },
  ]);

  return clients;
}

export async function reportClientsWithMoreProducts() {
  const clients = await productModel.aggregate([
    {
      $group: {
        _id: "$seller",
        seller: { $first: "$seller" },
        totalProducts: { $sum: "$amount" },
      },
    },
    {
      $project: {
        _id: 0,
        seller: 1,
        totalProducts: 1,
      },
    },
    { $sort: { totalProducts: -1 } },
    { $limit: 10 },
  ]);

  return clients;
}
