import { initMongoose } from "../../lib/mongoose";
import Product from "../../models/Product"


export default async function handle(req, res) {
   await initMongoose(); 
   const {ids} = req.query;

   if(ids){
      const idsArray = ids.split(',')
      res.json(
         await Product.find({
            '_id': {$in:idsArray}
         }).exec())
   }else{
      const products = await findAllProducts();
      res.json(200).json(products); 
   }
}