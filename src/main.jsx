import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { UserProvider } from "./components/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <UserProvider>
        <ScrollToTop />
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
