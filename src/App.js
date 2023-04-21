import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";

import "./App.css";

import Login from "./components/Login";

import EmailForm from "./components/EmailForm";

import SignUp from "./components/SignUp";

import Admin from "./components/Admin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/email" element={<EmailForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
