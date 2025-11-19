import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Progress } from "../ui/progress";
import { ChevronLeft, ChevronRight, Upload, CheckCircle } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Separator } from "../ui/separator";

interface OnboardingFormProps {
  onNavigate?: (path: string) => void;
}

export function OnboardingForm({ onNavigate }: OnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 9;

  const [formData, setFormData] = useState({
    // Step 1
    currentRole: "",
    // Step 2
    experienceYears: "",
    // Step 3
    education: "",
    // Step 4
    currentSkills: "",
    // Step 5
    desiredRole: "",
    // Step 6
    learningGoal: "",
    // Step 7
    availability: "",
    // Step 8
    preferredLearningStyle: "",
    // Step 9
    resume: null as File | null
  });

  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.success("Questionário concluído! Gerando sua trilha personalizada...");
      setTimeout(() => {
        onNavigate?.('/dashboard');
      }, 2000);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
      toast.success("Currículo carregado com sucesso!");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentRole">Qual sua função atual?</Label>
              <Input
                id="currentRole"
                placeholder="Ex: Desenvolvedor Junior, Estudante, Desempregado"
                value={formData.currentRole}
                onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="experienceYears">Quantos anos de experiência profissional você tem?</Label>
              <Select
                value={formData.experienceYears}
                onValueChange={(value) => setFormData({ ...formData, experienceYears: value })}
              >
                <SelectTrigger id="experienceYears">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Sem experiência</SelectItem>
                  <SelectItem value="1-2">1-2 anos</SelectItem>
                  <SelectItem value="3-5">3-5 anos</SelectItem>
                  <SelectItem value="6-10">6-10 anos</SelectItem>
                  <SelectItem value="10+">Mais de 10 anos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="education">Qual seu nível de escolaridade?</Label>
              <Select
                value={formData.education}
                onValueChange={(value) => setFormData({ ...formData, education: value })}
              >
                <SelectTrigger id="education">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fundamental">Ensino Fundamental</SelectItem>
                  <SelectItem value="medio">Ensino Médio</SelectItem>
                  <SelectItem value="superior-cursando">Superior (Cursando)</SelectItem>
                  <SelectItem value="superior-completo">Superior Completo</SelectItem>
                  <SelectItem value="pos">Pós-graduação</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentSkills">Quais habilidades você já possui?</Label>
              <Textarea
                id="currentSkills"
                placeholder="Liste suas principais habilidades técnicas e comportamentais..."
                rows={5}
                value={formData.currentSkills}
                onChange={(e) => setFormData({ ...formData, currentSkills: e.target.value })}
              />
              <p className="text-muted-foreground">
                Ex: Python, Comunicação, Liderança, Excel, etc.
              </p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="desiredRole">Qual cargo ou área você deseja atuar?</Label>
              <Input
                id="desiredRole"
                placeholder="Ex: Cientista de Dados, Product Manager, UX Designer"
                value={formData.desiredRole}
                onChange={(e) => setFormData({ ...formData, desiredRole: e.target.value })}
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="learningGoal">Qual seu principal objetivo de aprendizado?</Label>
              <Select
                value={formData.learningGoal}
                onValueChange={(value) => setFormData({ ...formData, learningGoal: value })}
              >
                <SelectTrigger id="learningGoal">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transition">Transição de carreira</SelectItem>
                  <SelectItem value="promotion">Promoção no trabalho atual</SelectItem>
                  <SelectItem value="first-job">Conseguir primeiro emprego</SelectItem>
                  <SelectItem value="new-job">Mudar de empresa</SelectItem>
                  <SelectItem value="freelance">Trabalhar como freelancer</SelectItem>
                  <SelectItem value="knowledge">Apenas aprender coisas novas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="availability">Quantas horas por semana você pode dedicar aos estudos?</Label>
              <Select
                value={formData.availability}
                onValueChange={(value) => setFormData({ ...formData, availability: value })}
              >
                <SelectTrigger id="availability">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-3">1-3 horas</SelectItem>
                  <SelectItem value="4-7">4-7 horas</SelectItem>
                  <SelectItem value="8-15">8-15 horas</SelectItem>
                  <SelectItem value="16+">Mais de 16 horas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="preferredLearningStyle">Como você prefere aprender?</Label>
              <Select
                value={formData.preferredLearningStyle}
                onValueChange={(value) => setFormData({ ...formData, preferredLearningStyle: value })}
              >
                <SelectTrigger id="preferredLearningStyle">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Vídeo-aulas</SelectItem>
                  <SelectItem value="reading">Leitura e documentação</SelectItem>
                  <SelectItem value="practice">Projetos práticos</SelectItem>
                  <SelectItem value="interactive">Exercícios interativos</SelectItem>
                  <SelectItem value="mixed">Mix de todos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resume">Faça upload do seu currículo (PDF)</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <input
                  id="resume"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="resume"
                  className="cursor-pointer"
                >
                  {formData.resume ? (
                    <div className="flex items-center justify-center gap-2 text-primary">
                      <CheckCircle className="h-5 w-5" />
                      <span>{formData.resume.name}</span>
                    </div>
                  ) : (
                    <>
                      <p className="text-muted-foreground mb-2">
                        Clique para selecionar ou arraste seu arquivo
                      </p>
                      <Button type="button" variant="outline">
                        Selecionar Arquivo
                      </Button>
                    </>
                  )}
                </label>
              </div>
              <p className="text-muted-foreground">
                Isso nos ajudará a entender melhor sua experiência
              </p>
            </div>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-4 text-muted-foreground">ou</span>
              </div>
            </div>

            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors cursor-pointer"
                  onClick={() => onNavigate?.('/resume-builder')}>
              <CardContent className="p-6 text-center space-y-3">
                <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-primary">Não tem currículo ainda?</h3>
                <p className="text-muted-foreground">
                  Use nossa ferramenta com IA para criar seu primeiro currículo profissional em minutos
                </p>
                <Button type="button" variant="outline" className="gap-2">
                  Criar Meu Currículo
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const stepTitles = [
    "Função Atual",
    "Experiência",
    "Escolaridade",
    "Habilidades Atuais",
    "Cargo Desejado",
    "Objetivo",
    "Disponibilidade",
    "Estilo de Aprendizado",
    "Currículo"
  ];

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-accent to-background">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl text-primary">Questionário de Perfil</h1>
            <span className="text-muted-foreground">
              Etapa {currentStep} de {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary">{stepTitles[currentStep - 1]}</CardTitle>
            <CardDescription>
              Preencha as informações abaixo para personalizarmos sua experiência
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}

            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Voltar
              </Button>
              <Button onClick={handleNext} className="gap-2">
                {currentStep === totalSteps ? "Finalizar" : "Próximo"}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}