import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  originalPrice: Number,
  description: String,
  images: [String],
  video: String,
  sizes: [String],
  category: String,
}, { timestamps: true });

export default mongoose.model("Product", productSchema);