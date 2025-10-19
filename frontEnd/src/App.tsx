import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import { Toaster } from "react-hot-toast";

import MainLayout from "./components/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load all page components for code splitting
const Product = lazy(() => import("./pages/product/Product"));
const Products = lazy(() => import("./pages/product/Products"));
const HomePage = lazy(() => import("./pages/home/HomePage"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ShoppingCart = lazy(() => import("./pages/order/ShoppingCart"));
const CheckOut = lazy(() => import("./pages/order/CheckOut"));
const Order = lazy(() => import("./pages/order/Orders"));
const OrderSummary = lazy(() => import("./pages/order/OrderSummary"));
const UserProfile = lazy(() => import("./pages/user/UserProfile"));
const Wishlist = lazy(() => import("./pages/wishlist/Wishlist"));

function App() {
  return (
    <ErrorBoundary>
      <Toaster position="top-right" />
      <Suspense fallback={<LoadingSpinner size="lg" fullScreen message="Loading..." />}>
        <Routes>
      {/* Public routes without MainLayout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Routes using MainLayout */}
      <Route element={<MainLayout />}>
        {/* Public routes - accessible without login */}
        <Route index element={<HomePage />} />

        <Route path="products">
          <Route index element={<Products />} />
          <Route path=":id" element={<Product />} />
        </Route>

        <Route path="wishlist" element={<Wishlist />} />

        {/* Protected routes that requires authentication */}
        <Route
          path="shopping-cart"
          element={
            <ProtectedRoute>
              <ShoppingCart />
            </ProtectedRoute>
          }
        />
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          }
        />

        <Route path="orders">
          <Route
            index
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <ProtectedRoute>
                <OrderSummary />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
