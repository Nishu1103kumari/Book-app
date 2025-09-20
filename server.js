const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Base URL for Open Library
const OPENLIBRARY_URL = "http://openlibrary.org/search.json?title=";

// Get books by title
app.get("/api/books", async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: "Title query is required" });
  }

  try {
    const response = await axios.get(`${OPENLIBRARY_URL}${title}`);
    const { docs } = response.data;

    // Map data to simpler format
    const books = docs.slice(0, 50).map((book) => ({
      id: book.key,
      title: book.title,
      author: book.author_name || [],
      first_publish_year: book.first_publish_year,
      edition_count: book.edition_count,
      cover_id: book.cover_i,
      subjects: book.subject || [],
      rating: Math.floor(Math.random() * 5) + 1, // Random rating 1-5
      price: Math.floor(Math.random() * 500) + 100, // Random price 100-600
      inStock: Math.random() > 0.3 // 70% chance in stock
    }));

    res.json({ books });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

