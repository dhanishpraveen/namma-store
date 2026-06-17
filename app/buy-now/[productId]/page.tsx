import { fetchProductsById } from "@/lib/actions/products.action"
import BuyNowPage from "@/components/BuyNowPage"
import { fetchAddresses } from "@/lib/actions/address.action"
import { AddressParams } from "@/shared.dtypes"


export default async function BuyNow({params}:{params:Promise<{productId:string}>}) {
    const {productId}=await params
    const product = await fetchProductsById(productId)
    const addresses:AddressParams[] = await fetchAddresses()
    console.log(addresses)
    return <BuyNowPage product={product} addresses={addresses}/>
} 
