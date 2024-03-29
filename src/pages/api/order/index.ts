import connectDB from "lib/server/config/connectDB";
import Order from "lib/server/models/Order";
import Product from "lib/server/models/Product";
import User from "lib/server/models/User";
import verifyJWT from "lib/server/utils/verifyJWT";

connectDB();

export default async function (req: any, res: any) {
  console.log("\x1b[32m\n[api/order]");
  switch (req.method) {
    case "POST":
      console.log("POST");
      await createOrder(req, res);
      break;
    case "GET":
      console.log("GET");
      await getOrders(req, res);
      break;
    default:
      break;
  }
}

const createOrder = async (req: any, res: any) => {
  try {
    // verify
    const verified: any = await verifyJWT(req, res);
    if (!verified) return res.status(401).json({ message: "Unauthorized" });
    // // find
    // const { id }: any = verified;
    // const foundUser = await User.findOne({ _id: id }).exec();
    // console.log("foundUser : ", {
    //   _id: foundUser._id,
    //   username: foundUser.username,
    // });
    // check the product stock
    const { address, mobile, cart, total } = req.body;
    console.log("check the product stock... address : ", address);
    let flagForChecking = 0;
    for (const item of cart) {
      const { _id, quantity }: any = item;
      const checked = await checkStock({ _id, quantity });
      if (!checked) flagForChecking++;
    }
    if (flagForChecking > 0) {
      console.log("\x1b[31mcheckStock error");
      return res.status(400).json({ message: "checkStock error" });
    }
    // update the product in database
    let updatedProducts = [];
    for (const item of cart) {
      const { _id, quantity } = item;
      const updated = await updateProduct({ _id, quantity });
      updatedProducts.push(updated);
    }
    // create an order
    // const { details } = req.body;
    const order = await Order.create({
      User: verified.id,
      address,
      mobile,
      cart,
      total,
      // paid: true,
      // dateOfPayment: details.create_time,
      // paymentId: details.paymentId,
      // method: "paypal",
    });
    // console.log("order : ", {
    //   User: order.User,
    //   _id: order._id,
    //   cart: order.cart,
    // });
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
const checkStock = async ({ _id, quantity }: any) => {
  try {
    const foundProduct = await Product.findOne({ _id }).exec();
    if (!foundProduct.inStock || foundProduct.inStock < quantity) return false;
    return true;
  } catch (error) {
    console.log("checkStock error : ", error);
    return false;
  }
};
const updateProduct = async (payload: any) => {
  const { _id, quantity } = payload;
  try {
    const foundProduct = await Product.findOne({ _id });
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
    const verified: any = await verifyJWT(req, res);
    if (!verified) return res.status(401).json({ message: "Unauthorized" });
    // console.log("verified.role : ", verified.role);
    // find the User
    const { id }: any = verified;
    const foundUser = await User.findOne({ _id: id }).exec();
    if (foundUser.role !== "user") return res.status(403).json({ message: "Forbidden" });
    // console.log("foundUser : ", foundUser);
    // find the Orders
    // const foundOrders = await Order.findOne({ user: foundUser._id });
    const foundOrders = await Order.find({ User: foundUser._id }).populate(
      "User",
      "-password -refreshToken"
    );
    // set
    const filteredOrders = foundOrders.map((order) => ({
      _id: order._id,
      user: order.user,
      cart: order.cart,
      total: order.total,
    }));
    console.log("foundOrders.length : ", foundOrders.length);
    // console.log("foundOrders : ", foundOrders);
    // console.log("foundOrders : ", {
    //   _id: foundOrders._id,
    //   user: foundOrders.user,
    //   cart: foundOrders.cart,
    //   total: foundOrders.total,
    // });
    return res.status(200).json({ orders: foundOrders });
  } catch (error: any) {
    console.log("error : ", error);
    return res.status(500).json({ error: error.message });
  }
};
