import express, { Express, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import path from "path";

import { configMongoose } from "./configs/mongo.config";
import { morganConfig } from "./configs/morgan.config";
import { productRoute } from "./routes/product.route";
import { saleRoute } from "./routes/sale.route";
import { userRoute } from "./routes/user.route";

const app: Express = express();

config();

// configurating mongoose
const url = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/e-comm-gt";
configMongoose(url);

// adding middleware
app.use("", express.static("static"));
app.use(cors());
app.use(express.json());
app.use(morganConfig);

// adding routes
app.use("/api/product", productRoute);
app.use("/api/sale", saleRoute);
app.use("/api/user", userRoute);
app.use("*", (_, res: Response) =>
  res.sendFile(path.resolve("static/index.html"))
);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
