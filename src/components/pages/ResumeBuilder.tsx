import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Progress } from "../ui/progress";
import { Checkbox } from "../ui/checkbox";
import { 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ResumeBuilderProps {
  onNavigate?: (path: string) => void;
  onComplete?: (resumeData: any) => void;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
}

export function ResumeBuilder({ onNavigate, onComplete }: ResumeBuilderProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 10;

  const [formData, setFormData] = useState({
    // Step 1: Dados Pessoais
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    portfolio: "",

    // Step 2: Objetivo Profissional
    targetRole: "",
    careerObjective: "",

    // Step 3: Status Profissional
    hasExperience: "",

    // Step 4: Experiências Profissionais
    experiences: [] as Experience[],

    // Step 5: Educação
    education: [] as Education[],

    // Step 6: Habilidades Técnicas
    technicalSkills: "",

    // Step 7: Habilidades Comportamentais
    softSkills: [] as string[],

    // Step 8: Idiomas
    languages: "",

    // Step 9: Certificações e Projetos
    certifications: "",
    projects: [] as Project[],

    // Step 10: Preferências de Formato
    atsOptimized: true,
    includePhoto: false,
    templateStyle: "",
    additionalInfo: ""
  });

  const progress = (currentStep / totalSteps) * 100;

  const softSkillsOptions = [
    "Comunicação",
    "Trabalho em Equipe",
    "Liderança",
    "Resolução de Problemas",
    "Criatividade",
    "Adaptabilidade",
    "Gestão de Tempo",
    "Pensamento Crítico",
    "Empatia",
    "Proatividade"
  ];

  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [
        ...formData.experiences,
        { id: Date.now().toString(), company: "", position: "", duration: "", description: "" }
      ]
    });
  };

  const removeExperience = (id: string) => {
    setFormData({
      ...formData,
      experiences: formData.experiences.filter(exp => exp.id !== id)
    });
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setFormData({
      ...formData,
      experiences: formData.experiences.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { id: Date.now().toString(), institution: "", degree: "", period: "" }
      ]
    });
  };

  const removeEducation = (id: string) => {
    setFormData({
      ...formData,
      education: formData.education.filter(edu => edu.id !== id)
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setFormData({
      ...formData,
      education: formData.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { id: Date.now().toString(), name: "", description: "" }
      ]
    });
  };

  const removeProject = (id: string) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter(proj => proj.id !== id)
    });
  };

  const updateProject = (id: string, field: string, value: string) => {
    setFormData({
      ...formData,
      projects: formData.projects.map(proj =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    });
  };

  const toggleSoftSkill = (skill: string) => {
    if (formData.softSkills.includes(skill)) {
      setFormData({
        ...formData,
        softSkills: formData.softSkills.filter(s => s !== skill)
      });
    } else {
      setFormData({
        ...formData,
        softSkills: [...formData.softSkills, skill]
      });
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Gerar currículo com IA
      toast.success("Gerando seu currículo personalizado...");
      setTimeout(() => {
        onComplete?.(formData);
        onNavigate?.('/resume-review');
      }, 2000);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome Completo *</Label>
              <Input
                id="fullName"
                placeholder="João Silva Santos"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="joao.silva@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  placeholder="(11) 98765-4321"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Localização *</Label>
              <Input
                id="location"
                placeholder="São Paulo, SP"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn (opcional)</Label>
                <Input
                  id="linkedin"
                  placeholder="linkedin.com/in/joaosilva"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="portfolio">Portfolio/GitHub (opcional)</Label>
                <Input
                  id="portfolio"
                  placeholder="github.com/joaosilva"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="targetRole">Qual cargo você está buscando? *</Label>
              <Input
                id="targetRole"
                placeholder="Ex: Desenvolvedor Front-end Junior"
                value={formData.targetRole}
                onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="careerObjective">Descreva seu objetivo profissional *</Label>
              <Textarea
                id="careerObjective"
                placeholder="Ex: Busco oportunidade como desenvolvedor front-end para aplicar meus conhecimentos em React e contribuir com projetos inovadores..."
                rows={5}
                value={formData.careerObjective}
                onChange={(e) => setFormData({ ...formData, careerObjective: e.target.value })}
              />
              <p className="text-muted-foreground">
                Dica: Seja específico sobre o que você busca e o que pode oferecer
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Você possui experiência profissional? *</Label>
              <div className="space-y-3">
                <Card
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    formData.hasExperience === "yes" ? "border-primary border-2" : ""
                  }`}
                  onClick={() => setFormData({ ...formData, hasExperience: "yes" })}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-primary mb-1">Sim, tenho experiência</h4>
                        <p className="text-muted-foreground">
                          Já trabalhei em empresas ou como freelancer
                        </p>
                      </div>
                      {formData.hasExperience === "yes" && (
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    formData.hasExperience === "no" ? "border-primary border-2" : ""
                  }`}
                  onClick={() => setFormData({ ...formData, hasExperience: "no" })}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-primary mb-1">Não, busco minha primeira oportunidade</h4>
                        <p className="text-muted-foreground">
                          Vamos destacar seus projetos, estudos e habilidades
                        </p>
                      </div>
                      {formData.hasExperience === "no" && (
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      case 4:
        if (formData.hasExperience === "no") {
          handleNext();
          return null;
        }
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Experiências Profissionais</Label>
              <Button variant="outline" size="sm" onClick={addExperience} className="gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Experiência
              </Button>
            </div>
            {formData.experiences.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="p-8 text-center text-muted-foreground">
                  Clique em "Adicionar Experiência" para começar
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {formData.experiences.map((exp, index) => (
                  <Card key={exp.id}>
                    <CardContent className="p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <h4 className="text-primary">Experiência {index + 1}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExperience(exp.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Empresa *</Label>
                          <Input
                            placeholder="Nome da empresa"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Cargo *</Label>
                          <Input
                            placeholder="Seu cargo"
                            value={exp.position}
                            onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Período *</Label>
                        <Input
                          placeholder="Ex: Jan 2022 - Dez 2023"
                          value={exp.duration}
                          onChange={(e) => updateExperience(exp.id, "duration", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Descrição das atividades *</Label>
                        <Textarea
                          placeholder="Descreva suas principais responsabilidades e conquistas..."
                          rows={3}
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Formação Acadêmica</Label>
              <Button variant="outline" size="sm" onClick={addEducation} className="gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Formação
              </Button>
            </div>
            {formData.education.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="p-8 text-center text-muted-foreground">
                  Clique em "Adicionar Formação" para começar
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {formData.education.map((edu, index) => (
                  <Card key={edu.id}>
                    <CardContent className="p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <h4 className="text-primary">Formação {index + 1}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEducation(edu.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label>Instituição *</Label>
                        <Input
                          placeholder="Nome da instituição"
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Curso/Grau *</Label>
                        <Input
                          placeholder="Ex: Bacharelado em Ciência da Computação"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Período *</Label>
                        <Input
                          placeholder="Ex: 2019 - 2023 ou Cursando desde 2021"
                          value={edu.period}
                          onChange={(e) => updateEducation(edu.id, "period", e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="technicalSkills">Habilidades Técnicas *</Label>
              <Textarea
                id="technicalSkills"
                placeholder="Liste suas habilidades técnicas separadas por vírgula&#10;Ex: JavaScript, React, Python, SQL, Git, Figma, Excel Avançado"
                rows={6}
                value={formData.technicalSkills}
                onChange={(e) => setFormData({ ...formData, technicalSkills: e.target.value })}
              />
              <p className="text-muted-foreground">
                Dica: Inclua linguagens, frameworks, ferramentas e softwares que você domina
              </p>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Habilidades Comportamentais (Soft Skills) *</Label>
              <p className="text-muted-foreground mb-4">
                Selecione as habilidades que melhor descrevem você (escolha pelo menos 3)
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {softSkillsOptions.map((skill) => (
                  <Card
                    key={skill}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      formData.softSkills.includes(skill) ? "border-primary border-2" : ""
                    }`}
                    onClick={() => toggleSoftSkill(skill)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={formData.softSkills.includes(skill)}
                          onCheckedChange={() => toggleSoftSkill(skill)}
                        />
                        <span>{skill}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="languages">Idiomas</Label>
              <Textarea
                id="languages"
                placeholder="Liste os idiomas que você conhece e o nível de proficiência&#10;Ex:&#10;Português - Nativo&#10;Inglês - Avançado&#10;Espanhol - Intermediário"
                rows={6}
                value={formData.languages}
                onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
              />
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="certifications">Certificações e Cursos (opcional)</Label>
                <Textarea
                  id="certifications"
                  placeholder="Liste certificações e cursos relevantes&#10;Ex:&#10;• AWS Certified Cloud Practitioner - 2023&#10;• Curso Completo de JavaScript - Udemy - 2022"
                  rows={5}
                  value={formData.certifications}
                  onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Projetos Pessoais (opcional)</Label>
                <Button variant="outline" size="sm" onClick={addProject} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Adicionar Projeto
                </Button>
              </div>
              {formData.projects.length > 0 && (
                <div className="space-y-4">
                  {formData.projects.map((proj, index) => (
                    <Card key={proj.id}>
                      <CardContent className="p-4 space-y-4">
                        <div className="flex justify-between items-start">
                          <h4 className="text-primary">Projeto {index + 1}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProject(proj.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Label>Nome do Projeto</Label>
                          <Input
                            placeholder="Ex: E-commerce de Livros"
                            value={proj.name}
                            onChange={(e) => updateProject(proj.id, "name", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Descrição</Label>
                          <Textarea
                            placeholder="Descreva o projeto e tecnologias utilizadas..."
                            rows={3}
                            value={proj.description}
                            onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Preferências de Formato</Label>
              
              <Card className={`cursor-pointer transition-all hover:shadow-md ${
                formData.atsOptimized ? "border-primary border-2" : ""
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="atsOptimized"
                      checked={formData.atsOptimized}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, atsOptimized: checked as boolean })
                      }
                    />
                    <div className="flex-1">
                      <Label htmlFor="atsOptimized" className="cursor-pointer">
                        Otimizar para ATS (Applicant Tracking System)
                      </Label>
                      <p className="text-muted-foreground mt-1">
                        Recomendado! Formato compatível com sistemas de recrutamento que fazem triagem automática de currículos
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`cursor-pointer transition-all hover:shadow-md ${
                formData.includePhoto ? "border-primary border-2" : ""
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="includePhoto"
                      checked={formData.includePhoto}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, includePhoto: checked as boolean })
                      }
                    />
                    <div className="flex-1">
                      <Label htmlFor="includePhoto" className="cursor-pointer">
                        Incluir espaço para foto
                      </Label>
                      <p className="text-muted-foreground mt-1">
                        Adiciona um espaço para foto profissional no currículo
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Label htmlFor="templateStyle">Estilo de Template</Label>
                <Select
                  value={formData.templateStyle}
                  onValueChange={(value) => setFormData({ ...formData, templateStyle: value })}
                >
                  <SelectTrigger id="templateStyle">
                    <SelectValue placeholder="Selecione um estilo..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Moderno - Clean e minimalista</SelectItem>
                    <SelectItem value="professional">Profissional - Tradicional e formal</SelectItem>
                    <SelectItem value="creative">Criativo - Diferenciado para áreas criativas</SelectItem>
                    <SelectItem value="simple">Simples - Direto ao ponto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Informações Adicionais (opcional)</Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Há algo mais que você gostaria de incluir no seu currículo?"
                  rows={4}
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const stepTitles = [
    "Dados Pessoais",
    "Objetivo Profissional",
    "Status Profissional",
    "Experiências",
    "Formação",
    "Habilidades Técnicas",
    "Habilidades Comportamentais",
    "Idiomas",
    "Certificações e Projetos",
    "Preferências de Formato"
  ];

  const stepDescriptions = [
    "Vamos começar com suas informações de contato",
    "Conte-nos sobre sua meta profissional",
    "Entenda seu momento de carreira",
    "Detalhe suas experiências profissionais",
    "Adicione sua formação acadêmica",
    "Liste suas competências técnicas",
    "Destaque suas principais soft skills",
    "Informe os idiomas que você domina",
    "Adicione certificações e projetos relevantes",
    "Escolha o melhor formato para seu currículo"
  ];

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-accent to-background">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary p-2 rounded-lg">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl text-primary">Criar Meu Currículo</h1>
              <p className="text-muted-foreground">
                Etapa {currentStep} de {totalSteps} - {stepTitles[currentStep - 1]}
              </p>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              {stepTitles[currentStep - 1]}
            </CardTitle>
            <CardDescription>
              {stepDescriptions[currentStep - 1]}
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
                {currentStep === totalSteps ? (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Gerar Currículo com IA
                  </>
                ) : (
                  <>
                    Próximo
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
