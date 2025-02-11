import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import FolderManager from "./components/management/FolderManager";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage" element={<FolderManager />} />
        {import.meta.env.VITE_TEMPO === "true" && <Route path="/tempobook/*" />}
      </Routes>
    </Suspense>
  );
}

export default App;
