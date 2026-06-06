  import Image from "next/image"
import Navbar from "./Navbar"
import { ProductCardProps } from "./ProductCard"

async function ProductDetails({product}:ProductCardProps){
    return (
        <div>
            <Navbar/>
            <div className="flex max-md:flex-col max-md:items-center justify-center mt-10">
                <div>
                    <Image src={product.image_url_array[0]} alt={product.name} width={200} height={200} className="bg-[gray] rounded " unoptimized/>
                </div>
                <div className="w-100 flex flex-col gap-3 md:ml-30 max-md:mt-15">
                    <p className="font-extrabold">{product.name}</p>
                    <p>Rating : 4.5</p>
                    <p>{product.description}</p>
                    <div className="flex gap-2">
                        <p className="font-extrabold">&#8377;{product.price}</p>
                        {product.offer_price?<del className="text-gray-500">&#8377;{product.offer_price}</del>:<></>}
                    </div>
                    <hr />
                    <p>Brand : {product.brand}</p>
                    <p>Category : {product.category.name}</p>
                    <div className="flex mt-4">
                        <button className="border rounded px-15 py-3 mr-1 hover:bg-[gray] hover:text-black">Add to Cart</button>
                        <button className="border rounded px-15 py-3 ml-1 bg-white text-black">Buy now</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ProductDetails