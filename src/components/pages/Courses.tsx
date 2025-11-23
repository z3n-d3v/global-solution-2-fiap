import { useState } from "react";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Sparkles,
  GraduationCap,
  Target,
  TrendingUp,
  LayoutDashboard,
  Award,
  LogOut,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";
import { Dialog } from "../ui/modal";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

interface Course {
  id: string;
  name: string;
  institution: string;
  category: string;
  level: "iniciante" | "intermediário" | "avançado";
  status: "concluído" | "em andamento" | "desejado";
  link: string;
}

interface CoursesProps {
  onNavigate?: (path: string) => void;
}

export function Courses({ onNavigate }: CoursesProps) {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      name: "React Completo - Do Básico ao Avançado",
      institution: "Udemy",
      category: "Programação",
      level: "intermediário",
      status: "em andamento",
      link: "https://udemy.com/react-completo"
    },
    {
      id: "2",
      name: "Python para Análise de Dados",
      institution: "Coursera",
      category: "Data Science",
      level: "iniciante",
      status: "concluído",
      link: "https://coursera.org/python-data"
    },
    {
      id: "3",
      name: "UI/UX Design Avançado",
      institution: "Alura",
      category: "Design",
      level: "avançado",
      status: "desejado",
      link: "https://alura.com.br/ux-design"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    institution: "",
    category: "",
    level: "iniciante" as Course["level"],
    status: "desejado" as Course["status"],
    link: ""
  });

  const aiSuggestions = [
    {
      name: "Machine Learning para Iniciantes",
      institution: "Coursera",
      category: "Data Science",
      level: "iniciante" as const,
      reason: "Complementa seu perfil em análise de dados"
    },
    {
      name: "TypeScript - Guia Completo",
      institution: "Udemy",
      category: "Programação",
      level: "intermediário" as const,
      reason: "Aprofunda conhecimentos em React e JavaScript"
    },
    {
      name: "Metodologias Ágeis na Prática",
      institution: "Alura",
      category: "Gestão",
      level: "iniciante" as const,
      reason: "Habilidade essencial para trabalho em equipe"
    }
  ];

  const handleOpenDialog = (course?: Course) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        name: course.name,
        institution: course.institution,
        category: course.category,
        level: course.level,
        status: course.status,
        link: course.link
      });
    } else {
      setEditingCourse(null);
      setFormData({
        name: "",
        institution: "",
        category: "",
        level: "iniciante",
        status: "desejado",
        link: ""
      });
    }
    setIsDialogOpen(!isDialogOpen);
  };

  const handleSaveCourse = () => {
    if (!formData.name || !formData.institution || !formData.category) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    if (editingCourse) {
      setCourses(courses.map(c =>
        c.id === editingCourse.id
          ? { ...c, ...formData }
          : c
      ));
      toast.success("Curso atualizado com sucesso!");
    } else {
      const newCourse: Course = {
        id: Date.now().toString(),
        ...formData
      };
      setCourses([...courses, newCourse]);
      toast.success("Curso adicionado com sucesso!");
    }

    setIsDialogOpen(false);
    setEditingCourse(null);
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
    toast.success("Curso removido com sucesso!");
  };

  const handleAddSuggestion = (suggestion: typeof aiSuggestions[0]) => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: suggestion.name,
      institution: suggestion.institution,
      category: suggestion.category,
      level: suggestion.level,
      status: "desejado",
      link: ""
    };
    setCourses([...courses, newCourse]);
    toast.success("Curso adicionado à sua lista!");
  };

  const getStatusColor = (status: Course["status"]) => {
    switch (status) {
      case "concluído":
        return "bg-green-100 text-green-800 border-green-200";
      case "em andamento":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "desejado":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const getLevelColor = (level: Course["level"]) => {
    switch (level) {
      case "iniciante":
        return "bg-slate-100 text-slate-700 border-slate-200";
      case "intermediário":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "avançado":
        return "bg-orange-100 text-orange-700 border-orange-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    if (category?.toLowerCase().includes("programação")) return Target;
    if (category?.toLowerCase().includes("data")) return TrendingUp;
    if (category?.toLowerCase().includes("design")) return BookOpen;
    return GraduationCap;
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: false, path: "/dashboard" },
    { icon: Target, label: "Minhas Trilhas", active: false, path: "/tracks" },
    { icon: BookOpen, label: "Cursos", active: true, path: "/courses" },
    { icon: Award, label: "Conquistas", active: false, path: "/achievements" },
    { icon: TrendingUp, label: "Progresso", active: false, path: "/progress" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card min-h-screen p-6 hidden lg:flex lg:flex-col">
          <div className="space-y-1 flex-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => item.path && onNavigate?.(item.path)}
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

          <div className="pt-4 border-t">
            <button
              onClick={() => onNavigate?.('/')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-destructive/10 text-destructive"
            >
              <LogOut className="h-5 w-5" />
              <span>Sair</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl text-primary mb-2">Meus Cursos</h1>
                <p className="text-muted-foreground">
                  Gerencie os cursos que você já fez ou deseja fazer para evoluir na sua carreira
                </p>
              </div>
            </div>

            <Collapsible
              open={isDialogOpen}
              onOpenChange={setIsDialogOpen}
              className="w-full border border-border rounded-xl"
            >
              {/* Header */}
              <CollapsibleTrigger className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-accent rounded-xl transition">
                <span className="text-base font-medium">Criar novo Curso</span>

                {open ? (
                  <ChevronDown className="h-5 w-5 transition-transform" />
                ) : (
                  <ChevronRight className="h-5 w-5 transition-transform" />
                )}
              </CollapsibleTrigger>

              {/* Content */}
              <CollapsibleContent
                className="
          overflow-hidden
          data-[state=open]:animate-slideDown 
          data-[state=closed]:animate-slideUp
        "
              >
                <div className="p-4 flex flex-col gap-4">
                  {/* Form */}
                  <Card className="p-4">

                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome do Curso *</Label>
                        <Input
                          id="name"
                          placeholder="Ex: React Completo - Do Básico ao Avançado"
                          value={formData.name}
                          required
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="institution">Instituição ou Plataforma *</Label>
                        <Input
                          id="institution"
                          placeholder="Ex: Udemy, Coursera, Alura"
                          value={formData.institution}
                          onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="category">Categoria / Área *</Label>
                          <Input
                            id="category"
                            placeholder="Ex: Programação, UX, Data Science"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="level">Nível</Label>
                          <Select
                            value={formData.level}
                            onValueChange={(value: Course["level"]) => setFormData({ ...formData, level: value })}
                            required
                          >
                            <SelectTrigger id="level">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="iniciante">Iniciante</SelectItem>
                              <SelectItem value="intermediário">Intermediário</SelectItem>
                              <SelectItem value="avançado">Avançado</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={formData.status}
                          onValueChange={(value: Course["status"]) => setFormData({ ...formData, status: value })}
                          required
                        >
                          <SelectTrigger id="status">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="concluído">Concluído</SelectItem>
                            <SelectItem value="em andamento">Em Andamento</SelectItem>
                            <SelectItem value="desejado">Desejado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="link">Link do Curso (opcional)</Label>
                        <Input
                          id="link"
                          type="url"
                          placeholder="https://..."
                          value={formData.link}
                          required
                          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleSaveCourse}>
                        {editingCourse ? "Salvar Alterações" : "Salvar Curso"}
                      </Button>
                    </div>
                  </Card>
                </div>

              </CollapsibleContent>
            </Collapsible>


            {/* <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button>Save</Button>
            </Dialog.Close> */}

            {/* Courses List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Lista de Cursos
                </CardTitle>
                <CardDescription>
                  Todos os cursos que você está fazendo ou planeja fazer
                </CardDescription>
              </CardHeader>
              <CardContent>
                {courses.length === 0 ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="bg-accent p-6 rounded-full w-fit mx-auto">
                      <BookOpen className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-primary mb-2">
                        Você ainda não adicionou nenhum curso
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Comece adicionando os cursos que fazem parte do seu plano de carreira!
                      </p>
                      <Button size="lg" className="gap-2" onClick={() => handleOpenDialog()}>
                        <Plus className="h-5 w-5" />
                        Adicionar Curso
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {courses.map((course) => {
                      const CategoryIcon = getCategoryIcon(course?.category || `none`);
                      return (
                        <Card key={course.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                              {/* Icon */}
                              <div className="bg-primary/10 p-3 rounded-lg w-fit h-fit">
                                <CategoryIcon className="h-6 w-6 text-primary" />
                              </div>

                              {/* Content */}
                              <div className="flex-1 space-y-3">
                                <div>
                                  <h3 className="text-primary mb-1">{course.name}</h3>
                                  <p className="text-muted-foreground">
                                    {course.institution}
                                  </p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="outline" className={getStatusColor(course.status)}>
                                    {course.status}
                                  </Badge>
                                  <Badge variant="outline" className={getLevelColor(course.level)}>
                                    {course.level}
                                  </Badge>
                                  <Badge variant="outline">
                                    {course.category}
                                  </Badge>
                                </div>

                                {course.link && (
                                  <a
                                    href={course.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-primary hover:underline w-fit"
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                    <span>Acessar curso</span>
                                  </a>
                                )}
                              </div>

                              {/* Actions */}
                              <div className="flex md:flex-col gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-2"
                                  onClick={() => handleOpenDialog(course)}
                                >
                                  <Edit className="h-4 w-4" />
                                  Editar
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-2 text-destructive hover:text-destructive"
                                  onClick={() => handleDeleteCourse(course.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  Excluir
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Suggestions */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-5 w-5" />
                  Sugestões da IA
                </CardTitle>
                <CardDescription>
                  Com base na sua carreira desejada, recomendamos adicionar estes cursos ao seu plano
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border bg-accent/30 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-lg mt-1">
                            <GraduationCap className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-primary mb-1">{suggestion.name}</h4>
                            <p className="text-muted-foreground mb-2">
                              {suggestion.institution} • {suggestion.category}
                            </p>
                            <div className="flex items-center gap-2 text-sm">
                              <Badge variant="outline" className={getLevelColor(suggestion.level)}>
                                {suggestion.level}
                              </Badge>
                              <span className="text-muted-foreground">
                                • {suggestion.reason}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleAddSuggestion(suggestion)}
                      >
                        <Plus className="h-4 w-4" />
                        Adicionar
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div >
    </div >
  );
}