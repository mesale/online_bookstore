import { useKeycloak } from "@react-keycloak/web";

export default function HomePage() {
  const { keycloak } = useKeycloak();

  const roles = keycloak.tokenParsed?.realm_access?.roles || [];
  const isLoggedIn = keycloak.authenticated;
  const isStoreAdmin = roles.includes("ROLE_STORE_ADMIN");
  const isUser = roles.includes("ROLE_USER");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-600">📚 Bookstore</h1>
        <div className="flex gap-3">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => keycloak.login()}
                className="px-4 py-2 text-sm border border-green-600 text-green-600 rounded hover:bg-green-50"
              >
                Login
              </button>
              <button
                onClick={() => keycloak.register()}
                className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
              >
                Register
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {keycloak.tokenParsed?.name}
              </span>
              {isStoreAdmin && (
                /* FIXED: Added the opening <a tag here */
                <a
                  href="/complete-profile"
                  className="text-sm text-green-600 hover:underline"
                >
                  Complete Store Profile
                </a>
              )}
              <button
                onClick={() => keycloak.logout()}
                className="px-4 py-2 text-sm border border-red-400 text-red-400 rounded hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Ethiopia's Online Bookstore Platform
        </h2>
        <p className="text-gray-500 text-lg mb-10">
          Browse books from stores across the country, or list your own store.
        </p>

        {isLoggedIn && isUser && !isStoreAdmin && (
          /* FIXED: Added the opening <a tag here */
          <a
            href="/become-a-store"
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
          >
            Become a Store
          </a>
        )}

        {!isLoggedIn && (
          <button
            onClick={() => keycloak.login()}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
          >
            Get Started
          </button>
        )}
      </div>
    </div>
  );
}