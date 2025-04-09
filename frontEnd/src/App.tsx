// import { useState } from 'react'
import { Routes, Route } from "react-router";
import "./App.css";
import Product from "./pages/product/Product";
import ProductList from "./pages/product/ProductList";
import ShoppingCart from "./pages/order/ShoppingCart";

import CategoryFilter from "./pages/category/CategoryFilter";
import HomePage from "./pages/home/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="products">
          <Route index element={<ProductList />} />
          <Route path="/products/:id" element={<Product />} />
        </Route>
        {/* <Route element={<AuthLayout />}></Route> */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="shopping-cart" element={<ShoppingCart />} />
        <Route path="category-filter" element={<CategoryFilter />} />
      </Routes>
    </>
  );
}

export default App;
