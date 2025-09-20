
import { useGlobalContext } from '../context.';

const FilterBar = () => {
  const { 
    authorFilter, setAuthorFilter,
    yearFilter, setYearFilter,
    subjectFilter, setSubjectFilter,
    ratingFilter, setRatingFilter,
    inStockFilter, setInStockFilter,
    priceRange, setPriceRange
  } = useGlobalContext();

  return (
    <div className="filter-bar flex flex-wrap">
      <input
        type="text"
        placeholder="Filter by author..."
        value={authorFilter}
        onChange={(e) => setAuthorFilter(e.target.value)}
      />
      <input
        type="number"
        placeholder="Filter by year..."
        value={yearFilter}
        onChange={(e) => setYearFilter(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by subject..."
        value={subjectFilter}
        onChange={(e) => setSubjectFilter(e.target.value)}
      />

      {/* Rating */}
      <select value={ratingFilter} onChange={(e) => setRatingFilter(Number(e.target.value))}>
        <option value={0}>All Ratings</option>
        <option value={1}>1+ Stars</option>
        <option value={2}>2+ Stars</option>
        <option value={3}>3+ Stars</option>
        <option value={4}>4+ Stars</option>
        <option value={5}>5 Stars</option>
      </select>

      {/* In-stock */}
      <label>
        <input 
          type="checkbox"
          checked={inStockFilter}
          onChange={(e) => setInStockFilter(e.target.checked)}
        /> In Stock Only
      </label>

      {/* Price Range */}
      <input
        type="number"
        placeholder="Min Price"
        value={priceRange[0]}
        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={priceRange[1]}
        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
      />
    </div>
  );
};

export default FilterBar;
