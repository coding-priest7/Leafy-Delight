import dbConnect from "@component/util/mongo";
import Product from "@component/models/Product";

export default async function handler(req, res) {
  const { method, cookies } = req;
  const myCookie = req?.headers.cookie || "";
  const token = myCookie.split(";").reduce((acc, curr) => {
    const [key, value] = curr.split("=");
    if (key.trim() === "token") {
      return value;
    }
    return acc;
  }, "");
  // const token = cookies.token;
  await dbConnect();

  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("Not authenticated!");
    }
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
