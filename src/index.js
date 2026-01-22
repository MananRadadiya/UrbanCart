import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./Components/ThemeContext";
import CartProvider from "./Components/CartContext";
import WishlistProvider from "./Components/WishlistContext";
import AuthProvider from "./Components/AuthContext";
import { PaymentProvider } from "./Components/PaymentContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <PaymentProvider>
              <App />
            </PaymentProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);
