import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Context
import ProductsProvider from "./context/ProductContext";
import CartProvider from "./context/CartContext";

// components
import ProductsPage from "./pages/ProductsPage";
import Layout from "./layout/Layout";
import DetailsPage from "./pages/DetailsPage";
import Checkout from "./pages/CheckoutPage";
import PageNotFound from "./pages/404";

import "./global.css";

type Props = {};

const App: React.FC<Props> = ({}) => {
  return (
    <CartProvider>
      <ProductsProvider>
        <Layout>
          <Routes>
            <Route
              index
              path="/"
              element={<Navigate to="/products" replace />}
            />
            <Route path="/products/:id" element={<DetailsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      </ProductsProvider>
    </CartProvider>
  );
};

export default App;
