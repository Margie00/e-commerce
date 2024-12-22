'use client'

import { useEffect, useState } from "react";
import Product from "/components/Product.js";
import { initMongoose } from "../../lib/mongoose";
import { findAllProducts } from "../../pages/api/Products";
import Footer from "../../components/Footer";
import Layout from "../../components/Layout";


export default async function Home(products) {

  await initMongoose();
  products = await findAllProducts();

  const [data, setData] = useState([]);
  const [phrase, setPhrase] = useState('');

  const categoryNames = [...new Set(productInfo.map(p => p.categoryNames))];

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('../api/Products.js');
      const json = await res.json();
      setData(json);
    }

    fetchData();
  }, []);

  if(phrase){
    products = productInfo.filter(p => p.name.toLowerCase().includes(phrase));
  }

  // console.log({categoryNames})

  return (
    <Layout> 
    
      <input value={phrase} onChange={e => setPhrase(e.target.value)} type="text" placeholder="Search for products..." className="bg-gray-100 w-full py-2 px-4 rounded-xl"/>
      <div className="text-2xl font-bold">
        {categoryNames.map(categoryNames => (

          <div key={categoryNames}>
            {products.find(p => p.category === categoryNames) && (
            <div>
              <h2 className="text-2xl py-5 capitalize">{categoryNames}</h2>
          <div className="flex -mx-5 overflo-x-scroll snap-x scrollbar-hide"></div>

            {productInfo.filter(p => p.category === categoryNames).map(productInfo => (
              <div key={productInfo.id} className="px-5 snap-start">
                <Product {...productInfo}/> 
              </div>
            ))}
              </div>
            )}
            
          </div>
        ))}
      </div>
        
        </Layout>
  );
}

