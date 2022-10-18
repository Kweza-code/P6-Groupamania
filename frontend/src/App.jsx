import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import Navigation from "../src/components/Navigation";
import Create from "./pages/Create";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { UidContext } from "./components/AppContext";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [uid, setUid] = useState(null);
  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwt`,
        withCredentials: true,
      })
        .then((res) => setUid(res.data))
        .catch((err) => console.log("No token"));
    };
    fetchToken();
  }, []);

  return (
    <BrowserRouter>
      <Navigation />
      <UidContext.Provider value={uid}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UidContext.Provider>
    </BrowserRouter>
  );
};

export default App;
