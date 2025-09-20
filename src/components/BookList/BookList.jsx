import React from 'react';
import { useGlobalContext } from '../../context.';
import Book from "../BookList/Book";
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import FilterBar from '../FilterBar'
import "./BookList.css";

const BookList = () => {
  const { 
    books, 
    loading, 
    resultTitle, 
    authorFilter, 
    yearFilter, 
    subjectFilter, 
    ratingFilter, 
    inStockFilter, 
    priceRange 
  } = useGlobalContext();

  // Add cover image or default
  const booksWithCovers = books.map((singleBook) => ({
    ...singleBook,
    id: singleBook.id.replace("/works/", ""),
    cover_img: singleBook.cover_id ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg` : coverImg
  }));

  // Apply filters safely
  const filteredBooks = booksWithCovers.filter((book) => {
    const bookAuthors = Array.isArray(book.author) ? book.author : [];
    const bookSubjects = Array.isArray(book.subjects) ? book.subjects : [];

    const matchesAuthor = authorFilter
      ? bookAuthors.join(", ").toLowerCase().includes(authorFilter.toLowerCase())
      : true;

    const matchesYear = yearFilter
      ? book.first_publish_year === Number(yearFilter)
      : true;

    const matchesSubject = subjectFilter
      ? bookSubjects.join(", ").toLowerCase().includes(subjectFilter.toLowerCase())
      : true;

    const matchesRating = book.rating !== undefined ? book.rating >= ratingFilter : true;
    const matchesStock = book.inStock !== undefined ? (inStockFilter ? book.inStock : true) : true;
    const matchesPrice = book.price !== undefined
      ? book.price >= (priceRange[0] || 0) && book.price <= (priceRange[1] || 1000)
      : true;

    return matchesAuthor && matchesYear && matchesSubject && matchesRating && matchesStock && matchesPrice;
  });

  if (loading) return <Loading />;

  return (
    <section className="booklist">
      <div className="container">
        <div className="section-title">
          <h2>{resultTitle}</h2>
        </div>

        {/* Filter bar */}
        <FilterBar />

        <div className="booklist-content grid">
          {filteredBooks.length > 0 ? (
            filteredBooks.slice(0, 30).map((item, index) => (
              <Book key={index} {...item} />
            ))
          ) : (
            <p style={{ textAlign: 'center', fontSize: '18px' }}>No books match your filters.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookList;
