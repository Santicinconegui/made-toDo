import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/made");
    console.log(">>>DB is Connected 😘");
  } catch (err) {
    console.log(err);
  }
};
