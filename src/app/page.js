'use client'

import { useEffect, useState } from "react";

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
            {productInfo.filter(p => p.category === categoryNames).map(product => (
              <div>{product.name}</div>
            ))}
          </div>
        ))}
        <div className="py-4 productDiv">
        <div className="w-64 ">
          <div className="bg-red-100 p-5 rounded-xl productBlueFront">
            <img className="img" src="/products/productBlueFront.JPG" alt=""/>
          </div>
        </div>
        <div className="mt-2">
          <h3 className="font-bold text-lg">Blue Hoodie</h3>
          </div>
        </div>
        <p className="text-sm mt-1 leading-4 lorem">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores ut voluptatum dolore ipsam eaque, ipsum quasi sunt, fugiat eveniet modi, reprehenderit voluptas incidunt asperiores corporis corrupti quae molestiae esse nulla.</p>
        <div className="flex mt-1">
        <div className="text-2xl font-bold grow">$50</div>
          <button className="bg-blue-400 text-white font-bold py-1 px-3 rounded-xl">add to cart</button>
        </div>
      </div>
    </div>
  );
}
