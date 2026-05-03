import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/useAuth";
import api from "../../api/axiosInstance";
import { unwrapList, unwrapItem } from "../../utils/apiHelpers";

const STATUS_COLORS = {
  PENDING:   { bg: "bg-yellow-100", text: "text-yellow-700" },
  PAID:      { bg: "bg-blue-100",   text: "text-blue-700"   },
  SHIPPED:   { bg: "bg-purple-100", text: "text-purple-700" },
  DELIVERED: { bg: "bg-green-100",  text: "text-green-700"  },
  CANCELLED: { bg: "bg-red-100",    text: "text-red-600"    },
};

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-textMuted text-xs font-medium uppercase tracking-wide">{label}</p>
        <p className="text-textMain font-bold text-xl mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function OrderCard({ order, onTrack, onDetails, isLoading }) {
  const status = STATUS_COLORS[order.status] || STATUS_COLORS.PENDING;
  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-2xl flex-shrink-0">
        📦
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-textMain text-sm">Order #{order.id?.slice(0, 8)}</p>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${status.bg} ${status.text}`}>
            {order.status}
          </span>
        </div>
        <p className="text-textMuted text-xs mt-0.5">
          Branch #{order.branchId?.slice(0, 8)} · {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Price + Action */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <p className="text-primary font-bold text-base">ETB {order.totalPrice}</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTrack(order.id)}
            disabled={isLoading}
            className="text-xs border-2 border-primary text-primary px-4 py-1.5 rounded-full font-semibold hover:bg-primary hover:text-white transition-colors disabled:opacity-60"
          >
            {isLoading ? "Loading..." : "Track"}
          </button>
          <button
            onClick={() => onDetails(order.id)}
            disabled={isLoading}
            className="text-xs border-2 border-gray-200 text-textMuted px-4 py-1.5 rounded-full font-semibold hover:border-primary hover:text-primary transition-colors disabled:opacity-60"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

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
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

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
          </div>
        </div>

        {order.items?.length > 0 && (
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
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full bg-primary text-white rounded-full py-3 font-semibold text-sm hover:bg-red-600 transition-colors"
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
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-textMain text-xl">Edit Profile</h2>
          <button onClick={onClose} className="text-textMuted hover:text-primary transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary text-sm outline-none transition-colors bg-surface"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary text-sm outline-none transition-colors bg-surface"
              placeholder="+251 912 345 678"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white rounded-full py-3 font-semibold text-sm hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
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

  const handleTrackOrder = (orderId) => {
    fetchOrderModal(orderId);
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
              )}
            </div>
          </div>
          <button
            onClick={() => setEditingProfile(true)}
            className="border-2 border-gray-200 text-textMuted px-5 py-2 rounded-full text-sm font-semibold hover:border-primary hover:text-primary transition-colors flex-shrink-0"
          >
            Edit Profile
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard icon="📦" label="Total Orders" value={orders.length} />
          <StatCard icon="✅" label="Delivered" value={orders.filter(o => o.status === "DELIVERED").length} />
          <StatCard icon="🚚" label="In Progress" value={orders.filter(o => ["PENDING","PAID","SHIPPED"].includes(o.status)).length} />
          <StatCard icon="💰" label="Total Spent" value={`ETB ${totalSpent.toLocaleString()}`} />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-card rounded-2xl p-1.5 shadow-sm mb-6 w-fit">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-sm"
                  : "text-textMuted hover:text-textMain"
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id ? "bg-white/20 text-white" : "bg-surface text-textMuted"
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
          <div className="flex flex-col gap-4">
              {modalError && (
              <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-red-600 text-sm flex gap-2">
                <span>⚠</span> {modalError}
              </div>
            )}

            {loadingOrders ? (
              [...Array(3)].map((_, i) => (
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
          <div className="bg-card rounded-3xl shadow-sm p-6">
            <h2 className="font-display font-bold text-textMain text-lg mb-6">
              Account Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: "Full Name", value: profile?.name || user?.name },
                { label: "Email Address", value: user?.email },
                { label: "Phone Number", value: profile?.phone || "Not set" },
                { label: "Account Role", value: "Reader (ROLE_USER)" },
                { label: "Member Since", value: profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "—" },
                { label: "Keycloak ID", value: user?.id?.slice(0, 16) + "..." },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <p className="text-xs font-semibold text-textMuted uppercase tracking-wide">
                    {item.label}
                  </p>
                  <p className="text-sm font-medium text-textMain">{item.value}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setEditingProfile(true)}
              className="mt-8 bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        )}

        {/* Become a Store Tab */}
        {activeTab === "store" && (
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
              {[
                {
                  name: "Free Plan",
                  commission: "5% commission per sale",
                  fee: "No monthly fee",
                  analytics: "Basic analytics",
                  support: "Standard support",
                  color: "border-gray-200",
                },
                {
                  name: "Premium Plan",
                  commission: "2% commission per sale",
                  fee: "Monthly fee applies",
                  analytics: "Advanced analytics",
                  support: "Priority support",
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
                      {f}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/store/apply")}
              className="bg-primary text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-red-600 transition-colors"
            >
              Apply to Become a Store →
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
