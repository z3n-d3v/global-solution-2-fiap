import { useState } from "react";
import { HashRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Header } from "./layout/components/Header";
import { Home } from "./components/pages/Home";
import { Contact } from "./components/pages/Contact";
import { Auth } from "./components/pages/Auth";
import { OnboardingForm } from "./components/pages/OnboardingForm";
import { Dashboard } from "./components/pages/Dashboard";
import { ResumeBuilder } from "./components/pages/ResumeBuilder";
import { ResumeReview } from "./components/pages/ResumeReview";
import { Toaster } from "./components/ui/sonner";
import { GlobalProviders } from "./context/Providers";
import { Courses } from "./components/pages/Courses";

function AppContent() {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => navigate(path);

  return (
    <GlobalProviders>
      <div className="min-h-screen">

        <Routes>

          <Route
            path="/"
            element={
              <>
                <Header onNavigate={handleNavigate} />
                <Home onNavigate={handleNavigate} />
              </>
            }
          />

          <Route
            path="/contact"
            element={
              <>
                <Header onNavigate={handleNavigate} />
                <Contact />
              </>
            }
          />

          <Route
            path="/auth"
            element={<Auth onNavigate={handleNavigate} />}
          />

          <Route
            path="/onboarding"
            element={
              <>
                <Header onNavigate={handleNavigate} />
                <OnboardingForm onNavigate={handleNavigate} />
              </>
            }
          />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/resume-builder"
            element={
              <>
                <Header onNavigate={handleNavigate} />
                <ResumeBuilder onNavigate={handleNavigate} />
              </>
            }
          />

          <Route
            path="/resume-review"
            element={
              <>
                <Header onNavigate={handleNavigate} />
                <ResumeReview onNavigate={handleNavigate} />
              </>
            }
          />

          <Route path="/courses" element={<Courses onNavigate={handleNavigate} />} />

        </Routes>

        <Toaster position="top-right" />
      </div>
    </GlobalProviders>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}