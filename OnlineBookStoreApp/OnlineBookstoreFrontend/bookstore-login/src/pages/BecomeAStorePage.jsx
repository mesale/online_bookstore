import { useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import api from "../api/axios";

export default function BecomeAStorePage() {
  const { keycloak } = useKeycloak();
  const [businessEmail, setBusinessEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  if (!keycloak.authenticated) {
    keycloak.login();
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post("/api/users/me/store-application/initiate", {
        businessEmail,
      });
      setSent(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">📧</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Check Your Email
          </h2>
          <p className="text-gray-500">
            We've sent a registration link to{" "}
            <span className="font-medium text-gray-700">{businessEmail}</span>.
            The link will expire in 48 hours.
          </p>
          
          {/* FIXED: Added the <a tag here */}
          <a
            href="/"
            className="inline-block mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Become a Store
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Enter your business email and we'll send you a registration form link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Email
            </label>
            <input
              type="email"
              value={businessEmail}
              onChange={(e) => setBusinessEmail(e.target.value)}
              required
              placeholder="store@example.com"
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50 text-sm font-medium"
          >
            {loading ? "Sending..." : "Send Registration Link"}
          </button>
        </form>
      </div>
    </div>
  );
}