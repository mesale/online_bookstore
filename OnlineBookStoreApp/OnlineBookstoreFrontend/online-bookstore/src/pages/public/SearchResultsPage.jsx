import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import BookCard from "../../components/BookCard";
import api from "../../api/axiosInstance";
import { unwrapList } from "../../utils/apiHelpers";

const CONDITIONS = ["All", "NEW", "USED"];
const CATEGORIES = ["All", "Technology", "Fiction", "Business", "Science", "Philosophy", "Biography"];
const SORT_OPTIONS = [
  { label: "Relevance", value: "" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest First", value: "newest" },
];

export default function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("q") || "";

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [condition, setCondition] = useState("All");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    api.get("/books", { skipAuth: true })
      .then((res) => setBooks(unwrapList(res)))
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setSearchParams({ q: localQuery.trim() });
    }
  };

  // Filter & sort client-side
  let results = books.filter((book) => {
    const matchesQuery =
      !query ||
      book.title?.toLowerCase().includes(query.toLowerCase()) ||
      book.author?.toLowerCase().includes(query.toLowerCase()) ||
      book.category?.toLowerCase().includes(query.toLowerCase());

    const matchesCondition =
      condition === "All" || book.condition === condition;

    const matchesCategory =
      category === "All" || book.category === category;

    const matchesMin =
      minPrice === "" || book.price >= parseFloat(minPrice);

    const matchesMax =
      maxPrice === "" || book.price <= parseFloat(maxPrice);

    return matchesQuery && matchesCondition && matchesCategory && matchesMin && matchesMax;
  });

  if (sortBy === "price_asc") results.sort((a, b) => a.price - b.price);
  if (sortBy === "price_desc") results.sort((a, b) => b.price - a.price);
  if (sortBy === "newest") results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const clearFilters = () => {
    setCondition("All");
    setCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("");
  };

  const hasActiveFilters =
    condition !== "All" || category !== "All" || minPrice || maxPrice || sortBy;

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center bg-card rounded-2xl shadow-sm px-5 py-3 gap-3 mb-8">
          <svg className="w-5 h-5 text-textMuted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Search by title, author, or category..."
            className="flex-1 bg-transparent outline-none text-textMain text-sm placeholder-textMuted"
          />
          <button
            type="submit"
            className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors"
          >
            Search
          </button>
        </form>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* SIDEBAR FILTERS */}
          <aside className="lg:col-span-1">
            <div className="bg-card rounded-2xl shadow-sm p-5 flex flex-col gap-6 sticky top-20">

              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="font-display font-bold text-textMain text-base">Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-primary font-semibold hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Condition */}
              <div>
                <p className="text-xs font-semibold text-textMuted uppercase tracking-wide mb-3">
                  Condition
                </p>
                <div className="flex flex-col gap-2">
                  {CONDITIONS.map((c) => (
                    <label key={c} className="flex items-center gap-2.5 cursor-pointer group">
                      <div
                        onClick={() => setCondition(c)}
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                          condition === c
                            ? "border-primary bg-primary"
                            : "border-gray-300 group-hover:border-primary"
                        }`}
                      >
                        {condition === c && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <span
                        onClick={() => setCondition(c)}
                        className={`text-sm transition-colors ${
                          condition === c ? "text-primary font-semibold" : "text-textMain"
                        }`}
                      >
                        {c}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <p className="text-xs font-semibold text-textMuted uppercase tracking-wide mb-3">
                  Category
                </p>
                <div className="flex flex-col gap-2">
                  {CATEGORIES.map((cat) => (
                    <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                      <div
                        onClick={() => setCategory(cat)}
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                          category === cat
                            ? "border-primary bg-primary"
                            : "border-gray-300 group-hover:border-primary"
                        }`}
                      >
                        {category === cat && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <span
                        onClick={() => setCategory(cat)}
                        className={`text-sm transition-colors ${
                          category === cat ? "text-primary font-semibold" : "text-textMain"
                        }`}
                      >
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <p className="text-xs font-semibold text-textMuted uppercase tracking-wide mb-3">
                  Price Range (ETB)
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary transition-colors"
                  />
                  <span className="text-textMuted text-sm">—</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

            </div>
          </aside>

          {/* RESULTS */}
          <div className="lg:col-span-3 flex flex-col gap-5">

            {/* Results Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                {query ? (
                  <p className="text-textMain font-semibold">
                    Results for{" "}
                    <span className="text-primary">"{query}"</span>
                    {!loading && (
                      <span className="text-textMuted font-normal text-sm ml-2">
                        ({results.length} book{results.length !== 1 ? "s" : ""})
                      </span>
                    )}
                  </p>
                ) : (
                  <p className="text-textMain font-semibold">All Books</p>
                )}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2 text-sm text-textMain outline-none focus:border-primary transition-colors bg-card"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Active Filter Pills */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                {condition !== "All" && (
                  <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    {condition}
                    <button onClick={() => setCondition("All")} className="hover:text-red-700">✕</button>
                  </span>
                )}
                {category !== "All" && (
                  <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    {category}
                    <button onClick={() => setCategory("All")} className="hover:text-red-700">✕</button>
                  </span>
                )}
                {(minPrice || maxPrice) && (
                  <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    ETB {minPrice || "0"} — {maxPrice || "∞"}
                    <button onClick={() => { setMinPrice(""); setMaxPrice(""); }} className="hover:text-red-700">✕</button>
                  </span>
                )}
              </div>
            )}

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-card rounded-2xl h-36 animate-pulse" />
                ))}
              </div>
            ) : results.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-textMuted">
                <p className="text-5xl mb-4">🔍</p>
                <p className="font-semibold text-lg text-textMain">No books found</p>
                <p className="text-sm mt-1">Try adjusting your filters or search term</p>
                <button
                  onClick={clearFilters}
                  className="mt-5 border-2 border-primary text-primary px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
