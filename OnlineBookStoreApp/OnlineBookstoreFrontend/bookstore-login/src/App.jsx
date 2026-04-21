import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import HomePage from "./pages/HomePage";
import StoreApplicationPage from "./pages/StoreApplicationPage";
import BecomeAStorePage from "./pages/BecomeAStorePage";
import CompleteProfilePage from "./pages/CompleteProfilePage";

function App() {
  const { initialized } = useKeycloak();

  if (!initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/become-a-store" element={<BecomeAStorePage />} />
        <Route path="/store-application" element={<StoreApplicationPage />} />
        <Route path="/complete-profile" element={<CompleteProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;