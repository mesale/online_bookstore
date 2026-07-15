import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL || "https://aexin-196-188-242-147.free.pinggy.net",
  realm: import.meta.env.VITE_KEYCLOAK_REALM || "bookstore-realm",
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || "bookstore-frontend",
});

export default keycloak;