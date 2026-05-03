import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import api from "../../api/axiosInstance";
import { unwrapList, unwrapItem } from "../../utils/apiHelpers";

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function AdminSidebar({ activeTab, setActiveTab }) {
  const { user, logout } = useAuth();
  const NAV = [
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
      {NAV.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
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
        </button>
      </div>
    </aside>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, color = "bg-primary/10" }) {
  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-2xl flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-textMuted text-xs font-medium uppercase tracking-wide">{label}</p>
        <p className="text-textMain font-bold text-2xl mt-0.5">{value}</p>
      </div>
    </div>
  );
}

// ─── Reject Modal ─────────────────────────────────────────────────────────────
function RejectModal({ target, type, onClose, onConfirm }) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!reason.trim()) return;
    setLoading(true);
    await onConfirm(reason);
    setLoading(false);
  };

  return (
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
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Store Card (reused across tabs) ─────────────────────────────────────────
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
          {store.verificationStatus || "PENDING"}
        </span>
      </div>

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
          </div>
        ) : null)}
      </div>

      {/* Documents */}
      {store.documents?.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-textMuted uppercase tracking-wide mb-2">
            Documents ({store.documents.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {store.documents.map((doc, i) => (
            <a
                key={i}
                href={doc.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 bg-surface px-3 py-1.5 rounded-lg text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
              >
                📄 {doc.type || `Document ${i + 1}`}
              </a>
            ))}
          </div>
        </div>
      )}

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
    } catch {}
    finally { setActionLoading(null); }
  };

  const handleReject = async (reason) => {
    const store = rejectTarget;
    try {
      await api.put(`/stores/admin/${store.id}/reject`, { reason });
      setStores((prev) => prev.filter((s) => s.id !== store.id));
    } catch {}
    finally { setRejectTarget(null); }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card rounded-2xl h-48 animate-pulse" />
        ))}
      </div>
    );
  }

  if (stores.length === 0) {
    return (
      <div className="bg-card rounded-2xl p-12 text-center shadow-sm">
        <p className="text-4xl mb-3">{emptyIcon}</p>
        <p className="font-semibold text-textMain">{emptyLabel}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stores.map((store) => (
          <StoreCard
            key={store.id}
            store={store}
            showApprove={showApprove}
            onApprove={handleApprove}
            onReject={setRejectTarget}
          />
        ))}
      </div>
      {rejectTarget && (
        <RejectModal
          target={rejectTarget}
          type="Store"
          onClose={() => setRejectTarget(null)}
          onConfirm={handleReject}
        />
      )}
    </>
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
    } catch {}
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-card rounded-2xl h-40 animate-pulse" />
        ))}
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="bg-card rounded-2xl p-12 text-center shadow-sm">
        <p className="text-4xl mb-3">📝</p>
        <p className="font-semibold text-textMain">No pending applications</p>
        <p className="text-textMuted text-sm mt-1">New store applications will appear here</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {applications.map((app) => (
        <ApplicationCard key={app.id} app={app} onApprove={handleApprove} />
      ))}
    </div>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────
function OverviewTab({ counts }) {
  return (
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
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Platform info */}
      <div className="bg-gradient-to-br from-[#1A1A2E] to-[#2d1b3d] rounded-2xl p-6 text-white">
        <h3 className="font-display font-bold text-lg mb-1">
          read<span className="text-primary">books</span> Admin
        </h3>
        <p className="text-white/50 text-sm">
          Manage store verifications, approve applications, and monitor platform transactions.
        </p>
      </div>
    </div>
  );
}

// ─── Transactions Tab ─────────────────────────────────────────────────────────
function TransactionsTab() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-display font-bold text-textMain text-xl">Transaction Monitor</h2>
      <div className="bg-card rounded-2xl p-12 text-center shadow-sm">
        <p className="text-4xl mb-3">💳</p>
        <p className="font-semibold text-textMain">Transaction monitoring</p>
        <p className="text-textMuted text-sm mt-1">
          All platform orders and payment statuses will appear here
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
    pending: (
      <div className="flex flex-col gap-5">
        <h2 className="font-display font-bold text-textMain text-xl">Pending Stores</h2>
        <p className="text-textMuted text-sm -mt-3">
          Stores registered but not yet submitted documents.
        </p>
        <StoreListTab
          endpoint="/stores/admin/pending"
          emptyIcon="⏳"
          emptyLabel="No pending stores"
          showApprove={false}
        />
      </div>
    ),
    "awaiting-docs": (
      <div className="flex flex-col gap-5">
        <h2 className="font-display font-bold text-textMain text-xl">Awaiting Documents</h2>
        <p className="text-textMuted text-sm -mt-3">
          Stores that have been sent the complete profile link but haven't submitted yet.
        </p>
        <StoreListTab
          endpoint="/stores/admin/awaiting-docs"
          emptyIcon="📄"
          emptyLabel="No stores awaiting documents"
          showApprove={false}
        />
      </div>
    ),
    "docs-submitted": (
      <div className="flex flex-col gap-5">
        <h2 className="font-display font-bold text-textMain text-xl">Documents Submitted</h2>
        <p className="text-textMuted text-sm -mt-3">
          Stores that have uploaded their documents — ready for your review.
        </p>
        <StoreListTab
          endpoint="/stores/admin/docs-submitted"
          emptyIcon="📋"
          emptyLabel="No stores with submitted documents"
          showApprove={true}
        />
      </div>
    ),
    applications: (
      <div className="flex flex-col gap-5">
        <h2 className="font-display font-bold text-textMain text-xl">Store Applications</h2>
        <p className="text-textMuted text-sm -mt-3">
          Initial applications from users wanting to become stores.
          Approving sends them the complete profile link.
        </p>
        <ApplicationsTab />
      </div>
    ),
    transactions: <TransactionsTab />,
  };

  return (
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
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-6">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 min-w-0">
          {TABS[activeTab]}
        </main>
      </div>
    </div>
  );
}
