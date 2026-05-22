import { Link } from "react-router-dom";
import { getBookImageUrl } from "../utils/book";

<<<<<<< HEAD
function StarRating({ rating = 4 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= rating ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

=======
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
export default function BookCard({ book }) {
  const { id, title, author, price, category, condition } = book;
  const imageUrl = getBookImageUrl(book);

  return (
<<<<<<< HEAD
    <Link to={`/books/${id}`} className="block">
      <div className="bg-card rounded-2xl shadow-sm hover:shadow-md transition-shadow p-4 flex gap-4 group cursor-pointer">
        {/* Book Cover */}
        <div className="w-20 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-surface">
          <img
            src={imageUrl || "https://placehold.co/80x112?text=Book"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            <h3 className="font-display font-semibold text-textMain text-sm leading-snug line-clamp-2">{title}</h3>
            <p className="text-textMuted text-xs mt-0.5">by {author}</p>
          </div>

          <StarRating rating={4} />

          <p className="text-textMuted text-xs line-clamp-2 mt-1">
            {category} · {condition}
          </p>

          <div className="flex items-center justify-between mt-2">
            <span className="text-primary font-semibold text-sm">${price}</span>
            <span className="text-xs text-textMuted bg-surface px-2 py-0.5 rounded-full">{condition}</span>
          </div>
        </div>

        {/* Three-dot menu */}
        <div className="self-start text-textMuted hover:text-primary">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
=======
    <Link to={`/books/${id}`} className="block w-full group cursor-pointer">
      {/* Book Cover with soft shadow */}
      <div className="aspect-[2/3] w-full bg-surface-variant rounded-xl shadow-elevation-1 mb-6 overflow-hidden transition-all duration-300 group-hover:shadow-elevation-3 group-hover:-translate-y-2">
        <img
          src={imageUrl || "https://placehold.co/200x300?text=Book"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
        />
      </div>

      {/* Info Section beneath the cover */}
      <div className="flex flex-col">
        <h4 className="font-display font-semibold text-xl text-primary mb-1 group-hover:text-primary-container transition-colors line-clamp-2 leading-snug">
          {title}
        </h4>
        <p className="label-md text-secondary uppercase tracking-wider mb-2">
          {author}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-stone">
          <span className="body-lg text-primary font-bold">${price}</span>
          <span className="caption text-on-surface-variant bg-surface-variant px-2 py-1 rounded-sm font-medium">
            {condition} · {category}
          </span>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
        </div>
      </div>
    </Link>
  );
}
