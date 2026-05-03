import { useState } from "react";

const FEATURED_BOOKS = [
  {
    id: 1,
    title: "Big Magic: Creative Living Beyond Fear",
    author: "Elizabeth Gilbert",
    rating: 3,
    votes: "1,987,765",
    bg: "bg-pink-200",
    cover: "https://covers.openlibrary.org/b/id/8739161-L.jpg",
  },
  {
    id: 2,
    title: "Attack of The Planet",
    author: "Andrea Jordan",
    rating: 3,
    votes: "1,987,765",
    bg: "bg-yellow-100",
    cover: "https://placehold.co/160x220/f59e0b/fff?text=Book",
  },
  {
    id: 3,
    title: "Ten Thousand Skies Above You",
    author: "Claudia Gray",
    rating: 4,
    votes: "1,987,765",
    bg: "bg-sky-200",
    cover: "https://covers.openlibrary.org/b/id/8228691-L.jpg",
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <svg key={s} className={`w-4 h-4 ${s <= rating ? "text-yellow-400" : "text-white/40"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function HeroCarousel() {
  const [active, setActive] = useState(1); // center card

  const prev = () => setActive((a) => (a - 1 + FEATURED_BOOKS.length) % FEATURED_BOOKS.length);
  const next = () => setActive((a) => (a + 1) % FEATURED_BOOKS.length);

  const getVisible = () => {
    const len = FEATURED_BOOKS.length;
    return [
      FEATURED_BOOKS[(active - 1 + len) % len],
      FEATURED_BOOKS[active],
      FEATURED_BOOKS[(active + 1) % len],
    ];
  };

  const [left, center, right] = getVisible();

  return (
    <div className="relative w-full overflow-hidden py-6">
      <div className="flex items-stretch justify-center gap-0">

        {/* Left card */}
        <div className={`${left.bg} rounded-3xl p-6 flex-1 max-w-xs opacity-80 scale-95 transition-all duration-300 hidden md:flex flex-col justify-between min-h-[220px]`}>
          <div>
            <h2 className="font-display font-bold text-textMain text-lg leading-snug">{left.title}</h2>
            <p className="text-textMuted text-xs mt-1">by {left.author}</p>
            <div className="flex items-center gap-2 mt-2">
              <StarRating rating={left.rating} />
              <span className="text-xs text-textMuted">{left.votes} voters</span>
            </div>
            <p className="text-textMuted text-xs mt-3 line-clamp-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <button className="mt-4 border-2 border-primary text-primary rounded-full px-6 py-2 text-sm font-semibold hover:bg-primary hover:text-white transition-colors self-start">
            See The Book
          </button>
        </div>

        {/* Center card (featured - raised) */}
        <div className={`${center.bg} rounded-3xl p-6 flex-1 max-w-sm z-10 shadow-xl -mt-4 flex flex-col justify-between min-h-[260px] relative`}>
          <div className="absolute right-4 top-0 -translate-y-1/4">
            <img src={center.cover} alt={center.title} className="w-32 h-44 object-cover rounded-xl shadow-2xl" />
          </div>
          <div className="pr-32">
            <h2 className="font-display font-bold text-textMain text-xl leading-snug">{center.title}</h2>
            <p className="text-textMuted text-xs mt-1">by {center.author}</p>
            <div className="flex items-center gap-2 mt-2">
              <StarRating rating={center.rating} />
              <span className="text-xs text-textMuted">{center.votes} voters</span>
            </div>
            <p className="text-textMuted text-xs mt-3 line-clamp-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <button className="mt-4 border-2 border-primary text-primary rounded-full px-6 py-2 text-sm font-semibold hover:bg-primary hover:text-white transition-colors self-start">
            See The Book
          </button>
        </div>

        {/* Right card */}
        <div className={`${right.bg} rounded-3xl p-6 flex-1 max-w-xs opacity-80 scale-95 transition-all duration-300 hidden md:flex flex-col justify-between min-h-[220px]`}>
          <div>
            <h2 className="font-display font-bold text-textMain text-lg leading-snug">{right.title}</h2>
            <p className="text-textMuted text-xs mt-1">by {right.author}</p>
            <div className="flex items-center gap-2 mt-2">
              <StarRating rating={right.rating} />
              <span className="text-xs text-textMuted">{right.votes} voters</span>
            </div>
            <p className="text-textMuted text-xs mt-3 line-clamp-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <button className="mt-4 border-2 border-primary text-primary rounded-full px-6 py-2 text-sm font-semibold hover:bg-primary hover:text-white transition-colors self-start">
            See The Book
          </button>
        </div>
      </div>

      {/* Arrows */}
      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-9 h-9 flex items-center justify-center hover:bg-primary hover:text-white transition-colors z-20">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-9 h-9 flex items-center justify-center hover:bg-primary hover:text-white transition-colors z-20">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}