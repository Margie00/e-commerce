import { initMongoose } from "../../lib/mongoose";
import Product from "../../models/Product"


export default async function handle(req, res) {
   await initMongoose(); 
   const products = await findAllProducts();
   res.json(200).json(products); 
}