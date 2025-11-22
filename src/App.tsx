import { useState } from "react";
import { HashRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./components/pages/Home";
import { Contact } from "./components/pages/Contact";
import { Auth } from "./components/pages/Auth";
import { OnboardingForm } from "./components/pages/OnboardingForm";
import { Dashboard } from "./components/pages/Dashboard";
import { ResumeBuilder } from "./components/pages/ResumeBuilder";
import { ResumeReview } from "./components/pages/ResumeReview";
import { Toaster } from "./components/ui/sonner";
import { GlobalProvaiders } from "./context/Provaiders";

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <GlobalProvaiders>
      <div className="min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header isAuthenticated={isAuthenticated} onNavigate={handleNavigate} />
                <Home onNavigate={handleNavigate} />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Header isAuthenticated={isAuthenticated} onNavigate={handleNavigate} />
                <Contact />
              </>
            }
          />
          <Route
            path="/auth"
            element={
              <Auth onNavigate={handleNavigate} onLogin={handleLogin} />
            }
          />
          <Route
            path="/onboarding"
            element={
              <>
                <Header isAuthenticated={isAuthenticated} onNavigate={handleNavigate} />
                <OnboardingForm onNavigate={handleNavigate} />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <Header isAuthenticated={isAuthenticated} onNavigate={handleNavigate} />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/resume-builder"
            element={
              <>
                <Header isAuthenticated={isAuthenticated} onNavigate={handleNavigate} />
                <ResumeBuilder onNavigate={handleNavigate} />
              </>
            }
          />
          <Route
            path="/resume-review"
            element={
              <>
                <Header isAuthenticated={isAuthenticated} onNavigate={handleNavigate} />
                <ResumeReview onNavigate={handleNavigate} />
              </>
            }
          />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </GlobalProvaiders>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}