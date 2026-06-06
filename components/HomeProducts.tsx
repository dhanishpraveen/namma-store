import ProductCard from "./ProductCard";

export type productsParams = {
    id:string;
    author_id: string;
    sizes:string[];
    colors:string[];
    styles:string[];
    brand:string;
    image_url_array:string[];
    video_url_array:string[];
    name:string;
    category:{
        id:string;
        name:string;
    };
    price:number;
    description:string;
    discount:number;
    quantity:number;
    product_shipping_fee:number;
    offer_price:number;
    created_at:Date;
    updated_at:Date;
    location:string;
    product_comment:string;
}

export type HomeProductsProps = {
  products: productsParams[];
};

function HomeProducts({products}:HomeProductsProps){
    return (
        <div className="px-15 lg:px-30">
            <p className="pt-5 text-[15px] font-bold">Product details</p>
            <div className="grid grid-cols-2 lg:grid-cols-3 lg:mx-40">
                {products.map((product,index)=>(
                        <ProductCard key={index} product={product} />
                ))}
            </div>
            <div className="flex justify-center">
                {/* <button className="border px-5 py-2 rounded-[7] bg-[lightblue] text-black">See more</button> */}
            </div>
        </div>
    )
}

export default HomeProducts;