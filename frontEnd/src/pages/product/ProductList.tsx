

const products = [
    {
        name: "Iphone 6",
        price: "$480",
        img: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg"
    },
]

const ProductList = () => {
    return (
        <div className="bg-white">
  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 className="sr-only">Products</h2>

    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
        <a href="#" className="group">
            <img src={product.img} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"/>
            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
        </a>
        ))
        }
    </div>
  </div>
</div>
    )
}

export default ProductList