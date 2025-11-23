import {
    LayoutDashboard,
    Target,
    BookOpen,
    Award,
    TrendingUp,
    GraduationCap,
    BookMarked
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true, path: "/dashboard" },
    { icon: Target, label: "Minhas Trilhas", active: false, path: "/workflows" },
    { icon: BookOpen, label: "Cursos", active: false, path: "/courses" },
    { icon: Award, label: "Conquistas", active: false, path: "/achievements" },
    { icon: TrendingUp, label: "Progresso", active: false, path: "/progress" },
    { icon: BookMarked, label: "Meu Currículo", active: false, path: "/resume-review" },
];

export const AppLayout = () => {
    return (
        <div className="relative z-0 min-h-screen bg-background">
            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 border-r bg-card min-h-screen p-6 hidden lg:block">
                    <div
                        className="flex items-center gap-2 cursor-pointer mb-4"
                    >
                        <div className="bg-primary p-2 rounded-lg">
                            <GraduationCap className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <span className="text-primary">TrilhaPro</span>
                    </div>
                    <div className="space-y-1">
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${item.active
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-accent text-foreground'
                                    }`}
                                to={item.path}
                            >
                                <item.icon className="h-5 w-5" />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 lg:p-8 relative z-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}