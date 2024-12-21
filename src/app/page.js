'use client'

import { useEffect, useState } from "react";
import Product from "../components/Product";

export default function Home() {

  const [productInfo, setProductsInfo] = useState([])

  useEffect(() => {
    fetch('../api/Products.js')
    .then(response => response.json())
    .then(json => setProductsInfo(json));
  }, []) 

  const categoryNames = [...new Set(productInfo.map(p => p.categoryNames))];

  // console.log({categoryNames})

  return (
    <div className="p-5 bg-blue-100" id="mainDiv">
      <div className="text-2xl font-bold catDiv">
        {categoryNames.map(categoryNames => (
          <div key={categoryNames}>
            <h2 className="text-2xl capitalize">{categoryNames}</h2>
            {productInfo.filter(p => p.category === categoryNames).map(productInfo => (
              <Product{...productInfo}/>
            ))}
          </div>
        ))}
        <div className="py-4 productDiv">
        
        </div>
      </div>
    </div>
  );
}
