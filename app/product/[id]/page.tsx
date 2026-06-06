import ProductDetails from "@/components/ProductDetails";
import { fetchProductsById } from "@/lib/actions/products.action"


async function Product({params}:{params:Promise<{id:string}>}){
    const {id} = await params
    const  singleProduct = await fetchProductsById(id);
    return <div><ProductDetails product={singleProduct}/></div>
}

export default Product