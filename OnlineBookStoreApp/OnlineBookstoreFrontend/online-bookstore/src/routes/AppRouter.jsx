<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
=======
import { Routes, Route } from "react-router-dom";
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
import HomePage from "../pages/public/HomePage";
import BookDetailsPage from "../pages/public/BookDetailsPage";
import SearchResultsPage from "../pages/public/SearchResultsPage";
import ProtectedRoute from "./ProtectedRoute";
import RegisterPage from "../pages/public/RegisterPage";
import RegisterSuccessPage from "../pages/public/RegisterSuccessPage";
import UserDashboard from "../pages/user/UserDashboard";
import CheckoutPage from "../pages/user/CheckoutPage";
import StoreDashboard from "../pages/store/StoreDashboard";
import StoreApplyPage from "../pages/store/StoreApplyPage";
import StoreCompleteProfilePage from "../pages/store/StoreCompleteProfilePage";
import AdminDashboard from "../pages/admin/AdminDashboard";
<<<<<<< HEAD

export default function AppRouter() {
  return (
    <BrowserRouter>
=======
import EmployeeDashboard from "../pages/store/EmployeeDashboard";

export default function AppRouter() {
  return (
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:id" element={<BookDetailsPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register-success" element={<RegisterSuccessPage />} />

        {/* User - ROLE_USER */}
        <Route path="/dashboard" element={
          <ProtectedRoute requiredRole="ROLE_USER">
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="/checkout" element={
          <ProtectedRoute requiredRole="ROLE_USER">
            <CheckoutPage />
          </ProtectedRoute>
        } />

        {/* Store Admin - ROLE_STORE_ADMIN */}
        <Route path="/store/*" element={
          <ProtectedRoute requiredRole="ROLE_STORE_ADMIN">
            <StoreDashboard />
          </ProtectedRoute>
        } />
        <Route path="/store/apply" element={
          <ProtectedRoute requiredRole="ROLE_USER">
            <StoreApplyPage />
          </ProtectedRoute>} />
        <Route path="/store-application" element={
          <ProtectedRoute requiredRole="ROLE_USER">
            <StoreApplyPage />
          </ProtectedRoute>} />
        <Route path="/complete-profile" element={
          <ProtectedRoute requiredRole="ROLE_STORE_ADMIN">
            <StoreCompleteProfilePage />
          </ProtectedRoute>
<<<<<<< HEAD
          } />
=======
        } />

        {/* Employee - ROLE_EMPLOYEE */}
        <Route path="/employee/*" element={
          <ProtectedRoute requiredRole="ROLE_WORKER">
            <EmployeeDashboard />
          </ProtectedRoute>
        } />
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)

        {/* Platform Admin - ROLE_ADMIN */}
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="ROLE_ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        } />

      </Routes>
<<<<<<< HEAD
    </BrowserRouter>
=======
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
  );
}