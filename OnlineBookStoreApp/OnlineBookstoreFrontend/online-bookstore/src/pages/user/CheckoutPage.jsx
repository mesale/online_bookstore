import { useCallback, useEffect, useState } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/useAuth";
import api from "../../api/axiosInstance";
import { unwrapItem } from "../../utils/apiHelpers";
<<<<<<< HEAD
=======
import {getBookImageUrl} from "../../utils/book.js";
import { FiCheck, FiAlertTriangle, FiShoppingCart, FiLock, FiCheckCircle } from "react-icons/fi";
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)

const STEPS = ["Delivery", "Review", "Payment"];
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function PaymentSuccess({ order, navigate }) {
  return (
    <div className="flex flex-col items-center text-center py-10">
<<<<<<< HEAD
      <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl mb-5">
        ✓
      </div>
      <h2 className="font-display font-bold text-textMain text-xl mb-2">
        Payment Complete
      </h2>
      <p className="text-textMuted text-sm mb-6">
=======
      <div className="w-16 h-16 rounded-lg bg-green-100 text-primary flex items-center justify-center text-3xl mb-5">
        <FiCheck />
      </div>
      <h2 className="font-display font-bold text-on-surface text-xl mb-2">
        Payment Complete
      </h2>
      <p className="text-on-surface-variant text-sm mb-6">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
        Your order #{order?.id?.slice(0, 8)} has been confirmed.
      </p>
      <button
        onClick={() => navigate("/dashboard")}
<<<<<<< HEAD
        className="bg-primary text-white rounded-full px-6 py-3 font-semibold text-sm hover:bg-red-600 transition-colors"
=======
        className="bg-primary text-white rounded-lg px-6 py-3 font-semibold text-sm hover:bg-primary-container transition-colors"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
      >
        Go to Dashboard
      </button>
    </div>
  );
}

function StripePaymentForm({ amount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState("");

<<<<<<< HEAD
=======

>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setSubmitting(true);
    setPaymentError("");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard`,
      },
      redirect: "if_required",
    });

    if (error) {
      setPaymentError(error.message || "Payment failed. Please try again.");
    } else {
      onSuccess();
    }

    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {amount && (
<<<<<<< HEAD
        <p className="text-sm font-semibold text-textMain">
=======
        <p className="text-sm font-semibold text-on-surface">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
          Amount: ETB {amount}
        </p>
      )}

      <PaymentElement />

      {paymentError && (
<<<<<<< HEAD
        <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-red-600 text-sm flex gap-2">
          <span>⚠</span> {paymentError}
=======
        <div className="bg-surface-variant border border-outline-variant rounded-lg px-4 py-3 text-on-surface text-sm flex gap-2">
          <span><FiAlertTriangle /></span> {paymentError}
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || submitting}
<<<<<<< HEAD
        className="w-full bg-primary text-white rounded-full py-3.5 font-semibold text-sm hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
=======
        className="w-full bg-primary text-white rounded-lg py-3.5 font-semibold text-sm hover:bg-primary-container transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-lg animate-spin" />
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
            Processing payment...
          </>
        ) : "Pay Now"}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const { state } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const book = state?.book;
<<<<<<< HEAD

=======
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState(null);
  const [paymentDone, setPaymentDone] = useState(false);

  const [address, setAddress] = useState({
    fullName: user?.name || "",
    phone: "",
    region: "",
    city: "",
    specificAddress: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const handleInitiatePayment = useCallback(async (orderId) => {
    try {
      const paymentRes = await api.post(`/payments/checkout/${orderId}`);
      const data = paymentRes.data?.data;
      setClientSecret(data.stripeClientSecret);
      setAmount(data.amount);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to initiate payment.");
    }
  }, []);

  useEffect(() => {
    if (step === 2 && order?.id && !clientSecret) {
      const timer = window.setTimeout(() => {
        handleInitiatePayment(order.id);
      }, 0);

      return () => window.clearTimeout(timer);
    }
  }, [step, order, clientSecret, handleInitiatePayment]);

  // Redirect if no book in state
  if (!book) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-4">
<<<<<<< HEAD
        <p className="text-5xl">🛒</p>
        <p className="font-display font-bold text-xl text-textMain">No book selected</p>
        <button
          onClick={() => navigate("/")}
          className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors"
=======
        <p className="text-5xl flex justify-center"><FiShoppingCart /></p>
        <p className="font-display font-bold text-xl text-on-surface">No book selected</p>
        <button
          onClick={() => navigate("/")}
          className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-container transition-colors"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
        >
          Browse Books
        </button>
      </div>
    );
  }

  const validateAddress = () => {
    const errors = {};
    if (!address.fullName.trim()) errors.fullName = "Full name is required";
    if (!address.phone.trim()) errors.phone = "Phone number is required";
    if (!address.region.trim()) errors.region = "Region is required";
    if (!address.city.trim()) errors.city = "City is required";
    if (!address.specificAddress.trim()) errors.specificAddress = "Address is required";
    return errors;
  };

  const handleAddressNext = () => {
    const errors = validateAddress();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setStep(1);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError("");
    try {
      const orderRes = await api.post("/orders", {
        branchId: book.branchId,
        storeId: book.storeId,
        shippingAddress: `${address.specificAddress}, ${address.city}, ${address.region}`,
        items: [{ bookId: book.id, quantity: 1, price: book.price }],
      });
      const createdOrder = unwrapItem(orderRes);
<<<<<<< HEAD
=======

>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
      setOrder(createdOrder);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create order.");
    } finally {
      setLoading(false);
    }
  };
<<<<<<< HEAD

=======
  const imageUrl = getBookImageUrl(book);
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-10">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
<<<<<<< HEAD
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${i < step ? "bg-green-500 text-white"
                    : i === step ? "bg-primary text-white"
                      : "bg-gray-100 text-textMuted"
                  }`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span className={`text-xs font-medium ${i === step ? "text-primary" : "text-textMuted"
=======
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${i < step ? "bg-primary text-white"
                    : i === step ? "bg-primary text-white"
                      : "bg-gray-100 text-on-surface-variant"
                  }`}>
                  {i < step ? <FiCheck /> : i + 1}
                </div>
                <span className={`text-xs font-medium ${i === step ? "text-primary" : "text-on-surface-variant"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                  }`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
<<<<<<< HEAD
                <div className={`w-16 sm:w-24 h-0.5 mx-2 mb-4 transition-colors ${i < step ? "bg-green-500" : "bg-gray-200"
=======
                <div className={`w-16 sm:w-24 h-0.5 mx-2 mb-4 transition-colors ${i < step ? "bg-primary" : "bg-gray-200"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                  }`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT — Step Content */}
          <div className="lg:col-span-2">

            {/* STEP 0 — Delivery Address */}
            {step === 0 && (
<<<<<<< HEAD
              <div className="bg-card rounded-3xl shadow-sm p-6">
                <h2 className="font-display font-bold text-textMain text-xl mb-6">
=======
              <div className="bg-white rounded-lg shadow-elevation-1 p-6">
                <h2 className="font-display font-bold text-on-surface text-xl mb-6">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                  Delivery Address
                </h2>

                <div className="flex flex-col gap-4">

                  {/* Full Name */}
                  <div>
<<<<<<< HEAD
                    <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-2">
=======
                    <label className="block text-xs font-semibold text-on-surface uppercase tracking-wide mb-2">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
<<<<<<< HEAD
                      className={`w-full px-4 py-3 rounded-xl border-2 text-sm bg-surface outline-none transition-colors ${fieldErrors.fullName ? "border-red-400" : "border-gray-200 focus:border-primary"
                        }`}
                      placeholder="Abebe Girma"
                    />
                    {fieldErrors.fullName && <p className="text-red-500 text-xs mt-1">{fieldErrors.fullName}</p>}
=======
                      className={`w-full px-4 py-3 rounded-md border-2 text-sm bg-surface outline-none transition-colors ${fieldErrors.fullName ? "border-error" : "border-outline-variant focus:border-primary"
                        }`}
                      placeholder="Abebe Girma"
                    />
                    {fieldErrors.fullName && <p className="text-error text-xs mt-1">{fieldErrors.fullName}</p>}
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
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
                    <label className="block text-xs font-semibold text-on-surface uppercase tracking-wide mb-2">
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      <div className="flex items-center bg-surface border-2 border-outline-variant rounded-md px-3 text-sm text-on-surface-variant font-medium whitespace-nowrap">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                        🇪🇹 +251
                      </div>
                      <input
                        type="tel"
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
<<<<<<< HEAD
                        className={`flex-1 px-4 py-3 rounded-xl border-2 text-sm bg-surface outline-none transition-colors ${fieldErrors.phone ? "border-red-400" : "border-gray-200 focus:border-primary"
=======
                        className={`flex-1 px-4 py-3 rounded-md border-2 text-sm bg-surface outline-none transition-colors ${fieldErrors.phone ? "border-error" : "border-outline-variant focus:border-primary"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                          }`}
                        placeholder="912 345 678"
                      />
                    </div>
<<<<<<< HEAD
                    {fieldErrors.phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
=======
                    {fieldErrors.phone && <p className="text-error text-xs mt-1">{fieldErrors.phone}</p>}
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                  </div>

                  {/* Region */}
                  <div>
<<<<<<< HEAD
                    <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-2">
=======
                    <label className="block text-xs font-semibold text-on-surface uppercase tracking-wide mb-2">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                      Region / Kilil
                    </label>
                    <select
                      value={address.region}
                      onChange={(e) => setAddress({ ...address, region: e.target.value })}
<<<<<<< HEAD
                      className={`w-full px-4 py-3 rounded-xl border-2 text-sm bg-surface outline-none transition-colors ${fieldErrors.region ? "border-red-400" : "border-gray-200 focus:border-primary"
=======
                      className={`w-full px-4 py-3 rounded-md border-2 text-sm bg-surface outline-none transition-colors ${fieldErrors.region ? "border-error" : "border-outline-variant focus:border-primary"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                        }`}
                    >
                      <option value="">Select region...</option>
                      {[
                        "Addis Ababa", "Oromia", "Amhara", "Tigray",
                        "SNNPR", "Somali", "Afar", "Benishangul-Gumuz",
                        "Gambela", "Harari", "Dire Dawa",
                      ].map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
<<<<<<< HEAD
                    {fieldErrors.region && <p className="text-red-500 text-xs mt-1">{fieldErrors.region}</p>}
=======
                    {fieldErrors.region && <p className="text-error text-xs mt-1">{fieldErrors.region}</p>}
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                  </div>

                  {/* City */}
                  <div>
<<<<<<< HEAD
                    <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-2">
=======
                    <label className="block text-xs font-semibold text-on-surface uppercase tracking-wide mb-2">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                      City / Woreda
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
<<<<<<< HEAD
                      className={`w-full px-4 py-3 rounded-xl border-2 text-sm bg-surface outline-none transition-colors ${fieldErrors.city ? "border-red-400" : "border-gray-200 focus:border-primary"
                        }`}
                      placeholder="e.g. Bole, Kirkos"
                    />
                    {fieldErrors.city && <p className="text-red-500 text-xs mt-1">{fieldErrors.city}</p>}
=======
                      className={`w-full px-4 py-3 rounded-md border-2 text-sm bg-surface outline-none transition-colors ${fieldErrors.city ? "border-error" : "border-outline-variant focus:border-primary"
                        }`}
                      placeholder="e.g. Bole, Kirkos"
                    />
                    {fieldErrors.city && <p className="text-error text-xs mt-1">{fieldErrors.city}</p>}
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                  </div>

                  {/* Specific Address */}
                  <div>
<<<<<<< HEAD
                    <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-2">
=======
                    <label className="block text-xs font-semibold text-on-surface uppercase tracking-wide mb-2">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                      Specific Address
                    </label>
                    <textarea
                      value={address.specificAddress}
                      onChange={(e) => setAddress({ ...address, specificAddress: e.target.value })}
                      rows={3}
<<<<<<< HEAD
                      className={`w-full px-4 py-3 rounded-xl border-2 text-sm bg-surface outline-none transition-colors resize-none ${fieldErrors.specificAddress ? "border-red-400" : "border-gray-200 focus:border-primary"
                        }`}
                      placeholder="Street name, building, landmark..."
                    />
                    {fieldErrors.specificAddress && <p className="text-red-500 text-xs mt-1">{fieldErrors.specificAddress}</p>}
=======
                      className={`w-full px-4 py-3 rounded-md border-2 text-sm bg-surface outline-none transition-colors resize-none ${fieldErrors.specificAddress ? "border-error" : "border-outline-variant focus:border-primary"
                        }`}
                      placeholder="Street name, building, landmark..."
                    />
                    {fieldErrors.specificAddress && <p className="text-error text-xs mt-1">{fieldErrors.specificAddress}</p>}
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                  </div>

                  <button
                    onClick={handleAddressNext}
<<<<<<< HEAD
                    className="w-full bg-primary text-white rounded-full py-3.5 font-semibold text-sm hover:bg-red-600 transition-colors mt-2"
=======
                    className="w-full bg-primary text-white rounded-lg py-3.5 font-semibold text-sm hover:bg-primary-container transition-colors mt-2"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                  >
                    Continue to Review →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 1 — Review Order */}
            {step === 1 && (
<<<<<<< HEAD
              <div className="bg-card rounded-3xl shadow-sm p-6">
                <h2 className="font-display font-bold text-textMain text-xl mb-6">
=======
              <div className="bg-white rounded-lg shadow-elevation-1 p-6">
                <h2 className="font-display font-bold text-on-surface text-xl mb-6">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                  Review Your Order
                </h2>

                {/* Book */}
<<<<<<< HEAD
                <div className="flex gap-4 p-4 bg-surface rounded-2xl mb-6">
                  <img
                    src={book.documentResponses?.[0]?.url || "https://placehold.co/64x88?text=📖"}
                    alt={book.title}
                    className="w-16 h-22 object-cover rounded-xl flex-shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-textMain text-sm">{book.title}</p>
                    <p className="text-textMuted text-xs mt-0.5">by {book.author}</p>
                    <p className="text-xs mt-1">
                      <span className={`px-2 py-0.5 rounded-full font-medium ${book.condition === "NEW"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
=======
                <div className="flex gap-4 p-4 bg-surface rounded-lg mb-6">
                  <img
                    src={imageUrl || "https://placehold.co/64x88?text=Book"}
                    alt={book.title}
                    className="w-16 h-22 object-cover rounded-md flex-shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-on-surface text-sm">{book.title}</p>
                    <p className="text-on-surface-variant text-xs mt-0.5">by {book.author}</p>
                    <p className="text-xs mt-1">
                      <span className={`px-2 py-0.5 rounded-lg font-medium ${book.condition === "NEW"
                          ? "bg-green-100 text-green-700"
                          : "bg-surface-variant text-on-surface-variant"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                        }`}>
                        {book.condition}
                      </span>
                    </p>
                    <p className="text-primary font-bold text-base mt-2">ETB {book.price}</p>
                  </div>
                </div>

                {/* Delivery Address Summary */}
<<<<<<< HEAD
                <div className="border-2 border-gray-100 rounded-2xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-textMuted uppercase tracking-wide">
=======
                <div className="border-2 border-gray-100 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                      Delivery To
                    </p>
                    <button
                      onClick={() => setStep(0)}
                      className="text-xs text-primary font-semibold hover:underline"
                    >
                      Edit
                    </button>
                  </div>
<<<<<<< HEAD
                  <p className="text-sm font-semibold text-textMain">{address.fullName}</p>
                  <p className="text-sm text-textMuted mt-0.5">+251 {address.phone}</p>
                  <p className="text-sm text-textMuted mt-0.5">
=======
                  <p className="text-sm font-semibold text-on-surface">{address.fullName}</p>
                  <p className="text-sm text-on-surface-variant mt-0.5">+251 {address.phone}</p>
                  <p className="text-sm text-on-surface-variant mt-0.5">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                    {address.specificAddress}, {address.city}, {address.region}
                  </p>
                </div>

                {/* PIN notice */}
<<<<<<< HEAD
                <div className="bg-highlight border-2 border-amber-200 rounded-2xl p-4 mb-6 flex gap-3">
                  <span className="text-xl">🔐</span>
                  <div>
                    <p className="text-sm font-semibold text-textMain">How delivery confirmation works</p>
                    <p className="text-xs text-textMuted mt-1 leading-relaxed">
=======
                <div className="bg-surface-variant border-2 border-amber-200 rounded-lg p-4 mb-6 flex gap-3">
                  <span className="text-xl"><FiLock /></span>
                  <div>
                    <p className="text-sm font-semibold text-on-surface">How delivery confirmation works</p>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                      After your order is shipped, you'll receive a unique PIN code in your dashboard. Share it with the delivery person when your book arrives — this confirms delivery and releases payment to the store.
                    </p>
                  </div>
                </div>

                {error && (
<<<<<<< HEAD
                  <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-red-600 text-sm mb-4 flex gap-2">
                    <span>⚠</span> {error}
=======
                  <div className="bg-surface-variant border border-outline-variant rounded-lg px-4 py-3 text-on-surface text-sm mb-4 flex gap-2">
                    <span><FiAlertTriangle /></span> {error}
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                  </div>
                )}

                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
<<<<<<< HEAD
                  className="w-full bg-primary text-white rounded-full py-3.5 font-semibold text-sm hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
=======
                  className="w-full bg-primary text-white rounded-lg py-3.5 font-semibold text-sm hover:bg-primary-container transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-lg animate-spin" />
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                      Creating order...
                    </>
                  ) : "Place Order →"}
                </button>
              </div>
            )}

            {/* STEP 2 — Payment */}
            {step === 2 && (
<<<<<<< HEAD
              <div className="bg-card rounded-3xl shadow-sm p-6">
=======
              <div className="bg-white rounded-lg shadow-elevation-1 p-6">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                {paymentDone ? (
                  <PaymentSuccess order={order} navigate={navigate} />
                ) : clientSecret ? (
                  <>
<<<<<<< HEAD
                    <h2 className="font-display font-bold text-textMain text-xl mb-2">
                      Complete Payment
                    </h2>
                    <p className="text-textMuted text-sm mb-6">
                      Your order has been created. Complete payment to confirm.
                    </p>

                    <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 mb-6 flex gap-3">
                      <span className="text-xl">✅</span>
                      <div>
                        <p className="text-sm font-semibold text-green-700">Order Created Successfully</p>
                        <p className="text-xs text-green-600 mt-0.5 font-mono">
=======
                    <h2 className="font-display font-bold text-on-surface text-xl mb-2">
                      Complete Payment
                    </h2>
                    <p className="text-on-surface-variant text-sm mb-6">
                      Your order has been created. Complete payment to confirm.
                    </p>

                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6 flex gap-3">
                      <span className="text-xl"><FiCheckCircle /></span>
                      <div>
                        <p className="text-sm font-semibold text-green-700">Order Created Successfully</p>
                        <p className="text-xs text-primary mt-0.5 font-mono">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                          Order #{order?.id?.slice(0, 8)}...
                        </p>
                      </div>
                    </div>

                    <Elements
                      stripe={stripePromise}
                      options={{
                        clientSecret,
                        appearance: {
                          theme: "stripe",
                          variables: {
                            colorPrimary: "#E63946",
                            borderRadius: "12px",
                            fontFamily: "DM Sans, sans-serif",
                          },
                        },
                      }}
                    >
                      <StripePaymentForm
                        order={order}
                        amount={amount}
                        onSuccess={() => setPaymentDone(true)}
                      />
                    </Elements>

                    <button
                      onClick={() => navigate("/dashboard")}
<<<<<<< HEAD
                      className="w-full text-textMuted text-sm mt-3 hover:text-primary transition-colors py-2"
=======
                      className="w-full text-on-surface-variant text-sm mt-3 hover:text-primary transition-colors py-2"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                    >
                      Pay later from my dashboard
                    </button>
                  </>
                ) : (
                  /* Waiting for clientSecret */
<<<<<<< HEAD
                  <div className="flex flex-col items-center justify-center py-16 gap-4 text-textMuted">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm font-medium">Setting up payment...</p>
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-red-600 text-sm flex gap-2">
                        <span>⚠</span> {error}
=======
                  <div className="flex flex-col items-center justify-center py-16 gap-4 text-on-surface-variant">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-lg animate-spin" />
                    <p className="text-sm font-medium">Setting up payment...</p>
                    {error && (
                      <div className="bg-surface-variant border border-outline-variant rounded-lg px-4 py-3 text-on-surface text-sm flex gap-2">
                        <span><FiAlertTriangle /></span> {error}
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT — Order Summary */}
          <div className="lg:col-span-1">
<<<<<<< HEAD
            <div className="bg-card rounded-3xl shadow-sm p-5 sticky top-20">
              <h3 className="font-display font-bold text-textMain text-base mb-4">
=======
            <div className="bg-white rounded-lg shadow-elevation-1 p-5 sticky top-20">
              <h3 className="font-display font-bold text-on-surface text-base mb-4">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                Order Summary
              </h3>

              {/* Book thumbnail */}
              <div className="flex gap-3 mb-5 pb-5 border-b border-gray-100">
                <img
<<<<<<< HEAD
                  src={book.documentResponses?.[0]?.url || "https://placehold.co/48x64?text=📖"}
=======
                  src={imageUrl || "https://placehold.co/48x64?text=Book"}
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                  alt={book.title}
                  className="w-12 h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div className="min-w-0">
<<<<<<< HEAD
                  <p className="text-sm font-semibold text-textMain line-clamp-2 leading-snug">
                    {book.title}
                  </p>
                  <p className="text-xs text-textMuted mt-0.5">by {book.author}</p>
=======
                  <p className="text-sm font-semibold text-on-surface line-clamp-2 leading-snug">
                    {book.title}
                  </p>
                  <p className="text-xs text-on-surface-variant mt-0.5">by {book.author}</p>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                </div>
              </div>

              {/* Price breakdown */}
              <div className="flex flex-col gap-2.5 text-sm mb-5 pb-5 border-b border-gray-100">
                <div className="flex justify-between">
<<<<<<< HEAD
                  <span className="text-textMuted">Book price</span>
                  <span className="font-medium text-textMain">ETB {book.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textMuted">Delivery</span>
                  <span className="font-medium text-green-600">Free</span>
=======
                  <span className="text-on-surface-variant">Book price</span>
                  <span className="font-medium text-on-surface">ETB {book.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Delivery</span>
                  <span className="font-medium text-primary">Free</span>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                </div>
              </div>

              <div className="flex justify-between items-center">
<<<<<<< HEAD
                <span className="font-bold text-textMain">Total</span>
=======
                <span className="font-bold text-on-surface">Total</span>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                <span className="font-bold text-primary text-xl">ETB {book.price}</span>
              </div>

              {/* Security badge */}
<<<<<<< HEAD
              <div className="mt-5 flex items-center gap-2 text-xs text-textMuted bg-surface rounded-xl p-3">
                <span>🔒</span>
=======
              <div className="mt-5 flex items-center gap-2 text-xs text-on-surface-variant bg-surface rounded-md p-3">
                <span><FiLock /></span>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                <span>Secured by Stripe. Funds held in escrow until delivery.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
