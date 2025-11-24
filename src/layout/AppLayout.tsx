import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
    LayoutDashboard,
    Target,
    BookOpen,
    Award,
    TrendingUp,
    GraduationCap,
    BookMarked,
    ArrowLeft,
    ArrowRight
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";

import { useState } from "react"

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true, path: "/dashboard" },
    { icon: Target, label: "Minhas Trilhas", active: false, path: "/workflows" },
    { icon: BookOpen, label: "Cursos", active: false, path: "/courses" },
    { icon: Award, label: "Conquistas", active: false, path: "/achievements" },
    { icon: TrendingUp, label: "Progresso", active: false, path: "/progress" },
    { icon: BookMarked, label: "Meu Currículo", active: false, path: "/resume-review" },
];


export const AppLayout = () => {
    const { logout } = useAuth();
    const [collapsed, setCollapsed] = useState(false);

    const toggle = () => setCollapsed(!collapsed);

    return (
        <div className="relative z-0 max-h-screen bg-background">
            <div className="flex">
                {/* Sidebar */}
                <aside className={`${collapsed ? "w-32" : "w-64"} border-r bg-card min-h-screen max-h-screen p-6 hidden lg:block`}>
                    <div
                        className={`flex ${collapsed ? "flex-col items-center" : "flex-row w-fit items-center"} just gap-2 cursor-pointer mb-4`}
                        onClick={toggle}
                        title={`Clique para ${collapsed ? "Abrir" : "Fechar"}`}
                    >
                        <div className="bg-primary p-2 rounded-lg w-fit">
                            <GraduationCap className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <span className="text-primary">TrilhaPro</span>
                    </div>
                    <div className="flex flex-col">

                    </div>
                    <div className="space-y-1 flex flex-col items-center">
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                className={`${collapsed ? "w-fit" : "w-full"} flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${item.active
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-accent text-foreground'
                                    }`}
                                to={item.path}
                            >
                                {collapsed ? (
                                    <>
                                        <item.icon className="h-5 w-5" />
                                    </>
                                ) : (
                                    <>
                                        <item.icon className="h-5 w-5" />
                                        <span>{item.label}</span>
                                    </>
                                )}
                            </Link>
                        ))}
                    </div>

                    <div className="h-fit flex flex-col-reverse">
                        <Button onClick={() => { logout() }}>Logout</Button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 lg:p-8 relative z-auto max-h-screen overflow-scroll">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}