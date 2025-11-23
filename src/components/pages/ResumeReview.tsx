import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { 
  FileText, 
  Download, 
  Edit, 
  CheckCircle2, 
  AlertCircle,
  Lightbulb,
  Eye,
  MessageSquare
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useCurrentUserData } from "@/hooks/useCurrentUserData";

interface ResumeReviewProps {
  onNavigate?: (path: string) => void;
}

export function ResumeReview({ onNavigate }: ResumeReviewProps) {
  const [activeSection, setActiveSection] = useState<string>("header");
  const userContext = useCurrentUserData();

  console.log(userContext)
  // Mock do currículo gerado pela IA
  const generatedResume = {
    header: {
      name: userContext.name,
      contact: `${userContext.email} | ${userContext.phone} | ${userContext.address.state}`,
      links: `linkedin.com/in/${userContext.abbr} | github.com/${userContext.abbr}`,
      aiExplanation: "Organizei suas informações de contato de forma clara e ATS-friendly. Usei formatação simples para garantir que sistemas automatizados possam ler facilmente."
    },
    summary: {
      text: "Desenvolvedor Front-end em transição de carreira com sólida base em JavaScript, React e TypeScript. Experiência em projetos pessoais utilizando metodologias ágeis e foco em UX. Busco oportunidade para aplicar conhecimentos técnicos e contribuir com soluções inovadoras em equipes multidisciplinares.",
      aiExplanation: "Criei um resumo profissional que destaca suas habilidades principais e objetivo de carreira. Incluí palavras-chave relevantes para a área de desenvolvimento front-end que são frequentemente procuradas por recrutadores.",
      tips: [
        "Sempre personalize o resumo para cada vaga que você aplicar",
        "Mantenha entre 3-4 linhas para facilitar a leitura",
        "Use verbos de ação e resultados mensuráveis quando possível"
      ]
    },
    skills: {
      technical: ["JavaScript (ES6+)", "React.js", "TypeScript", "HTML5/CSS3", "Git/GitHub", "REST APIs", "Responsive Design"],
      soft: ["Comunicação", "Trabalho em Equipe", "Resolução de Problemas", "Adaptabilidade"],
      aiExplanation: "Organizei suas habilidades em duas categorias para facilitar a leitura. Adicionei especificações técnicas (como ES6+ e React.js) para mostrar profundidade de conhecimento.",
      tips: [
        "Priorize habilidades mencionadas na descrição da vaga",
        "Seja específico sobre tecnologias (ex: React.js ao invés de apenas JavaScript)",
        "Equilibre habilidades técnicas e comportamentais"
      ]
    },
    experience: {
      items: [
        {
          title: "Desenvolvedor Front-end (Projetos Freelance)",
          period: "Jan 2023 - Presente",
          description: [
            "Desenvolvimento de 5+ landing pages responsivas utilizando React e Tailwind CSS",
            "Implementação de integração com APIs REST e gerenciamento de estado com Context API",
            "Colaboração com designers para traduzir mockups em código funcional"
          ]
        }
      ],
      aiExplanation: "Transformei suas experiências em bullet points focados em resultados e ações. Usei verbos de ação no início de cada frase e quantifiquei quando possível (5+ landing pages).",
      tips: [
        "Use a fórmula: Ação + Contexto + Resultado",
        "Quantifique resultados sempre que possível",
        "Foque em conquistas, não apenas responsabilidades"
      ]
    },
    education: {
      items: [
        {
          degree: "Bacharelado em Ciência da Computação",
          institution: "Universidade Federal de São Paulo",
          period: "2019 - 2023"
        }
      ],
      aiExplanation: "Formato tradicional e direto para a seção de educação, perfeito para ATS.",
      tips: [
        "Liste a formação mais recente primeiro",
        "Inclua GPA se for acima de 3.5",
        "Mencione projetos acadêmicos relevantes se não tiver muita experiência"
      ]
    },
    projects: {
      items: [
        {
          name: "E-commerce de Livros",
          description: "Aplicação full-stack desenvolvida com React, Node.js e MongoDB. Implementação de carrinho de compras, autenticação JWT e integração com API de pagamento.",
          link: "github.com/joaosilva/ecommerce-livros"
        }
      ],
      aiExplanation: "Destaquei seus projetos pessoais para compensar a experiência profissional limitada. Projetos demonstram iniciativa e habilidades práticas.",
      tips: [
        "Sempre inclua link para o código/demo",
        "Descreva o problema que o projeto resolve",
        "Mencione as tecnologias principais utilizadas"
      ]
    }
  };

  const atsChecklist = [
    { item: "Formato simples e limpo", status: true },
    { item: "Sem imagens ou gráficos complexos", status: true },
    { item: "Fonte padrão (Arial, Calibri ou Times)", status: true },
    { item: "Palavras-chave relevantes da área", status: true },
    { item: "Informações de contato no topo", status: true },
    { item: "Sem tabelas ou colunas complexas", status: true },
    { item: "Formato PDF ou DOCX", status: true }
  ];

  const handleDownload = (format: string) => {
    toast.success(`Currículo baixado em formato ${format}!`);
  };

  const handleEdit = (section: string) => {
    toast.info(`Editando seção: ${section}`);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl text-primary mb-2">Seu Currículo Está Pronto!</h1>
              <p className="text-muted-foreground">
                Revise cada seção e veja as explicações da IA sobre as escolhas feitas
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Eye className="h-4 w-4" />
                Visualizar
              </Button>
              <Button className="gap-2" onClick={() => handleDownload("PDF")}>
                <Download className="h-4 w-4" />
                Baixar PDF
              </Button>
            </div>
          </div>

          {/* ATS Score Card */}
          <Card className="border-2 border-green-500/20 bg-green-50/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-500 p-3 rounded-full">
                  <CheckCircle2 className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-primary mb-1">Otimizado para ATS</h3>
                  <p className="text-muted-foreground">
                    Seu currículo passou em todos os critérios de compatibilidade com sistemas de recrutamento
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl text-green-600">98%</div>
                  <div className="text-muted-foreground">Score ATS</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Preview do Currículo */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Preview do Currículo
                </CardTitle>
                <CardDescription>
                  Clique em cada seção para ver explicações e dicas da IA
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Header Section */}
                <div 
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    activeSection === "header" ? "border-primary bg-accent" : "border-transparent hover:bg-accent/50"
                  }`}
                  onClick={() => setActiveSection("header")}
                >
                  <div className="text-center mb-2">
                    <h2 className="text-primary text-2xl">{generatedResume.header.name}</h2>
                    <p className="text-muted-foreground">{generatedResume.header.contact}</p>
                    <p className="text-muted-foreground">{generatedResume.header.links}</p>
                  </div>
                  {activeSection === "header" && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <MessageSquare className="h-4 w-4 mt-0.5 text-primary" />
                        <p>{generatedResume.header.aiExplanation}</p>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Summary Section */}
                <div 
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    activeSection === "summary" ? "border-primary bg-accent" : "border-transparent hover:bg-accent/50"
                  }`}
                  onClick={() => setActiveSection("summary")}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-primary">RESUMO PROFISSIONAL</h3>
                    <Button variant="ghost" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      handleEdit("summary");
                    }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-foreground">{generatedResume.summary.text}</p>
                  {activeSection === "summary" && (
                    <div className="mt-4 pt-4 border-t space-y-3">
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <MessageSquare className="h-4 w-4 mt-0.5 text-primary" />
                        <p>{generatedResume.summary.aiExplanation}</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="h-4 w-4 text-blue-600" />
                          <span className="text-blue-900">Dicas da IA</span>
                        </div>
                        <ul className="space-y-1 text-sm text-blue-800">
                          {generatedResume.summary.tips.map((tip, idx) => (
                            <li key={idx}>• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Skills Section */}
                <div 
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    activeSection === "skills" ? "border-primary bg-accent" : "border-transparent hover:bg-accent/50"
                  }`}
                  onClick={() => setActiveSection("skills")}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-primary">HABILIDADES</h3>
                    <Button variant="ghost" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      handleEdit("skills");
                    }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-foreground mb-2">Habilidades Técnicas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {generatedResume.skills.technical.map((skill, idx) => (
                          <Badge key={idx} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-foreground mb-2">Habilidades Comportamentais:</h4>
                      <div className="flex flex-wrap gap-2">
                        {generatedResume.skills.soft.map((skill, idx) => (
                          <Badge key={idx} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  {activeSection === "skills" && (
                    <div className="mt-4 pt-4 border-t space-y-3">
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <MessageSquare className="h-4 w-4 mt-0.5 text-primary" />
                        <p>{generatedResume.skills.aiExplanation}</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="h-4 w-4 text-blue-600" />
                          <span className="text-blue-900">Dicas da IA</span>
                        </div>
                        <ul className="space-y-1 text-sm text-blue-800">
                          {generatedResume.skills.tips.map((tip, idx) => (
                            <li key={idx}>• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Experience Section */}
                <div 
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    activeSection === "experience" ? "border-primary bg-accent" : "border-transparent hover:bg-accent/50"
                  }`}
                  onClick={() => setActiveSection("experience")}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-primary">EXPERIÊNCIA PROFISSIONAL</h3>
                    <Button variant="ghost" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      handleEdit("experience");
                    }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  {generatedResume.experience.items.map((exp, idx) => (
                    <div key={idx} className="mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-foreground">{exp.title}</h4>
                        <span className="text-muted-foreground">{exp.period}</span>
                      </div>
                      <ul className="space-y-1">
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-foreground">• {item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {activeSection === "experience" && (
                    <div className="mt-4 pt-4 border-t space-y-3">
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <MessageSquare className="h-4 w-4 mt-0.5 text-primary" />
                        <p>{generatedResume.experience.aiExplanation}</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="h-4 w-4 text-blue-600" />
                          <span className="text-blue-900">Dicas da IA</span>
                        </div>
                        <ul className="space-y-1 text-sm text-blue-800">
                          {generatedResume.experience.tips.map((tip, idx) => (
                            <li key={idx}>• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Projects Section */}
                <div 
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    activeSection === "projects" ? "border-primary bg-accent" : "border-transparent hover:bg-accent/50"
                  }`}
                  onClick={() => setActiveSection("projects")}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-primary">PROJETOS</h3>
                    <Button variant="ghost" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      handleEdit("projects");
                    }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  {generatedResume.projects.items.map((proj, idx) => (
                    <div key={idx} className="mb-3">
                      <h4 className="text-foreground mb-1">{proj.name}</h4>
                      <p className="text-foreground mb-1">{proj.description}</p>
                      <a href={`https://${proj.link}`} className="text-primary hover:underline text-sm">
                        {proj.link}
                      </a>
                    </div>
                  ))}
                  {activeSection === "projects" && (
                    <div className="mt-4 pt-4 border-t space-y-3">
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <MessageSquare className="h-4 w-4 mt-0.5 text-primary" />
                        <p>{generatedResume.projects.aiExplanation}</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="h-4 w-4 text-blue-600" />
                          <span className="text-blue-900">Dicas da IA</span>
                        </div>
                        <ul className="space-y-1 text-sm text-blue-800">
                          {generatedResume.projects.tips.map((tip, idx) => (
                            <li key={idx}>• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* ATS Checklist */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Checklist ATS</CardTitle>
                <CardDescription>
                  Verificações para compatibilidade com sistemas de recrutamento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {atsChecklist.map((check, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="text-foreground">{check.item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Ações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full gap-2" onClick={() => handleDownload("PDF")}>
                  <Download className="h-4 w-4" />
                  Baixar PDF
                </Button>
                <Button variant="outline" className="w-full gap-2" onClick={() => handleDownload("DOCX")}>
                  <Download className="h-4 w-4" />
                  Baixar DOCX
                </Button>
                <Button variant="outline" className="w-full gap-2" onClick={() => onNavigate?.('/dashboard')}>
                  Ir para Dashboard
                </Button>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-2 border-blue-500/20 bg-blue-50/50">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-primary mb-2">Dica Final</h4>
                    <p className="text-sm text-foreground">
                      Sempre personalize seu currículo para cada vaga. Use as palavras-chave da descrição da vaga no seu resumo e habilidades.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
