import mongoose from "mongoose";

export function configMongoose(url: string) {
  try {
    mongoose.connect(url);
    console.log("connected to MongoDB");
  } catch (error: any) {
    console.log("error connecting to MongoDB:", error.message);
  }
}
