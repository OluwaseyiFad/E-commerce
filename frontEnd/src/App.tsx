// import { useState } from 'react'
import { Routes, Route } from "react-router";
import "./App.css";
import Product from "./pages/product/Product";
import ProductList from "./pages/product/ProductList";
import ShoppingCart from "./pages/order/ShoppingCart";

import ProductsFilter from "./pages/product/ProductsFilter";
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
          <Route path="filter" element={<ProductsFilter />} />
          <Route path=":id" element={<Product />} />
        </Route>
        {/* <Route element={<AuthLayout />}></Route> */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="shopping-cart" element={<ShoppingCart />} />
      </Routes>
    </>
  );
}

export default App;
