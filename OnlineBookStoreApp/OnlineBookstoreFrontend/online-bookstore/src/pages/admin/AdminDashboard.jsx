import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import api from "../../api/axiosInstance";
import { unwrapList } from "../../utils/apiHelpers";
import {
  FiPieChart, FiClock, FiFileText, FiClipboard, FiEdit3, FiCreditCard,
  FiShield, FiLogOut, FiHome, FiFile
} from "react-icons/fi";
// ─── Sidebar ──────────────────────────────────────────────────────────────────
function AdminSidebar({ activeTab, setActiveTab }) {
  const { user, logout } = useAuth();
  const NAV = [
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

      {NAV.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
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
        </button>
      </div>
    </aside>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
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
      </div>
    </div>
  );
}

// ─── Reject Modal ─────────────────────────────────────────────────────────────
function RejectModal({ type, onClose, onConfirm }) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!reason.trim()) return;
    setLoading(true);
    await onConfirm(reason);
    setLoading(false);
  };

  return (
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
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Store Card (reused across tabs) ─────────────────────────────────────────
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
          {store.verificationStatus || "PENDING"}
        </span>
      </div>

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
          </div>
        ) : null)}
      </div>

      {store.documents?.length > 0 && (
        <div className="border-t border-surface-variant pt-6">
          <p className="label-md text-secondary uppercase tracking-wider mb-4">
            Verification Documents ({store.documents.length})
          </p>
          <div className="flex flex-wrap gap-3">
            {store.documents.map((doc, i) => (
              <a
                key={i}
                href={doc.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-surface border border-outline-variant px-4 py-2 text-primary hover:border-primary transition-all label-md"
              >
                <span className="flex items-center gap-2"><FiFile /> {doc.type || `Doc ${i + 1}`}</span>
              </a>
            ))}
          </div>
        </div>
      )}

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
    } catch (err) {
      console.error("Failed to approve store", err);
    }
    finally { setActionLoading(null); }
  };

  const handleReject = async (reason) => {
    const store = rejectTarget;
    try {
      await api.put(`/stores/admin/${store.id}/reject`, { reason });
      setStores((prev) => prev.filter((s) => s.id !== store.id));
    } catch (err) {
      console.error("Failed to reject store", err);
    }
    finally { setRejectTarget(null); }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-surface-container-lowest border border-surface-variant h-64 animate-pulse" />
        ))}
      </div>
    );
  }

  if (stores.length === 0) {
    return (
      <div className="bg-surface-container-lowest border border-surface-variant p-20 text-center shadow-elevation-1">
        <p className="text-5xl mb-6 opacity-80 flex justify-center">{emptyIcon}</p>
        <p className="headline-md text-primary">{emptyLabel}</p>
        <p className="body-lg text-secondary mt-2">All caught up! No tasks in this category.</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stores.map((store) => (
          <StoreCard
            key={store.id}
            store={store}
            showApprove={showApprove}
            actionLoading={actionLoading}
            onApprove={handleApprove}
            onReject={setRejectTarget}
          />
        ))}
      </div>
      {rejectTarget && (
        <RejectModal
          type="Store"
          onClose={() => setRejectTarget(null)}
          onConfirm={handleReject}
        />
      )}
    </div>
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
    } catch (err) {
      console.error("Failed to approve store application", err);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-surface-container-lowest border border-surface-variant h-40 animate-pulse" />
        ))}
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="bg-surface-container-lowest border border-surface-variant p-20 text-center shadow-elevation-1">
        <p className="text-5xl mb-6 flex justify-center"><FiEdit3 /></p>
        <p className="headline-md text-primary">No pending applications</p>
        <p className="body-lg text-secondary mt-2">New store applications will appear here for initial screening.</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-top-4 duration-500 grid grid-cols-1 md:grid-cols-2 gap-6">
      {applications.map((app) => (
        <ApplicationCard key={app.id} app={app} onApprove={handleApprove} />
      ))}
    </div>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────
function OverviewTab({ counts }) {
  return (
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
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Platform info */}
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
      </div>
    </div>
  );
}

// ─── Transactions Tab ─────────────────────────────────────────────────────────
function TransactionsTab() {
  return (
    <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-top-4 duration-500">
      <h2 className="display-sm text-primary border-b border-surface-variant pb-6">Transaction Monitor</h2>
      <div className="bg-surface-container-lowest border border-surface-variant p-20 text-center shadow-elevation-1">
        <p className="text-5xl mb-6 opacity-80 flex justify-center"><FiCreditCard /></p>
        <p className="headline-md text-primary">Transaction stream offline</p>
        <p className="body-lg text-secondary mt-2">
          Global platform orders and inter-branch payment settlements will be logged here.
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
        pending: unwrapList({ data: pending.value?.data }).length,
        awaitingDocs: unwrapList({ data: awaiting.value?.data }).length,
        docsSubmitted: unwrapList({ data: docs.value?.data }).length,
        applications: unwrapList({ data: apps.value?.data }).length,
      });
    });
  }, []);

  const TABS = {
    overview: <OverviewTab counts={counts} />,
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
          emptyLabel="No pending stores"
          showApprove={false}
        />
      </div>
    ),
    "awaiting-docs": (
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
          showApprove={false}
        />
      </div>
    ),
    "docs-submitted": (
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
          showApprove={true}
        />
      </div>
    ),
    applications: (
      <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="border-b border-surface-variant pb-6">
          <h2 className="display-sm text-primary">Store Inquiries</h2>
          <p className="body-lg text-secondary mt-2">
            Screen initial platform applications before granting access to registration.
          </p>
        </div>
        <ApplicationsTab />
      </div>
    ),
    transactions: <TransactionsTab />,
  };

  return (
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
              alt=""
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8 flex flex-col lg:flex-row gap-12 w-full">
        {/* Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {TABS[activeTab]}
        </main>
      </div>
    </div>
  );
}
