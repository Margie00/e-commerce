import { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { ProductsContext } from "../components/ProductsContext";

export default function CheckoutPage(){
    const {selectedProducts} = useContext(ProductsContext)
    const [productsInfos, setProductsInfos] = useState([])
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')

    useEffect(() => {
        const uniqIds = [...new Set(selectedProducts)]
        fetch('/api/products?ids=' + uniqIds.join(',')) 
        .then(response => response.json())
        .then(json => setProductsInfos(json));

    }, [selectedProducts])

    function moreOfThisProduct(id){
        setSelectedProducts(prev => [...prev,id])
    }

    function lessOfThisProduct(id){
        const pos = selectedProducts.indexOf(id);
        if(pos !== -1){
            setSelectedProducts( prev => {
                return prev.filter((value, index) => index !== pos);
            });
        }
    }
    const deliveryPrice = 5;
    let subTotal = 0;
    if(selectedProducts?.length){
        for(let id of selectedProducts){
            const price = productsInfos.find(p => p._id === id).price || 0;
            total += price;
        }
    }

    const total = subTotal + deliveryPrice;


    return(
        <Layout>
           {!productsInfos.length && (
            <div>cart is empty</div>
        )}
        {productsInfos.length && productsInfos.map(productInfo => {
            const amount = selectedProducts.filter(id => id === productInfo._id).length
            if(amount === 0)return;
            return(
            <div className="flex mb-5" key={productInfo.id}>
                <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                    <img className="w-24" src={productInfo.picture} />
                </div>
                <div className="pl-4">
                    <h3 className="font-bold text-lg">{productInfo.name}</h3>
                    <p className="text-sm leading-4 text-gray-500">{productInfo.description}</p>
                    <div className="flex">
                    <div className="grow">${productInfo.price}</div>
                    <div>
                        <button onClick={() => lessOfThisProduct(productInfo.id)} className="border border-blue-500 px-2 rounded-lg text-blue-500">-</button>
                        <span className="px-2">
                        {selectedProducts.filter(id => id === productInfo._id).length}
                        </span>
                        <button onClick={() => moreOfThisProduct(productInfo.id)} className="bg-blue-500 px-2 rounded-lg text-white">+</button>
                        </div>
                    </div>
                </div>
            </div>
        )})}
        <form action="/api/checkout" method="POST">
        <div className="mt-4">
            <input value="name" onChange={e => setName(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="email" placeholder="Your name"></input>
            <input value="email" onChange={e => setEmail(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="email" placeholder="Email address"></input>
            <input value="address" onChange={e => setAddress(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Street address, number"></input>
            <input value="city" onChange={e => setCity(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="City and postal code"></input>
            
        </div>
        <div className="mt-4">
        <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Subtotal:</h3>
            <h3 className="font-bold">${subTotal}</h3>
        </div>
        <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Delivery:</h3>
            <h3 className="font-bold">${deliveryPrice}</h3>
        </div>
        <div className="flex my-3 border-t pt-3 border-dashed border-blue-500">
            <h3 className="grow font-bold text-gray-400">Total:</h3>
            <h3 className="font-bold">${total}</h3>
        </div>
        </div>
        
        <input type="hidden" name="product" value={selectedProducts.join(',')}/>
        <button className="bg-blue-500 px-5 py-2 rounded-el font-bold text-white w-full my-4 shadow-blue-300 shadow-lg">Continue to checkout</button>
        </form>
        
        </Layout>
    )
}