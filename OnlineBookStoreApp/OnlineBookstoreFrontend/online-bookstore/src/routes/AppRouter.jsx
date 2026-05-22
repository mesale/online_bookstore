import { Routes, Route } from "react-router-dom";
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
import EmployeeDashboard from "../pages/store/EmployeeDashboard";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/books/:id" element={<BookDetailsPage />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/register-success" element={<RegisterSuccessPage />} />

      {/* User - ROLE_USun dev
npm error code EJSONPARSE
npm error JSON.parse Invalid package.json: JSONParseError: Expected double-quoted property name in JSON at position 415 (line 19 column 1) while parsing near "...ct-dom\": \"^19.2.5\",\n<<<<<<< HEAD\n=======..."
npm error JSON.parse Failed to parse JSON data.
npm error JSON.parse Note: package.json must be actual JSON, not just JavaScript.
npm error A complete log of this run can be found in: /home/mesale/.npm/_logs/2026-05-22T15_36_21_484Z-debug-0.log

ER */}
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
      } />

      {/* Employee - ROLE_EMPLOYEE */}
      <Route path="/employee/*" element={
        <ProtectedRoute requiredRole="ROLE_WORKER">
          <EmployeeDashboard />
        </ProtectedRoute>
      } />

      {/* Platform Admin - ROLE_ADMIN */}
      <Route path="/admin" element={
        <ProtectedRoute requiredRole="ROLE_ADMIN">
          <AdminDashboard />
        </ProtectedRoute>
      } />

    </Routes>
  );
}