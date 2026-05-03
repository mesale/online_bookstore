import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/axiosInstance";
import { unwrapItem } from "../../utils/apiHelpers";

// ─── Stage 1: Enter business email ───────────────────────────────────────────
function InitiateStage({ onNext }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return setError("Business email is required");
    setLoading(true);
    setError("");
    try {
      await api.post("/users/me/store-application/initiate", {
        businessEmail: email,
      });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send email. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="font-display font-bold text-2xl text-textMain mb-2">Check your email</h2>
        <p className="text-textMuted text-sm leading-relaxed max-w-sm mx-auto">
          We sent a registration link to <span className="font-semibold text-textMain">{email}</span>.
          Click the link in the email to continue your application.
        </p>
        <p className="text-xs text-textMuted mt-4">
          Didn't receive it?{" "}
          <button
            onClick={() => setSent(false)}
            className="text-primary font-semibold hover:underline"
          >
            Try again
          </button>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display font-bold text-2xl text-textMain mb-2">
        Start your application
      </h2>
      <p className="text-textMuted text-sm mb-8 leading-relaxed">
        Enter your business email address. We'll send you a secure link to fill out your store application.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-2">
            Business Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            placeholder="store@business.com"
            className={`w-full px-4 py-3 rounded-xl border-2 text-sm bg-surface outline-none transition-colors ${
              error ? "border-red-400" : "border-gray-200 focus:border-primary"
            }`}
          />
          {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
        </div>

        <div className="bg-highlight border-2 border-amber-200 rounded-xl p-4 text-xs text-textMuted leading-relaxed">
          <p className="font-semibold text-textMain mb-1">📧 What happens next?</p>
          A secure link will be sent to this email. The link contains a token that lets you fill out your store registration form. It expires after 24 hours.
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white rounded-full py-3.5 font-semibold text-sm hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending link...
            </>
          ) : "Send Registration Link →"}
        </button>
      </form>
    </div>
  );
}

// ─── Stage 2: Fill out application form (token from URL) ─────────────────────
function ApplicationFormStage({ token }) {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [validating, setValidating] = useState(true);
  const [tokenError, setTokenError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    businessEmail: "",
    storeName: "",
    phone: "",
    address: "",
    city: "",
    description: "",
  });

  // Validate token on mount
  useEffect(() => {
    api.get(`/users/me/store-application/validate-token?token=${token}`)
      .then((res) => {
        const data = unwrapItem(res);
        // Pre-fill email if returned
        if (data?.businessEmail) {
          setForm((prev) => ({ ...prev, businessEmail: data.businessEmail }));
        }
        setValidated(true);
      })
      .catch(() => {
        setTokenError("This link is invalid or has expired. Please request a new one.");
      })
      .finally(() => setValidating(false));
  }, [token]);

  const validate = () => {
    const errors = {};
    if (!form.storeName.trim())    errors.storeName = "Store name is required";
    if (!form.phone.trim())        errors.phone     = "Phone is required";
    if (!form.address.trim())      errors.address   = "Address is required";
    if (!form.city.trim())         errors.city      = "City is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setLoading(true);
    setError("");
    try {
      await api.post("/users/me/store-application/submit", {
        ...form,
        token,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: "" }));
  };

  if (validating) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-textMuted">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm">Validating your link...</p>
      </div>
    );
  }

  if (tokenError) {
    return (
      <div className="text-center py-8">
        <p className="text-5xl mb-4">🔗</p>
        <h2 className="font-display font-bold text-xl text-textMain mb-2">Link Expired</h2>
        <p className="text-textMuted text-sm mb-6">{tokenError}</p>
        <button
          onClick={() => navigate("/store/apply")}
          className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors"
        >
          Request New Link
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-display font-bold text-2xl text-textMain mb-2">Application Submitted!</h2>
        <p className="text-textMuted text-sm leading-relaxed max-w-sm mx-auto mb-6">
          Your store application has been submitted. Check your business email for a link to complete your store profile with business documents.
        </p>
        <button
          onClick={() => navigate("/")}
          className="border-2 border-primary text-primary px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary hover:text-white transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display font-bold text-2xl text-textMain mb-2">Store Application</h2>
      <p className="text-textMuted text-sm mb-8">
        Fill out your store information below.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm mb-5 flex gap-2">
          <span>⚠</span> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Business Email (read-only if pre-filled) */}
        <div>
          <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-2">
            Business Email
          </label>
          <input
            type="email"
            value={form.businessEmail}
            onChange={(e) => setField("businessEmail", e.target.value)}
            placeholder="store@business.com"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary text-sm bg-surface outline-none transition-colors"
          />
        </div>

        {/* Store Name */}
        <div>
          <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-2">
            Store / Business Name
          </label>
          <input
            type="text"
            value={form.storeName}
            onChange={(e) => setField("storeName", e.target.value)}
            placeholder="e.g. Addis Book Centre"
            className={`w-full px-4 py-3 rounded-xl border-2 text-sm bg-surface outline-none transition-colors ${
              fieldErrors.storeName ? "border-red-400" : "border-gray-200 focus:border-primary"
            }`}
          />
          {fieldErrors.storeName && <p className="text-red-500 text-xs mt-1">{fieldErrors.storeName}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-2">
            Store Phone Number
          </label>
          <div className="flex gap-2">
            <div className="flex items-center bg-surface border-2 border-gray-200 rounded-xl px-3 text-sm text-textMuted font-medium whitespace-nowrap">
              🇪🇹 +251
            </div>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              placeholder="912 345 678"
              className={`flex-1 px-4 py-3 rounded-xl border-2 text-sm bg-surface outline-none transition-colors ${
                fieldErrors.phone ? "border-red-400" : "border-gray-200 focus:border-primary"
              }`}
            />
          </div>
          {fieldErrors.phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-2">
            City / Woreda
          </label>
          <input
            type="text"
            value={form.city}
            onChange={(e) => setField("city", e.target.value)}
            placeholder="e.g. Bole, Kirkos"
            className={`w-full px-4 py-3 rounded-xl border-2 text-sm bg-surface outline-none transition-colors ${
              fieldErrors.city ? "border-red-400" : "border-gray-200 focus:border-primary"
            }`}
          />
          {fieldErrors.city && <p className="text-red-500 text-xs mt-1">{fieldErrors.city}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-2">
            Store Address
          </label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => setField("address", e.target.value)}
            placeholder="Street, building, landmark..."
            className={`w-full px-4 py-3 rounded-xl border-2 text-sm bg-surface outline-none transition-colors ${
              fieldErrors.address ? "border-red-400" : "border-gray-200 focus:border-primary"
            }`}
          />
          {fieldErrors.address && <p className="text-red-500 text-xs mt-1">{fieldErrors.address}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-2">
            Store Description <span className="text-textMuted normal-case font-normal">(optional)</span>
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            rows={3}
            placeholder="Brief description of your bookstore..."
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary text-sm bg-surface outline-none transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white rounded-full py-3.5 font-semibold text-sm hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </>
          ) : "Submit Application →"}
        </button>
      </form>
    </div>
  );
}

// ─── Main page — decides which stage to show ──────────────────────────────────
export default function StoreApplyPage() {
  const [searchParams] = useSearchParams();
  const applicationToken = searchParams.get("token");

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Left panel — same as before */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#1A1A2E] to-[#2d1b3d] flex-col items-center justify-center px-12 relative overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full bg-primary/10 -top-24 -right-24 blur-3xl" />
        <div className="relative z-10 text-center mb-10">
          <h1 className="font-display font-bold text-5xl text-white">
            read<span className="text-primary">books</span>
          </h1>
          <p className="text-white/50 mt-3 text-base max-w-xs leading-relaxed">
            Join hundreds of bookstores selling to readers across Ethiopia
          </p>
        </div>
        <div className="relative z-10 flex flex-col gap-4 w-full max-w-xs">
          {[
            { label: "Enter business email",       done: !!applicationToken },
            { label: "Fill out application form",  done: false, active: !!applicationToken },
            { label: "Complete store profile",      done: false },
            { label: "Admin review & approval",     done: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                item.done ? "bg-green-500 text-white"
                : item.active ? "bg-primary text-white"
                : "bg-white/10 text-white/60"
              }`}>
                {item.done ? "✓" : i + 1}
              </div>
              <p className={`text-sm ${item.done || item.active ? "text-white" : "text-white/40"}`}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-[560px] bg-white flex flex-col justify-center px-8 lg:px-12 py-12 overflow-y-auto">
        <div className="lg:hidden mb-8">
          <span className="font-display font-bold text-2xl text-textMain">
            read<span className="text-primary">books</span>
          </span>
        </div>
        {applicationToken ? (
          <ApplicationFormStage token={applicationToken} />
        ) : (
          <InitiateStage />
        )}
      </div>
    </div>
  );
}