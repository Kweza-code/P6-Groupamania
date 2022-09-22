import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { NavLink } from "react-router-dom";
import Create from "./pages/Create";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Home />} />
        <Route path="create" element={<Create />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};



export default App;
