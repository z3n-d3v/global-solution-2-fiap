import { 
  Target, 
  TrendingUp, 
  Brain, 
  BarChart3, 
  CheckCircle2,
  ArrowRight 
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ImageWithFallback } from "../ui/ImageWithFallback";

interface HomeProps {
  onNavigate?: (path: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const features = [
    {
      icon: Brain,
      title: "Inteligência Artificial",
      description: "Recomendações personalizadas baseadas em IA para acelerar seu aprendizado"
    },
    {
      icon: Target,
      title: "Trilhas Customizadas",
      description: "Crie trilhas de estudo adaptadas aos seus objetivos profissionais"
    },
    {
      icon: BarChart3,
      title: "Métricas de Progresso",
      description: "Acompanhe sua evolução com dashboards interativos e insights"
    },
    {
      icon: TrendingUp,
      title: "Mercado de Trabalho",
      description: "Fique por dentro das habilidades mais demandadas pelo mercado"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Cadastre-se",
      description: "Crie sua conta gratuitamente em segundos"
    },
    {
      number: "02",
      title: "Preencha o Questionário",
      description: "Conte sobre suas habilidades e objetivos profissionais"
    },
    {
      number: "03",
      title: "Receba sua Trilha",
      description: "Nossa IA cria um plano personalizado para você"
    },
    {
      number: "04",
      title: "Acompanhe seu Progresso",
      description: "Use o dashboard para monitorar sua evolução"
    }
  ];

  const team = [
      {
      name: "Alvaro Gama Bastos Rangel",
      role: "DEV",
      image: "https://avatars.githubusercontent.com/u/22877580?v=4"
    },
    {
      name: "Julia Vitoria da Luz",
      role: "DEV",
      image: "https://avatars.githubusercontent.com/u/106891342?v=4"
    },
    {
      name: "Michael Stephan Silva Gebenlian",
      role: "DEV",
      image: "https://avatars.githubusercontent.com/u/101657773?v=4"
    },
    {
      name: "Murillo Mendes Rodrigues",
      role: "DEV",
      image: "https://avatars.githubusercontent.com/u/127780464?v=4"
    },
    {
      name: "Rafael Costa dos Santos",
      role: "DEV",
      image: "https://avatars.githubusercontent.com/u/211257986?v=4"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent to-background py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-primary max-w-4xl mx-auto">
              Transforme sua carreira com upskilling inteligente
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dificuldade de se preparar para o mercado de trabalho? O TrilhaPro usa IA para criar trilhas de aprendizado personalizadas e acelerar seu desenvolvimento profissional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                className="gap-2"
                onClick={() => onNavigate?.('/auth')}
              >
                Começar Agora
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => onNavigate?.('/contact')}
              >
                Falar com a Equipe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-primary mb-4">
              Como Funciona
            </h2>
            <p className="text-muted-foreground">
              Quatro passos simples para transformar sua carreira
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
                <CardContent className="p-6 space-y-3">
                  <div className="text-4xl text-primary/20">{step.number}</div>
                  <h3 className="text-primary">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recursos */}
      <section className="py-20 px-4 bg-accent/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-primary mb-4">
              Recursos do TrilhaPro
            </h2>
            <p className="text-muted-foreground">
              Ferramentas poderosas para acelerar seu aprendizado
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8 space-y-4">
                  <div className="bg-primary/10 p-3 rounded-lg w-fit">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-primary">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                  <div className="flex items-center gap-2 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Disponível agora</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-primary mb-4">
              Nossa Equipe
            </h2>
            <p className="text-muted-foreground">
              Conheça as pessoas por trás do TrilhaPro
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="text-primary">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl">
            Pronto para dar o próximo passo na sua carreira?
          </h2>
          <p className="text-xl opacity-90">
            Junte-se a milhares de profissionais que já transformaram suas carreiras com o TrilhaPro
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="gap-2"
            onClick={() => onNavigate?.('/auth')}
          >
            Começar Agora Gratuitamente
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
