import { ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { categories, priceRanges } from '../data/products';
import gsap from 'gsap';

const FilterSection = ({ gridView, setGridView, filters, setFilters }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Animate dropdown opening
  useEffect(() => {
    if (openDropdown) {
      gsap.fromTo(
        `.dropdown-${openDropdown}`,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [openDropdown]);

  const handleCategoryChange = (category) => {
    setFilters(prev => ({ ...prev, category }));
    setOpenDropdown(null);
  };

  const handlePriceChange = (range) => {
    setFilters(prev => ({ ...prev, priceRange: range }));
    setOpenDropdown(null);
  };

  const handleSortChange = (sortBy) => {
    setFilters(prev => ({ ...prev, sortBy }));
    setOpenDropdown(null);
  };

  const toggleNewArrivals = () => {
    setFilters(prev => ({ ...prev, newArrivals: !prev.newArrivals }));
  };

  const getPriceLabel = () => {
    const range = priceRanges.find(
      r => r.min === filters.priceRange.min && r.max === filters.priceRange.max
    );
    return range ? range.label : 'Price';
  };

  return (
    <div 
      className='flex flex-wrap items-center justify-between gap-6 mb-10 pb-8 border-b-2 border-primary-light/30'
      ref={dropdownRef}
    >
      {/* Filter Dropdowns */}
      <div className='flex flex-wrap gap-3'>
        {/* Category */}
        <div className='relative'>
          <button 
            onClick={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}
            className='px-5 py-2.5 bg-white border-2 border-surface-neutral-grey rounded-full text-text-primary-charcoal font-bold hover:border-primary-blue hover:shadow-lg transition-all duration-300 flex items-center gap-2 smooth-hover'
          >
            {filters.category || 'Category'}
            <ChevronDown size={20} className={`transition-transform duration-300 ${openDropdown === 'category' ? 'rotate-180 text-primary-blue' : ''}`} />
          </button>
          {openDropdown === 'category' && (
            <div className={`dropdown-category absolute top-full left-0 mt-2 bg-white border-2 border-primary-light rounded-2xl shadow-xl z-20 min-w-48 overflow-hidden`}>
              {categories.map((cat, idx) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat === 'All' ? '' : cat)}
                  className={`w-full text-left px-5 py-3 hover:bg-primary-blue/10 transition-all duration-200 font-medium ${
                    (cat === 'All' && !filters.category) || filters.category === cat 
                      ? 'bg-primary-blue/20 text-primary-blue border-l-4 border-primary-blue' 
                      : 'text-text-primary-charcoal'
                  }`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price */}
        <div className='relative'>
          <button 
            onClick={() => setOpenDropdown(openDropdown === 'price' ? null : 'price')}
            className='px-5 py-2.5 bg-white border-2 border-surface-neutral-grey rounded-full text-text-primary-charcoal font-bold hover:border-primary-blue hover:shadow-lg transition-all duration-300 flex items-center gap-2 smooth-hover'
          >
            {getPriceLabel()}
            <ChevronDown size={20} className={`transition-transform duration-300 ${openDropdown === 'price' ? 'rotate-180 text-primary-blue' : ''}`} />
          </button>
          {openDropdown === 'price' && (
            <div className={`dropdown-price absolute top-full left-0 mt-2 bg-white border-2 border-primary-light rounded-2xl shadow-xl z-20 min-w-48 overflow-hidden`}>
              {priceRanges.map((range, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePriceChange(range)}
                  className={`w-full text-left px-5 py-3 hover:bg-primary-blue/10 transition-all duration-200 font-medium ${
                    range.min === filters.priceRange.min && range.max === filters.priceRange.max
                      ? 'bg-primary-blue/20 text-primary-blue border-l-4 border-primary-blue' 
                      : 'text-text-primary-charcoal'
                  }`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  {range.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* New Arrivals */}
        <button
          onClick={toggleNewArrivals}
          className={`px-5 py-2.5 bg-white border-2 rounded-full font-bold transition-all duration-300 flex items-center gap-2 smooth-hover hover:shadow-lg ${
            filters.newArrivals
              ? 'border-primary-blue bg-primary-blue/20 text-primary-blue'
              : 'border-surface-neutral-grey text-text-primary-charcoal hover:border-primary-blue'
          }`}
        >
          ⭐ New Arrivals
          {filters.newArrivals && <span className='text-lg'>✓</span>}
        </button>

        {/* Sort By */}
        <div className='relative'>
          <button 
            onClick={() => setOpenDropdown(openDropdown === 'sort' ? null : 'sort')}
            className='px-5 py-2.5 bg-white border-2 border-surface-neutral-grey rounded-full text-text-primary-charcoal font-bold hover:border-primary-blue hover:shadow-lg transition-all duration-300 flex items-center gap-2 smooth-hover'
          >
            {filters.sortBy || 'Sort By'}
            <ChevronDown size={20} className={`transition-transform duration-300 ${openDropdown === 'sort' ? 'rotate-180 text-primary-blue' : ''}`} />
          </button>
          {openDropdown === 'sort' && (
            <div className={`dropdown-sort absolute top-full left-0 mt-2 bg-white border-2 border-primary-light rounded-2xl shadow-xl z-20 min-w-56 overflow-hidden`}>
              {[
                { label: 'Newest', value: 'newest' },
                { label: 'Price: Low to High', value: 'price-asc' },
                { label: 'Price: High to Low', value: 'price-desc' },
                { label: 'Rating: High to Low', value: 'rating-desc' },
                { label: 'Most Popular', value: 'popular' }
              ].map((sort, idx) => (
                <button
                  key={sort.value}
                  onClick={() => handleSortChange(sort.value)}
                  className={`w-full text-left px-5 py-3 hover:bg-primary-blue/10 transition-all duration-200 font-medium ${
                    filters.sortBy === sort.value
                      ? 'bg-primary-blue/20 text-primary-blue border-l-4 border-primary-blue' 
                      : 'text-text-primary-charcoal'
                  }`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  {sort.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid/Row Toggle */}
      <div className='flex items-center gap-4 bg-white px-5 py-2.5 rounded-full border-2 border-surface-neutral-grey hover:border-primary-blue transition-all duration-300'>
        <span className={`font-bold transition-colors ${!gridView ? 'text-primary-blue' : 'text-text-secondary-slate'}`}>List</span>
        <label className="relative inline-flex items-center cursor-pointer" htmlFor="grid-view">
          <input 
            type="checkbox" 
            id="grid-view" 
            className="sr-only peer" 
            checked={!gridView}
            onChange={(e) => setGridView(!e.target.checked)} 
          />
          <div className="group peer ring-0 bg-linear-to-r from-primary-blue to-primary-light rounded-full outline-none duration-300 after:duration-300 w-16 h-8 shadow-md peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-blue/30 after:rounded-full after:absolute after:bg-white after:outline-none after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95 after:transition-all">
          </div>
        </label>
        <span className={`font-bold transition-colors ${gridView ? 'text-primary-blue' : 'text-text-secondary-slate'}`}>Grid</span>
      </div>
    </div>
  )
}

export default FilterSection;