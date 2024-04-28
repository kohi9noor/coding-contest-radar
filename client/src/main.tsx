import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark, neobrutalism } from "@clerk/themes";
import { RecoilRoot } from "recoil";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing publishable key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <ClerkProvider
          appearance={{
            baseTheme: [dark, neobrutalism],
          }}
          publishableKey={PUBLISHABLE_KEY}
        >
          <App />
        </ClerkProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
