import Image from "next/image";
import { productsParams } from "./HomeProducts"
import Link from "next/link";

export type ProductCardProps = {
  product: productsParams;
};

async function ProductCard({product} :ProductCardProps) {
    return (
    <Link href={`product/${product.id}`} className="flex flex-col gap-2 bg-gray mx-5 my-10">
        <Image src={product.image_url_array[0]} alt={product.name} className="bg-[gray] rounded" width={300} height={300} loading="eager" unoptimized/>
        <p className="font-semibold">{product.name}</p>
        <p className="text-gray-400">{product.description}</p>
        <p>4.5</p> 
        <div className="flex items-center justify-between">
            <p className="font-bold">&#8377;{product.price}</p>
            <button className="border px-4 py-2 rounded-[20]">Buy now</button>
        </div>

    </Link>
    )
}

export default ProductCard