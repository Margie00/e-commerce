import { Children } from "react"

export default function Layout(){
    return(
        <div>
            <div className="p-5" >
                {Children}
             </div>
            <Footer />
        </div>
        
    )
}