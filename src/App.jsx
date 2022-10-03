import React from "react";
import MainPage from "./5C_network/MainPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import RepoDetail from "./5C_network/RepoDetail/RepoDetail";
import Followers from "./5C_network/Followers";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/?q" element={<MainPage />} />
          <Route path="/repo/:userId/:repoId" element={<RepoDetail />} />
          <Route path="/followers/:userName" element={<Followers />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
