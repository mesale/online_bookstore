import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axiosInstance";
<<<<<<< HEAD

export default function RegisterPage() {
  const navigate = useNavigate();

=======
import { useAuth } from "../../context/useAuth";
import Footer from "../../components/Footer";
import { FiAlertTriangle, FiCheck } from "react-icons/fi";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    setError("");
  };

  const validate = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = "Full name is required";
    if (!form.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Enter a valid email";
    if (!form.phone.trim()) errors.phone = "Phone number is required";
    if (!form.password) errors.password = "Password is required";
    else if (form.password.length < 8) errors.password = "Password must be at least 8 characters";
    if (!form.confirmPassword) errors.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword) errors.confirmPassword = "Passwords do not match";
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
      await api.post("/users/register", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      // Registration successful — redirect to login (Keycloak)
      navigate("/register-success");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Registration failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-surface flex">

      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#1A1A2E] to-[#2d1b3d] flex-col items-center justify-center px-12 relative overflow-hidden">
        {/* Glow effects */}
        <div className="absolute w-96 h-96 rounded-full bg-primary/10 -top-24 -right-24 blur-3xl" />
        <div className="absolute w-64 h-64 rounded-full bg-primary/10 -bottom-16 -left-16 blur-3xl" />

        {/* Logo */}
        <div className="relative z-10 text-center">
          <h1 className="font-display font-bold text-5xl text-white">
            read<span className="text-primary">books</span>
          </h1>
          <p className="text-white/50 mt-3 text-base max-w-xs leading-relaxed">
            Your marketplace for buying and selling books across Ethiopia
          </p>
        </div>

        {/* Decorative books */}
        <div className="relative z-10 flex gap-4 mt-14">
          {[
            { bg: "bg-primary", rotate: "-rotate-12" },
            { bg: "bg-amber-400", rotate: "rotate-2 -translate-y-3" },
            { bg: "bg-blue-500", rotate: "-rotate-6" },
            { bg: "bg-emerald-500", rotate: "rotate-6 -translate-y-2" },
          ].map((book, i) => (
            <div
              key={i}
              className={`w-14 h-20 rounded-lg opacity-75 ${book.bg} ${book.rotate} transform transition-transform`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="relative z-10 mt-14 grid grid-cols-2 gap-6 w-full max-w-xs">
          {[
            { value: "500+", label: "Registered Stores" },
            { value: "10K+", label: "Books Available" },
            { value: "50K+", label: "Happy Readers" },
            { value: "Free", label: "To Browse" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 rounded-2xl p-4 text-center">
              <p className="text-white font-bold text-xl">{stat.value}</p>
              <p className="text-white/40 text-xs mt-0.5">{stat.label}</p>
=======
    <div className="min-h-screen bg-background flex font-body-md antialiased pt-20 lg:pt-0">

      {/* Absolute Navbar for mobile */}
      <div className="lg:hidden fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-surface-variant px-8 h-20 flex items-center">
        <Link to="/" className="font-display font-bold text-2xl text-primary tracking-tight">
          The<span className="italic text-secondary font-medium ml-1">Inkwell.</span>
        </Link>
      </div>

      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-1 bg-surface-variant flex-col items-center justify-center px-12 relative overflow-hidden border-r border-surface-variant">
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

        {/* Logo */}
        <div className="relative z-10 text-center">
          <h1 className="font-display font-bold text-6xl text-primary tracking-tight">
            The<span className="italic text-secondary font-medium ml-2">Inkwell.</span>
          </h1>
          <p className="text-secondary mt-6 text-lg max-w-sm leading-relaxed mx-auto">
            Your literary marketplace for discovering rare and curated books across Ethiopia.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 mt-16 grid grid-cols-2 gap-8 w-full max-w-sm">
          {[
            { value: "500+", label: "Curated Collections" },
            { value: "10K+", label: "Archived Titles" },
            { value: "50K+", label: "Avid Readers" },
            { value: "Free", label: "Library Access" },
          ].map((stat) => (
            <div key={stat.label} className="bg-surface/50 border border-outline-variant/30 p-6 text-center shadow-elevation-1">
              <p className="text-primary font-bold display-sm">{stat.value}</p>
              <p className="text-secondary label-md uppercase tracking-wider mt-2">{stat.label}</p>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
<<<<<<< HEAD
      <div className="w-full lg:w-[520px] bg-white flex flex-col justify-center px-8 lg:px-14 py-12 overflow-y-auto">

        {/* Mobile logo */}
        <div className="lg:hidden mb-8 text-center">
          <Link to="/" className="font-display font-bold text-3xl text-textMain">
            read<span className="text-primary">books</span>
          </Link>
        </div>

        <h1 className="font-display font-bold text-3xl text-textMain">Create account</h1>
        <p className="text-textMuted text-sm mt-1 mb-8">
          Join thousands of readers across Ethiopia
=======
      <div className="w-full lg:w-[560px] xl:w-[640px] bg-background flex flex-col justify-center px-8 sm:px-16 py-12 overflow-y-auto">

        <h2 className="display-sm text-primary">Join the Archive</h2>
        <p className="text-secondary body-lg mt-2 mb-10 pb-8 border-b border-surface-variant">
          Establish your reader profile today.
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
        </p>

        {/* Global error */}
        {error && (
<<<<<<< HEAD
          <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-red-600 text-sm mb-6 flex items-center gap-2">
            <span>⚠</span>
=======
          <div className="bg-error/10 border border-error/20 p-4 text-error body-md mb-8 flex items-center gap-3">
            <span><FiAlertTriangle /></span>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
            <span>{error}</span>
          </div>
        )}

<<<<<<< HEAD
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-2">
=======
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Full Name */}
          <div>
            <label className="block label-md text-secondary uppercase tracking-wider mb-2">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
              Full Name
            </label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
<<<<<<< HEAD
              placeholder="Abebe Girma"
              className={`w-full px-4 py-3 rounded-xl border-2 text-sm bg-surface outline-none transition-colors ${
                fieldErrors.name
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-primary"
              }`}
            />
            {fieldErrors.name && (
              <p className="text-red-500 text-xs mt-1.5">{fieldErrors.name}</p>
=======
              placeholder="e.g. Abebe Girma"
              className={`w-full px-4 py-3 border text-primary body-md bg-surface outline-none transition-colors ${fieldErrors.name
                ? "border-error focus:border-error"
                : "border-outline-variant focus:border-primary"
                }`}
            />
            {fieldErrors.name && (
              <p className="text-error body-md mt-2">{fieldErrors.name}</p>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
            )}
          </div>

          {/* Email */}
          <div>
<<<<<<< HEAD
            <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-2">
=======
            <label className="block label-md text-secondary uppercase tracking-wider mb-2">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="abebe@email.com"
<<<<<<< HEAD
              className={`w-full px-4 py-3 rounded-xl border-2 text-sm bg-surface outline-none transition-colors ${
                fieldErrors.email
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-primary"
              }`}
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-xs mt-1.5">{fieldErrors.email}</p>
=======
              className={`w-full px-4 py-3 border text-primary body-md bg-surface outline-none transition-colors ${fieldErrors.email
                ? "border-error focus:border-error"
                : "border-outline-variant focus:border-primary"
                }`}
            />
            {fieldErrors.email && (
              <p className="text-error body-md mt-2">{fieldErrors.email}</p>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
            )}
          </div>

          {/* Phone */}
          <div>
<<<<<<< HEAD
            <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-2">
              Phone Number
            </label>
            <div className="flex gap-2">
              <div className="flex items-center bg-surface border-2 border-gray-200 rounded-xl px-3 text-sm text-textMuted font-medium whitespace-nowrap">
=======
            <label className="block label-md text-secondary uppercase tracking-wider mb-2">
              Phone Number
            </label>
            <div className="flex gap-2">
              <div className="flex items-center bg-surface border border-outline-variant px-4 body-md text-secondary font-medium whitespace-nowrap">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                🇪🇹 +251
              </div>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="912 345 678"
<<<<<<< HEAD
                className={`flex-1 px-4 py-3 rounded-xl border-2 text-sm bg-surface outline-none transition-colors ${
                  fieldErrors.phone
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-primary"
                }`}
              />
            </div>
            {fieldErrors.phone && (
              <p className="text-red-500 text-xs mt-1.5">{fieldErrors.phone}</p>
=======
                className={`flex-1 px-4 py-3 border text-primary body-md bg-surface outline-none transition-colors ${fieldErrors.phone
                  ? "border-error focus:border-error"
                  : "border-outline-variant focus:border-primary"
                  }`}
              />
            </div>
            {fieldErrors.phone && (
              <p className="text-error body-md mt-2">{fieldErrors.phone}</p>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
            )}
          </div>

          {/* Password */}
          <div>
<<<<<<< HEAD
            <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-2">
=======
            <label className="block label-md text-secondary uppercase tracking-wider mb-2">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
<<<<<<< HEAD
              className={`w-full px-4 py-3 rounded-xl border-2 text-sm bg-surface outline-none transition-colors ${
                fieldErrors.password
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-primary"
              }`}
            />
            {fieldErrors.password && (
              <p className="text-red-500 text-xs mt-1.5">{fieldErrors.password}</p>
            )}
            {/* Password strength indicator */}
            {form.password && (
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      form.password.length >= level * 3
                        ? level <= 1 ? "bg-red-400"
                          : level <= 2 ? "bg-yellow-400"
                          : level <= 3 ? "bg-blue-400"
                          : "bg-green-500"
                        : "bg-gray-200"
                    }`}
=======
              className={`w-full px-4 py-3 border text-primary body-md bg-surface outline-none transition-colors ${fieldErrors.password
                ? "border-error focus:border-error"
                : "border-outline-variant focus:border-primary"
                }`}
            />
            {fieldErrors.password && (
              <p className="text-error body-md mt-2">{fieldErrors.password}</p>
            )}
            {/* Password strength indicator */}
            {form.password && (
              <div className="flex gap-1 mt-3">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 transition-colors ${form.password.length >= level * 3
                      ? level <= 1 ? "bg-error"
                        : level <= 2 ? "bg-amber-400"
                          : level <= 3 ? "bg-blue-400"
                            : "bg-primary"
                      : "bg-surface-variant"
                      }`}
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                  />
                ))}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
<<<<<<< HEAD
            <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-2">
=======
            <label className="block label-md text-secondary uppercase tracking-wider mb-2">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
<<<<<<< HEAD
              className={`w-full px-4 py-3 rounded-xl border-2 text-sm bg-surface outline-none transition-colors ${
                fieldErrors.confirmPassword
                  ? "border-red-400 focus:border-red-500"
                  : form.confirmPassword && form.password === form.confirmPassword
                  ? "border-green-400"
                  : "border-gray-200 focus:border-primary"
              }`}
            />
            {fieldErrors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1.5">{fieldErrors.confirmPassword}</p>
            )}
            {form.confirmPassword && form.password === form.confirmPassword && (
              <p className="text-green-500 text-xs mt-1.5">✓ Passwords match</p>
=======
              className={`w-full px-4 py-3 border text-primary body-md bg-surface outline-none transition-colors ${fieldErrors.confirmPassword
                ? "border-error focus:border-error"
                : form.confirmPassword && form.password === form.confirmPassword
                  ? "border-primary"
                  : "border-outline-variant focus:border-primary"
                }`}
            />
            {fieldErrors.confirmPassword && (
              <p className="text-error body-md mt-2">{fieldErrors.confirmPassword}</p>
            )}
            {form.confirmPassword && form.password === form.confirmPassword && (
              <p className="text-primary body-md mt-2 flex items-center gap-2"><FiCheck /> Signatures match</p>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
<<<<<<< HEAD
            className="w-full bg-primary text-white rounded-full py-3.5 font-semibold text-sm hover:bg-red-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating account...
=======
            className="w-full btn-primary py-4 label-md disabled:opacity-60 flex items-center justify-center gap-3 mt-6"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Registering...
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
              </>
            ) : (
              "Create Account"
            )}
          </button>

        </form>

        {/* Login link */}
<<<<<<< HEAD
        <p className="text-center text-sm text-textMuted mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-primary font-semibold hover:underline"
=======
        <p className="text-center body-md text-secondary mt-10 pt-8 border-t border-surface-variant">
          Already cataloged in the system?{" "}
          <button
            onClick={() => { login(); navigate("/"); }}
            className="text-primary font-bold hover:underline label-md"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
          >
            Sign in
          </button>
        </p>

      </div>
    </div>
  );
}