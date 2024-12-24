import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import UserLogin from "./pages/UserLogin";
import Admin from "./pages/Admin";
import AdminAppEdit from "./pages/AdminAppEdit";
import UserView from "./pages/UserView";
import ComparisonPage from "./pages/ComparisonPage";
import PasswordReset from "./pages/PasswordReset";
import Verify from "./pages/Verify";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/verify" element={<Verify />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/app/:id"
          element={
            <ProtectedRoute>
              <AdminAppEdit />
            </ProtectedRoute>
          }
        />
        <Route path="/mejores-apps-control-horario/:slug" element={<UserView />} />
        <Route path="/mejores-apps-control-horario/comparar/:ids" element={<ComparisonPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;