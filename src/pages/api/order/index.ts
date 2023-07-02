import connectDB from "lib/server/config/connectDB";
import Order from "lib/server/model/Order";
import Product from "lib/server/model/Product";
import User from "lib/server/model/User";
import verifyJWT from "lib/server/utils/verifyJWT";
connectDB();
export default async function (req: any, res: any) {
  console.log("\x1b[32m\n[api/order]");
  switch (req.method) {
    case "POST":
      await createOrder(req, res);
      break;
    case "GET":
      // res.status(200).json({ message: "..." });
      await getOrders(req, res);
      break;
    default:
      break;
  }
}
const createOrder = async (req: any, res: any) => {
  try {
    // verify
    const verified = await verifyJWT(req, res);
    if (!verified) return res.status(401).json({ message: "Unauthorized" });
    // find
    const { id } = verified;
    const foundUser = await User.findOne({ _id: id }).exec();
    console.log("foundUser : ", {
      _id: foundUser._id,
      username: foundUser.username,
    });
    // update the product in database
    const { address, mobile, cart, total } = req.body;
    let flag = 0;
    let updatedProducts = [];
    for (const item of cart) {
      const { _id, quantity, inStock, sold } = item;
      const updated = await updateProduct({ _id, quantity, inStock, sold });
      if (!updated) flag++;
      updatedProducts.push(updated);
    }
    if (flag > 0) {
      // console.log("flag : ", flag);
      console.log("\x1b[31mOut Stock");
      return res.status(444).json({ message: "Out Stock" });
    }
    // make an order
    const order = await Order.create({ user: foundUser.id, address, mobile, cart, total });
    console.log("order : ", {
      user: order.user,
      _id: order._id,
      cart: updatedProducts.map((v: any) => ({
        _id: v._id,
        title: v.title,
        inStock: v.inStock,
      })),
    });
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
    const foundProduct = await Product.findOne({ _id });
    if (!foundProduct.inStock || foundProduct.inStock < quantity) return false;
    foundProduct.inStock -= quantity;
    foundProduct.sold += quantity;
    const savedProduct = await foundProduct.save();
    console.log("savedProduct : ", {
      _id: savedProduct._id,
      title: savedProduct.title,
      inStock: savedProduct.inStock,
    });
    return savedProduct;
    // await Product.findOneAndUpdate(
    //   { _id },
    //   {
    //     inStock: inStock - quantity,
    //     sold: sold + quantity,
    //   }
    // );
  } catch (error) {
    console.log("error : ", error);
    return false;
  }
};
const getOrders = async (req: any, res: any) => {
  try {
    // verify
    const verified = await verifyJWT(req, res);
    if (!verified) return res.status(401).json({ message: "Unauthorized" });
    // find
    const { id } = verified;
    const foundUser = await User.findOne({ _id: id }).exec();
    //
    console.log("foundUser : ", foundUser);
  } catch (error: any) {
    console.log("error : ", error);
    return res.status(500).json({ error: error.message });
  }
};
