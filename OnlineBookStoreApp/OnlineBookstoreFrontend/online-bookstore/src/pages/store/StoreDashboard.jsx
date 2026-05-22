import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import api from "../../api/axiosInstance";
import { unwrapItem, unwrapList } from "../../utils/apiHelpers";
<<<<<<< HEAD
import { getBookDocumentUrl } from "../../utils/book";

function StatCard({ icon, label, value, sub, color = "bg-primary/10" }) {
  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-2xl flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-textMuted text-xs font-medium uppercase tracking-wide">{label}</p>
        <p className="text-textMain font-bold text-xl mt-0.5">{value}</p>
        {sub && <p className="text-textMuted text-xs mt-0.5">{sub}</p>}
=======
import { getBookDocumentUrl, getBookImageUrl } from "../../utils/book";
import { 
  FiPieChart, FiBook, FiBox, FiHome, FiUsers, FiTrendingUp, FiSettings, 
  FiGlobe, FiStar, FiMapPin, FiPhone, FiDollarSign, FiBriefcase, FiTrendingDown, FiUser,
  FiClock, FiCheck
} from "react-icons/fi";

function StatCard({ icon, label, value, sub, color = "bg-primary text-on-primary" }) {
  return (
    <div className="bg-surface-container-lowest border border-surface-variant p-6 shadow-elevation-1 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-2xl flex-shrink-0 bg-surface-variant`}>
        {icon}
      </div>
      <div>
        <p className="text-secondary label-md uppercase tracking-wider">{label}</p>
        <p className="text-primary font-bold headline-sm mt-1">{value}</p>
        {sub && <p className="text-secondary body-md mt-1">{sub}</p>}
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
      </div>
    </div>
  );
}

function StoreSidebar({ store, activeTab, setActiveTab, navigate }) {
  const NAV = [
<<<<<<< HEAD
    { id: "overview",   icon: "📊", label: "Overview"         },
    { id: "branches",   icon: "🏪", label: "Branches"         },
    { id: "books",      icon: "📚", label: "Books"            },
    { id: "orders",     icon: "📦", label: "Orders"           },
    { id: "earnings",   icon: "💰", label: "Earnings"         },
    { id: "employees",  icon: "👥", label: "Employees"        },
    { id: "settings",   icon: "⚙️",  label: "Settings"        },
  ];

  return (
    <aside className="w-64 bg-card shadow-sm rounded-3xl p-4 flex flex-col gap-1 sticky top-20 self-start">
      {/* Store identity */}
      <div className="px-3 py-4 mb-2 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl">
            🏪
          </div>
          <div className="min-w-0">
            <p className="font-bold text-textMain text-sm truncate">
              {store?.storeName || "My Store"}
            </p>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              store?.plan === "PREMIUM"
                ? "bg-amber-100 text-amber-700"
                : "bg-gray-100 text-textMuted"
            }`}>
=======
    { id: "overview", icon: <FiPieChart />, label: "Dashboard" },
    { id: "books", icon: <FiBook />, label: "Inventory" },
    { id: "orders", icon: <FiBox />, label: "Orders" },
    { id: "branches", icon: <FiHome />, label: "Branches" },
    { id: "employees", icon: <FiUsers />, label: "Staff" },
    { id: "earnings", icon: <FiTrendingUp />, label: "Analytics" },
    { id: "settings", icon: <FiSettings />, label: "Settings" },
  ];

  return (
    <aside className="w-64 bg-surface-container-lowest border border-surface-variant shadow-elevation-1 p-6 flex flex-col gap-2 sticky top-28 self-start">
      {/* Store identity */}
      <div className="pb-6 mb-4 border-b border-surface-variant">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border border-outline-variant bg-surface flex items-center justify-center text-xl">
            <FiHome />
          </div>
          <div className="min-w-0">
            <p className="display-sm text-primary truncate">
              {store?.storeName || "My Store"}
            </p>
            <span className={`label-md px-2 py-0.5 mt-1 inline-block border ${store?.plan === "PREMIUM"
              ? "bg-primary text-on-primary border-primary"
              : "bg-surface-variant text-secondary border-outline-variant"
              }`}>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
              {store?.plan || "FREE"} Plan
            </span>
          </div>
        </div>
        {/* Verification badge */}
<<<<<<< HEAD
        <div className={`mt-3 flex items-center gap-1.5 text-xs font-medium ${
          store?.verificationStatus === "APPROVED"
            ? "text-green-600" : "text-yellow-600"
        }`}>
          <span>{store?.verificationStatus === "APPROVED" ? "✓" : "⏳"}</span>
=======
        <div className={`mt-4 flex items-center gap-2 label-md ${store?.verificationStatus === "APPROVED"
          ? "text-primary" : "text-secondary"
          }`}>
          <span className="flex items-center">{store?.verificationStatus === "APPROVED" ? <FiCheck /> : <FiClock />}</span>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
          <span>{store?.verificationStatus || "PENDING"}</span>
        </div>
      </div>

      {/* Nav items */}
      {NAV.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
<<<<<<< HEAD
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
            activeTab === item.id
              ? "bg-primary text-white"
              : "text-textMuted hover:bg-surface hover:text-textMain"
          }`}
        >
          <span className="text-base">{item.icon}</span>
=======
          className={`flex items-center gap-4 px-4 py-3 text-left transition-colors border-l-2 ${activeTab === item.id
            ? "border-primary bg-primary text-on-primary font-bold label-md"
            : "border-transparent text-secondary hover:bg-surface-variant hover:text-primary label-md"
            }`}
        >
          <span className="text-xl">{item.icon}</span>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
          {item.label}
        </button>
      ))}

      {/* Bottom — view store */}
<<<<<<< HEAD
      <div className="mt-auto pt-4 border-t border-gray-100">
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-textMuted hover:bg-surface hover:text-primary transition-colors"
        >
          <span>🌐</span> View Public Store
=======
      <div className="mt-auto pt-6 border-t border-surface-variant">
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-3 px-4 py-3 label-md text-secondary hover:bg-surface-variant hover:text-primary transition-colors border border-outline-variant hover:border-primary"
        >
          <span><FiGlobe /></span> View Public Store
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
        </button>
      </div>
    </aside>
  );
}

function OverviewTab({ store, branches, stats }) {
  return (
<<<<<<< HEAD
    <div className="flex flex-col gap-6">
      <h2 className="font-display font-bold text-textMain text-xl">Store Overview</h2>

      {/* Stats grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="🏪" label="Branches"     value={branches.length}           color="bg-blue-50"   />
        <StatCard icon="📚" label="Total Books"  value={stats?.totalBooks  || 0}   color="bg-purple-50" />
        <StatCard icon="📦" label="Total Orders" value={stats?.totalOrders || 0}   color="bg-amber-50"  />
        <StatCard icon="💰" label="Revenue"      value={`ETB ${(stats?.revenue || 0).toLocaleString()}`} color="bg-green-50" />
      </div>

      {/* Branches summary */}
      <div className="bg-card rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-textMain text-base">Branch Performance</h3>
        </div>
        {branches.length === 0 ? (
          <p className="text-textMuted text-sm text-center py-8">No branches yet</p>
        ) : (
          <div className="flex flex-col gap-3">
            {branches.map((branch, i) => (
              <div key={branch.id} className="flex items-center gap-4 p-3 bg-surface rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-textMain truncate">{branch.branchName}</p>
                  <p className="text-xs text-textMuted">{branch.city}, {branch.region}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-textMain">
                    ETB {(branch.revenue || 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-textMuted">{branch.orderCount || 0} orders</p>
=======
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="display-sm text-primary mb-2">Dashboard</h2>
        <p className="body-lg text-secondary">A scholarly look at your literary ecosystem's health.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest border border-surface-variant p-6 shadow-elevation-1">
          <p className="label-md text-secondary uppercase tracking-wider mb-2">Total Revenue</p>
          <p className="display-sm text-primary truncate">ETB {(stats?.revenue || 0).toLocaleString()}</p>
        </div>
        <div className="bg-surface-container-lowest border border-surface-variant p-6 shadow-elevation-1">
          <p className="label-md text-secondary uppercase tracking-wider mb-2">Active Orders</p>
          <p className="display-sm text-primary truncate">{stats?.totalOrders || 0}</p>
        </div>
        <div className="bg-surface-container-lowest border border-surface-variant p-6 shadow-elevation-1">
          <p className="label-md text-secondary uppercase tracking-wider mb-2">Stock Level</p>
          <p className="display-sm text-primary truncate">{stats?.totalBooks || 0} Titles</p>
        </div>
      </div>

      {/* Branches summary */}
      <div className="bg-surface-container-lowest border border-surface-variant shadow-elevation-1 p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 border-b border-surface-variant pb-4 gap-4">
          <h3 className="headline-md text-primary">Branch Performance</h3>
          <p className="body-md text-secondary">Comparative sales volume for the current fiscal week.</p>
        </div>
        {branches.length === 0 ? (
          <p className="body-md text-secondary text-center py-8">No branches yet</p>
        ) : (
          <div className="flex flex-col gap-4">
            {branches.map((branch, i) => (
              <div key={branch.id} className="flex items-center gap-6 p-4 border border-outline-variant bg-surface hover:border-primary transition-colors">
                <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center label-md font-bold text-primary flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="headline-sm text-primary truncate">{branch.branchName}</p>
                  <p className="body-md text-secondary">{branch.city}, {branch.region}</p>
                </div>
                <div className="text-right">
                  <p className="headline-sm text-primary">
                    ETB {(branch.revenue || 0).toLocaleString()}
                  </p>
                  <p className="body-md text-secondary">{branch.orderCount || 0} orders</p>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Plan info */}
<<<<<<< HEAD
      <div className={`rounded-2xl p-5 flex items-center gap-4 ${
        store?.plan === "PREMIUM"
          ? "bg-amber-50 border-2 border-amber-200"
          : "bg-surface border-2 border-gray-200"
      }`}>
        <span className="text-3xl">{store?.plan === "PREMIUM" ? "⭐" : "🆓"}</span>
        <div className="flex-1">
          <p className="font-bold text-textMain text-sm">
            {store?.plan === "PREMIUM" ? "Premium Plan" : "Free Plan"}
          </p>
          <p className="text-xs text-textMuted mt-0.5">
=======
      <div className={`p-8 flex items-center gap-6 border shadow-elevation-1 ${store?.plan === "PREMIUM"
        ? "bg-primary/5 border-primary"
        : "bg-surface-container-lowest border-outline-variant"
        }`}>
        <span className="text-4xl">{store?.plan === "PREMIUM" ? <FiStar /> : <FiBox />}</span>
        <div className="flex-1">
          <p className="headline-md text-primary">
            {store?.plan === "PREMIUM" ? "Premium Plan" : "Free Plan"}
          </p>
          <p className="body-lg text-secondary mt-2">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
            {store?.plan === "PREMIUM"
              ? "2% commission per sale · Priority support · Advanced analytics"
              : "5% commission per sale · Standard support · Basic analytics"}
          </p>
        </div>
        {store?.plan !== "PREMIUM" && (
<<<<<<< HEAD
          <button className="bg-amber-400 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-amber-500 transition-colors whitespace-nowrap">
            Upgrade →
=======
          <button className="btn-primary px-8 py-3 label-md whitespace-nowrap">
            Upgrade to Premium
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
          </button>
        )}
      </div>
    </div>
  );
}

<<<<<<< HEAD
function BranchesTab({ storeId, branches, setBranches }) {
=======
function BranchesTab({ branches, setBranches }) {
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    branchName: "", region: "", city: "", address: "", phone: "",
  });

  const REGIONS = [
<<<<<<< HEAD
    "Addis Ababa","Oromia","Amhara","Tigray",
    "SNNPR","Somali","Afar","Benishangul-Gumuz","Gambela","Harari","Dire Dawa",
=======
    "Addis Ababa", "Oromia", "Amhara", "Tigray",
    "SNNPR", "Somali", "Afar", "Benishangul-Gumuz", "Gambela", "Harari", "Dire Dawa",
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
  ];

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post(`/stores/me/branch`, form);
      const newBranch = unwrapItem(res);
      setBranches((prev) => [...prev, newBranch]);
      setShowAdd(false);
      setForm({ branchName: "", region: "", city: "", address: "", phone: "" });
<<<<<<< HEAD
    } catch {}
=======
    } catch (err) {
      console.error("Failed to add branch", err);
    }
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
    finally { setLoading(false); }
  };

  return (
<<<<<<< HEAD
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-textMain text-xl">Branches</h2>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors"
=======
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between border-b border-surface-variant pb-6">
        <h2 className="display-sm text-primary">Branches</h2>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="btn-primary px-6 py-3 label-md"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
        >
          + Add Branch
        </button>
      </div>

      {/* Add branch form */}
      {showAdd && (
<<<<<<< HEAD
        <form onSubmit={handleAdd} className="bg-card rounded-2xl shadow-sm p-5 flex flex-col gap-4 border-2 border-primary/20">
          <h3 className="font-semibold text-textMain text-base">New Branch</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: "branchName", label: "Branch Name",    placeholder: "e.g. Bole Branch" },
              { key: "phone",      label: "Phone",          placeholder: "+251 ..." },
              { key: "city",       label: "City / Woreda",  placeholder: "e.g. Bole" },
              { key: "address",    label: "Specific Address", placeholder: "Street, building..." },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-1.5">
=======
        <form onSubmit={handleAdd} className="bg-surface-container-lowest border border-surface-variant shadow-elevation-1 p-8 flex flex-col gap-6">
          <h3 className="headline-md text-primary">New Branch details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { key: "branchName", label: "Branch Name", placeholder: "e.g. Bole Branch" },
              { key: "phone", label: "Phone", placeholder: "+251 ..." },
              { key: "city", label: "City / Woreda", placeholder: "e.g. Bole" },
              { key: "address", label: "Specific Address", placeholder: "Street, building..." },
            ].map((f) => (
              <div key={f.key}>
                <label className="block label-md text-secondary uppercase tracking-wider mb-2">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                  {f.label}
                </label>
                <input
                  type="text"
                  value={form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
<<<<<<< HEAD
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary text-sm bg-surface outline-none transition-colors"
=======
                  className="w-full px-4 py-3 bg-surface border border-outline-variant focus:border-primary body-md text-primary outline-none transition-colors"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                />
              </div>
            ))}
            <div>
<<<<<<< HEAD
              <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-1.5">
=======
              <label className="block label-md text-secondary uppercase tracking-wider mb-2">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                Region
              </label>
              <select
                value={form.region}
                onChange={(e) => setForm({ ...form, region: e.target.value })}
<<<<<<< HEAD
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary text-sm bg-surface outline-none transition-colors"
=======
                className="w-full px-4 py-3 bg-surface border border-outline-variant focus:border-primary body-md text-primary outline-none transition-colors"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
              >
                <option value="">Select region...</option>
                {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
<<<<<<< HEAD
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add Branch"}
=======
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-8 py-3 label-md disabled:opacity-60"
            >
              {loading ? "Adding..." : "Save Branch"}
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
            </button>
            <button
              type="button"
              onClick={() => setShowAdd(false)}
<<<<<<< HEAD
              className="border-2 border-gray-200 text-textMuted px-6 py-2.5 rounded-full text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
=======
              className="btn-secondary px-8 py-3 label-md"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Branch cards */}
      {branches.length === 0 ? (
<<<<<<< HEAD
        <div className="bg-card rounded-2xl p-12 text-center shadow-sm">
          <p className="text-4xl mb-3">🏪</p>
          <p className="font-semibold text-textMain">No branches yet</p>
          <p className="text-textMuted text-sm mt-1">Add your first branch to start listing books</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {branches.map((branch) => (
            <div key={branch.id} className="bg-card rounded-2xl shadow-sm p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-textMain text-base">{branch.branchName}</p>
                  <p className="text-xs text-textMuted mt-0.5">
                    {branch.city}, {branch.region}
                  </p>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                  Active
                </span>
              </div>
              <div className="flex flex-col gap-1 text-xs text-textMuted">
                <p>📍 {branch.address}</p>
                <p>📞 {branch.phone}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                <div className="text-center">
                  <p className="font-bold text-textMain text-base">{branch.bookCount || 0}</p>
                  <p className="text-xs text-textMuted">Books</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-textMain text-base">{branch.orderCount || 0}</p>
                  <p className="text-xs text-textMuted">Orders</p>
=======
        <div className="bg-surface-container-lowest border border-surface-variant p-16 text-center shadow-elevation-1">
          <p className="text-5xl mb-6 opacity-80 flex justify-center"><FiHome /></p>
          <p className="headline-md text-primary">No branches yet</p>
          <p className="body-lg text-secondary mt-2">Add your first branch to start listing books</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {branches.map((branch) => (
            <div key={branch.id} className="bg-surface-container-lowest border border-surface-variant shadow-elevation-1 p-8 flex flex-col gap-6">
              <div className="flex items-start justify-between border-b border-surface-variant pb-4">
                <div>
                  <p className="display-sm text-primary">{branch.branchName}</p>
                  <p className="body-md text-secondary mt-1">
                    {branch.city}, {branch.region}
                  </p>
                </div>
                <span className="bg-primary/10 border border-primary text-primary label-md px-3 py-1 uppercase tracking-wider">
                  Active
                </span>
              </div>
              <div className="flex flex-col gap-2 body-md text-secondary">
                <p className="flex items-center gap-2"><FiMapPin /> {branch.address}</p>
                <p className="flex items-center gap-2"><FiPhone /> {branch.phone}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-surface-variant">
                <div className="bg-surface p-4 border border-outline-variant text-center">
                  <p className="headline-md text-primary">{branch.bookCount || 0}</p>
                  <p className="label-md text-secondary uppercase tracking-wider">Books</p>
                </div>
                <div className="bg-surface p-4 border border-outline-variant text-center">
                  <p className="headline-md text-primary">{branch.orderCount || 0}</p>
                  <p className="label-md text-secondary uppercase tracking-wider">Orders</p>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

<<<<<<< HEAD
function BooksTab({ storeId, branches }) {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [files, setFiles] = useState({
    imageFile: null,
    documentFile: null,
  });
=======
function BooksTab({ branches }) {
  const [booksByBranch, setBooksByBranch] = useState([]);  // [{branch, books}]
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [files, setFiles] = useState({ imageFile: null, documentFile: null });
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
  const [form, setForm] = useState({
    title: "", author: "", category: "", price: "",
    condition: "NEW", branchId: "",
  });

  const CATEGORIES = [
<<<<<<< HEAD
    "Technology","Fiction","Business","Science","Philosophy","Biography","Religion","Education","Other"
=======
    "Technology", "Fiction", "Business", "Science", "Philosophy", "Biography", "Religion", "Education", "Other"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
  ];

  useEffect(() => {
    if (!branches.length) return;
    Promise.all(
<<<<<<< HEAD
      branches.map((b) =>
        api.get(`/books/store/my-branch`)
          .then((r) => unwrapList(r))
          .catch(() => [])
      )
    ).then((results) => {
      setBooks(results.flat());
    }).finally(() => setLoading(false));
  }, [branches]);

=======
      branches.map((branch) =>
        api.get(`/books/store/branch/${branch.id}`)
          .then((r) => ({ branch, books: unwrapList(r) }))
          .catch(() => ({ branch, books: [] }))
      )
    ).then((results) => {
      setBooksByBranch(results);
    }).finally(() => setLoading(false));
  }, [branches]);

  // Helper: total book count across all branches
  const totalBooks = booksByBranch.reduce((sum, g) => sum + g.books.length, 0);

>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
  const handleAdd = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    try {
      const formData = new FormData();
<<<<<<< HEAD
      const bookData = {
        ...form,
        price: parseFloat(form.price),
      };

      formData.append(
        "data",
        new Blob([JSON.stringify(bookData)], { type: "application/json" })
      );
      if (files.imageFile) formData.append("image", files.imageFile);
      if (files.documentFile) formData.append("documentFile", files.documentFile);

      const res = await api.post("/books/store", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const newBook = unwrapItem(res);
      setBooks((prev) => [newBook, ...prev]);
      setShowAdd(false);
      setForm({ title: "", author: "", category: "", price: "", condition: "NEW", branchId: "" });
      setFiles({ imageFile: null, documentFile: null });
    } catch {}
    finally { setAddLoading(false); }
=======
      const bookData = { ...form, price: parseFloat(form.price) };
      formData.append("data", new Blob([JSON.stringify(bookData)], { type: "application/json" }));
      if (files.imageFile) formData.append("image", files.imageFile);
      if (files.documentFile) formData.append("documentFile", files.documentFile);

      const res = await api.post(`/books/store/branch/${form.branchId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      const newBook = unwrapItem(res);
      setBooksByBranch((prev) =>
        prev.map((g) =>
          g.branch.id === form.branchId ? { ...g, books: [newBook, ...g.books] } : g
        )
      );
      setShowAdd(false);
      setForm({ title: "", author: "", category: "", price: "", condition: "NEW", branchId: "" });
      setFiles({ imageFile: null, documentFile: null });
    } catch (err) {
      console.error("Failed to add book", err);
    } finally { setAddLoading(false); }
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
  };

  const handleCancelAdd = () => {
    setShowAdd(false);
    setFiles({ imageFile: null, documentFile: null });
  };

  const handleDelete = async (bookId) => {
    if (!confirm("Delete this book?")) return;
    try {
      await api.delete(`/books/${bookId}`);
<<<<<<< HEAD
      setBooks((prev) => prev.filter((b) => b.id !== bookId));
    } catch {}
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-textMain text-xl">Books</h2>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors"
        >
          + Add Book
        </button>
=======
      setBooksByBranch((prev) =>
        prev.map((g) => ({ ...g, books: g.books.filter((b) => b.id !== bookId) }))
      );
    } catch (err) {
      console.error("Failed to delete book", err);
    }
  };

  const handleApprove = async (bookId) => {
    try {
      await api.put(`/books/store/${bookId}/approve`);
      setBooksByBranch((prev) =>
        prev.map((g) => ({
          ...g,
          books: g.books.map((b) => b.id === bookId ? { ...b, approved: true, status: "APPROVED" } : b),
        }))
      );
    } catch (err) {
      console.error("Failed to approve book", err);
    }
  };

  const handleReject = async (bookId) => {
    try {
      await api.put(`/books/store/${bookId}/reject`);
      setBooksByBranch((prev) =>
        prev.map((g) => ({
          ...g,
          books: g.books.map((b) => b.id === bookId ? { ...b, approved: false, status: "REJECTED" } : b),
        }))
      );
    } catch (err) {
      console.error("Failed to reject book", err);
    }
  };

  // Filter per-branch grouped data
  const filteredByBranch = booksByBranch.map((g) => ({
    ...g,
    books: g.books.filter((book) => {
      if (filterStatus === "ALL") return true;
      const status = book.status ? book.status.toUpperCase() : (book.approved ? "APPROVED" : "PENDING");
      return status === filterStatus;
    }),
  })).filter((g) => g.books.length > 0 || filterStatus === "ALL");

  // Also keep a flat list to check if there are any books at all
  const hasAnyBooks = booksByBranch.some((g) => g.books.length > 0);
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-variant pb-6 gap-4">
        <h2 className="display-sm text-primary">Books Archive</h2>
        <div className="flex items-center gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-auto px-4 py-3 pr-8 bg-surface border border-outline-variant text-primary label-md outline-none focus:border-primary transition-colors cursor-pointer"
          >
            <option value="ALL">All Status</option>
            <option value="APPROVED">Approved</option>
            <option value="PENDING">Pending</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
      </div>

      {/* Add book form */}
      {showAdd && (
<<<<<<< HEAD
        <form onSubmit={handleAdd} className="bg-card rounded-2xl shadow-sm p-5 flex flex-col gap-4 border-2 border-primary/20">
          <h3 className="font-semibold text-textMain">New Book</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: "title",  label: "Title",  placeholder: "Book title" },
              { key: "author", label: "Author", placeholder: "Author name" },
              { key: "price",  label: "Price (ETB)", placeholder: "e.g. 350", type: "number" },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-1.5">
=======
        <form onSubmit={handleAdd} className="bg-surface-container-lowest border border-surface-variant shadow-elevation-1 p-8 flex flex-col gap-6">
          <h3 className="headline-md text-primary">New Title Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { key: "title", label: "Title", placeholder: "Book title" },
              { key: "author", label: "Author", placeholder: "Author name" },
              { key: "price", label: "Price (ETB)", placeholder: "e.g. 350", type: "number" },
            ].map((f) => (
              <div key={f.key}>
                <label className="block label-md text-secondary uppercase tracking-wider mb-2">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                  {f.label}
                </label>
                <input
                  type={f.type || "text"}
                  value={form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
<<<<<<< HEAD
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary text-sm bg-surface outline-none transition-colors"
=======
                  className="w-full px-4 py-3 bg-surface border border-outline-variant focus:border-primary body-md text-primary outline-none transition-colors"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                />
              </div>
            ))}

            {/* Category */}
            <div>
<<<<<<< HEAD
              <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-1.5">
=======
              <label className="block label-md text-secondary uppercase tracking-wider mb-2">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
<<<<<<< HEAD
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary text-sm bg-surface outline-none transition-colors"
=======
                className="appearance-auto w-full px-4 py-3 bg-surface border border-outline-variant focus:border-primary body-md text-primary outline-none transition-colors"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
              >
                <option value="">Select category...</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Condition */}
            <div>
<<<<<<< HEAD
              <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-1.5">
=======
              <label className="block label-md text-secondary uppercase tracking-wider mb-2">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                Condition
              </label>
              <select
                value={form.condition}
                onChange={(e) => setForm({ ...form, condition: e.target.value })}
<<<<<<< HEAD
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary text-sm bg-surface outline-none transition-colors"
              >
                <option value="NEW">New</option>
                <option value="USED">Used</option>
              </select>
            </div>

            {/* Branch */}
            <div>
              <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-1.5">
                Branch
              </label>
              <select
                value={form.branchId}
                onChange={(e) => setForm({ ...form, branchId: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary text-sm bg-surface outline-none transition-colors"
              >
                <option value="">Select branch...</option>
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>{b.branchName}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                key: "imageFile",
                label: "Book Cover",
=======
                className="appearance-auto w-full px-4 py-3 bg-surface border border-outline-variant focus:border-primary body-md text-primary outline-none transition-colors"
              >
                <option value="NEW">New</option>
                <option value="GOOD">Good</option>
                <option value="FAIR">Fair</option>
                <option value="POOR">Poor</option>
              </select>
            </div>


          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                key: "imageFile",
                label: "Cover Art",
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                accept: "image/*",
                hint: "Upload a JPG, PNG, or WEBP cover image",
              },
              {
                key: "documentFile",
<<<<<<< HEAD
                label: "Book Document",
=======
                label: "Manuscript (PDF/Doc)",
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                accept: ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                hint: "Upload the book PDF or document file",
              },
            ].map((f) => (
              <label
                key={f.key}
<<<<<<< HEAD
                className="border-2 border-dashed border-gray-200 rounded-2xl p-4 bg-surface hover:border-primary/60 transition-colors cursor-pointer"
              >
                <span className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-1">
                  {f.label}
                </span>
                <span className="block text-xs text-textMuted mb-3">
                  {files[f.key] ? files[f.key].name : f.hint}
                </span>
                <span className="inline-flex items-center justify-center bg-card border-2 border-gray-200 text-textMuted px-4 py-2 rounded-full text-xs font-semibold">
                  {files[f.key] ? "Change file" : "Choose file"}
=======
                className="border border-dashed border-outline-variant bg-surface hover:border-primary p-6 transition-colors cursor-pointer text-center"
              >
                <span className="block label-md text-primary uppercase tracking-wider mb-2">
                  {f.label}
                </span>
                <span className="block body-md text-secondary mb-4">
                  {files[f.key] ? files[f.key].name : f.hint}
                </span>
                <span className="btn-secondary px-6 py-2 label-md inline-block">
                  {files[f.key] ? "Change File" : "Choose File"}
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                </span>
                <input
                  type="file"
                  accept={f.accept}
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setFiles((prev) => ({ ...prev, [f.key]: file }));
                  }}
                  className="hidden"
                />
              </label>
            ))}
          </div>

<<<<<<< HEAD
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={addLoading}
              className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-60"
            >
              {addLoading ? "Adding..." : "Add Book"}
=======
          <div className="flex gap-4 mt-4 border-t border-surface-variant pt-6">
            <button
              type="submit"
              disabled={addLoading}
              className="btn-primary px-8 py-3 label-md disabled:opacity-60"
            >
              {addLoading ? "Saving..." : "Save Title"}
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
            </button>
            <button
              type="button"
              onClick={handleCancelAdd}
<<<<<<< HEAD
              className="border-2 border-gray-200 text-textMuted px-6 py-2.5 rounded-full text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
=======
              className="btn-secondary px-8 py-3 label-md"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
            >
              Cancel
            </button>
          </div>
        </form>
      )}

<<<<<<< HEAD
      {/* Books table */}
      {loading ? (
        <div className="flex flex-col gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-card rounded-2xl h-16 animate-pulse" />
          ))}
        </div>
      ) : books.length === 0 ? (
        <div className="bg-card rounded-2xl p-12 text-center shadow-sm">
          <p className="text-4xl mb-3">📚</p>
          <p className="font-semibold text-textMain">No books listed yet</p>
          <p className="text-textMuted text-sm mt-1">Add your first book to start selling</p>
        </div>
      ) : (
        <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-surface">
              <tr>
                {["Title", "Author", "Category", "Price", "Condition", "Document", "Status", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-textMuted uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-textMain">{book.title}</td>
                  <td className="px-4 py-3 text-textMuted">{book.author}</td>
                  <td className="px-4 py-3 text-textMuted">{book.category}</td>
                  <td className="px-4 py-3 font-semibold text-primary">ETB {book.price}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      book.condition === "NEW"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {book.condition}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {getBookDocumentUrl(book) ? (
                      <a
                        href={getBookDocumentUrl(book)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-xs text-textMuted">None</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      book.approved
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {book.approved ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="text-red-400 hover:text-red-600 transition-colors text-xs font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
=======
      {/* Books grouped by branch */}
      {loading ? (
        <div className="flex flex-col gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-surface-container-lowest border border-surface-variant h-20 animate-pulse" />
          ))}
        </div>
      ) : !hasAnyBooks ? (
        <div className="bg-surface-container-lowest border border-surface-variant p-16 text-center shadow-elevation-1">
          <p className="text-5xl mb-6 opacity-80 flex justify-center"><FiBook /></p>
          <p className="headline-md text-primary">No titles curated yet</p>
          <p className="body-lg text-secondary mt-2">Add your first book to start selling</p>
        </div>
      ) : (
        <div className="flex flex-col gap-12">
          {filteredByBranch.map(({ branch, books: branchBooks }) => (
            <div key={branch.id}>
              {/* Branch header */}
              <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-primary/20">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary label-md font-bold flex-shrink-0">
                  <FiHome />
                </div>
                <div className="flex-1">
                  <h3 className="headline-md text-primary">{branch.branchName}</h3>
                  <p className="body-md text-secondary">{branch.city}, {branch.region} · {branchBooks.length} title{branchBooks.length !== 1 ? "s" : ""}</p>
                </div>
                <button
                  onClick={() => {
                    setForm({ ...form, branchId: branch.id });
                    setShowAdd(true);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="btn-primary px-4 py-2 label-md hover:bg-white hover:text-primary hover:border-2 border-primary transition-colors"
                >
                  + Add Title
                </button>
              </div>

              {branchBooks.length === 0 ? (
                <p className="body-md text-secondary italic pl-2">No books match this filter for this branch.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {branchBooks.map((book) => (
                    <div key={book.id} className="bg-surface-container-lowest border border-surface-variant p-6 shadow-elevation-1 flex flex-col gap-4 group hover:border-primary transition-colors">
                      <div className="flex gap-4">
                        {getBookImageUrl(book) ? (
                          <img src={getBookImageUrl(book)} alt={book.title} className="w-20 h-28 object-cover border border-outline-variant flex-shrink-0" />
                        ) : (
                          <div className="w-20 h-28 bg-surface-variant border border-outline-variant flex items-center justify-center text-secondary flex-shrink-0 text-3xl">
                            <FiBook />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="headline-sm text-primary line-clamp-2" title={book.title}>{book.title}</p>
                          <p className="body-md text-secondary mt-1 truncate" title={book.author}>{book.author}</p>
                          <p className="headline-sm text-primary mt-3">ETB {book.price}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-y-4 gap-x-2 border-t border-surface-variant pt-4 mt-2">
                        <div>
                          <p className="label-md text-secondary uppercase tracking-wider">Category</p>
                          <p className="body-md text-primary mt-1">{book.category}</p>
                        </div>
                        <div>
                          <p className="label-md text-secondary uppercase tracking-wider">Condition</p>
                          <span className={`inline-block mt-1 label-md uppercase tracking-wider px-2 py-0.5 border ${book.condition === "NEW" ? "bg-primary/5 text-primary border-primary" : "bg-surface text-secondary border-outline-variant"}`}>
                            {book.condition}
                          </span>
                        </div>
                        <div>
                          <p className="label-md text-secondary uppercase tracking-wider">Document</p>
                          {getBookDocumentUrl(book) ? (
                            <a href={getBookDocumentUrl(book)} target="_blank" rel="noreferrer" className="inline-block mt-1 label-md text-primary hover:underline uppercase tracking-wider">
                              View
                            </a>
                          ) : (
                            <span className="inline-block mt-1 body-md text-secondary">None</span>
                          )}
                        </div>
                        <div>
                          <p className="label-md text-secondary uppercase tracking-wider">Status</p>
                          <span className={`inline-block mt-1 label-md uppercase tracking-wider px-2 py-0.5 border ${(book.status === "APPROVED" || (!book.status && book.approved)) ? "bg-primary/5 text-primary border-primary" :
                            book.status === "REJECTED" ? "bg-error/5 text-error border-error" :
                              "bg-surface text-secondary border-outline-variant"
                            }`}>
                            {book.status ? book.status : (book.approved ? "APPROVED" : "PENDING")}
                          </span>
                        </div>
                      </div>
                      <div className="mt-auto pt-4 border-t border-surface-variant flex flex-col gap-2">
                        {((book.status && book.status.toUpperCase() === "PENDING") || (!book.status && !book.approved)) && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApprove(book.id)}
                              className="flex-1 btn-primary py-2 label-md hover:bg-white hover:text-primary hover:border-2 border-primary"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(book.id)}
                              className="flex-1 btn-secondary py-2 label-md text-error hover:border-error hover:bg-error/5 transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        <button
                          onClick={() => handleDelete(book.id)}
                          className="w-full btn-secondary py-2 label-md text-error hover:border-error hover:bg-error/5 transition-colors"
                        >
                          Delete Title
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
        </div>
      )}
    </div>
  );
}

<<<<<<< HEAD
function EarningsTab({ storeId, store }) {
  const commission = store?.plan === "PREMIUM" ? 2 : 5;
  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-display font-bold text-textMain text-xl">Earnings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon="💰" label="Total Revenue"    value="ETB 0"  color="bg-green-50"  />
        <StatCard icon="🏦" label="Total Payouts"    value="ETB 0"  color="bg-blue-50"   />
        <StatCard icon="📉" label="Commission Rate"  value={`${commission}%`} color="bg-red-50" sub={`${store?.plan || "FREE"} plan`} />
      </div>
      <div className="bg-card rounded-2xl shadow-sm p-8 text-center">
        <p className="text-4xl mb-3">📊</p>
        <p className="font-semibold text-textMain">Earnings data will appear here</p>
        <p className="text-textMuted text-sm mt-1">Once you receive orders, your revenue breakdown will show here</p>
=======
function EarningsTab({ store }) {
  const commission = store?.plan === "PREMIUM" ? 2 : 5;
  return (
    <div className="flex flex-col gap-8">
      <h2 className="display-sm text-primary border-b border-surface-variant pb-6">Earnings Report</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard icon={<FiDollarSign />} label="Total Revenue" value="ETB 0" />
        <StatCard icon={<FiBriefcase />} label="Total Payouts" value="ETB 0" />
        <StatCard icon={<FiTrendingDown />} label="Commission Rate" value={`${commission}%`} sub={`${store?.plan || "FREE"} plan`} />
      </div>
      <div className="bg-surface-container-lowest border border-surface-variant p-16 text-center shadow-elevation-1">
        <p className="text-5xl mb-6 opacity-80 flex justify-center"><FiPieChart /></p>
        <p className="headline-md text-primary">Earnings log unavailable</p>
        <p className="body-lg text-secondary mt-2">Once you receive orders, your revenue breakdown will display here.</p>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
      </div>
    </div>
  );
}

function EmployeesTab({ storeId, branches }) {
<<<<<<< HEAD
  const [employees, setEmployees] = useState([]);
=======
  const [employeesByBranch, setEmployeesByBranch] = useState([]);
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
  const [loading, setLoading] = useState(true);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    role: "WORKER",
    branchId: "",
  });
<<<<<<< HEAD

  useEffect(() => {
    if (!storeId) return;

    api.get(`/stores/${storeId}/employees`)
      .then((res) => setEmployees(unwrapList(res)))
      .catch(() => setEmployees([]))
      .finally(() => setLoading(false));
  }, [storeId]);
=======
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showInviteForBranchId, setShowInviteForBranchId] = useState(null);

  useEffect(() => {
    if (!branches?.length) return;

    setLoading(true);
    Promise.all(
      branches.map(branch =>
        api.get(`/users/stores/me/branch/${branch.id}/employees`)
          .then(res => ({
            branch,
            employees: unwrapList(res)
          }))
          .catch(() => ({ branch, employees: [] }))
      )
    ).then(results => {
      setEmployeesByBranch(results);
    }).finally(() => setLoading(false));
  }, [branches]);
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)

  const handleInvite = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!form.email.trim()) {
      setError("Employee email is required");
      return;
    }

    if (!form.branchId) {
      setError("Select a branch for this employee");
      return;
    }

    setInviteLoading(true);
    try {
      const payload = {
        email: form.email.trim(),
        role: form.role,
      };
      const res = await api.post(`/users/stores/me/branch/${form.branchId}/employees`, payload);
      const invited = unwrapItem(res);

      if (invited?.id || invited?.email) {
<<<<<<< HEAD
        setEmployees((prev) => [invited, ...prev]);
=======
        setEmployeesByBranch((prev) =>
          prev.map(g => g.branch.id === form.branchId ? { ...g, employees: [invited, ...g.employees] } : g)
        );
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
      }

      setMessage(`Invitation sent to ${payload.email}`);
      setForm({ email: "", role: "WORKER", branchId: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send invitation. Please try again.");
    } finally {
      setInviteLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-display font-bold text-textMain text-xl">Employees</h2>
        <p className="text-textMuted text-sm mt-1">Invite managers and staff using their email address.</p>
      </div>

      <form onSubmit={handleInvite} className="bg-card rounded-2xl shadow-sm p-5 flex flex-col gap-4">
        <h3 className="font-semibold text-textMain text-base">Invite Employee</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="employee@example.com"
              className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary text-sm bg-surface outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-1.5">
              Role
            </label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary text-sm bg-surface outline-none transition-colors"
            >
              <option value="WORKER">Worker</option>
              <option value="MANAGER">Manager</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-1.5">
              Branch
            </label>
            <select
              value={form.branchId}
              onChange={(e) => setForm({ ...form, branchId: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary text-sm bg-surface outline-none transition-colors"
            >
              <option value="">Select branch...</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>{branch.branchName}</option>
              ))}
            </select>
          </div>
        </div>

        {message && <p className="text-sm font-medium text-green-600">{message}</p>}
        {error && <p className="text-sm font-medium text-red-500">{error}</p>}

        <div>
          <button
            type="submit"
            disabled={inviteLoading}
            className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-60"
          >
            {inviteLoading ? "Sending..." : "Send Invite"}
          </button>
        </div>
      </form>

      <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-textMain text-base">Team Members</h3>
        </div>

        {loading ? (
          <div className="p-5 flex flex-col gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-surface rounded-xl animate-pulse" />
            ))}
          </div>
        ) : employees.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-4xl mb-3">👥</p>
            <p className="font-semibold text-textMain">No employees yet</p>
            <p className="text-textMuted text-sm mt-1">Invited employees will appear here.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-surface">
              <tr>
                {["Email", "Role", "Branch", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-textMuted uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {employees.map((employee) => (
                <tr key={employee.id || employee.email} className="hover:bg-surface/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-textMain">{employee.email}</td>
                  <td className="px-4 py-3 text-textMuted">{employee.role || "Staff"}</td>
                  <td className="px-4 py-3 text-textMuted">
                    {employee.branchName || branches.find((branch) => branch.id === employee.branchId)?.branchName || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700">
                      {employee.status || "Invited"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
=======
    <div className="flex flex-col gap-8">
      <div className="border-b border-surface-variant pb-6">
        <h2 className="display-sm text-primary">Store Personnel</h2>
        <p className="body-lg text-secondary mt-2">Invite managers and staff to help curate your bookstore.</p>
      </div>



      <div className="bg-surface-container-lowest border border-surface-variant shadow-elevation-1 overflow-x-auto">
        <div className="px-8 py-6 border-b border-surface-variant">
          <h3 className="headline-md text-primary">Team Members</h3>
        </div>

        {loading ? (
          <div className="p-8 flex flex-col gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-surface border border-outline-variant animate-pulse" />
            ))}
          </div>
        ) : employeesByBranch.every(g => g.employees.length === 0) ? (
          <div className="p-16 text-center">
            <p className="text-5xl mb-6 opacity-80 flex justify-center"><FiUsers /></p>
            <p className="headline-md text-primary">No personnel yet</p>
            <p className="body-lg text-secondary mt-2">Invited team members will appear here.</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {employeesByBranch.map(({ branch, employees: branchStaff }) => (
              <div key={branch.id} className="border-b border-surface-variant last:border-b-0">
                <div className="bg-surface-variant/30 px-8 py-4 flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary label-md font-bold">
                    <FiHome />
                  </div>
                  <h4 className="label-md text-primary uppercase tracking-widest">{branch.branchName} Staff</h4>
                  <button
                    onClick={() => {
                      setShowInviteForBranchId(showInviteForBranchId === branch.id ? null : branch.id);
                      setForm({ ...form, branchId: branch.id });
                      setMessage("");
                      setError("");
                    }}
                    className="btn-secondary px-4 py-1.5 label-md ml-6 hover:border-primary hover:text-white transition-colors"
                  >
                    {showInviteForBranchId === branch.id ? "Cancel" : "+ Add Employee"}
                  </button>
                  <span className="label-md text-secondary ml-auto">{branchStaff.length} Member{branchStaff.length !== 1 ? 's' : ''}</span>
                </div>

                {showInviteForBranchId === branch.id && (
                  <div className="px-8 py-8 border-b border-surface-variant bg-surface-container-lowest animate-in fade-in slide-in-from-top-4 duration-300">
                    <form onSubmit={handleInvite} className="flex flex-col gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block label-md text-secondary uppercase tracking-wider mb-2">Email Address</label>
                          <input
                            required
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="employee@example.com"
                            className="w-full px-4 py-3 bg-surface border border-outline-variant focus:border-primary body-md text-primary outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block label-md text-secondary uppercase tracking-wider mb-2">Role</label>
                          <select
                            value={form.role}
                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                            className="w-full px-4 py-3 bg-surface border border-outline-variant focus:border-primary body-md text-primary outline-none transition-colors"
                          >
                            <option value="WORKER">Worker</option>
                            <option value="MANAGER">Manager</option>
                          </select>
                        </div>
                      </div>

                      {message && <p className="body-md text-primary bg-primary/5 p-3 border border-primary/20">{message}</p>}
                      {error && <p className="body-md text-error bg-error/5 p-3 border border-error/20">{error}</p>}

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={inviteLoading}
                          className="btn-primary px-8 py-3 label-md disabled:opacity-60 hover:border-primary hover:border-2 hover:text-primary hover:bg-white"
                        >
                          {inviteLoading ? "Sending..." : "Send Invite to Branch"}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                {branchStaff.length === 0 ? (
                  <div className="px-8 py-10 text-center border-t border-surface-variant">
                    <p className="body-md text-secondary italic">No staff members assigned to this branch yet.</p>
                  </div>
                ) : (
                  <table className="w-full text-left">
                    <thead className="bg-surface border-b border-surface-variant">
                      <tr>
                        {["Email", "Role", "Status", "Action"].map((h) => (
                          <th key={h} className="px-6 py-4 label-md text-secondary uppercase tracking-wider">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-variant">
                      {branchStaff.map((employee) => (
                        <tr key={employee.id || employee.email} className="hover:bg-surface transition-colors">
                          <td className="px-6 py-4 headline-sm text-primary">{employee.email}</td>
                          <td className="px-6 py-4 body-md text-secondary">{employee.role || "Staff"}</td>
                          <td className="px-6 py-4">
                            <span className="label-md uppercase tracking-wider border border-outline-variant px-3 py-1 text-secondary bg-surface">
                              {employee.status || "Invited"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => setSelectedEmployee({ ...employee, branchName: branch.branchName })}
                              className="btn-secondary px-4 py-1.5 label-md hover:border-primary hover:text-white transition-colors"
                            >
                              View →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedEmployee && (
        <EmployeeDetailDrawer
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}

function OrderDetailDrawer({ orderId, onClose, branches }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!orderId) return;
    setLoading(true); setErr(""); setOrder(null);
    api.get(`/orders/store/${orderId}`)
      .then((res) => { const d = res.data?.data; setOrder(d && !Array.isArray(d) ? d : null); })
      .catch(() => setErr("Failed to load order details."))
      .finally(() => setLoading(false));
  }, [orderId]);


  useEffect(() => {
    if (!order || !order.items?.length) return;

    // Fetch individual book details for each order item
    setLoading(true);
    Promise.all(
      order.items.map((item) =>
        api.get(`/books/${item.bookId}`)
          .then((r) => {
            const bookData = r.data?.data;
            return {
              ...item, // quantity, price, bookId, id
              title: bookData?.title || "Unknown Title",
              author: bookData?.author || "Unknown Author",
              documents: bookData?.documents || [],
              // Derived image URL for easier rendering
              imageUrl: getBookImageUrl(bookData)
            };
          })
          .catch(() => ({
            ...item,
            title: "Unknown Title",
            author: "Unknown Author",
            documents: []
          }))
      )
    ).then((mergedResults) => {
      setBooks(mergedResults);
    }).finally(() => setLoading(false));
  }, [order]);


  const branchName = (id) => branches.find((b) => b.id === id)?.branchName || "—";
  const fmt = (dt) => dt ? new Date(dt).toLocaleString("en-ET", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";
  const STATUS_COLORS = { PENDING: "bg-surface text-secondary border-outline-variant", CONFIRMED: "bg-primary/5 text-primary border-primary", PAID: "bg-primary/5 text-primary border-primary", SHIPPED: "bg-primary/10 text-primary border-primary", DELIVERED: "bg-primary/10 text-primary border-primary", CANCELLED: "bg-error/5 text-error border-error" };
  const PAYMENT_COLORS = { PENDING: "bg-surface text-secondary border-outline-variant", PAID: "bg-primary/5 text-primary border-primary", COMPLETED: "bg-primary/5 text-primary border-primary", FAILED: "bg-error/5 text-error border-error", REFUNDED: "bg-surface text-secondary border-outline-variant" };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Drawer */}
      <aside className="fixed top-0 right-0 h-full w-full max-w-lg z-50 bg-background border-l border-surface-variant shadow-elevation-1 flex flex-col overflow-hidden">
        {/* Drawer header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-surface-variant flex-shrink-0">
          <div>
            <p className="label-md text-secondary uppercase tracking-wider">Order Detail</p>
            <p className="font-mono headline-sm text-primary mt-1">
              #{String(orderId).slice(0, 8).toUpperCase()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center border border-outline-variant text-secondary hover:text-primary hover:border-primary transition-colors text-xl"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Drawer body */}
        <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-8">
          {loading ? (
            <div className="flex flex-col gap-4">
              {[...Array(5)].map((_, i) => <div key={i} className="h-10 bg-surface border border-surface-variant animate-pulse" />)}
            </div>
          ) : err ? (
            <p className="body-md text-error">{err}</p>
          ) : !order ? (
            <p className="body-md text-secondary">No data found.</p>
          ) : (
            <>
              {/* Meta grid */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                {[
                  { label: "Branch", value: branchName(order.branchId) },
                  { label: "Placed On", value: fmt(order.createdAt) },
                  { label: "Total", value: `ETB ${Number(order.totalPrice || 0).toLocaleString()}` },
                  { label: "Shipping Address", value: order.shippingAddress || "—" },
                ].map(({ label, value }) => (
                  <div key={label} className="border-b border-outline-variant/30 pb-2">
                    <p className="label-md text-secondary uppercase tracking-wider">{label}</p>
                    <p className="body-md text-primary mt-1">{value}</p>
                  </div>
                ))}
                <div className="border-b border-outline-variant/30 pb-2">
                  <p className="label-md text-secondary uppercase tracking-wider">Status</p>
                  <span className={`inline-block mt-1 label-md uppercase tracking-wider px-2 py-0.5 border ${STATUS_COLORS[order.status?.toUpperCase()] || "bg-surface text-secondary border-outline-variant"}`}>
                    {order.status || "—"}
                  </span>
                </div>
                <div className="border-b border-outline-variant/30 pb-2">
                  <p className="label-md text-secondary uppercase tracking-wider">Payment</p>
                  <span className={`inline-block mt-1 label-md uppercase tracking-wider px-2 py-0.5 border ${PAYMENT_COLORS[order.paymentStatus?.toUpperCase()] || "bg-surface text-secondary border-outline-variant"}`}>
                    {order.paymentStatus || "—"}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="headline-sm text-primary mb-4 pb-2 border-b border-surface-variant">Order Items</h3>
                {!books.length ? (
                  <p className="body-md text-secondary">No items found.</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {books.map((bookItem, idx) => (
                      <div key={bookItem.id || idx} className="flex items-center gap-4 p-4 bg-surface border border-outline-variant">
                        <div className="w-12 h-16 bg-surface-variant border border-outline-variant flex-shrink-0 overflow-hidden">
                          {bookItem.imageUrl ? (
                            <img src={bookItem.imageUrl} alt={bookItem.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-secondary text-xl"><FiBook /></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="label-md text-primary truncate" title={bookItem.title}>{bookItem.title}</p>
                          <p className="body-sm text-secondary truncate">{bookItem.author}</p>
                          <p className="font-mono text-[10px] text-secondary mt-1 uppercase">ID: {String(bookItem.bookId).slice(0, 8)}</p>
                        </div>
                        <div className="flex gap-6 items-center flex-shrink-0">
                          <div className="text-center min-w-[30px]">
                            <p className="label-md text-secondary uppercase tracking-wider text-[10px]">Qty</p>
                            <p className="label-md text-primary">{bookItem.quantity}</p>
                          </div>
                          <div className="text-right min-w-[80px]">
                            <p className="label-md text-secondary uppercase tracking-wider text-[10px]">Unit Price</p>
                            <p className="label-md text-primary">ETB {Number(bookItem.price || 0).toLocaleString()}</p>
                          </div>
                          <div className="text-right min-w-[90px]">
                            <p className="label-md text-secondary uppercase tracking-wider text-[10px]">Subtotal</p>
                            <p className="label-md text-primary font-bold">ETB {(Number(bookItem.price || 0) * bookItem.quantity).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}

function EmployeeDetailDrawer({ employee, onClose }) {
  if (!employee) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside className="fixed top-0 right-0 h-full w-full max-w-lg z-50 bg-background border-l border-surface-variant shadow-elevation-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-8 py-6 border-b border-surface-variant flex-shrink-0">
          <div>
            <p className="label-md text-secondary uppercase tracking-wider">Personnel Profile</p>
            <p className="headline-sm text-primary mt-1 truncate max-w-[300px]">
              {employee.email}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center border border-outline-variant text-secondary hover:text-primary hover:border-primary transition-colors text-xl"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-10">
          {/* Identity Section */}
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-3xl">
              <FiUser />
            </div>
            <div>
              <p className="display-sm text-primary">{employee.name || "Unregistered User"}</p>
              <p className="body-lg text-secondary mt-1">{employee.role || "Staff"}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { label: "Assigned Branch", value: employee.branchName || "—" },
              { label: "Status", value: employee.status || "Invited", isBadge: true },
              { label: "Phone Number", value: employee.phoneNumber || "—" },
              { label: "Joined On", value: employee.createdAt ? new Date(employee.createdAt).toLocaleDateString() : "—" },
              { label: "Email Address", value: employee.email, fullWidth: true },
            ].map((d) => (
              <div key={d.label} className={`${d.fullWidth ? "sm:col-span-2" : ""} border-b border-outline-variant/30 pb-4`}>
                <p className="label-md text-secondary uppercase tracking-wider">{d.label}</p>
                {d.isBadge ? (
                  <span className="inline-block mt-2 label-md uppercase tracking-wider px-3 py-1 border border-outline-variant text-secondary bg-surface">
                    {d.value}
                  </span>
                ) : (
                  <p className="body-lg text-primary mt-1 font-medium">{d.value}</p>
                )}
              </div>
            ))}
          </div>

          {/* Actions placeholder */}
          <div className="mt-auto pt-8 border-t border-surface-variant flex flex-col gap-4">
            <button className="w-full btn-secondary py-3 text-error border-error/30 hover:bg-error/5 transition-colors label-md">
              Revoke Access
            </button>
            <button className="w-full btn-secondary py-3 border-outline-variant label-md">
              Change Role
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function OrdersTab({ branches }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterPayment, setFilterPayment] = useState("ALL");
  const [drawerOrderId, setDrawerOrderId] = useState(null);

  useEffect(() => {
    api.get("/orders/store")
      .then((res) => setOrders(unwrapList(res)))
      .catch((err) => {
        console.error("Failed to fetch store orders", err);
        setError("Unable to load orders. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Resolve branch name from branchId
  const branchName = (branchId) =>
    branches.find((b) => b.id === branchId)?.branchName || "Unknown Branch";

  // Apply filters
  const filtered = orders.filter((o) => {
    const statusOk = filterStatus === "ALL" || o.status?.toUpperCase() === filterStatus;
    const paymentOk = filterPayment === "ALL" || o.paymentStatus?.toUpperCase() === filterPayment;
    return statusOk && paymentOk;
  });

  // Group by branch
  const grouped = branches.reduce((acc, branch) => {
    const branchOrders = filtered.filter((o) => o.branchId === branch.id);
    if (branchOrders.length > 0) acc.push({ branch, orders: branchOrders });
    return acc;
  }, []);
  // Also add ungrouped (branchId not matching any known branch)
  const knownBranchIds = new Set(branches.map((b) => b.id));
  const ungrouped = filtered.filter((o) => !knownBranchIds.has(o.branchId));
  if (ungrouped.length > 0) {
    grouped.push({ branch: { id: "unknown", branchName: "Other" }, orders: ungrouped });
  }

  const STATUS_COLORS = {
    PENDING: "bg-surface text-secondary border-outline-variant",
    CONFIRMED: "bg-primary/5 text-primary border-primary",
    SHIPPED: "bg-primary/10 text-primary border-primary",
    DELIVERED: "bg-primary/10 text-primary border-primary",
    CANCELLED: "bg-error/5 text-error border-error",
  };
  const PAYMENT_COLORS = {
    PENDING: "bg-surface text-secondary border-outline-variant",
    PAID: "bg-primary/5 text-primary border-primary",
    FAILED: "bg-error/5 text-error border-error",
    REFUNDED: "bg-surface text-secondary border-outline-variant",
  };

  const fmt = (dt) => dt ? new Date(dt).toLocaleString("en-ET", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  }) : "—";

  return (
    <div className="flex flex-col gap-8">
      {/* Header + filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-variant pb-6 gap-4">
        <div>
          <h2 className="display-sm text-primary">Orders</h2>
          <p className="body-md text-secondary mt-1">
            {loading ? "Loading..." : `${orders.length} total · ${filtered.length} shown`}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-auto px-4 py-2 bg-surface border border-outline-variant text-primary label-md outline-none focus:border-primary transition-colors cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <select
            value={filterPayment}
            onChange={(e) => setFilterPayment(e.target.value)}
            className="appearance-auto px-4 py-2 bg-surface border border-outline-variant text-primary label-md outline-none focus:border-primary transition-colors cursor-pointer"
          >
            <option value="ALL">All Payments</option>
            <option value="PENDING">Unpaid</option>
            <option value="PAID">Paid</option>
            <option value="FAILED">Failed</option>
            <option value="REFUNDED">Refunded</option>
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-error/5 border border-error text-error body-md px-6 py-4">
          {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading ? (
        <div className="flex flex-col gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-surface-container-lowest border border-surface-variant animate-pulse" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-surface-container-lowest border border-surface-variant p-16 text-center shadow-elevation-1">
          <p className="text-5xl mb-6 opacity-80 flex justify-center"><FiBox /></p>
          <p className="headline-md text-primary">No orders yet</p>
          <p className="body-lg text-secondary mt-2">Orders placed for your store will appear here.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-surface-container-lowest border border-surface-variant p-12 text-center shadow-elevation-1">
          <p className="headline-md text-primary">No orders match the selected filters</p>
          <button
            onClick={() => { setFilterStatus("ALL"); setFilterPayment("ALL"); }}
            className="btn-secondary mt-4 px-6 py-2 label-md"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-12">
          {grouped.map(({ branch, orders: branchOrders }) => (
            <div key={branch.id}>
              {/* Branch header */}
              <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-primary/20">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary label-md font-bold flex-shrink-0">
                  <FiHome />
                </div>
                <div>
                  <h3 className="headline-md text-primary">{branch.branchName}</h3>
                  <p className="body-md text-secondary">{branchOrders.length} order{branchOrders.length !== 1 ? "s" : ""}</p>
                </div>
              </div>

              {/* Orders table */}
              <div className="bg-surface-container-lowest border border-surface-variant shadow-elevation-1 overflow-x-auto">
                <table className="w-full text-left min-w-[640px]">
                  <thead className="bg-surface border-b border-surface-variant">
                    <tr>
                      {["Order ID", "Date", "Total", "Status", "Payment", ""].map((h) => (
                        <th key={h} className="px-6 py-4 label-md text-secondary uppercase tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-variant">
                    {branchOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-surface transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-mono label-md text-primary">
                            #{String(order.id).slice(0, 8).toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 body-md text-secondary whitespace-nowrap">
                          {fmt(order.createdAt)}
                        </td>
                        <td className="px-6 py-4 headline-sm text-primary whitespace-nowrap">
                          ETB {Number(order.totalPrice || 0).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`label-md uppercase tracking-wider px-2 py-0.5 border ${STATUS_COLORS[order.status?.toUpperCase()] || "bg-surface text-secondary border-outline-variant"
                            }`}>
                            {order.status || "—"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`label-md uppercase tracking-wider px-2 py-0.5 border ${PAYMENT_COLORS[order.paymentStatus?.toUpperCase()] || "bg-surface text-secondary border-outline-variant"
                            }`}>
                            {order.paymentStatus || "—"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setDrawerOrderId(order.id)}
                            className="btn-secondary px-4 py-1.5 label-md hover:border-primary hover:text-white transition-colors whitespace-nowrap"
                          >
                            View →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail drawer */}
      {drawerOrderId && (
        <OrderDetailDrawer
          orderId={drawerOrderId}
          branches={branches}
          onClose={() => setDrawerOrderId(null)}
        />
      )}
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
    </div>
  );
}

export default function StoreDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [store, setStore] = useState(null);
  const [branches, setBranches] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Fetch store info using keycloak_id
    api.get("/stores/me")
      .then((res) => {
        const s = unwrapItem(res);
        setStore(s);
        return s;
      })
      .then((s) => {
        if (!s?.id) return;
        // Fetch branches
        api.get(`/stores/me/branch`)
          .then((r) => setBranches(unwrapList(r)))
<<<<<<< HEAD
          .catch(() => {});
        // Fetch stats
        api.get(`/stores/${s.id}/stats`)
          .then((r) => setStats(unwrapItem(r)))
          .catch(() => {});
      })
      .catch(() => {})
=======
          .catch(() => { });
        // Fetch stats
        api.get(`/stores/${s.id}/stats`)
          .then((r) => setStats(unwrapItem(r)))
          .catch(() => { });
      })
      .catch(() => { })
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
<<<<<<< HEAD
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-textMuted">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium">Loading your store...</p>
=======
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 text-primary">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="headline-md">Loading your library...</p>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
        </div>
      </div>
    );
  }

  const TABS = {
<<<<<<< HEAD
    overview:  <OverviewTab store={store} branches={branches} stats={stats} />,
    branches:  <BranchesTab storeId={store?.id} branches={branches} setBranches={setBranches} />,
    books:     <BooksTab storeId={store?.id} branches={branches} />,
    earnings:  <EarningsTab storeId={store?.id} store={store} />,
    orders:    (
      <div className="bg-card rounded-2xl p-12 text-center shadow-sm">
        <p className="text-4xl mb-3">📦</p>
        <p className="font-semibold text-textMain">Orders for your branches</p>
        <p className="text-textMuted text-sm mt-1">Coming in the next step</p>
      </div>
    ),
    employees: <EmployeesTab storeId={store?.id} branches={branches} />,
    settings: (
      <div className="bg-card rounded-2xl shadow-sm p-6">
        <h2 className="font-display font-bold text-textMain text-xl mb-6">Store Settings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { label: "Store Name",      value: store?.storeName },
            { label: "Email",           value: store?.email },
            { label: "Phone",           value: store?.phone },
            { label: "Region",          value: store?.region },
            { label: "City",            value: store?.city },
            { label: "Plan",            value: store?.plan },
            { label: "TIN",             value: store?.tin },
            { label: "Reg. Number",     value: store?.businessRegNumber },
            { label: "Bank",            value: store?.bankName },
            { label: "Verification",    value: store?.verificationStatus },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs font-semibold text-textMuted uppercase tracking-wide">{item.label}</p>
              <p className="text-sm font-medium text-textMain mt-1">{item.value || "—"}</p>
=======
    overview: <OverviewTab store={store} branches={branches} stats={stats} />,
    branches: <BranchesTab branches={branches} setBranches={setBranches} />,
    books: <BooksTab branches={branches} />,
    earnings: <EarningsTab store={store} />,
    orders: <OrdersTab branches={branches} />,
    employees: <EmployeesTab storeId={store?.id} branches={branches} />,
    settings: (
      <div className="bg-surface-container-lowest border border-surface-variant shadow-elevation-1 p-8">
        <h2 className="display-sm text-primary mb-8 border-b border-surface-variant pb-4">Store Metadata</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
          {[
            { label: "Store Name", value: store?.storeName },
            { label: "Email", value: store?.email },
            { label: "Phone", value: store?.phone },
            { label: "Region", value: store?.region },
            { label: "City", value: store?.city },
            { label: "Plan", value: store?.plan },
            { label: "TIN", value: store?.tin },
            { label: "Reg. Number", value: store?.businessRegNumber },
            { label: "Bank", value: store?.bankName },
            { label: "Verification", value: store?.verificationStatus },
          ].map((item) => (
            <div key={item.label} className="border-b border-outline-variant/30 pb-2">
              <p className="label-md text-secondary uppercase tracking-wider">{item.label}</p>
              <p className="headline-sm text-primary mt-2">{item.value || "—"}</p>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
            </div>
          ))}
        </div>
      </div>
    ),
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-surface">
      {/* Top bar */}
      <div className="bg-card shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="font-display font-bold text-xl text-textMain"
          >
            read<span className="text-primary">books</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="text-sm text-textMuted hidden sm:block">{user?.email}</span>
            <img
              src={`https://i.pravatar.cc/32?u=${user?.email}`}
              className="w-8 h-8 rounded-full border-2 border-primary"
=======
    <div className="min-h-screen bg-background text-on-background font-body-md antialiased pt-24 pb-16">
      {/* Top bar using a style similar to Navbar.jsx */}
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md bg-background/80 border-b border-surface-variant">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="font-display font-bold text-3xl text-primary tracking-tight"
          >
            The<span className="italic text-secondary font-medium ml-2">Inkwell.</span>
          </button>
          <div className="flex items-center gap-4">
            <span className="body-md text-secondary hidden sm:block">{user?.email}</span>
            <img
              src={`https://i.pravatar.cc/40?u=${user?.email}`}
              className="w-10 h-10 rounded-full border border-outline-variant"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
              alt=""
            />
          </div>
        </div>
<<<<<<< HEAD
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-6">
        {/* Sidebar */}
        <StoreSidebar
          store={store}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          navigate={navigate}
        />
=======
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8 flex flex-col lg:flex-row gap-12 w-full">
        {/* Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <StoreSidebar
            store={store}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            navigate={navigate}
          />
        </div>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {TABS[activeTab]}
        </main>
      </div>
    </div>
  );
}
