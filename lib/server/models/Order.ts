import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    User: {
      // type: mongoose.Types.ObjectId,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // shipping
    address: String,
    mobile: String,
    cart: Array,
    // payment
    total: Number,
    paymentId: String,
    method: String,
    delivered: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    dateOfPayment: Date,
  },
  { timestamps: true }
);
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
