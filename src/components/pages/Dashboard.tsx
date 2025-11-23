import {
  LayoutDashboard,
  Target,
  BookOpen,
  Award,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

import { useCurrentUserData } from "@/hooks/useCurrentUserData";

export function Dashboard() {
  const currentUser = useCurrentUserData();

  const weeklyProgress = [
    { day: "Seg", hours: 2 },
    { day: "Ter", hours: 3 },
    { day: "Qua", hours: 1.5 },
    { day: "Qui", hours: 4 },
    { day: "Sex", hours: 2.5 },
    { day: "Sáb", hours: 5 },
    { day: "Dom", hours: 3 }
  ];

  const skillProgress = [
    { month: "Jan", nivel: 20 },
    { month: "Fev", nivel: 35 },
    { month: "Mar", nivel: 50 },
    { month: "Abr", nivel: 65 },
    { month: "Mai", nivel: 78 }
  ];

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Target, label: "Minhas Trilhas", active: false },
    { icon: BookOpen, label: "Cursos", active: false },
    { icon: Award, label: "Conquistas", active: false },
    { icon: TrendingUp, label: "Progresso", active: false }
  ];

  const aiFeedback = [
    {
      title: "Parabéns pelo progresso!",
      message: "Você completou 78% da trilha de Python. Continue focado nos projetos práticos!",
      type: "success"
    },
    {
      title: "Recomendação",
      message: "Baseado no seu perfil, sugerimos adicionar 'Machine Learning Básico' à sua trilha.",
      type: "info"
    },
    {
      title: "Atenção",
      message: "Você não estuda há 3 dias. Que tal dedicar 30 minutos hoje?",
      type: "warning"
    }
  ];

  const nextSteps = currentUser.next_steps;
  `{const nextSteps = [
    { task: "Concluir módulo 'Python Avançado'", progress: 65, dueDate: "Em 5 dias" },
    { task: "Iniciar projeto prático de API", progress: 0, dueDate: "Em 1 semana" },
    { task: "Revisar fundamentos de SQL", progress: 40, dueDate: "Em 10 dias" }
  ];}`

  const metrics = [
    { label: "Horas de Estudo", value: "87h", icon: Clock, color: "text-blue-600" },
    { label: "Cursos Concluídos", value: "12", icon: CheckCircle2, color: "text-green-600" },
    { label: "Trilhas Ativas", value: "3", icon: Target, color: "text-purple-600" },
    { label: "Conquistas", value: "24", icon: Award, color: "text-yellow-600" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card min-h-screen p-6 hidden lg:block">
          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${item.active
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent text-foreground'
                  }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-4xl text-primary mb-2">
                Bem-vindo de volta, {currentUser.name}!
              </h1>
              <p className="text-muted-foreground">
                Veja seu progresso e continue sua jornada de aprendizado
              </p>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground mb-1">{metric.label}</p>
                        <p className="text-3xl text-primary">{metric.value}</p>
                      </div>
                      <metric.icon className={`h-8 w-8 ${metric.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Feedback Section */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-5 w-5" />
                  Feedbacks da IA
                </CardTitle>
                <CardDescription>
                  Insights personalizados baseados no seu desempenho
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiFeedback.map((feedback, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${feedback.type === 'success'
                        ? 'bg-green-50 border-green-500'
                        : feedback.type === 'warning'
                          ? 'bg-yellow-50 border-yellow-500'
                          : 'bg-blue-50 border-blue-500'
                      }`}
                  >
                    <h4 className="text-primary mb-1">{feedback.title}</h4>
                    <p className="text-muted-foreground">{feedback.message}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Charts Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Horas de Estudo (Semana)</CardTitle>
                  <CardDescription>Seu progresso diário</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={weeklyProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="hours" fill="#102C57" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Evolução de Habilidades</CardTitle>
                  <CardDescription>Progresso ao longo do tempo</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={skillProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="nivel"
                        stroke="#102C57"
                        strokeWidth={3}
                        dot={{ fill: '#102C57', r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Próximos Passos</CardTitle>
                <CardDescription>
                  Continue progredindo em sua trilha de aprendizado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {nextSteps.map((step, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-primary mb-1">{step.title}</h4>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{step.deadline}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        Continuar
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progresso</span>
                        <span className="text-primary">{step.progress}%</span>
                      </div>
                      <Progress value={step.progress} />
                    </div>
                    {index < nextSteps.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="mb-2">Recomendação Personalizada</h3>
                    <p className="opacity-90 mb-4">
                      Com base no seu perfil, sugerimos o curso "Machine Learning para Iniciantes"
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-white/20 px-3 py-1 rounded-full">4 semanas</span>
                      <span className="bg-white/20 px-3 py-1 rounded-full">Certificado</span>
                      <span className="bg-white/20 px-3 py-1 rounded-full">97% match</span>
                    </div>
                  </div>
                  <Button variant="secondary" size="lg" className="gap-2">
                    Ver Curso
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
