import { ProductsContextProvider } from "../components/ProductsContext"


function MyApp({Component, pageProps}){
    return(
        <ProductsContextProvider />
    )
    return <Component {...pageProps} />
}

export default MyApp