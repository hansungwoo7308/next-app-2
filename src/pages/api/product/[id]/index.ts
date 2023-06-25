import connectDB from "lib/server/config/connectDB";
import Product from "lib/server/model/Product";
connectDB();
export default async function (req: any, res: any) {
  console.log(`\x1b[32m\n[api/product/${req.query.id}]`);
  if (req.method === "GET") await getProduct(req, res);
}
const getProduct = async (req: any, res: any) => {
  try {
    const { id } = req.query;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "The product was not found in database" });
    // console.log("product : ", product);
    return res.status(200).json({ product, message: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "failed" });
  }
};
