import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../api/axiosInstance";
import {
  getBookBranchId,
  getBookImageUrl,
  getBookStoreId,
  isBookAvailable,
} from "../../utils/book";

function StarRating({ rating = 4 }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-5 h-5 ${s <= rating ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-textMuted text-sm ml-1">(1,987,765 voters)</span>
    </div>
  );
}

function InfoBadge({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-textMuted uppercase tracking-wide font-medium">{label}</span>
      <span className="text-sm font-semibold text-textMain">{value || "—"}</span>
    </div>
  );
}

export default function BookDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);
  const imageUrl = getBookImageUrl(book);
  const branchId = getBookBranchId(book);
  const storeId = getBookStoreId(book);
  const available = isBookAvailable(book);
  const listedBy = book?.keycloakId || book?.keycloak_id || book?.documents?.[0]?.uploadedBy;
  const isNew = book?.condition?.toLowerCase() === "new";

  useEffect(() => {
    api.get(`/books/${id}`, { skipAuth: true })
      .then((res) => setBook(res.data.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  const handleOrder = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    navigate("/checkout", { state: { book } });
  };

  const handleAddToWishlist = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface">
        <Navbar />
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-3xl h-80 animate-pulse" />
            <div className="md:col-span-2 flex flex-col gap-4">
              <div className="h-8 bg-card rounded-xl animate-pulse w-3/4" />
              <div className="h-4 bg-card rounded-xl animate-pulse w-1/3" />
              <div className="h-4 bg-card rounded-xl animate-pulse w-1/2" />
              <div className="h-24 bg-card rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-surface">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 text-textMuted">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-lg font-semibold">Book not found</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Breadcrumb */}
        <nav className="text-sm text-textMuted mb-6 flex items-center gap-2">
          <button onClick={() => navigate("/")} className="hover:text-primary transition-colors">Home</button>
          <span>/</span>
          <span className="text-textMuted">{book.category}</span>
          <span>/</span>
          <span className="text-textMain font-medium line-clamp-1">{book.title}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* LEFT — Book Cover */}
          <div className="flex flex-col gap-4">
            <div className="bg-card rounded-3xl p-6 shadow-sm flex items-center justify-center">
              <img
                src={imageUrl || "https://placehold.co/200x280?text=Book"}
                alt={book.title}
                className="w-48 h-64 object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Action Buttons */}
            <button
              onClick={handleOrder}
              className="w-full bg-primary text-white rounded-full py-3 font-semibold text-sm hover:bg-red-600 transition-colors shadow-sm"
            >
              Order Now
            </button>
            <button
              onClick={handleAddToWishlist}
              className={`w-full border-2 rounded-full py-3 font-semibold text-sm transition-colors ${
                added
                  ? "border-green-500 text-green-600"
                  : "border-primary text-primary hover:bg-primary hover:text-white"
              }`}
            >
              {added ? "✓ Added to Wishlist" : "Add to Wishlist"}
            </button>
          </div>

          {/* RIGHT — Book Info */}
          <div className="md:col-span-2 flex flex-col gap-6">

            {/* Title & Author */}
            <div>
              <h1 className="font-display font-bold text-textMain text-3xl leading-tight">
                {book.title}
              </h1>
              <p className="text-textMuted mt-1 text-base">by <span className="font-medium text-textMain">{book.author}</span></p>
              <div className="mt-3">
                <StarRating rating={4} />
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-primary text-4xl font-bold">${book.price}</span>
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                isNew
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}>
                {book.condition}
              </span>
            </div>

            {/* Info Grid */}
            <div className="bg-card rounded-2xl p-5 shadow-sm grid grid-cols-2 sm:grid-cols-3 gap-5">
              <InfoBadge label="Category" value={book.category} />
              <InfoBadge label="Condition" value={book.condition} />
              <InfoBadge label="Branch ID" value={branchId} />
              <InfoBadge label="Store ID" value={storeId} />
              <InfoBadge label="Listed by" value={listedBy ? `Staff #${listedBy.slice(0, 6)}` : ""} />
              <InfoBadge
                label="Availability"
                value={available ? "Available" : "Pending Approval"}
              />
            </div>

            {/* Availability Badge */}
            <div className={`flex items-center gap-2 text-sm font-medium ${
              available ? "text-green-600" : "text-yellow-600"
            }`}>
              <span className={`w-2.5 h-2.5 rounded-full ${
                available ? "bg-green-500" : "bg-yellow-400"
              }`} />
              {available
                ? "This book is available and ready to order"
                : "This book is pending platform approval"}
            </div>

            {/* Branch / Store Info */}
            <div className="bg-card rounded-2xl p-5 shadow-sm flex flex-col gap-3">
              <h3 className="font-display font-semibold text-textMain text-base">
                Sold by
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18M3 9h18M9 21V9m6 12V9" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-textMain">Branch #{branchId?.slice(0, 8) || "—"}</p>
                  <p className="text-xs text-textMuted">Store #{storeId || "—"}</p>
                </div>
                <button
                  onClick={() => navigate(`/?branch=${branchId}`)}
                  className="ml-auto text-xs text-primary font-semibold hover:underline"
                >
                  View more from this branch →
                </button>
              </div>
            </div>

            {/* Delivery Note */}
            <div className="bg-highlight rounded-2xl p-4 flex items-start gap-3">
              <span className="text-2xl">📦</span>
              <div>
                <p className="text-sm font-semibold text-textMain">Secure delivery with PIN confirmation</p>
                <p className="text-xs text-textMuted mt-0.5">
                  Once shipped, you'll receive a unique PIN or QR code. Share it with the delivery person to confirm receipt and release payment to the store.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
