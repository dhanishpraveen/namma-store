import Image from "next/image";
import { productsParams } from "./HomeProducts"
import Link from "next/link";

export type ProductCardProps = {
  product: productsParams;
};

async function ProductCard({product} :ProductCardProps) {
    return (
    <div className="flex flex-col">
            <Link href={`product/${product.id}`} className="flex flex-col gap-2 bg-gray mx-5 my-10">
                <Image src={product.image_url_array[0]} alt={product.name} className="bg-[gray] rounded" width={300} height={300} loading="eager" unoptimized/>
                <p className="font-semibold">{product.name}</p>
                <p className="text-gray-400">{product.description}</p>
                <p>4.5</p> 
            </Link>
                <div className="flex mx-5 mt-[-24px] mb-10 items-center justify-between">
                    <p className="font-bold">&#8377;{product.price}</p>
                    <Link href={`/buy-now/${product.id}`} className="border px-4 bg-gray-800 py-2 rounded-3xl">Buy now</Link>
                </div>
    </div>
    )
}

export default ProductCard