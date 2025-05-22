import { Routes, Route } from "react-router";
import "./App.css";

import Product from "./pages/product/Product";
import ShoppingCart from "./pages/order/ShoppingCart";
import CheckOut from "./pages/order/CheckOut";
import Order from "./pages/order/Orders";
import OrderSummary from "./pages/order/OrderSummary";
import MainLayout from "./components/MainLayout";

import Products from "./pages/product/Products";
import HomePage from "./pages/home/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UserProfile from "./pages/user/UserProfile";

function App() {
  return (
    <Routes>
      {/* Public routes without MainLayout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Routes using MainLayout */}
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route path="products">
          <Route index element={<Products />} />
          <Route path=":id" element={<Product />} />
        </Route>

        <Route path="shopping-cart" element={<ShoppingCart />} />
        <Route path="checkout" element={<CheckOut />} />

        <Route path="orders">
          <Route index element={<Order />} />
          <Route path=":id" element={<OrderSummary />} />
        </Route>
        <Route path="profile" element={<UserProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
