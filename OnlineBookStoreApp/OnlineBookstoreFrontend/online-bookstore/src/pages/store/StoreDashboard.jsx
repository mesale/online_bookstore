import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import api from "../../api/axiosInstance";
import { unwrapItem, unwrapList } from "../../utils/apiHelpers";
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
      </div>
    </div>
  );
}

function StoreSidebar({ store, activeTab, setActiveTab, navigate }) {
  const NAV = [
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
              {store?.plan || "FREE"} Plan
            </span>
          </div>
        </div>
        {/* Verification badge */}
        <div className={`mt-3 flex items-center gap-1.5 text-xs font-medium ${
          store?.verificationStatus === "APPROVED"
            ? "text-green-600" : "text-yellow-600"
        }`}>
          <span>{store?.verificationStatus === "APPROVED" ? "✓" : "⏳"}</span>
          <span>{store?.verificationStatus || "PENDING"}</span>
        </div>
      </div>

      {/* Nav items */}
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
          <span className="text-base">{item.icon}</span>
          {item.label}
        </button>
      ))}

      {/* Bottom — view store */}
      <div className="mt-auto pt-4 border-t border-gray-100">
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-textMuted hover:bg-surface hover:text-primary transition-colors"
        >
          <span>🌐</span> View Public Store
        </button>
      </div>
    </aside>
  );
}

function OverviewTab({ store, branches, stats }) {
  return (
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Plan info */}
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
            {store?.plan === "PREMIUM"
              ? "2% commission per sale · Priority support · Advanced analytics"
              : "5% commission per sale · Standard support · Basic analytics"}
          </p>
        </div>
        {store?.plan !== "PREMIUM" && (
          <button className="bg-amber-400 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-amber-500 transition-colors whitespace-nowrap">
            Upgrade →
          </button>
        )}
      </div>
    </div>
  );
}

function BranchesTab({ storeId, branches, setBranches }) {
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    branchName: "", region: "", city: "", address: "", phone: "",
  });

  const REGIONS = [
    "Addis Ababa","Oromia","Amhara","Tigray",
    "SNNPR","Somali","Afar","Benishangul-Gumuz","Gambela","Harari","Dire Dawa",
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
    } catch {}
    finally { setLoading(false); }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-textMain text-xl">Branches</h2>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors"
        >
          + Add Branch
        </button>
      </div>

      {/* Add branch form */}
      {showAdd && (
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
                  {f.label}
                </label>
                <input
                  type="text"
                  value={form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary text-sm bg-surface outline-none transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-1.5">
                Region
              </label>
              <select
                value={form.region}
                onChange={(e) => setForm({ ...form, region: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary text-sm bg-surface outline-none transition-colors"
              >
                <option value="">Select region...</option>
                {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add Branch"}
            </button>
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="border-2 border-gray-200 text-textMuted px-6 py-2.5 rounded-full text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Branch cards */}
      {branches.length === 0 ? (
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
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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
  const [form, setForm] = useState({
    title: "", author: "", category: "", price: "",
    condition: "NEW", branchId: "",
  });

  const CATEGORIES = [
    "Technology","Fiction","Business","Science","Philosophy","Biography","Religion","Education","Other"
  ];

  useEffect(() => {
    if (!branches.length) return;
    Promise.all(
      branches.map((b) =>
        api.get(`/books/store/my-branch`)
          .then((r) => unwrapList(r))
          .catch(() => [])
      )
    ).then((results) => {
      setBooks(results.flat());
    }).finally(() => setLoading(false));
  }, [branches]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    try {
      const formData = new FormData();
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
  };

  const handleCancelAdd = () => {
    setShowAdd(false);
    setFiles({ imageFile: null, documentFile: null });
  };

  const handleDelete = async (bookId) => {
    if (!confirm("Delete this book?")) return;
    try {
      await api.delete(`/books/${bookId}`);
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
      </div>

      {/* Add book form */}
      {showAdd && (
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
                  {f.label}
                </label>
                <input
                  type={f.type || "text"}
                  value={form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary text-sm bg-surface outline-none transition-colors"
                />
              </div>
            ))}

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-1.5">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary text-sm bg-surface outline-none transition-colors"
              >
                <option value="">Select category...</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-xs font-semibold text-textMain uppercase tracking-wide mb-1.5">
                Condition
              </label>
              <select
                value={form.condition}
                onChange={(e) => setForm({ ...form, condition: e.target.value })}
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
                accept: "image/*",
                hint: "Upload a JPG, PNG, or WEBP cover image",
              },
              {
                key: "documentFile",
                label: "Book Document",
                accept: ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                hint: "Upload the book PDF or document file",
              },
            ].map((f) => (
              <label
                key={f.key}
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

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={addLoading}
              className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-60"
            >
              {addLoading ? "Adding..." : "Add Book"}
            </button>
            <button
              type="button"
              onClick={handleCancelAdd}
              className="border-2 border-gray-200 text-textMuted px-6 py-2.5 rounded-full text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

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
        </div>
      )}
    </div>
  );
}

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
      </div>
    </div>
  );
}

function EmployeesTab({ storeId, branches }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    role: "WORKER",
    branchId: "",
  });

  useEffect(() => {
    if (!storeId) return;

    api.get(`/stores/${storeId}/employees`)
      .then((res) => setEmployees(unwrapList(res)))
      .catch(() => setEmployees([]))
      .finally(() => setLoading(false));
  }, [storeId]);

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
        setEmployees((prev) => [invited, ...prev]);
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
          .catch(() => {});
        // Fetch stats
        api.get(`/stores/${s.id}/stats`)
          .then((r) => setStats(unwrapItem(r)))
          .catch(() => {});
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-textMuted">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium">Loading your store...</p>
        </div>
      </div>
    );
  }

  const TABS = {
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
            </div>
          ))}
        </div>
      </div>
    ),
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
        {/* Sidebar */}
        <StoreSidebar
          store={store}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          navigate={navigate}
        />

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {TABS[activeTab]}
        </main>
      </div>
    </div>
  );
}
