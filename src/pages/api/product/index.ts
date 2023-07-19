import connectDB from "lib/server/config/connectDB";
import Product from "lib/server/model/Product";
import verifyJWT from "lib/server/utils/verifyJWT";
connectDB();
export default async function (req: any, res: any) {
  console.log(`\x1b[32m\n[api/product]`);
  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;
    case "POST":
      await createProduct(req, res);
      break;
    case "DELETE":
      await deleteProducts(req, res);
      break;
  }
}
const getProducts = async (req: any, res: any) => {
  try {
    // get
    const products = await Product.find();
    console.log(
      "products : ",
      products.map((v: any) => v.title)
    );
    // const productsTitles = products.map((v: any) => ({ title: v.title, inStock: v.inStock }));
    // console.log("productsTitles : ", productsTitles);
    return res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
const createProduct = async (req: any, res: any) => {
  try {
    // verify
    const verified: any = await verifyJWT(req, res);
    if (verified.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    // create
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
    const newProduct = await Product.create({
      title: title.toLowerCase(),
      price,
      inStock,
      description,
      content,
      category,
      images,
    });
    // out
    console.log("newProduct : ", newProduct);
    return res.status(200).json({ newProduct });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const deleteProducts = async (req: any, res: any) => {
  try {
    // delete
    const { ids } = req.body;
    console.log("ids : ", ids);
    let deletedProducts = [];
    for (let id of ids) {
      const deletedProduct = await Product.findByIdAndDelete(id, { new: true }).exec();
      console.log("deletedProduct : ", deletedProduct);
      deletedProducts.push(deletedProduct);
    }
    // out
    return res.status(200).json({ deletedProducts });
  } catch (error) {
    console.log("deleteProducts error : ", error);
  }
};
