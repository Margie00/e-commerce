import { initMongoose } from "../../lib/mongoose";
import Product from "../../models/Product"

export default async function handle(req, res) {
   await initMongoose(); // Initializes the MongoDB connection
   res.json(await Product.find().exec()); // Fetches all products and sends them as a JSON response
}