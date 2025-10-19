import { Routes, Route } from "react-router";
import "./App.css";

import Product from "./pages/product/Product";
import ShoppingCart from "./pages/order/ShoppingCart";
import CheckOut from "./pages/order/CheckOut";
import Order from "./pages/order/Orders";
import OrderSummary from "./pages/order/OrderSummary";
import MainLayout from "./components/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";

import Products from "./pages/product/Products";
import HomePage from "./pages/home/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UserProfile from "./pages/user/UserProfile";
import Wishlist from "./pages/wishlist/Wishlist";

function App() {
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default App;
