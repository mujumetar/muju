import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserPanel from "./panels/UserPanel";
import AdminPage from "./panels/AdminPanel";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC USER PANEL */}
        <Route path="/" element={<UserPanel />} />

        {/* ADMIN PANEL */}
        <Route path="/admin" element={<AdminPage />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}
