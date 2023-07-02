import connectDB from "lib/server/config/connectDB";
import Product from "lib/server/model/Product";
export default async function (req: any, res: any) {
  await connectDB();
  console.log(`\x1b[32m\n[api/product]`);
  if (req.method === "GET") await getProducts(req, res);
}
const getProducts = async (req: any, res: any) => {
  try {
    const products = await Product.find();
    // console.log("products : ", products);
    const productsTitles = products.map((v: any) => ({ title: v.title, inStock: v.inStock }));
    console.log("productsTitles : ", productsTitles);
    return res.status(200).json({ products, message: "GET success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "GET failed" });
  }
};
