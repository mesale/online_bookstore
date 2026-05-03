import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axiosInstance";

export default function RegisterPage() {
  const navigate = useNavigate();

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
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
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
        </p>

        {/* Global error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-red-600 text-sm mb-6 flex items-center gap-2">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-2">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Abebe Girma"
              className={`w-full px-4 py-3 rounded-xl border-2 text-sm bg-surface outline-none transition-colors ${
                fieldErrors.name
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-primary"
              }`}
            />
            {fieldErrors.name && (
              <p className="text-red-500 text-xs mt-1.5">{fieldErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-2">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="abebe@email.com"
              className={`w-full px-4 py-3 rounded-xl border-2 text-sm bg-surface outline-none transition-colors ${
                fieldErrors.email
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-primary"
              }`}
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-xs mt-1.5">{fieldErrors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-2">
              Phone Number
            </label>
            <div className="flex gap-2">
              <div className="flex items-center bg-surface border-2 border-gray-200 rounded-xl px-3 text-sm text-textMuted font-medium whitespace-nowrap">
                🇪🇹 +251
              </div>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="912 345 678"
                className={`flex-1 px-4 py-3 rounded-xl border-2 text-sm bg-surface outline-none transition-colors ${
                  fieldErrors.phone
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-primary"
                }`}
              />
            </div>
            {fieldErrors.phone && (
              <p className="text-red-500 text-xs mt-1.5">{fieldErrors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
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
                  />
                ))}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-2">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
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
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white rounded-full py-3.5 font-semibold text-sm hover:bg-red-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>

        </form>

        {/* Login link */}
        <p className="text-center text-sm text-textMuted mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-primary font-semibold hover:underline"
          >
            Sign in
          </button>
        </p>

      </div>
    </div>
  );
}