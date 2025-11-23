import {
    Award,
    Trophy,
    Medal,
    CheckCircle2,
    Calendar,
    Clock,
    Star,
    BookOpen,
    GraduationCap,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";

interface Achievement {
    id: string;
    courseName: string;
    description: string;
    category: string;
    hours: number;
    completedDate: string;
    icon: "medal" | "trophy" | "star";
    level: "iniciante" | "intermediário" | "avançado";
}

interface AchievementsProps {
    onNavigate?: (path: string) => void;
    onLogout?: () => void;
    isSidebarOpen?: boolean;
    onCloseSidebar?: () => void;
}

export const Achievements = () => {
    const achievements: Achievement[] = [
        {
            id: "1",
            courseName: "Lógica de Programação",
            description: "Fundamentos essenciais de programação e algoritmos",
            category: "Programação",
            hours: 12,
            completedDate: "15/08/2024",
            icon: "medal",
            level: "iniciante"
        },
        {
            id: "2",
            courseName: "Python para Análise de Dados",
            description: "Análise e visualização de dados com Python",
            category: "Data Science",
            hours: 24,
            completedDate: "03/09/2024",
            icon: "trophy",
            level: "intermediário"
        },
        {
            id: "3",
            courseName: "React Avançado",
            description: "Desenvolvimento de aplicações modernas com React",
            category: "Desenvolvimento Web",
            hours: 36,
            completedDate: "20/10/2024",
            icon: "star",
            level: "avançado"
        },
        {
            id: "4",
            courseName: "UI/UX Design Fundamentals",
            description: "Princípios de design de interface e experiência do usuário",
            category: "Design",
            hours: 18,
            completedDate: "05/11/2024",
            icon: "medal",
            level: "iniciante"
        },
        {
            id: "5",
            courseName: "Git e GitHub",
            description: "Controle de versão e colaboração em projetos",
            category: "Ferramentas",
            hours: 8,
            completedDate: "12/11/2024",
            icon: "trophy",
            level: "iniciante"
        },
        {
            id: "6",
            courseName: "TypeScript Completo",
            description: "JavaScript tipado para aplicações escaláveis",
            category: "Programação",
            hours: 20,
            completedDate: "18/11/2024",
            icon: "star",
            level: "intermediário"
        }
    ];

    const getIconComponent = (iconType: string) => {
        switch (iconType) {
            case "medal":
                return Medal;
            case "trophy":
                return Trophy;
            case "star":
                return Star;
            default:
                return Award;
        }
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case "iniciante":
                return "bg-green-500/10 text-green-700 border-green-500/20";
            case "intermediário":
                return "bg-blue-500/10 text-blue-700 border-blue-500/20";
            case "avançado":
                return "bg-purple-500/10 text-purple-700 border-purple-500/20";
            default:
                return "bg-muted text-muted-foreground";
        }
    };

    const totalHours = achievements.reduce((sum, achievement) => sum + achievement.hours, 0);

    return (
        <div className="container mx-auto px-4 py-8 lg:py-12">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-3 rounded-xl">
                        <Award className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-foreground">Conquistas</h1>
                        <p className="text-muted-foreground">
                            Veja todas as suas conquistas e cursos concluídos
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card>
                    <CardHeader className="pb-3">
                        <CardDescription>Total de Cursos</CardDescription>
                        <CardTitle className="text-primary">{achievements.length}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <GraduationCap className="h-4 w-4" />
                            <span>Concluídos</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardDescription>Horas Totais</CardDescription>
                        <CardTitle className="text-primary">{totalHours}h</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>De estudo</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardDescription>Categorias</CardDescription>
                        <CardTitle className="text-primary">
                            {new Set(achievements.map(a => a.category)).size}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <BookOpen className="h-4 w-4" />
                            <span>Diferentes</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => {
                    const IconComponent = getIconComponent(achievement.icon);

                    return (
                        <Card
                            key={achievement.id}
                            className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Decorative gradient */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />

                            <CardHeader>
                                <div className="flex items-start justify-between mb-3">
                                    <div className="bg-primary/10 p-3 rounded-xl">
                                        <IconComponent className="h-6 w-6 text-primary" />
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className="bg-green-500/10 text-green-700 border-green-500/20"
                                    >
                                        <CheckCircle2 className="h-3 w-3 mr-1" />
                                        Concluído
                                    </Badge>
                                </div>

                                <CardTitle className="text-foreground">
                                    {achievement.courseName}
                                </CardTitle>
                                <CardDescription>
                                    {achievement.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-3">
                                    {/* Category and Level */}
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <Badge variant="secondary">
                                            {achievement.category}
                                        </Badge>
                                        <Badge
                                            variant="outline"
                                            className={getLevelColor(achievement.level)}
                                        >
                                            {achievement.level}
                                        </Badge>
                                    </div>

                                    {/* Hours and Date */}
                                    <div className="flex items-center justify-between text-muted-foreground pt-3 border-t">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            <span>{achievement.hours}h</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>{achievement.completedDate}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Empty State (se não houver conquistas) */}
            {achievements.length === 0 && (
                <Card className="mt-8">
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <div className="bg-muted/50 p-6 rounded-full mb-4">
                            <Award className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h3 className="text-foreground mb-2">Nenhuma conquista ainda</h3>
                        <p className="text-muted-foreground text-center mb-6">
                            Complete seus primeiros cursos para começar a colecionar conquistas!
                        </p>
                        <Link to="/courses">
                            Ver Cursos Disponíveis
                        </Link>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}