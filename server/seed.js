import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";

dotenv.config();
connectDB();

const products = [
  {
    name: "Resin Coaster Set",
    price: 599,
    originalPrice: 899,
    description: "Elegant handmade resin coaster set for your home decor.",
    images: [
      "https://cdn.shopify.com/s/files/1/0066/2601/7316/files/Resin_Coasters_1024x1024.jpg"
    ],
    sizes: ["Standard"]
  },
  {
    name: "Resin Keychain",
    price: 299,
    originalPrice: 499,
    description: "Custom resin keychain with aesthetic design.",
    images: [
      "https://dukaan.b-cdn.net/700x700/webp/media/c16836c2-48d5-4dd6-b6f5-f4.jpg"
    ],
    sizes: ["Standard"]
  },
  {
    name: "Resin Jewelry",
    price: 499,
    originalPrice: 799,
    description: "Handmade resin jewelry for a unique look.",
    images: [
      "https://5.imimg.com/data5/ECOM/Default/2025/5/515164905/RW/HZ/ZA/39740.jpg"
    ],
    sizes: ["Standard"]
  },
  {
    name: "Decor Resin Art",
    price: 899,
    originalPrice: 1299,
    description: "Premium decorative resin art piece.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWRFlkEgO8yf3oAc"
    ],
    sizes: ["Standard"]
  }
];

const seedData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products Added Successfully ✅");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();