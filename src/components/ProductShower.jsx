import { ShoppingCart, Star, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import gsap from 'gsap';

const ProductShower = ({ product, gridView = true }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    // Animate product on mount
    gsap.fromTo(
      `.product-card-${product.id}`,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' }
    );
  }, [product.id]);

  const handleProductClick = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const renderStars = (rating) => {
    return (
      <div className='flex items-center gap-1'>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  if (!gridView) {
    return (
      <div 
        onClick={handleProductClick}
        className={`product-card-${product.id} w-[95%] bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-row items-center gap-8 overflow-hidden cursor-pointer smooth-hover border-2 border-transparent hover:border-primary-light`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className='shrink-0 w-[25%] h-full bg-primary-light bg-opacity-20 overflow-hidden relative'>
          <img
            src={product.image}
            alt={product.name}
            className={`w-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
        </div>

        {/* Product Info */}
        <div className='flex-1 py-6'>
          <h3 className='text-2xl font-bold text-text-primary-charcoal mb-3'>
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className='flex items-center gap-3 mb-3'>
            {renderStars(product.rating)}
            <span className='text-sm text-text-secondary-slate font-medium'>
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className='flex items-center gap-4 mb-4'>
            <p className='text-3xl font-bold text-primary-blue'>
              ${product.price}
            </p>
            {product.originalPrice && (
              <p className='text-lg line-through text-text-secondary-slate'>
                ${product.originalPrice}
              </p>
            )}
          </div>

          {/* Stock Status */}
          <div className='mb-4'>
            {product.stock > 10 ? (
              <span className='text-sm text-green-600 font-bold bg-green-100 px-3 py-1 rounded-full'>
                ✓ In Stock ({product.stock} available)
              </span>
            ) : (
              <span className='text-sm text-orange-600 font-bold bg-orange-100 px-3 py-1 rounded-full'>
                Only {product.stock} left
              </span>
            )}
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 1 && (
            <div className='flex items-center gap-3 mb-6'>
              <span className='text-sm font-bold text-text-primary-charcoal'>Colors:</span>
              <div className='flex gap-3'>
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedColor(idx);
                    }}
                    className={`w-7 h-7 rounded-full border-2 transition-all smooth-hover ${
                      selectedColor === idx ? 'border-text-primary-charcoal scale-125 shadow-lg' : 'border-gray-300 hover:border-primary-blue'
                    }`}
                    style={{ backgroundColor: color }}
                    title={product.colorNames[idx]}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Free Shipping */}
          {product.freeShipping && (
            <div className='mb-4'>
              <span className='text-sm bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold'>
                ✓ Free Shipping
              </span>
            </div>
          )}

          <button 
            onClick={handleAddToCart}
            className={`px-8 py-3 font-bold rounded-full transition-all duration-300 flex items-center gap-2 text-lg ${
              added ? 'bg-status-success text-white scale-105' : 'bg-primary-blue text-white hover:shadow-lg hover:scale-105 smooth-hover'
            }`}
          >
            {added ? <><Check size={20} /> Added!</> : <><ShoppingCart size={20} /> Add to Cart</>}
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div 
        onClick={handleProductClick}
        className={`product-card-${product.id} bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col h-full smooth-hover border-2 border-transparent hover:border-primary-light`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      
        {/* Product Image Container */}
        <div className='relative w-full bg-primary-light bg-opacity-20 aspect-square overflow-hidden'>
          {product.isNew && (
            <div className='absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10'>
              NEW
            </div>
          )}
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
        </div>

        {/* Product Info */}
        <div className='p-4 flex flex-col flex-1'>
          <h3 className='text-base font-bold text-text-primary-charcoal mb-2 line-clamp-2'>
            {product.name}
          </h3>

          {/* Rating */}
          <div className='flex items-center gap-2 mb-2'>
            {renderStars(product.rating)}
            <span className='text-xs text-text-secondary-slate'>
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className='flex items-center gap-2 mb-3'>
            <p className='text-xl font-bold text-primary-blue'>
              ${product.price}
            </p>
            {product.originalPrice && (
              <p className='text-xs line-through text-text-secondary-slate'>
                ${product.originalPrice}
              </p>
            )}
          </div>

          {/* Stock Status */}
          <div className='mb-3'>
            {product.stock > 10 ? (
              <span className='text-xs text-green-600 font-semibold'>
                ✓ In Stock
              </span>
            ) : (
              <span className='text-xs text-orange-600 font-semibold'>
                Only {product.stock} left
              </span>
            )}
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 1 && (
            <div className='flex gap-2 mb-3'>
              {product.colors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(idx);
                  }}
                  className={`w-5 h-5 rounded-full border-2 transition-all ${
                    selectedColor === idx ? 'border-text-primary-charcoal scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  title={product.colorNames[idx]}
                />
              ))}
            </div>
          )}

          {/* Free Shipping Badge */}
          {product.freeShipping && (
            <div className='mb-3'>
              <span className='text-xs bg-blue-100 text-primary-blue px-2 py-1 rounded'>
                Free Shipping
              </span>
            </div>
          )}

          <button 
            onClick={handleAddToCart}
            className={`w-full py-2 font-semibold rounded-full transition-all flex items-center justify-center gap-2 mt-auto ${
              added ? 'bg-status-success text-white scale-105' : 'bg-primary-blue text-white hover:shadow-lg'
            }`}
          >
            {added ? <><Check size={16} /> Added</> : <><ShoppingCart size={16} /> Add to Cart</>}
          </button>
        </div>
      </div>
    )
  }
}
export default ProductShower
