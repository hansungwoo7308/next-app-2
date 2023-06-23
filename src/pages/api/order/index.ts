import connectDB from "lib/server/config/connectDB";
import Order from "lib/server/model/Order";
import User from "lib/server/model/User";
import verifyJWT from "lib/server/verifyJWT";
connectDB();
export default async function (req: any, res: any) {
  console.log("\x1b[32m\n[api/order]");
  switch (req.method) {
    case "POST":
      await createOrder(req, res);
      break;
    case "GET":
      res.status(200).json({ message: "..." });
      break;
    default:
      break;
  }
}
const createOrder = async (req: any, res: any) => {
  try {
    // verify
    const verified = await verifyJWT(req, res);
    if (!verified) return res.status(403).json({ verified });
    // find
    const { email } = verified;
    const foundUser = await User.findOne({ email }).exec();
    console.log("foundUser : ", foundUser);
    // make an order
    const { address, mobile, cart, total } = req.body;
    const order = await Order.create({ user: foundUser.id, address, mobile, cart, total });
    // set
    return res.status(200).json({ order });
    // if (verified.error) return res.status(403).json({ verified });
    // return res.status(200).json({ verified });
    // const { address, mobile, cart, total } = req.body;
    // const newOrder = new Orders({
    //   user: result.id,
    //   address,
    //   mobile,
    //   cart,
    //   total,
    // });
    // cart.filter((item: any) => {
    //   return sold(item._id, item.quantity, item.inStock, item.sold);
    // });
    // await newOrder.save();
    // res.json({
    //   msg: "Order success! We will contact you to confirm the order.",
    //   newOrder,
    // });
  } catch (error: any) {
    console.log("error : ", error);
    return res.status(500).json({ error: error.message });
  }
};
