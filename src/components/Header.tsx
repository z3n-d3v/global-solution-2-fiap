import { GraduationCap } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  isAuthenticated?: boolean;
  onNavigate?: (path: string) => void;
}

export function Header({ isAuthenticated = false, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => onNavigate?.('/')}
          >
            <div className="bg-primary p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-primary">TrilhaPro</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => onNavigate?.('/')}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Início
            </button>
            <button 
              onClick={() => onNavigate?.('/contact')}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Contato
            </button>
          </nav>

          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => onNavigate?.('/auth')}
                >
                  Entrar
                </Button>
                <Button onClick={() => onNavigate?.('/auth')}>
                  Criar Conta
                </Button>
              </>
            ) : (
              <Button onClick={() => onNavigate?.('/dashboard')}>
                Dashboard
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
