import Product from "lib/server/models/Product";
export const createProduct = async (req: any, res: any) => {
  console.log("\x1b[32m\n<productController/createProduct>");
  // get
  const { title, price, inStock, description, content, category, images, imagesBase64 } = req.body;
  console.log({ "req.body": req.body });
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
export const getProduct = async (req: any, res: any) => {
  console.log("\x1b[32m\n<productController/getProducts>");
  // get
  const { id } = req.query;
  // find
  const product = await Product.findById(id).exec();
  if (!product) return res.status(404).json({ message: "Not found" });
  // out
  console.log({ product });
  res.status(200).json({ product });
};
export const updateProduct = async (req: any, res: any) => {
  console.log("\x1b[32m\n<productController/updateProduct>");
  // get
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
  // find
  const product = await Product.findById(id).exec();
  if (!product) return res.status(404).json({ message: "Not found" });
  // update
  const updatedProduct = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true });
  // out
  console.log({ updatedProduct });
  res.status(200).json({ updatedProduct });
};
export const deleteProduct = async (req: any, res: any) => {
  return;

  // delete
  const { id } = req.query;
  const deletedProduct = await Product.findByIdAndDelete(id, { new: true });
  // out
  console.log({ deletedProduct });
  res.status(200).json({ deleteProduct });
};
