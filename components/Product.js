

export default function Product(name, description, price, picture){

    return(
        <>
        <div className="w-64 ">
          <div className="bg-red-100 p-5 rounded-xl productBlueFront">
            <img className="img" src={picture} alt=""/>
          </div>
        </div>
        <div className="mt-2">
          <h3 className="font-bold text-lg">{name}</h3>
        </div>
        <p className="text-sm mt-1 leading-4 lorem">{description}</p>
        <div className="flex mt-1">
        <div className="text-2xl font-bold grow">{price}</div>
          <button className="bg-blue-400 text-white font-bold py-1 px-3 rounded-xl">add to cart</button>
        </div>
        </>
    )
}