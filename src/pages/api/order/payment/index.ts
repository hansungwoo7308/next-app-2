import connectDB from "lib/server/config/connectDB";
import Order from "lib/server/models/Order";
import verifyJWT from "lib/server/utils/verifyJWT";
connectDB();
export default async function (req: any, res: any) {
  console.log("\x1b[32m\n[api/order/payment]");
  switch (req.method) {
    case "PATCH":
      console.log("PATCH");
      await payForOrder(req, res);
      break;
    default:
      break;
  }
}
const payForOrder = async (req: any, res: any) => {
  try {
    // verify the User
    const verified: any = await verifyJWT(req, res);
    if (!verified) return res.status(401).json({ message: "Unauthorized" });
    // else if (verified.role !== "user") return res.status(403).json({ message: "Forbidden" });
    // find the Order
    const { _id, paymentId } = req.body;
    const foundOrder = await Order.findOne({ _id }).populate("User");
    if (foundOrder.User.role !== "user") return res.status(403).json({ message: "Forbidden" });
    // console.log("foundOrder : ", foundOrder);
    // set the Order
    foundOrder.paid = true;
    foundOrder.paymentId = paymentId;
    foundOrder.method = "Paypal";
    const savedOrder: any = await foundOrder.save();
    // console.log("savedOrder : ", savedOrder);
    return res.status(200).json({ savedOrder });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
