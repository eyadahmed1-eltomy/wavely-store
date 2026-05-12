import ProductShower from './ProductShower';

const ProductGrid = ({ products, gridView = true }) => {
  if (!products || products.length === 0) {
    return (
      <div className='flex items-center justify-center h-96'>
        <p className='text-xl text-text-secondary-slate'>No products found</p>
      </div>
    );
  }

  if (!gridView) {
    return (
      <div className='space-y-4 flex flex-col items-center'>
        {products.map((product) => (
          <ProductShower key={product.id} product={product} gridView={false} />
        ))}
      </div>
    )
  } else {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map((product) => (
          <ProductShower key={product.id} product={product} gridView={true} />
        ))}
      </div>
    )
  }
}
export default ProductGrid
