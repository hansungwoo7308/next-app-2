import Product from "lib/server/models/Product";
export const createProduct = async (req: any, res: any) => {
  console.log("\x1b[32m\n<userController/createProduct>");
  // get
  const { title, price, inStock, description, content, category, images } = req.body;
  const invalid =
    !title ||
    !price ||
    !inStock ||
    !description ||
    !content ||
    category === "all" ||
    images.length === 0;
  if (invalid) return res.status(400).json({ message: "Please add all the fields." });
  // create
  const product = await Product.create({
    title: title.toLowerCase(),
    price,
    inStock,
    description,
    content,
    category,
    images,
  });
  // out
  console.log({ product });
  res.status(200).json({ product });
};
export const getProducts = async (req: any, res: any) => {
  console.log("\x1b[32m\n<userController/getProducts>");
  // get
  const { id } = req.query;
  // find
  const products = await Product.findById(id).exec();
  if (!products) return res.status(404).json({ message: "Not found" });
  // out
  console.log({ products });
  res.status(200).json({ products });
};
