import React from "react";
import WagmiProviderWrapper from "./components/Provider/WagmiProvider";

import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "./view/Main";

function App() {
  return (
    <WagmiProviderWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
      <Toaster />
    </WagmiProviderWrapper>
  );
}

export default App;
