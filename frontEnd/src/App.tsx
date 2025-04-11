import { Routes, Route } from "react-router";
import "./App.css";

import Product from "./pages/product/Product";
import ShoppingCart from "./pages/order/ShoppingCart";
import MainLayout from "./components/MainLayout";

import Products from "./pages/product/Products";
import HomePage from "./pages/home/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

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
      </Route>
    </Routes>
  );
}

export default App;
