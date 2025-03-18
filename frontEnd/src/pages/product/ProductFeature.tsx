const features = [
  { name: 'Brand', description: 'Apple' },
  { name: 'Model', description: 'iPhone 14 Pro Max' },
  { name: 'Storage', description: '256GB' },
  { name: 'Color', description: 'Space Black' },
  { name: 'Display', description: '6.7‑inch Super Retina XDR OLED' },
  { name: 'Battery Life', description: 'Up to 29 hours video playback' },
  { name: 'Includes', description: 'Phone, USB-C to Lightning cable, documentation' },
  { name: 'Warranty', description: '1 year Apple Limited Warranty' },
  { name: 'Condition', description: 'Brand New / Factory Sealed' },
];

  
  const ProductFeature = () => {
    return (
      <div className="bg-white">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Technical Specifications</h2>
            <p className="mt-4 text-gray-500">
            The iPhone 14 Pro Max features a 6.7-inch Super Retina XDR display, powered by the fast A16 Bionic chip. 
            With 256GB storage, a pro-level triple camera, and all-day battery life, it’s built for performance and elegance in sleek Space Black.
            </p>
  
            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {features.map((feature) => (
                <div key={feature.name} className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-gray-900">{feature.name}</dt>
                  <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            <img
              alt=""
              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-03-detail-01.jpg"
              className="rounded-lg bg-gray-100"
            />
            <img
              alt=""
              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-03-detail-02.jpg"
              className="rounded-lg bg-gray-100"
            />
            <img
              alt=""
              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-03-detail-03.jpg"
              className="rounded-lg bg-gray-100"
            />
            <img
              alt=""
              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-03-detail-04.jpg"
              className="rounded-lg bg-gray-100"
            />
          </div>
        </div>
      </div>
    )
  }

  export default ProductFeature;