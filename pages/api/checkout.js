import { initMongoose } from "../../lib/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res){
    await initMongoose();

    if(req.method !== "POST"){
        res.body("should post but its not!").send();
        return;
    }

    const productsIds = req.body.products.split(',');
    const uniqIds = [...new Set(productsIds)]
    const products = await Product.find({_id: {$in:uniqIds}}).exec();

    for (let productId of uniqIds){
        const quantity = productsIds.find(id => productId).length;
        const product = products.find(p => p._id.toStrng() === productId);
        line_items.push({
            quantity,
            price_data: {
                currency: 'USD',
                product_data: {name: product.name},
                unit_amount: product.price * 100,
            },
        });
    }

    const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });

      res.redirect(303, session.url);

    res.json(req.method)
}