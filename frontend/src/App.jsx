import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Navigation from "../src/components/Navigation";
import Create from "./pages/Create";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Update from "./pages/Update";
import Footer from "./components/Footer";
import Header from "./components/Header";
const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Home />} />
        <Route path="create" element={<Create />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/update" element={<Update />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
