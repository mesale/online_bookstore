import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import api from "../api/axios";

export default function StoreApplicationPage() {
  const [searchParams] = useSearchParams();
  const { keycloak } = useKeycloak();
  const token = searchParams.get("token");

  const [tokenStatus, setTokenStatus] = useState("validating");
  const [businessEmail, setBusinessEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    storeName: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    country: "",
    description: "",
  });

  useEffect(() => {
    if (!token) {
      setTokenStatus("invalid");
      return;
    }
    api
      .get(`/api/users/me/store-application/validate-token?token=${token}`)
      .then((res) => {
        setBusinessEmail(res.data.data.email);
        setTokenStatus("valid");
      })
      .catch(() => setTokenStatus("invalid"));
  }, [token]);

  useEffect(() => {
    if (tokenStatus === "valid" && !keycloak.authenticated) {
      keycloak.login({
        redirectUri: window.location.href,
      });
    }
  }, [tokenStatus, keycloak.authenticated]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await api.post("/api/users/me/store-application/submit", {
        businessEmail,
        token,
        ...form,
      });
      setSubmitted(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (tokenStatus === "validating") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400 text-sm">Validating your link...</p>
      </div>
    );
  }

  if (tokenStatus === "invalid") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-5xl mb-4">❌</div>
          <h2 className="text-2xl font-semibold text-red-500 mb-2">
            Invalid or Expired Link
          </h2>
          <p className="text-gray-500 text-sm">
            This registration link is invalid or has already been used.
          </p>
          {/* FIXED: Added <a tag below */}
          <a
            href="/"
            className="inline-block mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Application Submitted!
          </h2>
          <p className="text-gray-500 text-sm">
            Your application is under review. We'll notify you once it's
            approved.
          </p>
          {/* FIXED: Added <a tag below */}
          <a
            href="/"
            className="inline-block mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-1">
        Store Registration
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        Registering for:{" "}
        <span className="font-medium text-gray-700">{businessEmail}</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          { label: "Store Name", name: "storeName" },
          { label: "Phone", name: "phone" },
          { label: "Address", name: "address" },
          { label: "City", name: "city" },
          { label: "Region", name: "region" },
          { label: "Country", name: "country" },
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              name={name}
              value={form[name]}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Store Description{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50 text-sm font-medium"
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}