import {model, Schema} from "mongoose";


const ProductSchemma = new Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    picture: String,
});

const Product = mongoose.model('Product', ProductSchemma);

export default Product;