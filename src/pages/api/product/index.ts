import connectDB from "lib/server/config/connectDB";
import Product from "lib/server/model/Product";
export default function index(req: any, res: any) {
  console.log(`\x1b[32m\n[api/product]`);
  connectDB();
  if (req.method === "GET") getProducts(req, res);
}
const getProducts = async (req: any, res: any) => {
  try {
    const products = await Product.find();
    // console.log("products : ", products);
    return res.status(200).json({ products, message: "GET success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "GET failed" });
  }
};
