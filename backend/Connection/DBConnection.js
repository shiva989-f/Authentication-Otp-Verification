import mongoose from "mongoose";

export const DBConnection = () => {
  const uri = process.env.MONGO_URI;
  mongoose
    .connect(uri)
    .then(() => console.log("Database Connected Successfully"))
    .catch((err) => console.log(err));
};
