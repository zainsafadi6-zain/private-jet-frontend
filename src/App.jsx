import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

import Home from "./pages/Home.jsx";
import Fleet from "./pages/Fleet.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import JetDetails from "./pages/JetDetails.jsx";
import AdminJets from "./pages/admin/AdminJets.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fleet" element={<Fleet />} />
        <Route path="/fleet/:id" element={<JetDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/admin/jets" element={<AdminJets />} />
      </Routes>
    </>
  );
}

export default App;