import connectDB from "lib/server/config/connectDB";
import Product from "lib/server/model/Product";
connectDB();
export default function index(req: any, res: any) {
  console.group(`\x1b[32m\n[api/product]`);
  if (req.method === "GET") getProducts(req, res);
  console.groupEnd();
}
const getProducts = async (req: any, res: any) => {
  try {
    const products = await Product.find();
    console.log("products : ", products);
    res.status(200).json({ products, message: "GET success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "GET failed" });
  }
};
const test = () => {};
