import { Product, Sale, SaleState, UserType } from "e-comm-gt-api";
import mongoose from "mongoose";
import { saleModel } from "../models/sale.model";
import { userModel } from "../models/user.model";
import { productModel } from "../models/product.model";

export async function findShoppingCart(purchaser: string) {
  const sale = await saleModel.findOne({ purchaser, state: "shopping" });

  return sale;
}

export async function findSaleById(id: string) {
  const sale = await saleModel.findById(id);

  return sale;
}

export async function findSalesByState(state: SaleState) {
  const sales = await saleModel.find({ state }).sort({ deliveryDate: 1 });

  return sales;
}

export async function insertSale(sale: Sale) {
  const purchaser = await userModel.findOne({ username: sale.purchaser });
  if (!purchaser || purchaser.userType !== UserType.SELLER) {
    throw new Error("Only sellers can purchase a product.");
  }
  const saleSaved = await saleModel.create(sale);

  return saleSaved;
}

export async function updateSale(sale: Sale) {
  const saleUpdated = await saleModel.findByIdAndUpdate(sale.id, sale, {
    new: true,
    upsert: true,
  });

  return saleUpdated;
}

export async function buyShoppingCart(purchaser: string, sale: Sale) {
  const saleInMongo = await saleModel.findOne({
    purchaser,
    state: SaleState.SHOPPING,
  });
  const saleInMongoObj: Sale | undefined = saleInMongo?.toObject();

  if (!saleInMongoObj) {
    throw new Error("There is no shopping cart for the user");
  }

  const products = await productModel.find({
    name: { $in: sale.products.map((prod) => prod.name) },
  });

  const withoutEnoughStock = products.filter((prod) => {
    const saleProd = sale.products.filter(
      (product) => product.name === prod.name
    )[0];
    return !saleProd || saleProd.amount > prod.amount;
  });
  if (withoutEnoughStock.length) {
    const saleUpdated = await saleModel.findByIdAndUpdate(
      saleInMongoObj.id,
      {
        $pull: {
          products: {
            name: { $in: withoutEnoughStock.map((prod) => prod.name) },
          },
        },
      },
      { new: true }
    );

    throw new Error("Some products already don't have enough stock");
  }

  const productsUpdates = products.map(({ name }) => ({
    updateOne: {
      filter: { name },
      update: {
        $inc: {
          amount:
            -1 *
            sale.products.filter((_product) => _product.name === name)[0]
              ?.amount,
        },
      },
    },
  }));

  const updShoppingCart = {
    ...sale,
    state: SaleState.INDELIVERY,
    saleDate: new Date().toISOString().split("T")[0],
    deadline: new Date(+new Date() + 60000 * 60 * 24 * 5).toISOString().split("T")[0],
  };

  await productModel.bulkWrite(productsUpdates);

  const saleUpdated = await saleModel.findByIdAndUpdate(
    saleInMongoObj.id,
    updShoppingCart,
    { new: true }
  );

  return saleUpdated;
}

export async function updateShoppingCartProduct(
  purchaser: string,
  product: Product
) {
  await saleModel.findOneAndUpdate(
    { purchaser, state: SaleState.SHOPPING },
    { $pull: { products: { name: product.name } } },
    { upsert: true }
  );

  const saleUpdated = await saleModel.findOneAndUpdate(
    { purchaser, state: SaleState.SHOPPING },
    { $push: { products: { ...product, id: product.id } } },
    { new: true }
  );

  return saleUpdated;
}

export async function deleteShoppingCart(id: string) {
  const saleRemoved = await saleModel.findOneAndRemove({
    _id: new mongoose.Types.ObjectId(id),
    state: SaleState.SHOPPING,
  });

  return saleRemoved;
}

export async function removeProductInCart(purchaser: string, product: string) {
  const saleRemoved = await saleModel.findOneAndUpdate(
    { purchaser, state: SaleState.SHOPPING },
    { $pull: { products: { name: product } } },
    { new: true }
  );

  return saleRemoved;
}
