import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import api from "../../api/axiosInstance";
<<<<<<< HEAD
import { unwrapList, unwrapItem } from "../../utils/apiHelpers";

=======
import { unwrapList } from "../../utils/apiHelpers";
import {
  FiPieChart, FiClock, FiFileText, FiClipboard, FiEdit3, FiCreditCard, 
  FiShield, FiLogOut, FiHome, FiFile
} from "react-icons/fi";
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
// ─── Sidebar ──────────────────────────────────────────────────────────────────
function AdminSidebar({ activeTab, setActiveTab }) {
  const { user, logout } = useAuth();
  const NAV = [
<<<<<<< HEAD
    { id: "overview",      icon: "📊", label: "Overview"           },
    { id: "pending",       icon: "⏳", label: "Pending Stores"     },
    { id: "awaiting-docs", icon: "📄", label: "Awaiting Docs"      },
    { id: "docs-submitted",icon: "📋", label: "Docs Submitted"     },
    { id: "applications",  icon: "📝", label: "Applications"       },
    { id: "transactions",  icon: "💳", label: "Transactions"       },
  ];

  return (
    <aside className="w-64 bg-card shadow-sm rounded-3xl p-4 flex flex-col gap-1 sticky top-20 self-start">
      <div className="px-3 py-4 mb-2 border-b border-gray-100">
        <p className="font-bold text-textMain text-sm">Platform Admin</p>
        <p className="text-xs text-textMuted mt-0.5 truncate">{user?.email}</p>
      </div>
=======
    { id: "overview", icon: <FiPieChart />, label: "Overview" },
    { id: "pending", icon: <FiClock />, label: "Pending Stores" },
    { id: "awaiting-docs", icon: <FiFileText />, label: "Awaiting Docs" },
    { id: "docs-submitted", icon: <FiClipboard />, label: "Docs Submitted" },
    { id: "applications", icon: <FiEdit3 />, label: "Applications" },
    { id: "transactions", icon: <FiCreditCard />, label: "Transactions" },
  ];

  return (
    <aside className="w-full lg:w-64 bg-surface-container-lowest border border-surface-variant shadow-elevation-1 p-6 flex flex-col gap-2 relative lg:sticky lg:top-28 self-start">
      <div className="pb-6 mb-4 border-b border-surface-variant">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border border-outline-variant bg-surface flex items-center justify-center text-xl">
            <FiShield />
          </div>
          <div className="min-w-0">
            <p className="display-sm text-primary truncate">Admin Panel</p>
            <span className="label-md px-2 py-0.5 mt-1 inline-block border bg-primary text-on-primary border-primary">
              Control Center
            </span>
          </div>
        </div>
      </div>

>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
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
          <span>{item.icon}</span>
          {item.label}
        </button>
      ))}
      <div className="mt-auto pt-4 border-t border-gray-100">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-50 transition-colors"
        >
          <span>🚪</span> Logout
=======
          className={`flex items-center gap-4 px-4 py-3 text-left transition-colors border-l-2 ${activeTab === item.id
            ? "border-primary bg-primary text-on-primary font-bold label-md"
            : "border-transparent text-secondary hover:bg-surface-variant hover:text-primary label-md"
            }`}
        >
          <span className="text-xl">{item.icon}</span>
          {item.label}
        </button>
      ))}

      <div className="mt-auto pt-6 border-t border-surface-variant">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 label-md text-error hover:bg-error/5 transition-colors border border-outline-variant hover:border-error"
        >
          <span><FiLogOut /></span> Platform Logout
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
        </button>
      </div>
    </aside>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
<<<<<<< HEAD
function StatCard({ icon, label, value, color = "bg-primary/10" }) {
  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-2xl flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-textMuted text-xs font-medium uppercase tracking-wide">{label}</p>
        <p className="text-textMain font-bold text-2xl mt-0.5">{value}</p>
=======
function StatCard({ icon, label, value, sub }) {
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

// ─── Reject Modal ─────────────────────────────────────────────────────────────
<<<<<<< HEAD
function RejectModal({ target, type, onClose, onConfirm }) {
=======
function RejectModal({ type, onClose, onConfirm }) {
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!reason.trim()) return;
    setLoading(true);
    await onConfirm(reason);
    setLoading(false);
  };

  return (
<<<<<<< HEAD
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <h2 className="font-display font-bold text-xl text-textMain mb-2">Reject {type}</h2>
        <p className="text-textMuted text-sm mb-5">
          Provide a reason for rejection. This will be sent to the applicant by email.
        </p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
          placeholder="e.g. Missing TIN certificate, please reapply with correct documents..."
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-400 text-sm bg-surface outline-none transition-colors resize-none mb-4"
        />
        <div className="flex gap-3">
          <button
            onClick={handleConfirm}
            disabled={!reason.trim() || loading}
            className="flex-1 bg-red-500 text-white rounded-full py-3 font-semibold text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {loading ? "Rejecting..." : "Confirm Rejection"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 border-2 border-gray-200 text-textMuted rounded-full py-3 font-semibold text-sm hover:border-primary hover:text-primary transition-colors"
          >
            Cancel
=======
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4 backdrop-blur-sm">
      <div className="bg-background border border-surface-variant shadow-elevation-3 p-10 w-full max-w-md animate-in zoom-in-95 duration-200">
        <h2 className="display-sm text-primary mb-2">Reject {type}</h2>
        <p className="body-md text-secondary mb-8">
          Provide a clear reason for rejection. This feedback will be sent directly to the applicant via email.
        </p>
        <textarea
          required
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
          placeholder="e.g. Missing TIN certificate, please re-upload valid business registration..."
          className="w-full px-4 py-4 bg-surface border-2 border-outline-variant focus:border-error body-md text-primary outline-none transition-colors resize-none mb-8"
        />
        <div className="flex flex-col gap-3">
          <button
            onClick={handleConfirm}
            disabled={!reason.trim() || loading}
            className="w-full bg-error text-on-error py-4 label-md hover:bg-error/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Processing..." : "Confirm Rejection"}
          </button>
          <button
            onClick={onClose}
            className="w-full btn-secondary py-4 label-md border-outline-variant"
          >
            Go Back
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Store Card (reused across tabs) ─────────────────────────────────────────
<<<<<<< HEAD
function StoreCard({ store, onApprove, onReject, showApprove = true }) {
  return (
    <div className="bg-card rounded-2xl shadow-sm p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl flex-shrink-0">
            🏪
          </div>
          <div>
            <p className="font-bold text-textMain text-base">{store.storeName}</p>
            <p className="text-xs text-textMuted mt-0.5">{store.email}</p>
          </div>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 ${
          store.verificationStatus === "APPROVED" ? "bg-green-100 text-green-700"
          : store.verificationStatus === "REJECTED" ? "bg-red-100 text-red-600"
          : store.verificationStatus === "DOCS_SUBMITTED" ? "bg-blue-100 text-blue-700"
          : "bg-yellow-100 text-yellow-700"
        }`}>
=======
function StoreCard({ store, onApprove, onReject, showApprove = true, actionLoading = null }) {
  const isActionLoading = actionLoading === store.id;

  return (
    <div className="bg-surface-container-lowest border border-surface-variant shadow-elevation-1 p-8 flex flex-col gap-8 group hover:border-primary transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border border-outline-variant bg-surface flex items-center justify-center text-2xl">
            <FiHome />
          </div>
          <div>
            <h4 className="headline-sm text-primary">{store.storeName}</h4>
            <p className="body-md text-secondary mt-1">{store.email}</p>
          </div>
        </div>
        <span className={`label-md px-3 py-1 border uppercase tracking-widest ${store.verificationStatus === "APPROVED" ? "bg-primary/5 text-primary border-primary"
            : store.verificationStatus === "REJECTED" ? "bg-error/5 text-error border-error"
              : store.verificationStatus === "DOCS_SUBMITTED" ? "bg-primary/10 text-primary border-primary font-bold"
                : "bg-surface text-secondary border-outline-variant"
          }`}>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
          {store.verificationStatus || "PENDING"}
        </span>
      </div>

<<<<<<< HEAD
      {/* Details grid */}
      <div className="grid grid-cols-2 gap-3 text-xs bg-surface rounded-xl p-3">
        {[
          { label: "Phone",    value: store.phone           },
          { label: "City",     value: store.city            },
          { label: "Region",   value: store.region          },
          { label: "Plan",     value: store.plan            },
          { label: "TIN",      value: store.tin             },
          { label: "Reg. No",  value: store.businessRegNumber },
          { label: "Bank",     value: store.bankName        },
          { label: "Account",  value: store.bankAccount     },
        ].map((item) => item.value ? (
          <div key={item.label}>
            <p className="text-textMuted font-medium">{item.label}</p>
            <p className="text-textMain font-semibold mt-0.5 truncate">{item.value}</p>
=======
      <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-surface-variant pt-6">
        {[
          { label: "Phone", value: store.phone },
          { label: "City", value: store.city },
          { label: "Region", value: store.region },
          { label: "Plan", value: store.plan },
          { label: "TIN", value: store.tin },
          { label: "Reg. No", value: store.businessRegNumber },
          { label: "Bank", value: store.bankName },
          { label: "Account", value: store.bankAccount },
        ].map((item) => item.value ? (
          <div key={item.label}>
            <p className="label-md text-secondary uppercase tracking-wider">{item.label}</p>
            <p className="body-md text-primary mt-1 font-medium truncate">{item.value}</p>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
          </div>
        ) : null)}
      </div>

<<<<<<< HEAD
      {/* Documents */}
      {store.documents?.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-textMuted uppercase tracking-wide mb-2">
            Documents ({store.documents.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {store.documents.map((doc, i) => (
            <a
=======
      {store.documents?.length > 0 && (
        <div className="border-t border-surface-variant pt-6">
          <p className="label-md text-secondary uppercase tracking-wider mb-4">
            Verification Documents ({store.documents.length})
          </p>
          <div className="flex flex-wrap gap-3">
            {store.documents.map((doc, i) => (
              <a
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                key={i}
                href={doc.url}
                target="_blank"
                rel="noreferrer"
<<<<<<< HEAD
                className="flex items-center gap-1.5 bg-surface px-3 py-1.5 rounded-lg text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
              >
                📄 {doc.type || `Document ${i + 1}`}
=======
                className="flex items-center gap-2 bg-surface border border-outline-variant px-4 py-2 text-primary hover:border-primary transition-all label-md"
              >
                <span className="flex items-center gap-2"><FiFile /> {doc.type || `Doc ${i + 1}`}</span>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
              </a>
            ))}
          </div>
        </div>
      )}

<<<<<<< HEAD
      {/* Actions */}
      {showApprove && (
        <div className="flex gap-3 pt-2 border-t border-gray-100">
          <button
            onClick={() => onApprove(store)}
            className="flex-1 bg-green-500 text-white rounded-full py-2.5 text-sm font-semibold hover:bg-green-600 transition-colors"
          >
            ✓ Approve
          </button>
          <button
            onClick={() => onReject(store)}
            className="flex-1 border-2 border-red-300 text-red-500 rounded-full py-2.5 text-sm font-semibold hover:bg-red-50 transition-colors"
          >
            ✕ Reject
=======
      {showApprove && (
        <div className="flex gap-4 pt-6 border-t border-surface-variant mt-auto">
          <button
            onClick={() => onApprove(store)}
            disabled={isActionLoading}
            className="flex-1 btn-primary py-3 label-md disabled:opacity-60"
          >
            {isActionLoading ? "Processing..." : "Approve Store"}
          </button>
          <button
            onClick={() => onReject(store)}
            className="flex-1 btn-secondary py-3 text-error border-error/30 hover:bg-error/5 transition-colors label-md"
          >
            Reject
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Application Card ─────────────────────────────────────────────────────────
function ApplicationCard({ app, onApprove }) {
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    await onApprove(app);
    setLoading(false);
  };

  return (
<<<<<<< HEAD
    <div className="bg-card rounded-2xl shadow-sm p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-bold text-textMain">{app.storeName}</p>
          <p className="text-xs text-textMuted mt-0.5">{app.businessEmail}</p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 flex-shrink-0">
          {app.status || "PENDING"}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs bg-surface rounded-xl p-3">
        {[
          { label: "Phone",   value: app.phone   },
          { label: "City",    value: app.city    },
          { label: "Address", value: app.address },
        ].map((item) => item.value ? (
          <div key={item.label}>
            <p className="text-textMuted">{item.label}</p>
            <p className="text-textMain font-semibold mt-0.5">{item.value}</p>
          </div>
        ) : null)}
      </div>
      {app.description && (
        <p className="text-xs text-textMuted bg-surface rounded-xl p-3 leading-relaxed">
          {app.description}
        </p>
      )}
      <div className="pt-2 border-t border-gray-100">
        <button
          onClick={handleApprove}
          disabled={loading}
          className="w-full bg-primary text-white rounded-full py-2.5 text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-60"
        >
          {loading ? "Approving..." : "Approve → Send Complete Profile Link"}
=======
    <div className="bg-surface-container-lowest border border-surface-variant shadow-elevation-1 p-8 flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="headline-sm text-primary">{app.storeName}</h4>
          <p className="body-md text-secondary mt-1">{app.businessEmail}</p>
        </div>
        <span className="label-md px-3 py-1 border border-outline-variant bg-surface text-secondary uppercase tracking-widest">
          {app.status || "NEW"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-y-4 gap-x-4 border-t border-surface-variant pt-6">
        {[
          { label: "Phone", value: app.phone },
          { label: "City", value: app.city },
          { label: "Address", value: app.address },
        ].map((item) => item.value ? (
          <div key={item.label}>
            <p className="label-md text-secondary uppercase tracking-wider">{item.label}</p>
            <p className="body-md text-primary mt-1 font-medium">{item.value}</p>
          </div>
        ) : null)}
      </div>

      {app.description && (
        <div className="bg-surface p-4 border-l-2 border-primary/20 italic">
          <p className="body-md text-secondary leading-relaxed">
            "{app.description}"
          </p>
        </div>
      )}

      <div className="pt-2 border-t border-surface-variant">
        <button
          onClick={handleApprove}
          disabled={loading}
          className="w-full btn-primary py-4 label-md disabled:opacity-60"
        >
          {loading ? "Approving..." : "Approve → Send Registration Link"}
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
        </button>
      </div>
    </div>
  );
}

// ─── Store List Tab (reused for pending / awaiting-docs / docs-submitted) ─────
function StoreListTab({ endpoint, emptyLabel, emptyIcon, showApprove = true }) {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    api.get(endpoint)
      .then((res) => setStores(unwrapList(res)))
      .catch(() => setStores([]))
      .finally(() => setLoading(false));
  }, [endpoint]);

  const handleApprove = async (store) => {
    setActionLoading(store.id);
    try {
      await api.put(`/stores/admin/${store.id}/approve`);
      setStores((prev) => prev.filter((s) => s.id !== store.id));
<<<<<<< HEAD
    } catch {}
=======
    } catch (err) {
      console.error("Failed to approve store", err);
    }
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
    finally { setActionLoading(null); }
  };

  const handleReject = async (reason) => {
    const store = rejectTarget;
    try {
      await api.put(`/stores/admin/${store.id}/reject`, { reason });
      setStores((prev) => prev.filter((s) => s.id !== store.id));
<<<<<<< HEAD
    } catch {}
=======
    } catch (err) {
      console.error("Failed to reject store", err);
    }
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
    finally { setRejectTarget(null); }
  };

  if (loading) {
    return (
<<<<<<< HEAD
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card rounded-2xl h-48 animate-pulse" />
=======
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-surface-container-lowest border border-surface-variant h-64 animate-pulse" />
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
        ))}
      </div>
    );
  }

  if (stores.length === 0) {
    return (
<<<<<<< HEAD
      <div className="bg-card rounded-2xl p-12 text-center shadow-sm">
        <p className="text-4xl mb-3">{emptyIcon}</p>
        <p className="font-semibold text-textMain">{emptyLabel}</p>
=======
      <div className="bg-surface-container-lowest border border-surface-variant p-20 text-center shadow-elevation-1">
        <p className="text-5xl mb-6 opacity-80 flex justify-center">{emptyIcon}</p>
        <p className="headline-md text-primary">{emptyLabel}</p>
        <p className="body-lg text-secondary mt-2">All caught up! No tasks in this category.</p>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
=======
    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
        {stores.map((store) => (
          <StoreCard
            key={store.id}
            store={store}
            showApprove={showApprove}
<<<<<<< HEAD
=======
            actionLoading={actionLoading}
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
            onApprove={handleApprove}
            onReject={setRejectTarget}
          />
        ))}
      </div>
      {rejectTarget && (
        <RejectModal
<<<<<<< HEAD
          target={rejectTarget}
=======
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
          type="Store"
          onClose={() => setRejectTarget(null)}
          onConfirm={handleReject}
        />
      )}
<<<<<<< HEAD
    </>
=======
    </div>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
  );
}

// ─── Applications Tab ─────────────────────────────────────────────────────────
function ApplicationsTab() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch store applications from user service
    api.get("/users/admin")
      .then((res) => setApplications(unwrapList(res)))
      .catch(() => setApplications([]))
      .finally(() => setLoading(false));
  }, []);

  const handleApprove = async (app) => {
    try {
      await api.put(`/users/admin/store-applications/${app.id}/approve`);
      setApplications((prev) => prev.filter((a) => a.id !== app.id));
<<<<<<< HEAD
    } catch {}
=======
    } catch (err) {
      console.error("Failed to approve store application", err);
    }
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
  };

  if (loading) {
    return (
<<<<<<< HEAD
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-card rounded-2xl h-40 animate-pulse" />
=======
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-surface-container-lowest border border-surface-variant h-40 animate-pulse" />
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
        ))}
      </div>
    );
  }

  if (applications.length === 0) {
    return (
<<<<<<< HEAD
      <div className="bg-card rounded-2xl p-12 text-center shadow-sm">
        <p className="text-4xl mb-3">📝</p>
        <p className="font-semibold text-textMain">No pending applications</p>
        <p className="text-textMuted text-sm mt-1">New store applications will appear here</p>
=======
      <div className="bg-surface-container-lowest border border-surface-variant p-20 text-center shadow-elevation-1">
        <p className="text-5xl mb-6 flex justify-center"><FiEdit3 /></p>
        <p className="headline-md text-primary">No pending applications</p>
        <p className="body-lg text-secondary mt-2">New store applications will appear here for initial screening.</p>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
=======
    <div className="animate-in fade-in slide-in-from-top-4 duration-500 grid grid-cols-1 md:grid-cols-2 gap-6">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
      {applications.map((app) => (
        <ApplicationCard key={app.id} app={app} onApprove={handleApprove} />
      ))}
    </div>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────
function OverviewTab({ counts }) {
  return (
<<<<<<< HEAD
    <div className="flex flex-col gap-6">
      <h2 className="font-display font-bold text-textMain text-xl">Platform Overview</h2>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="⏳" label="Pending Stores"    value={counts.pending}      color="bg-yellow-50" />
        <StatCard icon="📄" label="Awaiting Docs"     value={counts.awaitingDocs} color="bg-blue-50"   />
        <StatCard icon="📋" label="Docs Submitted"    value={counts.docsSubmitted}color="bg-purple-50" />
        <StatCard icon="📝" label="Applications"      value={counts.applications} color="bg-green-50"  />
      </div>

      {/* Quick actions */}
      <div className="bg-card rounded-2xl shadow-sm p-5">
        <h3 className="font-display font-bold text-textMain text-base mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "Review Pending Stores",  icon: "⏳", tab: "pending"        },
            { label: "Check Awaiting Docs",    icon: "📄", tab: "awaiting-docs"  },
            { label: "Review Submitted Docs",  icon: "📋", tab: "docs-submitted" },
          ].map((action) => (
            <button
              key={action.tab}
              className="flex items-center gap-3 p-4 bg-surface rounded-xl hover:bg-primary/5 hover:border-primary border-2 border-transparent transition-colors text-left group"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-sm font-medium text-textMain group-hover:text-primary transition-colors">
=======
    <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-top-4 duration-500">
      <div>
        <h2 className="display-md text-primary">Platform Overview</h2>
        <p className="body-lg text-secondary mt-2">Comprehensive oversight of the The Inkwell ecosystem.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard icon={<FiClock />} label="Pending Stores" value={counts.pending} sub="Awaiting docs" />
        <StatCard icon={<FiFileText />} label="Awaiting Docs" value={counts.awaitingDocs} sub="Sent profile links" />
        <StatCard icon={<FiClipboard />} label="Docs Submitted" value={counts.docsSubmitted} sub="Ready for review" />
        <StatCard icon={<FiEdit3 />} label="Applications" value={counts.applications} sub="New requests" />
      </div>

      {/* Quick actions */}
      <div className="bg-surface-container-lowest border border-surface-variant p-8 shadow-elevation-1">
        <h3 className="headline-md text-primary mb-6">Critical Paths</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Review Pending", icon: <FiClock />, tab: "pending" },
            { label: "Awaiting Docs", icon: <FiFileText />, tab: "awaiting-docs" },
            { label: "Submitted Docs", icon: <FiClipboard />, tab: "docs-submitted" },
          ].map((action) => (
            <button
              key={action.tab}
              className="flex items-center gap-4 p-6 bg-surface border border-outline-variant hover:border-primary hover:bg-primary/5 transition-all text-left group"
            >
              <span className="text-3xl opacity-80 group-hover:scale-110 transition-transform">{action.icon}</span>
              <span className="label-md text-primary uppercase tracking-wider font-bold">
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Platform info */}
<<<<<<< HEAD
      <div className="bg-gradient-to-br from-[#1A1A2E] to-[#2d1b3d] rounded-2xl p-6 text-white">
        <h3 className="font-display font-bold text-lg mb-1">
          read<span className="text-primary">books</span> Admin
        </h3>
        <p className="text-white/50 text-sm">
          Manage store verifications, approve applications, and monitor platform transactions.
        </p>
=======
      <div className="bg-primary p-10 text-on-primary shadow-elevation-2 relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="display-sm font-bold mb-2 uppercase tracking-tighter">
            The Inkwell. <span className="text-on-primary/60 font-medium">Administration</span>
          </h3>
          <p className="body-lg text-on-primary/80 max-w-2xl">
            You are operating at the core of the platform. Maintain the integrity of our bookstore ecosystem through diligent verification and oversight.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
      </div>
    </div>
  );
}

// ─── Transactions Tab ─────────────────────────────────────────────────────────
function TransactionsTab() {
  return (
<<<<<<< HEAD
    <div className="flex flex-col gap-5">
      <h2 className="font-display font-bold text-textMain text-xl">Transaction Monitor</h2>
      <div className="bg-card rounded-2xl p-12 text-center shadow-sm">
        <p className="text-4xl mb-3">💳</p>
        <p className="font-semibold text-textMain">Transaction monitoring</p>
        <p className="text-textMuted text-sm mt-1">
          All platform orders and payment statuses will appear here
=======
    <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-top-4 duration-500">
      <h2 className="display-sm text-primary border-b border-surface-variant pb-6">Transaction Monitor</h2>
      <div className="bg-surface-container-lowest border border-surface-variant p-20 text-center shadow-elevation-1">
        <p className="text-5xl mb-6 opacity-80 flex justify-center"><FiCreditCard /></p>
        <p className="headline-md text-primary">Transaction stream offline</p>
        <p className="body-lg text-secondary mt-2">
          Global platform orders and inter-branch payment settlements will be logged here.
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
        </p>
      </div>
    </div>
  );
}

// ─── Main Admin Dashboard ─────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [counts, setCounts] = useState({
    pending: 0, awaitingDocs: 0, docsSubmitted: 0, applications: 0,
  });

  useEffect(() => {
    // Fetch counts for overview
    Promise.allSettled([
      api.get("/stores/admin/pending"),
      api.get("/stores/admin/awaiting-docs"),
      api.get("/stores/admin/docs-submitted"),
      api.get("/users/admin"),
    ]).then(([pending, awaiting, docs, apps]) => {
      setCounts({
        pending:       unwrapList({ data: pending.value?.data }).length,
        awaitingDocs:  unwrapList({ data: awaiting.value?.data }).length,
        docsSubmitted: unwrapList({ data: docs.value?.data }).length,
        applications:  unwrapList({ data: apps.value?.data }).length,
      });
    });
  }, []);

  const TABS = {
    overview: <OverviewTab counts={counts} />,
<<<<<<< HEAD
    pending: (
      <div className="flex flex-col gap-5">
        <h2 className="font-display font-bold text-textMain text-xl">Pending Stores</h2>
        <p className="text-textMuted text-sm -mt-3">
          Stores registered but not yet submitted documents.
        </p>
        <StoreListTab
          endpoint="/stores/admin/pending"
          emptyIcon="⏳"
=======
    "pending": (
      <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="border-b border-surface-variant pb-6">
          <h2 className="display-sm text-primary">Pending Stores</h2>
          <p className="body-lg text-secondary mt-2">
            Stores registered but awaiting document submission.
          </p>
        </div>
        <StoreListTab
          endpoint="/stores/admin/pending"
          emptyIcon={<FiClock />}
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
          emptyLabel="No pending stores"
          showApprove={false}
        />
      </div>
    ),
    "awaiting-docs": (
<<<<<<< HEAD
      <div className="flex flex-col gap-5">
        <h2 className="font-display font-bold text-textMain text-xl">Awaiting Documents</h2>
        <p className="text-textMuted text-sm -mt-3">
          Stores that have been sent the complete profile link but haven't submitted yet.
        </p>
        <StoreListTab
          endpoint="/stores/admin/awaiting-docs"
          emptyIcon="📄"
          emptyLabel="No stores awaiting documents"
=======
      <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="border-b border-surface-variant pb-6">
          <h2 className="display-sm text-primary">Awaiting Documents</h2>
          <p className="body-lg text-secondary mt-2">
            Stores notified to complete their profiles.
          </p>
        </div>
        <StoreListTab
          endpoint="/stores/admin/awaiting-docs"
          emptyIcon={<FiFileText />}
          emptyLabel="Zero active follow-ups"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
          showApprove={false}
        />
      </div>
    ),
    "docs-submitted": (
<<<<<<< HEAD
      <div className="flex flex-col gap-5">
        <h2 className="font-display font-bold text-textMain text-xl">Documents Submitted</h2>
        <p className="text-textMuted text-sm -mt-3">
          Stores that have uploaded their documents — ready for your review.
        </p>
        <StoreListTab
          endpoint="/stores/admin/docs-submitted"
          emptyIcon="📋"
          emptyLabel="No stores with submitted documents"
=======
      <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="border-b border-surface-variant pb-6">
          <h2 className="display-sm text-primary">Review Queue</h2>
          <p className="body-lg text-secondary mt-2">
            Critical verifications: Review uploaded documents and finalize store activation.
          </p>
        </div>
        <StoreListTab
          endpoint="/stores/admin/docs-submitted"
          emptyIcon={<FiClipboard />}
          emptyLabel="Inbox Zero"
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
          showApprove={true}
        />
      </div>
    ),
    applications: (
<<<<<<< HEAD
      <div className="flex flex-col gap-5">
        <h2 className="font-display font-bold text-textMain text-xl">Store Applications</h2>
        <p className="text-textMuted text-sm -mt-3">
          Initial applications from users wanting to become stores.
          Approving sends them the complete profile link.
        </p>
=======
      <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="border-b border-surface-variant pb-6">
          <h2 className="display-sm text-primary">Store Inquiries</h2>
          <p className="body-lg text-secondary mt-2">
            Screen initial platform applications before granting access to registration.
          </p>
        </div>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
        <ApplicationsTab />
      </div>
    ),
    transactions: <TransactionsTab />,
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
            <span className="ml-2 text-xs font-sans font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              Admin
            </span>
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
            <span className="ml-4 text-[10px] uppercase tracking-[0.2em] font-sans font-bold bg-primary text-on-primary px-3 py-1">
              Admin
            </span>
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
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
=======
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8 flex flex-col lg:flex-row gap-12 w-full">
        {/* Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Main content */}
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
        <main className="flex-1 min-w-0">
          {TABS[activeTab]}
        </main>
      </div>
    </div>
  );
}
