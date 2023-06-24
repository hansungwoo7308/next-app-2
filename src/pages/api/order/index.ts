import connectDB from "lib/server/config/connectDB";
import Order from "lib/server/model/Order";
import Product from "lib/server/model/Product";
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
    if (!verified) return;
    // find
    const { id } = verified;
    const foundUser = await User.findOne({ _id: id }).exec();
    // console.log("foundUser : ", foundUser);
    // update the product in database
    const { address, mobile, cart, total } = req.body;
    cart.map((item: any) => {
      const { _id, quantity, inStock, sold } = item;
      updateProduct({ _id, quantity, inStock, sold });
    });
    // make an order
    const order = await Order.create({ user: foundUser.id, address, mobile, cart, total });
    console.log("order : ", order);
    // set
    return res.status(200).json({ order });
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
const updateProduct = async (payload: any) => {
  const { _id, quantity, inStock, sold } = payload;
  try {
    await Product.findOneAndUpdate(
      { _id },
      {
        inStock: inStock - quantity,
        sold: sold + quantity,
      }
    );
  } catch (error) {
    console.log("error : ", error);
  }
};
