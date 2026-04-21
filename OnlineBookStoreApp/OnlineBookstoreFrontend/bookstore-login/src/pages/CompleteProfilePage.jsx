import { useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import api from "../api/axios";

export default function CompleteProfilePage() {
  const { keycloak } = useKeycloak();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    storeName: "",
    businessRegNumber: "",
    tin: "",
    region: "",
    city: "",
    address: "",
    bankName: "",
    bankAccount: "",
  });
  const [ownerIdFile, setOwnerIdFile] = useState(null);
  const [businessLicenseFile, setBusinessLicenseFile] = useState(null);

  // Redirect to login if not authenticated
  if (!keycloak.authenticated) {
    keycloak.login();
    return null;
  }

  // Role-based access control
  const roles = keycloak.tokenParsed?.realm_access?.roles || [];
  if (!roles.includes("ROLE_STORE_ADMIN")) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 font-bold">Access denied: Store Admin role required.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      
      // Append the form fields as a JSON blob so Spring's @RequestPart can parse it as a DTO
      formData.append(
        "data",
        new Blob([JSON.stringify(form)], { type: "application/json" })
      );

      // Append the actual File objects
      if (ownerIdFile) {
        formData.append("ownerIdFile", ownerIdFile);
      }
      if (businessLicenseFile) {
        formData.append("businessLicenseFile", businessLicenseFile);
      }

      // IMPORTANT: We do NOT set the Content-Type header manually here.
      // Axios + browser will handle the boundary automatically.
      await api.put("/api/stores/me/complete-profile", formData);

      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setError(
        err.response?.data?.message || "Failed to submit documents. Please check the files and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-white shadow-lg rounded-lg">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Documents Submitted!
          </h2>
          <p className="text-gray-500 text-sm">
            Your profile is now under review. We'll notify you once you're ready to sell.
          </p>
          <a
            href="/"
            className="inline-block mt-6 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Complete Store Profile</h1>
        <p className="text-gray-500 text-sm mt-1">
          Verify your business to unlock all seller features.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Store Name", name: "storeName" },
            { label: "Registration Number", name: "businessRegNumber" },
            { label: "TIN", name: "tin" },
            { label: "Region", name: "region" },
            { label: "City", name: "city" },
            { label: "Address", name: "address" },
            { label: "Bank Name", name: "bankName" },
            { label: "Bank Account", name: "bankAccount" },
          ].map(({ label, name }) => (
            <div key={name} className={["storeName", "businessRegNumber"].includes(name) ? "md:col-span-2" : ""}>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                {label}
              </label>
              <input
                name={name}
                value={form[name]}
                onChange={handleChange}
                required={!["bankName", "bankAccount"].includes(name)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            </div>
          ))}
        </div>

        <hr className="border-gray-100" />

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
              Owner ID (Image or PDF)
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              required
              onChange={(e) => setOwnerIdFile(e.target.files[0])}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor:pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
              Business License (Image or PDF)
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              required
              onChange={(e) => setBusinessLicenseFile(e.target.files[0])}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor:pointer"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-md text-red-600 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 disabled:opacity-50 transition-all font-bold shadow-md active:scale-[0.98]"
        >
          {submitting ? "Processing..." : "Submit Verification Documents"}
        </button>
      </form>
    </div>
  );
}