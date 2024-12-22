const {model, Schema } = require("mongoose");

const OrderSchema = new Schema({
    products: Object,
    name: String,
    email: String,
    address: String,
    city: String,
    paid: {type: Number, defaultValue: 0},
}, {timestamps: true});

const Order = mongoose.Order || model('Order', OrderSchema);

export default Order;