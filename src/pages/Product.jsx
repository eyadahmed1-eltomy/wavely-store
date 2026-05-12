import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Star, ChevronDown, ShoppingCart, Heart, ArrowLeft, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import { productsData } from '../data/products';
import { useCart } from '../context/CartContext';
import gsap from 'gsap';

const Product = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [expandedSection, setExpandedSection] = useState('features');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  // Get product from state or find it in data
  const product = location.state?.product || productsData.find(p => p.id === parseInt(id));

  useEffect(() => {
    // Animate page elements on load
    gsap.fromTo(
      '.product-header',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
    );

    gsap.fromTo(
      '.product-image',
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 0.2, ease: 'power2.out' }
    );

    gsap.fromTo(
      '.product-details',
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: 'power2.out' }
    );

    // Animate spec sections
    gsap.fromTo(
      '.spec-section',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.4, ease: 'power2.out' }
    );
  }, []);

  if (!product) {
    return (
      <div className='min-h-screen bg-surface-offwhite'>
        <Navbar />
        <div className='flex items-center justify-center h-96'>
          <p className='text-2xl text-text-secondary-slate'>Product not found</p>
        </div>
      </div>
    );
  }

  const relatedProducts = productsData.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const renderStars = (rating) => {
    return (
      <div className='flex items-center gap-1'>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={20}
            className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className='min-h-screen bg-surface-offwhite slide-in-right'>
      <Navbar />

      {/* Product Page Header */}
      <div className='product-header bg-white shadow-md border-b-2 border-primary-blue/20'>
        <div className='max-w-6xl mx-auto px-6 py-6 flex items-center justify-between'>
          <div>
            <h2 className='text-3xl font-bold text-text-primary-charcoal flex items-center gap-3'>
              <span className='w-1 h-8 bg-primary-blue rounded-full'></span>
              Product Details
            </h2>
            <p className='text-text-secondary-slate mt-2'>View detailed information about this item</p>
          </div>
          
          {/* Return Button */}
          <button
            onClick={handleGoBack}
            className='flex items-center gap-2 px-5 py-3 bg-primary-blue text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300'
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>

      {/* Product Detail Section */}
      <div className='max-w-6xl mx-auto px-6 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16'>
          {/* Left: Product Images */}
          <div className='product-image flex flex-col'>
            {/* Main Image */}
            <div className='bg-white rounded-2xl overflow-hidden mb-6 aspect-square flex items-center justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300'>
              <img
                src={product.image}
                alt={product.name}
                className='w-full h-full object-cover'
              />
            </div>
            {/* Thumbnail Images */}
            <div className='flex gap-3 overflow-x-auto'>
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className='w-20 h-20 bg-white rounded-xl overflow-hidden cursor-pointer hover:border-2 hover:border-primary-blue transition-all shadow-md hover:shadow-lg'
                >
                  <img
                    src={product.image}
                    alt={`${product.name} ${idx + 1}`}
                    className='w-full h-full object-cover'
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className='product-details flex flex-col justify-between'>
            <div>
              {/* Title and Rating */}
              <h1 className='text-4xl font-bold text-text-primary-charcoal mb-4'>
                {product.name}
              </h1>

              <div className='flex items-center gap-4 mb-6'>
                {renderStars(product.rating)}
                <span className='text-lg text-text-secondary-slate'>
                  {product.rating} ({product.reviews} Reviews)
                </span>
              </div>

              {/* Price Section */}
              <div className='mb-8 pb-8 border-b-2 border-primary-light'>
                <div className='flex items-center gap-4 mb-3'>
                  <span className='text-5xl font-bold text-primary-blue'>
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className='text-2xl line-through text-text-secondary-slate'>
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                {product.freeShipping && (
                  <p className='text-green-600 font-semibold text-lg'>✓ Free Shipping</p>
                )}
              </div>

              {/* Description */}
              <p className='text-text-secondary-slate text-lg mb-8 leading-relaxed'>
                {product.description}
              </p>

              {/* Stock Status */}
              <div className='mb-8 pb-8 border-b-2 border-primary-light'>
                {product.stock > 10 ? (
                  <p className='text-green-600 font-semibold text-lg'>
                    ✓ In Stock ({product.stock} items available)
                  </p>
                ) : (
                  <p className='text-orange-600 font-semibold text-lg'>
                    Only {product.stock} items left
                  </p>
                )}
              </div>

              {/* Colors Selection */}
              {product.colors && product.colors.length > 1 && (
                <div className='mb-8 pb-8 border-b-2 border-primary-light'>
                  <h3 className='text-xl font-bold text-text-primary-charcoal mb-4'>
                    Choose Color
                  </h3>
                  <div className='flex gap-3 flex-wrap'>
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(idx)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-full border-2 transition-all smooth-hover ${
                          selectedColor === idx
                            ? 'border-primary-blue bg-primary-light bg-opacity-30 scale-105'
                            : 'border-gray-300 hover:border-primary-blue'
                        }`}
                      >
                        <div
                          className='w-6 h-6 rounded-full shadow-md'
                          style={{ backgroundColor: color }}
                        />
                        <span className='font-medium text-sm'>{product.colorNames[idx]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className='flex gap-4 mb-6 flex-wrap'>
                <div className='flex items-center border-2 border-surface-neutral-grey rounded-full hover:border-primary-blue transition-colors'>
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className='px-5 py-3 text-xl font-bold hover:bg-primary-light hover:bg-opacity-20 transition-colors rounded-l-full'
                  >
                    −
                  </button>
                  <span className='px-6 py-3 text-lg font-semibold min-w-20 text-center'>
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className='px-5 py-3 text-xl font-bold hover:bg-primary-light hover:bg-opacity-20 transition-colors rounded-r-full'
                  >
                    +
                  </button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 font-bold rounded-full flex items-center justify-center gap-2 transition-all duration-300 text-lg min-w-50 smooth-hover ${
                    added ? 'bg-status-success text-white scale-105' : 'bg-primary-blue text-white hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {added ? <><Check size={24} /> Added to Cart!</> : <><ShoppingCart size={24} /> Add to Cart</>}
                </button>

                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`px-6 py-3 rounded-full border-2 font-bold transition-all flex items-center justify-center smooth-hover ${
                    isWishlisted
                      ? 'bg-red-100 border-red-500 text-red-600'
                      : 'border-surface-neutral-grey text-text-primary-charcoal hover:border-primary-blue'
                  }`}
                >
                  <Heart size={24} className={isWishlisted ? 'fill-current' : ''} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Specs Section */}
        <div className='bg-white rounded-2xl shadow-lg overflow-hidden mb-12'>
          {/* Features */}
          <div className='spec-section border-b-2 border-surface-neutral-grey'>
            <button
              onClick={() => setExpandedSection(expandedSection === 'features' ? null : 'features')}
              className='w-full px-8 py-6 flex items-center justify-between hover:bg-primary-light hover:bg-opacity-10 transition-colors'
            >
              <h3 className='text-2xl font-bold text-text-primary-charcoal'>Features</h3>
              <ChevronDown
                size={28}
                className={`transition-transform duration-300 text-primary-blue ${expandedSection === 'features' ? 'rotate-180' : ''}`}
              />
            </button>
            {expandedSection === 'features' && (
              <div className='px-8 py-6 bg-gray-50'>
                <ul className='space-y-4'>
                  {product.features.map((feature, idx) => (
                    <li key={idx} className='flex items-start gap-4'>
                      <span className='text-primary-blue font-bold text-xl mt-0.5'>✓</span>
                      <span className='text-text-primary-charcoal text-lg'>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Tech Specs */}
          <div className='spec-section border-b-2 border-surface-neutral-grey'>
            <button
              onClick={() => setExpandedSection(expandedSection === 'specs' ? null : 'specs')}
              className='w-full px-8 py-6 flex items-center justify-between hover:bg-primary-light hover:bg-opacity-10 transition-colors'
            >
              <h3 className='text-2xl font-bold text-text-primary-charcoal'>Tech Specs</h3>
              <ChevronDown
                size={28}
                className={`transition-transform duration-300 text-primary-blue ${expandedSection === 'specs' ? 'rotate-180' : ''}`}
              />
            </button>
            {expandedSection === 'specs' && (
              <div className='px-8 py-6 bg-gray-50'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {Object.entries(product.techSpecs).map(([key, value], idx) => (
                    <div key={idx} className='flex justify-between items-center p-4 bg-white rounded-lg'>
                      <span className='font-semibold text-text-primary-charcoal'>{key}:</span>
                      <span className='text-text-secondary-slate font-medium'>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* What's in the Box */}
          <div className='spec-section'>
            <button
              onClick={() => setExpandedSection(expandedSection === 'box' ? null : 'box')}
              className='w-full px-8 py-6 flex items-center justify-between hover:bg-primary-light hover:bg-opacity-10 transition-colors'
            >
              <h3 className='text-2xl font-bold text-text-primary-charcoal'>What's in the Box</h3>
              <ChevronDown
                size={28}
                className={`transition-transform duration-300 text-primary-blue ${expandedSection === 'box' ? 'rotate-180' : ''}`}
              />
            </button>
            {expandedSection === 'box' && (
              <div className='px-8 py-6 bg-gray-50'>
                <ul className='space-y-3'>
                  {product.boxContents.map((item, idx) => (
                    <li key={idx} className='flex items-start gap-3'>
                      <span className='text-primary-blue font-bold text-lg'>•</span>
                      <span className='text-text-primary-charcoal text-lg'>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className='spec-section bg-white rounded-2xl shadow-lg p-10 mb-12'>
          <div className='flex items-center justify-between mb-8 flex-wrap gap-4'>
            <h2 className='text-3xl font-bold text-text-primary-charcoal'>Customer Reviews</h2>
            <div className='text-right'>
              <p className='text-sm text-text-secondary-slate'>Average Rating</p>
              <p className='text-4xl font-bold text-primary-blue'>{product.rating}/5</p>
            </div>
          </div>

          {/* Sample Reviews */}
          <div className='space-y-8'>
            {[
              {
                name: 'Wanik J.',
                rating: 5,
                comment: 'Experience professional-grade cleaning with advanced sonic technology, 5 modes, and long battery life. Designed for a brighter smile.',
                likes: 16,
                avatar: 'https://via.placeholder.com/40?text=U1'
              },
              {
                name: 'Ansentmen J.',
                rating: 5,
                comment: 'Very good quality photos this year.',
                likes: 0,
                avatar: 'https://via.placeholder.com/40?text=U2'
              }
            ].map((review, idx) => (
              <div key={idx} className='border-t border-surface-neutral-grey pt-6 first:border-t-0 first:pt-0'>
                <div className='flex items-start gap-4 mb-4'>
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className='w-12 h-12 rounded-full shadow-md'
                  />
                  <div className='flex-1'>
                    <p className='font-bold text-text-primary-charcoal text-lg'>{review.name}</p>
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className='text-text-secondary-slate mb-4 text-lg leading-relaxed'>{review.comment}</p>
                <div className='flex gap-6 text-sm text-text-secondary-slate flex-wrap'>
                  <button className='hover:text-primary-blue font-medium transition-colors'>👍 {review.likes}</button>
                  <button className='hover:text-primary-blue font-medium transition-colors'>💬 Reply</button>
                  <button className='hover:text-primary-blue font-medium transition-colors'>↗ Share</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className='mb-12'>
            <h2 className='text-3xl font-bold text-text-primary-charcoal mb-8'>Related Products</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {relatedProducts.map((relProduct, idx) => (
                <div
                  key={relProduct.id}
                  onClick={() => window.location.href = `/product/${relProduct.id}`}
                  className='spec-section bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer smooth-hover'
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className='relative w-full bg-primary-light bg-opacity-20 aspect-square overflow-hidden'>
                    <img
                      src={relProduct.image}
                      alt={relProduct.name}
                      className='w-full h-full object-cover hover:scale-110 transition-transform duration-500'
                    />
                  </div>
                  <div className='p-6'>
                    <h3 className='font-bold text-text-primary-charcoal mb-3 text-lg'>{relProduct.name}</h3>
                    <div className='flex items-center gap-2 mb-3'>
                      {renderStars(relProduct.rating)}
                      <span className='text-xs text-text-secondary-slate'>({relProduct.reviews})</span>
                    </div>
                    <p className='text-2xl font-bold text-primary-blue'>${relProduct.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;