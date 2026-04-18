import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: String,
      phone: String,
      email: String,
      instagram: String,
    },
    address: {
      addressLine: String,
      city: String,
      state: String,
      pincode: String,
    },
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        size: String,
        quantity: Number,
      }
    ],
    totalAmount: Number,
    paymentMethod: String,
    status: {
      type: String,
      default: "pending"
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;