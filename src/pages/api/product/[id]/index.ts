import connectDB from "lib/server/config/connectDB";
import Product from "lib/server/model/Product";
export default async function index(req: any, res: any) {
  await connectDB();
  console.log(`\x1b[32m\n[api/product]`);
  // if (req.method === "GET") getProduct(req, res);
  // if (req.method === "GET") return getProduct(req, res);
  try {
    const { id } = req.query;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "The product was not found in database" });
    console.log("product : ", product);
    return res.status(200).json({ product, message: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "failed" });
  }
}
const getProduct = async (req: any, res: any) => {
  try {
    const { id } = req.query;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "The product was not found in database" });
    console.log("product : ", product);
    return res.status(200).json({ product, message: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "failed" });
  }
};
