import { Sale, SaleState, UserType } from "e-comm-gt-api";
import { saleModel } from "../models/sale.model";

export async function findSaleById(id: string) {
  const sale = await saleModel.findById(id);

  return sale;
}

export async function findSalesByState(state: SaleState) {
  const sales = await saleModel.find({ state }).sort({ deliveryDate: 1 });

  return sales;
}

export async function insertSale(sale: Sale) {
  if (sale.purchaser.userType !== UserType.SELLER) {
    throw new Error("Only sellers can purchase a product.");
  }
  const saleSaved = await saleModel.create(sale);

  return saleSaved;
}

export async function updateSale(sale: Sale) {
  const saleUpdated = await saleModel.findByIdAndUpdate(sale.id, sale, {
    new: true,
  });

  return saleUpdated;
}

export async function deleteSale(id: string) {
  const saleRemoved = await saleModel.findOneAndRemove({
    id,
    state: SaleState.SHOPPING,
  });

  return saleRemoved;
}
