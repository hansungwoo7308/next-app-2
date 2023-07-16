import connectDB from "lib/server/config/connectDB";
import Product from "lib/server/model/Product";
import verifyJWT from "lib/server/utils/verifyJWT";
connectDB();
export default async function (req: any, res: any) {
  console.log(`\x1b[32m\n[api/product/${req.query.id}]`);
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
    case "PUT":
      await updateProduct(req, res);
      break;
    // case "DELETE":
    //     await deleteProduct(req, res)
    //     break;
  }
}
const getProduct = async (req: any, res: any) => {
  try {
    // get
    const { id } = req.query;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Not found" });
    console.log("product : ", product);
    // output
    return res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
const updateProduct = async (req: any, res: any) => {
  try {
    // verify
    const verified: any = await verifyJWT(req, res);
    if (verified.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    // update
    const { id } = req.query;
    const { title, price, inStock, description, content, category, images } = req.body;
    if (
      !title ||
      !price ||
      !inStock ||
      !description ||
      !content ||
      category === "all" ||
      images.length === 0
    )
      return res.status(400).json({ message: "Please add all the fields." });
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      {
        title: title.toLowerCase(),
        price,
        inStock,
        description,
        content,
        category,
        images,
      }
    );
    console.log("updatedProduct : ", updatedProduct);
    // const updatedProduct=await foundProduct.save()
    // output
    return res.json({ updatedProduct });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
