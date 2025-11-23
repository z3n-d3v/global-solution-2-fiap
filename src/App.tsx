import { HashRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { SiteLayout } from "./layout/SiteLayout";
import { Home } from "./components/pages/Home";
import { Contact } from "./components/pages/Contact";
import { Auth } from "./components/pages/Auth";
import { OnboardingForm } from "./components/pages/OnboardingForm";
import { Dashboard } from "./components/pages/Dashboard";
import { ResumeBuilder } from "./components/pages/ResumeBuilder";
import { ResumeReview } from "./components/pages/ResumeReview";
import { Toaster } from "./components/ui/sonner";
import { GlobalProviders } from "./context/Providers";
import { AppLayout } from "./layout/AppLayout";

function AppContent() {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => navigate(path);

  return (
    <GlobalProviders>
      <Routes>
        <Route element={<SiteLayout onNavigate={handleNavigate} />}>
          <Route path="/" element={<Home onNavigate={handleNavigate} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/onboarding" element={<OnboardingForm onNavigate={handleNavigate} />} />
          <Route path="/resume-builder" element={<ResumeBuilder onNavigate={handleNavigate} />} />
          <Route path="/resume-review" element={<ResumeReview onNavigate={handleNavigate} />} />
        </Route>

        <Route path="/auth" element={<Auth onNavigate={handleNavigate} />} />

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

      </Routes>

      <Toaster position="top-right" />
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