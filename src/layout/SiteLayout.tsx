import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";

interface SiteLayoutProps {
  onNavigate?: (path: string) => void;
}

export function SiteLayout({ onNavigate }: SiteLayoutProps) {
  return (
    <div className="min-h-screen">
      <Header onNavigate={onNavigate} />

      <main>
        <Outlet />
      </main>
    </div>
  );
}