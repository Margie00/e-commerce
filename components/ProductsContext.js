import { Children, createContext} from "react";
import useLocalStorageState from "use-local-storage-state";

export const ProductsContext = createContext({});

export function ProductsContextProvider(){
    const [selectedProducts, setSelectedProducts] = useLocalStorageState('cart',{defaultValue: []});
    return(
        <ProductsContext.Provider value={{selectedProducts}}>{Children}</ProductsContext.Provider>
    )
}