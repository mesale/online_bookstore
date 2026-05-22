import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/useAuth";
import api from "../../api/axiosInstance";
import { unwrapList, unwrapItem } from "../../utils/apiHelpers";
<<<<<<< HEAD

const STATUS_COLORS = {
  PENDING:   { bg: "bg-yellow-100", text: "text-yellow-700" },
  PAID:      { bg: "bg-blue-100",   text: "text-blue-700"   },
  SHIPPED:   { bg: "bg-purple-100", text: "text-purple-700" },
  DELIVERED: { bg: "bg-green-100",  text: "text-green-700"  },
  CANCELLED: { bg: "bg-red-100",    text: "text-red-600"    },
=======
import { getBookImageUrl } from "../../utils/book";
import { FiBox, FiCheck, FiBook, FiPhone, FiMail, FiCheckCircle, FiTruck, FiDollarSign, FiAlertTriangle, FiInbox, FiHome } from "react-icons/fi";

const STATUS_COLORS = {
  PENDING:   { bg: "bg-surface-variant", text: "text-on-surface-variant" },
  PAID:      { bg: "bg-blue-100",   text: "text-blue-700"   },
  SHIPPED:   { bg: "bg-purple-100", text: "text-purple-700" },
  DELIVERED: { bg: "bg-primary",  text: "text-on-primary"  },
  CANCELLED: { bg: "bg-surface",    text: "text-on-surface"    },
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
};

function StatCard({ icon, label, value }) {
  return (
<<<<<<< HEAD
    <div className="bg-card rounded-2xl p-5 shadow-sm flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-textMuted text-xs font-medium uppercase tracking-wide">{label}</p>
        <p className="text-textMain font-bold text-xl mt-0.5">{value}</p>
=======
    <div className="bg-surface-container-lowest border border-surface-variant p-6 shadow-elevation-1 rounded-sm flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-surface-variant border border-outline-variant flex items-center justify-center text-2xl flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-secondary label-md uppercase tracking-wider">{label}</p>
        <p className="text-primary font-bold headline-sm mt-1">{value}</p>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
      </div>
    </div>
  );
}

function OrderCard({ order, onTrack, onDetails, isLoading }) {
  const status = STATUS_COLORS[order.status] || STATUS_COLORS.PENDING;
  return (
<<<<<<< HEAD
    <div className="bg-card rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-2xl flex-shrink-0">
        📦
=======
    <div className="bg-surface-container-lowest border border-surface-variant p-6 shadow-elevation-1 rounded-sm flex flex-col sm:flex-row sm:items-center gap-6">
      {/* Icon */}
      <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center text-2xl flex-shrink-0 border border-outline-variant">
        <FiBox />
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
<<<<<<< HEAD
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-textMain text-sm">Order #{order.id?.slice(0, 8)}</p>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${status.bg} ${status.text}`}>
            {order.status}
          </span>
        </div>
        <p className="text-textMuted text-xs mt-0.5">
=======
        <div className="flex items-center gap-3 flex-wrap">
          <p className="headline-sm text-primary">Order #{order.id?.slice(0, 8)}</p>
          <span className={`label-sm px-3 py-1 border ${status.bg === "bg-primary" ? "bg-primary text-on-primary border-primary" : "bg-surface text-secondary border-outline-variant"}`}>
            {order.status}
          </span>
        </div>
        <p className="body-md text-secondary mt-1">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
          Branch #{order.branchId?.slice(0, 8)} · {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Price + Action */}
<<<<<<< HEAD
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <p className="text-primary font-bold text-base">ETB {order.totalPrice}</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTrack(order.id)}
            disabled={isLoading}
            className="text-xs border-2 border-primary text-primary px-4 py-1.5 rounded-full font-semibold hover:bg-primary hover:text-white transition-colors disabled:opacity-60"
=======
      <div className="flex flex-col items-end gap-3 flex-shrink-0">
        <p className="text-primary headline-sm">ETB {order.totalPrice}</p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onTrack(order.id)}
            disabled={isLoading}
            className="btn-primary px-6 py-2 label-md disabled:opacity-60"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
          >
            {isLoading ? "Loading..." : "Track"}
          </button>
          <button
            onClick={() => onDetails(order.id)}
            disabled={isLoading}
<<<<<<< HEAD
            className="text-xs border-2 border-gray-200 text-textMuted px-4 py-1.5 rounded-full font-semibold hover:border-primary hover:text-primary transition-colors disabled:opacity-60"
=======
            className="btn-secondary px-6 py-2 label-md disabled:opacity-60"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
function OrderDetailModal({ order, onClose }) {
  const steps = ["PENDING", "PAID", "SHIPPED", "DELIVERED"];
  const currentStep = steps.indexOf(order.status);
  const formatDate = (value) => value ? new Date(value).toLocaleString() : "—";

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="font-display font-bold text-textMain text-xl">Order Details</h2>
            <p className="text-xs text-textMuted mt-1">Order #{order.id?.slice(0, 8)} · {formatDate(order.createdAt)}</p>
          </div>
          <button onClick={onClose} className="text-textMuted hover:text-primary transition-colors">
=======
function OrderTrackingModal({order, onClose}){
  const steps = ["PENDING", "PAID", "SHIPPED", "DELIVERED"];
  const currentStep = steps.indexOf(order.status);
  return(
      <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-50 flex items-center justify-center px-4">
        <div className="bg-background border border-surface-variant shadow-elevation-3 p-8 w-full max-w-2xl max-h-[93vh] overflow-y-auto rounded-sm">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-surface-variant">
            <div>
              <h2 className="display-sm text-primary">Order Progress</h2>
            </div>
            <button onClick={onClose} className="text-secondary hover:text-primary transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-8">
            <div className="bg-surface-container-lowest border border-surface-variant p-6">
              <p className="label-md text-secondary uppercase tracking-wider">Total Price</p>
              <p className="headline-sm text-primary mt-2">ETB {order.totalPrice}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 mb-8">
            {steps.map((step, i) => {
              const isCompleted = i < currentStep;
              const isActive = i === currentStep;
              return (
                  <div key={step} className="flex items-start gap-6">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 label-md border ${
                          isCompleted ? "bg-primary text-on-primary border-primary"
                              : isActive ? "bg-primary text-on-primary border-primary"
                                  : "bg-surface-variant text-secondary border-outline-variant"
                      }`}>
                        {isCompleted ? <FiCheck /> : i + 1}
                      </div>
                      {i < steps.length - 1 && (
                          <div className={`w-px h-12 mt-2 ${isCompleted ? "bg-primary" : "bg-outline-variant"}`} />
                      )}
                    </div>
                    <div className="pt-2 pb-8">
                      <p className={`headline-sm ${
                          isActive ? "text-primary"
                              : isCompleted ? "text-primary"
                                  : "text-secondary"
                      }`}>
                        {step.charAt(0) + step.slice(1).toLowerCase()}
                      </p>
                      {isActive && (
                          <p className="body-md text-secondary mt-1">Current status</p>
                      )}
                    </div>
                  </div>
              );
            })}
          </div>

          <button
              onClick={onClose}
              className="w-full btn-primary py-4 label-md"
          >
            Close
          </button>

        </div>
      </div>);
}

function OrderItemRow({ item, index }) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bookId = item.bookId || item.book_id;
    if (!bookId) {
      setLoading(false);
      return;
    }
    api.get(`/books/${bookId}`)
      .then(res => setBook(unwrapItem(res)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [item]);

  const title = book?.title || item.title || item.bookTitle || item.name || `Item ${index + 1}`;
  const author = book?.author || "Unknown Author";
  const imageUrl = book ? getBookImageUrl(book) : null;
  const price = item.price ?? item.unitPrice ?? book?.price ?? "—";

  return (
    <div className="bg-surface-container-lowest border border-surface-variant p-4 flex items-center gap-6">
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="w-16 h-24 object-cover border border-outline-variant flex-shrink-0" />
      ) : (
        <div className="w-16 h-24 bg-surface-variant border border-outline-variant flex items-center justify-center text-secondary flex-shrink-0">
          <FiBook />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="headline-sm text-primary truncate">{title}</p>
        {book && <p className="body-md text-secondary mt-1 truncate">{author}</p>}
        <p className="body-md text-secondary mt-2">Quantity: {item.quantity ?? item.qty ?? 1}</p>
      </div>
      <p className="headline-sm text-primary whitespace-nowrap">ETB {price}</p>
    </div>
  );
}

function OrderDetailModal({ order, onClose }) {
  const formatDate = (value) => value ? new Date(value).toLocaleString() : "—";
  const [storeInfo, setStoreInfo] = useState(null);
  const [branchInfo, setBranchInfo] = useState(null);

  useEffect(() => {
    if (order?.storeId) {
      api.get(`/stores/public/${order.storeId}`)
        .then(res => setStoreInfo(unwrapItem(res)))
        .catch(() => {});
    }
    if (order?.branchId) {
      api.get(`/stores/me/branch/public/${order.branchId}`)
        .then(res => setBranchInfo(unwrapItem(res)))
        .catch(() => {});
    }
  }, [order]);

  return (
    <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-background border border-surface-variant shadow-elevation-3 p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-surface-variant">
          <div>
            <h2 className="display-sm text-primary">Order Details</h2>
            <p className="body-md text-secondary mt-2">Order #{order.id?.slice(0, 8)} · {formatDate(order.createdAt)}</p>
          </div>
          <button onClick={onClose} className="text-secondary hover:text-primary transition-colors">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

<<<<<<< HEAD
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="bg-surface rounded-2xl p-4">
            <p className="text-xs text-textMuted font-medium">Status</p>
            <p className="text-sm font-semibold text-textMain mt-1">{order.status}</p>
          </div>
          <div className="bg-surface rounded-2xl p-4">
            <p className="text-xs text-textMuted font-medium">Payment Status</p>
            <p className="text-sm font-semibold text-textMain mt-1">{order.paymentStatus || "—"}</p>
          </div>
          <div className="bg-surface rounded-2xl p-4">
            <p className="text-xs text-textMuted font-medium">Total Price</p>
            <p className="text-sm font-semibold text-textMain mt-1">ETB {order.totalPrice}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          {steps.map((step, i) => {
            const isCompleted = i < currentStep;
            const isActive = i === currentStep;
            return (
              <div key={step} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm transition-colors ${
                    isCompleted ? "bg-green-500 text-white"
                    : isActive ? "bg-primary text-white"
                    : "bg-gray-100 text-textMuted"
                  }`}>
                    {isCompleted ? "✓" : i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-0.5 h-8 mt-0.5 ${isCompleted ? "bg-green-500" : "bg-gray-100"}`} />
                  )}
                </div>
                <div className="pt-1.5 pb-6">
                  <p className={`text-sm font-semibold ${
                    isActive ? "text-primary"
                    : isCompleted ? "text-green-600"
                    : "text-textMuted"
                  }`}>
                    {step.charAt(0) + step.slice(1).toLowerCase()}
                  </p>
                  {isActive && (
                    <p className="text-xs text-textMuted mt-0.5">Current status</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2">
          <div className="bg-surface rounded-2xl p-4">
            <p className="text-xs text-textMuted font-medium">Shipping Address</p>
            <p className="text-sm text-textMain mt-1">{order.shippingAddress || "—"}</p>
          </div>
          <div className="bg-surface rounded-2xl p-4">
            <p className="text-xs text-textMuted font-medium">Delivery PIN</p>
            <p className="text-sm text-textMain mt-1">{order.deliveryPin || "Not issued"}</p>
          </div>
          <div className="bg-surface rounded-2xl p-4">
            <p className="text-xs text-textMuted font-medium">PIN Used</p>
            <p className="text-sm text-textMain mt-1">{order.deliveryPinUsed ? "Yes" : "No"}</p>
          </div>
          <div className="bg-surface rounded-2xl p-4">
            <p className="text-xs text-textMuted font-medium">Stripe Payment ID</p>
            <p className="text-sm text-textMain mt-1">{order.stripePaymentId || "—"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2">
          <div className="bg-surface rounded-2xl p-4">
            <p className="text-xs text-textMuted font-medium">Branch ID</p>
            <p className="text-sm text-textMain mt-1">{order.branchId || "—"}</p>
          </div>
          <div className="bg-surface rounded-2xl p-4">
            <p className="text-xs text-textMuted font-medium">Store ID</p>
            <p className="text-sm text-textMain mt-1">{order.storeId || "—"}</p>
=======

        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2">
          <div className="bg-surface-container-lowest border border-surface-variant p-6">
            <p className="label-md text-secondary uppercase tracking-wider">Shipping Address</p>
            <p className="body-lg text-primary mt-2">{order.shippingAddress || "—"}</p>
          </div>
          <div className="bg-surface-container-lowest border border-surface-variant p-6">
            <p className="label-md text-secondary uppercase tracking-wider">Delivery PIN</p>
            <p className="body-lg text-primary mt-2">{order.deliveryPin || "Not issued"}</p>
          </div>
          <div className="bg-surface-container-lowest border border-surface-variant p-6">
            <p className="label-md text-secondary uppercase tracking-wider">PIN Used</p>
            <p className="body-lg text-primary mt-2">{order.deliveryPinUsed ? "Yes" : "No"}</p>
          </div>
          <div className="bg-surface-container-lowest border border-surface-variant p-6">
            <p className="label-md text-secondary uppercase tracking-wider">Stripe Payment ID</p>
            <p className="body-lg text-primary mt-2 break-all">{order.stripePaymentId || "—"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2">
          <div className="bg-surface-container-lowest border border-surface-variant p-6">
            <p className="label-md text-secondary uppercase tracking-wider">Branch Details</p>
            <p className="body-lg text-primary mt-2">
              {branchInfo ? branchInfo.branchName : (order.branchId || "—")}
            </p>
            {branchInfo && (
              <div className="body-md text-secondary mt-1">
                <p>{branchInfo.city}, {branchInfo.region}</p>
                {branchInfo.phone && <p className="flex items-center gap-2"><FiPhone /> {branchInfo.phone}</p>}
              </div>
            )}
          </div>
          <div className="bg-surface-container-lowest border border-surface-variant p-6">
            <p className="label-md text-secondary uppercase tracking-wider">Store Info</p>
            <p className="body-lg text-primary mt-2">
              {storeInfo ? storeInfo.storeName : (order.storeId || "—")}
            </p>
            {storeInfo && (
              <div className="body-md text-secondary mt-1">
                {storeInfo.email && <p className="flex items-center gap-2"><FiMail /> {storeInfo.email}</p>}
                {storeInfo.phone && <p className="flex items-center gap-2"><FiPhone /> {storeInfo.phone}</p>}
              </div>
            )}
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
          </div>
        </div>

        {order.items?.length > 0 && (
<<<<<<< HEAD
          <div className="bg-surface rounded-2xl p-4 mb-6">
            <p className="text-xs text-textMuted font-medium uppercase tracking-wide mb-3">Order Items</p>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={item.id ?? index} className="rounded-2xl bg-white border border-gray-100 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-textMain text-sm">
                        {item.title || item.bookTitle || item.name || `Item ${index + 1}`}
                      </p>
                      <p className="text-xs text-textMuted mt-1">
                        Quantity: {item.quantity ?? item.qty ?? "—"}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-textMain">ETB {item.price ?? item.unitPrice ?? "—"}</p>
                  </div>
                </div>
=======
          <div className="mb-8">
            <p className="label-md text-secondary uppercase tracking-wider mb-4 border-b border-surface-variant pb-2">Order Items</p>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <OrderItemRow key={item.id ?? index} item={item} index={index} />
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onClose}
<<<<<<< HEAD
          className="w-full bg-primary text-white rounded-full py-3 font-semibold text-sm hover:bg-red-600 transition-colors"
=======
          className="w-full btn-primary py-4 label-md"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
        >
          Close
        </button>
      </div>
    </div>
  );
}

function EditProfileModal({ user, profile, onClose, onSave }) {
  const [form, setForm] = useState({
    name: profile?.name || user?.name || "",
    phone: profile?.phone || "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put("/users/profile", form);
      onSave(form);
      onClose();
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-textMain text-xl">Edit Profile</h2>
          <button onClick={onClose} className="text-textMuted hover:text-primary transition-colors">
=======
    <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-background border border-surface-variant shadow-elevation-3 p-8 w-full max-w-sm rounded-sm">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-surface-variant">
          <h2 className="display-sm text-primary">Edit Profile</h2>
          <button onClick={onClose} className="text-secondary hover:text-primary transition-colors">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

<<<<<<< HEAD
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-2">
=======
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block label-md text-secondary uppercase tracking-wider mb-2">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
              Full Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
<<<<<<< HEAD
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary text-sm outline-none transition-colors bg-surface"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-2">
=======
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant focus:border-primary text-primary body-md outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block label-md text-secondary uppercase tracking-wider mb-2">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
              Phone Number
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
<<<<<<< HEAD
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary text-sm outline-none transition-colors bg-surface"
=======
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant focus:border-primary text-primary body-md outline-none transition-colors"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
              placeholder="+251 912 345 678"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
<<<<<<< HEAD
            className="w-full bg-primary text-white rounded-full py-3 font-semibold text-sm hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
=======
            className="w-full btn-primary py-4 label-md disabled:opacity-60 flex items-center justify-center gap-2 mt-4"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function UserDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");
<<<<<<< HEAD
=======
  const [trackingOrder, setTrackingOrder] = useState(null);
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
  const [modalOrder, setModalOrder] = useState(null);
  const [modalLoadingId, setModalLoadingId] = useState(null);
  const [modalError, setModalError] = useState("");
  const [editingProfile, setEditingProfile] = useState(false);

  useEffect(() => {
    // Fetch profile
    api.get("/users/me")
      .then((res) => setProfile(unwrapItem(res)))
      .catch(() => {});

    // Fetch orders
    api.get("/orders")
      .then((res) => setOrders(unwrapList(res)))
      .catch(() => setOrders([]))
      .finally(() => setLoadingOrders(false));
  }, []);

  const totalSpent = orders
    .filter((o) => o.status === "DELIVERED")
    .reduce((sum, o) => sum + (Number(o.totalPrice) || 0), 0);

  const fetchOrderModal = async (orderId) => {
    setModalLoadingId(orderId);
    setModalError("");

    try {
      const res = await api.get(`/orders/${orderId}`);
      const orderDetails = unwrapItem(res);
      setModalOrder(orderDetails);
    } catch (err) {
      setModalError(err.response?.data?.message || "Failed to load order details.");
    } finally {
      setModalLoadingId(null);
    }
  };

<<<<<<< HEAD
  const handleTrackOrder = (orderId) => {
    fetchOrderModal(orderId);
=======
  const fetchTrackOrderModal = async (orderId) => {
    setModalLoadingId(orderId);
    try {
      const res = await api.get(`/orders/${orderId}`);
      setTrackingOrder(unwrapItem(res));
    } catch (err) {
      setModalError(err.response?.data?.message || "Failed to load tracking.");
    } finally {
      setModalLoadingId(null);
    }
  };

  const handleTrackOrder = (orderId) => {
    fetchTrackOrderModal(orderId);
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
  };

  const handleViewDetails = (orderId) => {
    fetchOrderModal(orderId);
  };

  const TABS = [
    { id: "orders", label: "My Orders", count: orders.length },
    { id: "profile", label: "Profile" },
    { id: "store", label: "Become a Store" },
  ];

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-surface">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Profile Header */}
        <div className="bg-card rounded-3xl shadow-sm p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <img
            src={`https://i.pravatar.cc/80?u=${user?.email}`}
            alt={user?.name}
            className="w-20 h-20 rounded-2xl object-cover border-4 border-primary/20"
          />
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-bold text-2xl text-textMain">
              {profile?.name || user?.name}
            </h1>
            <p className="text-textMuted text-sm mt-0.5">{user?.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                Reader
              </span>
              {profile?.phone && (
                <span className="text-textMuted text-xs">📱 {profile.phone}</span>
=======
    <div className="min-h-screen bg-background text-on-background font-body-md antialiased pt-24 pb-16">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 w-full mt-8">

        {/* Profile Header */}
        <div className="bg-surface-container-lowest border border-surface-variant p-8 mb-12 flex flex-col sm:flex-row items-start sm:items-center gap-8 shadow-elevation-1">
          <img
            src={`https://i.pravatar.cc/120?u=${user?.email}`}
            alt={user?.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-outline-variant"
          />
          <div className="flex-1 min-w-0">
            <h1 className="display-md text-primary mb-2">
              {profile?.name || user?.name}
            </h1>
            <p className="body-lg text-secondary">{user?.email}</p>
            <div className="flex items-center gap-4 mt-4 border-t border-surface-variant pt-4">
              <span className="label-md tracking-wider text-primary uppercase">
                Reader Role
              </span>
              {profile?.phone && (
                <span className="body-md text-secondary border-l border-outline-variant pl-4">{profile.phone}</span>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
              )}
            </div>
          </div>
          <button
            onClick={() => setEditingProfile(true)}
<<<<<<< HEAD
            className="border-2 border-gray-200 text-textMuted px-5 py-2 rounded-full text-sm font-semibold hover:border-primary hover:text-primary transition-colors flex-shrink-0"
=======
            className="btn-secondary px-6 py-3 label-md flex-shrink-0"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
          >
            Edit Profile
          </button>
        </div>

        {/* Stats Row */}
<<<<<<< HEAD
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard icon="📦" label="Total Orders" value={orders.length} />
          <StatCard icon="✅" label="Delivered" value={orders.filter(o => o.status === "DELIVERED").length} />
          <StatCard icon="🚚" label="In Progress" value={orders.filter(o => ["PENDING","PAID","SHIPPED"].includes(o.status)).length} />
          <StatCard icon="💰" label="Total Spent" value={`ETB ${totalSpent.toLocaleString()}`} />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-card rounded-2xl p-1.5 shadow-sm mb-6 w-fit">
=======
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
          <StatCard icon={<FiBox />} label="Total Orders" value={orders.length} />
          <StatCard icon={<FiCheckCircle />} label="Delivered" value={orders.filter(o => o.status === "DELIVERED").length} />
          <StatCard icon={<FiTruck />} label="In Progress" value={orders.filter(o => ["PENDING","PAID","SHIPPED"].includes(o.status)).length} />
          <StatCard icon={<FiDollarSign />} label="Total Spent" value={`ETB ${totalSpent.toLocaleString()}`} />
        </div>

        {/* Tabs - Modern Literary Style */}
        <div className="flex gap-8 overflow-x-auto no-scrollbar pb-4 mb-8 border-b border-surface-variant">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
<<<<<<< HEAD
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-sm"
                  : "text-textMuted hover:text-textMain"
=======
              className={`whitespace-nowrap transition-colors pb-2 flex items-center gap-2 ${
                activeTab === tab.id
                  ? "text-primary font-bold label-md border-b-2 border-primary"
                  : "text-secondary hover:text-primary font-medium label-md border-b-2 border-transparent"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
<<<<<<< HEAD
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id ? "bg-white/20 text-white" : "bg-surface text-textMuted"
=======
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeTab === tab.id ? "bg-primary text-on-primary" : "bg-surface-variant text-secondary"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}

        {/* Orders Tab */}
        {activeTab === "orders" && (
<<<<<<< HEAD
          <div className="flex flex-col gap-4">
              {modalError && (
              <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-red-600 text-sm flex gap-2">
                <span>⚠</span> {modalError}
=======
          <div className="flex flex-col gap-6">
              {modalError && (
              <div className="bg-error/10 border border-error/20 p-4 text-error body-md flex items-center gap-3">
                <span><FiAlertTriangle /></span> {modalError}
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
              </div>
            )}

            {loadingOrders ? (
              [...Array(3)].map((_, i) => (
<<<<<<< HEAD
                <div key={i} className="bg-card rounded-2xl h-24 animate-pulse" />
              ))
            ) : orders.length === 0 ? (
              <div className="bg-card rounded-3xl p-12 text-center shadow-sm">
                <p className="text-5xl mb-4">📭</p>
                <p className="font-display font-bold text-textMain text-lg">No orders yet</p>
                <p className="text-textMuted text-sm mt-1">Browse books and place your first order</p>
                <button
                  onClick={() => navigate("/")}
                  className="mt-6 bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors"
                >
                  Browse Books
=======
                <div key={i} className="bg-surface-variant border border-outline-variant p-6 h-32 animate-pulse" />
              ))
            ) : orders.length === 0 ? (
              <div className="bg-surface-container-lowest border border-surface-variant p-16 text-center shadow-elevation-1">
                <p className="text-5xl mb-6 opacity-80 flex justify-center"><FiInbox /></p>
                <p className="headline-md text-primary mb-2">Your library is empty</p>
                <p className="body-lg text-secondary mb-8 max-w-md mx-auto">Browse our curated collection and place your first order.</p>
                <button
                  onClick={() => navigate("/")}
                  className="btn-primary px-8 py-3 label-md"
                >
                  Explore Collection
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                </button>
              </div>
            ) : (
              orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onTrack={handleTrackOrder}
                  onDetails={handleViewDetails}
                  isLoading={modalLoadingId === order.id}
                />
              ))
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
<<<<<<< HEAD
          <div className="bg-card rounded-3xl shadow-sm p-6">
            <h2 className="font-display font-bold text-textMain text-lg mb-6">
              Account Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
=======
          <div className="bg-surface-container-lowest border border-surface-variant p-8 shadow-elevation-1 max-w-3xl">
            <h2 className="headline-md text-primary mb-8 pb-4 border-b border-surface-variant">
              Account Archives
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
              {[
                { label: "Full Name", value: profile?.name || user?.name },
                { label: "Email Address", value: user?.email },
                { label: "Phone Number", value: profile?.phone || "Not set" },
                { label: "Account Role", value: "Reader (ROLE_USER)" },
                { label: "Member Since", value: profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "—" },
                { label: "Keycloak ID", value: user?.id?.slice(0, 16) + "..." },
              ].map((item) => (
<<<<<<< HEAD
                <div key={item.label} className="flex flex-col gap-1">
                  <p className="text-xs font-semibold text-textMuted uppercase tracking-wide">
                    {item.label}
                  </p>
                  <p className="text-sm font-medium text-textMain">{item.value}</p>
=======
                <div key={item.label} className="flex flex-col gap-2">
                  <p className="label-md text-secondary uppercase tracking-wider">
                    {item.label}
                  </p>
                  <p className="body-lg text-primary">{item.value}</p>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                </div>
              ))}
            </div>
            <button
              onClick={() => setEditingProfile(true)}
<<<<<<< HEAD
              className="mt-8 bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors"
            >
              Edit Profile
=======
              className="mt-12 btn-secondary px-8 py-3 label-md"
            >
              Edit Details
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
            </button>
          </div>
        )}

        {/* Become a Store Tab */}
        {activeTab === "store" && (
<<<<<<< HEAD
          <div className="bg-card rounded-3xl shadow-sm p-8 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-5">
              🏪
            </div>
            <h2 className="font-display font-bold text-textMain text-2xl mb-2">
              Become a Store
            </h2>
            <p className="text-textMuted text-sm max-w-sm mx-auto leading-relaxed mb-8">
              Register your bookstore on readbooks and start selling to thousands of readers across Ethiopia. Choose between Free and Premium plans.
            </p>

            {/* Plan comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-8 text-left">
=======
          <div className="bg-surface-container-lowest border border-surface-variant p-12 text-center shadow-elevation-1">
            <div className="w-24 h-24 bg-surface-variant border border-outline-variant rounded-full flex items-center justify-center text-4xl mx-auto mb-8">
              <FiHome />
            </div>
            <h2 className="display-sm text-primary mb-4">
              Curate Your Own Collection
            </h2>
            <p className="body-lg text-secondary max-w-xl mx-auto leading-relaxed mb-12">
              Register your bookstore on The Inkwell ecosystem and share your literary finds with thousands of readers.
            </p>

            {/* Plan comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12 text-left">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
              {[
                {
                  name: "Free Plan",
                  commission: "5% commission per sale",
                  fee: "No monthly fee",
                  analytics: "Basic analytics",
                  support: "Standard support",
<<<<<<< HEAD
                  color: "border-gray-200",
=======
                  color: "border-outline-variant",
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                },
                {
                  name: "Premium Plan",
                  commission: "2% commission per sale",
                  fee: "Monthly fee applies",
                  analytics: "Advanced analytics",
                  support: "Priority support",
<<<<<<< HEAD
                  color: "border-primary",
                  highlight: true,
                },
              ].map((plan) => (
                <div key={plan.name} className={`border-2 ${plan.color} rounded-2xl p-5 ${plan.highlight ? "bg-primary/5" : ""}`}>
                  <p className={`font-bold text-base mb-3 ${plan.highlight ? "text-primary" : "text-textMain"}`}>
                    {plan.name}
                  </p>
                  {[plan.commission, plan.fee, plan.analytics, plan.support].map((f) => (
                    <p key={f} className="text-xs text-textMuted flex items-center gap-2 mb-1.5">
                      <span className={plan.highlight ? "text-primary" : "text-green-500"}>✓</span>
=======
                  color: "border-primary bg-primary/5",
                  highlight: true,
                },
              ].map((plan) => (
                <div key={plan.name} className={`border p-6 shadow-elevation-1 ${plan.color}`}>
                  <p className={`headline-sm mb-4 ${plan.highlight ? "text-primary" : "text-primary"}`}>
                    {plan.name}
                  </p>
                  {[plan.commission, plan.fee, plan.analytics, plan.support].map((f) => (
                    <p key={f} className="body-md text-secondary flex items-center gap-3 mb-2">
                      <span className={plan.highlight ? "text-primary" : "text-secondary"}><FiCheck /></span>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                      {f}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/store/apply")}
<<<<<<< HEAD
              className="bg-primary text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-red-600 transition-colors"
            >
              Apply to Become a Store →
=======
              className="btn-primary px-10 py-4 label-md"
            >
              Apply to Become a Store
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
            </button>
          </div>
        )}

      </div>

      {/* Modals */}
      {modalOrder && (
        <OrderDetailModal
          order={modalOrder}
          onClose={() => setModalOrder(null)}
        />
      )}
<<<<<<< HEAD
=======

      {trackingOrder && (
          <OrderTrackingModal
              order={trackingOrder}
              onClose={() => setTrackingOrder(null)}
          />
      )}

>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
      {editingProfile && (
        <EditProfileModal
          user={user}
          profile={profile}
          onClose={() => setEditingProfile(false)}
          onSave={(updated) => setProfile((prev) => ({ ...prev, ...updated }))}
        />
      )}
    </div>
  );
}
