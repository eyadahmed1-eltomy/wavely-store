import { useState, useMemo, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FilterSection from '../components/FilterSection';
import ProductGrid from '../components/ProductGrid';
import { productsData } from '../data/products';
import gsap from 'gsap';

const HeroSection = () => {
  useEffect(() => {
    gsap.fromTo(
      '.hero-title',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );
    gsap.fromTo(
      '.hero-subtitle',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power2.out' }
    );
  }, []);

  return (
    <section className='bg-linear-to-l from-primary-blue/80 via-primary-light/90 to-primary-blue/5 py-20 px-6 overflow-hidden'>
      <div className='max-w-6xl mx-auto text-center'>
        <h1 className='hero-title text-5xl md:text-6xl font-bold text-text-primary-charcoal mb-6'>
          Discover Your Wave. Shop Now.
        </h1>
        <p className='hero-subtitle text-xl text-text-secondary-slate max-w-2xl mx-auto'>
          Find premium products crafted for modern living. Experience the perfect blend of quality, style, and innovation.
        </p>
      </div>
    </section>
  )
}

const Home = () => {
  const [gridView, setGridView] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: { min: 0, max: Infinity },
    newArrivals: false,
    sortBy: ''
  });

  useEffect(() => {
    gsap.fromTo(
      '.page-header',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
    );
  }, []);

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    let result = [...productsData];

    // Filter by category
    if (filters.category) {
      result = result.filter(p => p.category === filters.category);
    }

    // Filter by price range
    result = result.filter(
      p => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
    );

    // Filter new arrivals
    if (filters.newArrivals) {
      result = result.filter(p => p.isNew);
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'popular':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    return result;
  }, [filters]);

  return (
    <div className='min-h-screen bg-surface-offwhite fade-in'>
      <Navbar />
      <HeroSection />
      
      {/* Page Header */}
      <div className='page-header bg-white shadow-md'>
        <div className='max-w-6xl mx-auto px-6 py-6'>
          <h2 className='text-3xl font-bold text-text-primary-charcoal flex items-center gap-3'>
            <span className='w-1 h-8 bg-primary-blue rounded-full'></span>
            Shop Our Collection
          </h2>
          <p className='text-text-secondary-slate mt-2'>Browse our curated selection of premium products</p>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-6 py-10'>
        <FilterSection 
          gridView={gridView} 
          setGridView={setGridView}
          filters={filters}
          setFilters={setFilters}
        />
        <ProductGrid products={filteredProducts} gridView={gridView} />
      </div>
    </div>
  )
}

export default Home