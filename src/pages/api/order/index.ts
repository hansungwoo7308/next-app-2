import verifyJWT from "lib/server/verifyJWT";
export default async function (req: any, res: any) {
  switch (req.method) {
    case "GET":
      await createOrder(req, res);
      break;

    default:
      break;
  }
}
const createOrder = async (req: any, res: any) => {
  try {
    const verified = await verifyJWT(req, res);
    console.log("verified : ", verified);
    return res.status(200).json(verified);
    // const { address, mobile, cart, total } = req.body;
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
