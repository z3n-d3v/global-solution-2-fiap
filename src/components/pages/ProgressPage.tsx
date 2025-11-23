import {
    TrendingUp,
    BookOpen,
    Clock,
    CheckCircle2,
    BarChart3,
    LineChart as LineChartIcon,
    Activity
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress as ProgressBar } from "../ui/progress";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from "recharts";

interface ProgressProps {
    onNavigate?: (path: string) => void;
    onLogout?: () => void;
    isSidebarOpen?: boolean;
    onCloseSidebar?: () => void;
}

export const ProgressPage = () => {
    const weeklyProgress = [
        { day: "Seg", hours: 2 },
        { day: "Ter", hours: 3 },
        { day: "Qua", hours: 1.5 },
        { day: "Qui", hours: 4 },
        { day: "Sex", hours: 2.5 },
        { day: "Sáb", hours: 5 },
        { day: "Dom", hours: 3 }
    ];

    const monthlyProgress = [
        { month: "Jan", completed: 2, inProgress: 1 },
        { month: "Fev", completed: 3, inProgress: 2 },
        { month: "Mar", completed: 4, inProgress: 1 },
        { month: "Abr", completed: 5, inProgress: 2 },
        { month: "Mai", completed: 6, inProgress: 3 }
    ];

    const skillProgress = [
        { skill: "React", level: 75 },
        { skill: "TypeScript", level: 60 },
        { skill: "Python", level: 80 },
        { skill: "UI/UX", level: 55 },
        { skill: "Git", level: 70 }
    ];

    const learningStreak = 12;
    const totalHoursThisWeek = weeklyProgress.reduce((sum, day) => sum + day.hours, 0);

    return (
        <>
            <div className="container mx-auto px-4 py-8 lg:py-12">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-primary/10 p-3 rounded-xl">
                            <TrendingUp className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-foreground">Progresso</h1>
                            <p className="text-muted-foreground">
                                Acompanhe sua evolução e estatísticas de aprendizado
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Horas esta semana</CardDescription>
                            <CardTitle className="text-primary">{totalHoursThisWeek}h</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>+2.5h vs semana passada</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Sequência de dias</CardDescription>
                            <CardTitle className="text-primary">{learningStreak} dias</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Activity className="h-4 w-4" />
                                <span>Continue assim!</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Cursos em andamento</CardDescription>
                            <CardTitle className="text-primary">3</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <BookOpen className="h-4 w-4" />
                                <span>67% progresso médio</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Concluídos este mês</CardDescription>
                            <CardTitle className="text-primary">6</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <CheckCircle2 className="h-4 w-4" />
                                <span>Meta: 8 cursos</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Weekly Hours Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5 text-primary" />
                                Horas de Estudo Semanal
                            </CardTitle>
                            <CardDescription>
                                Últimos 7 dias de dedicação
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={weeklyProgress}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                                    <XAxis
                                        dataKey="day"
                                        stroke="#888888"
                                        fontSize={12}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#ffffff',
                                            border: '1px solid #e5e5e5',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Bar
                                        dataKey="hours"
                                        fill="#102C57"
                                        radius={[8, 8, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Monthly Progress Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <LineChartIcon className="h-5 w-5 text-primary" />
                                Cursos por Mês
                            </CardTitle>
                            <CardDescription>
                                Progresso mensal de conclusão
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={250}>
                                <AreaChart data={monthlyProgress}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                                    <XAxis
                                        dataKey="month"
                                        stroke="#888888"
                                        fontSize={12}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#ffffff',
                                            border: '1px solid #e5e5e5',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="completed"
                                        stackId="1"
                                        stroke="#102C57"
                                        fill="#102C57"
                                        name="Concluídos"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="inProgress"
                                        stackId="1"
                                        stroke="#DAC0A3"
                                        fill="#DAC0A3"
                                        name="Em andamento"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Skills Progress */}
                <Card>
                    <CardHeader>
                        <CardTitle>Nível de Habilidades</CardTitle>
                        <CardDescription>
                            Seu progresso em diferentes áreas de conhecimento
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {skillProgress.map((skill) => (
                                <div key={skill.skill} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-foreground">{skill.skill}</span>
                                        <span className="text-muted-foreground">{skill.level}%</span>
                                    </div>
                                    <ProgressBar value={skill.level} className="h-2" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}