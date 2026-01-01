import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserPanel from "./panels/UserPanel";
import AdminPage from "./panels/AdminPanel";
import CustomCursor from "./assets/components/CustomCursor";
import Loader from "./assets/components/Loader";


export default function App() {
  return (
    <BrowserRouter>
    <Loader/>
    <CustomCursor />
      <Routes>
        {/* PUBLIC USER PANEL */}
        <Route path="/" element={<UserPanel />} />

        {/* ADMIN PANEL */}
        <Route path="/muju" element={<AdminPage />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}
