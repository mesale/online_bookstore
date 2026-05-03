import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import HeroCarousel from "../../components/HeroCarousel";
import BookCard from "../../components/BookCard";
import api from "../../api/axiosInstance";
import { getBookImageUrl, getBooksFromResponse } from "../../utils/book";

const GENRES = ["All Genres", "Business", "Science", "Fiction", "Philosophy", "Biography"];

const MOCK_AUTHORS = [
  { id: 1, name: "Sebastian Jeremy", avatar: "https://i.pravatar.cc/36?img=1" },
  { id: 2, name: "Jonathan Doe",     avatar: "https://i.pravatar.cc/36?img=2" },
  { id: 3, name: "Angeline Summer",  avatar: "https://i.pravatar.cc/36?img=3" },
  { id: 4, name: "Noah Jones",       avatar: "https://i.pravatar.cc/36?img=4" },
  { id: 5, name: "Tommy Adam",       avatar: "https://i.pravatar.cc/36?img=5" },
  { id: 6, name: "Ian Cassandra",    avatar: "https://i.pravatar.cc/36?img=6" },
];

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGenre, setActiveGenre] = useState("All Genres");

  useEffect(() => {
    api.get("/books", { skipAuth: true })
      .then((res) => setBooks(getBooksFromResponse(res)))
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredBooks =
    activeGenre === "All Genres"
      ? books
      : books.filter((b) => b.category === activeGenre);

  const booksOfYear = books.slice(0, 4);
  const availableGenres = [
    "All Genres",
    ...new Set([
      ...GENRES.filter((genre) => genre !== "All Genres"),
      ...books.map((book) => book.category).filter(Boolean),
    ]),
  ];

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      {/* Hero Carousel */}
      <section className="max-w-7xl mx-auto px-6 pt-6">
        <HeroCarousel />
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* LEFT SIDEBAR */}
        <aside className="lg:col-span-1 flex flex-col gap-8">

          {/* Author of the Week */}
          <div className="bg-card rounded-2xl p-5 shadow-sm">
            <h2 className="font-display font-bold text-textMain text-base mb-4">
              Author of the week
            </h2>
            <ul className="flex flex-col gap-3">
              {MOCK_AUTHORS.map((author) => (
                <li key={author.id} className="flex items-center gap-3 cursor-pointer group">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <span className="text-sm text-textMain group-hover:text-primary transition-colors font-medium">
                    {author.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Books of the Year */}
          <div className="bg-card rounded-2xl p-5 shadow-sm">
            <h2 className="font-display font-bold text-textMain text-base mb-4">
              Books of the year
            </h2>
            {loading ? (
              <p className="text-textMuted text-sm">Loading...</p>
            ) : booksOfYear.length === 0 ? (
              <p className="text-textMuted text-sm">No books yet.</p>
            ) : (
              <ul className="flex flex-col gap-4">
                {booksOfYear.map((book) => (
                  <li key={book.id} className="flex gap-3 items-start cursor-pointer group">
                    <img
                      src={getBookImageUrl(book) || "https://placehold.co/40x56?text=Book"}
                      alt={book.title}
                      className="w-10 h-14 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-textMain group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {book.title}
                      </p>
                      <p className="text-xs text-textMuted mt-0.5">by {book.author}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </aside>

        {/* RIGHT — Popular by Genre */}
        <div className="lg:col-span-3 flex flex-col gap-6">

          {/* Genre Tabs Header */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="font-display font-bold text-textMain text-base">
              Popular by Genre
            </h2>
            <div className="flex gap-1 flex-wrap">
              {availableGenres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setActiveGenre(genre)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeGenre === genre
                      ? "text-primary border-b-2 border-primary"
                      : "text-textMuted hover:text-textMain"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Book Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-card rounded-2xl h-36 animate-pulse" />
              ))}
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="text-center py-16 text-textMuted">
              <p className="text-4xl mb-3">📚</p>
              <p className="font-medium">No books found in this genre yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
