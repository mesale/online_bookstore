import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function RegisterSuccessPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-sm p-10 max-w-md w-full text-center">

        {/* Success icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-display font-bold text-2xl text-textMain mb-2">
          Account Created!
        </h1>
        <p className="text-textMuted text-sm leading-relaxed mb-8">
          Your readbooks account has been created successfully.
          Sign in now to start browsing and buying books.
        </p>

        <button
          onClick={login}
          className="w-full bg-primary text-white rounded-full py-3.5 font-semibold text-sm hover:bg-red-600 transition-colors mb-3"
        >
          Sign In Now
        </button>

        <button
          onClick={() => navigate("/")}
          className="w-full border-2 border-gray-200 text-textMuted rounded-full py-3.5 font-semibold text-sm hover:border-primary hover:text-primary transition-colors"
        >
          Browse Books First
        </button>

      </div>
    </div>
  );
}