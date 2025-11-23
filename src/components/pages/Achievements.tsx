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
import { useCurrentUserData } from "@/hooks/useCurrentUserData";
import { Achievement } from "@/types/Achievements";

export const AchievementsPage = () => {
    const currentUser = useCurrentUserData();

    if (!currentUser) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <p className="text-muted-foreground">Carregando conquistas...</p>
            </div>
        );
    }

    const achievements: Achievement[] = currentUser.achievements || [];

    const getIconComponent = (iconType: Achievement["icon"]) => {
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

    const getLevelColor = (level: Achievement["level"]) => {
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

            {/* Stats */}
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

            {/* Achievements Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => {
                    const IconComponent = getIconComponent(achievement.icon);

                    return (
                        <Card
                            key={achievement.id}
                            className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
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

                                <CardDescription>{achievement.description}</CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-3">

                                    <div className="flex items-center gap-2 flex-wrap">
                                        <Badge variant="secondary">{achievement.category}</Badge>
                                        <Badge variant="outline" className={getLevelColor(achievement.level)}>
                                            {achievement.level}
                                        </Badge>
                                    </div>

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
                        <Link to="/courses">Ver Cursos Disponíveis</Link>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};