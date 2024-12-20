import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Verify from "@/pages/Verify";
import Dashboard from "@/pages/Dashboard";
import UserView from "@/pages/UserView";
import ComparisonPage from "@/pages/ComparisonPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/user-view/:id" element={<UserView />} />
        <Route path="/admin/compare/:appIds" element={<ComparisonPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;