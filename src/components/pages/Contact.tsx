import { Mail, Linkedin, Github, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setFormData({ name: "", email: "", message: "" });
  };

  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "contato@trilhapro.com",
      href: "mailto:contato@trilhapro.com"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/company/trilhapro",
      href: "https://linkedin.com/company/trilhapro"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/trilhapro",
      href: "https://github.com/trilhapro"
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl text-primary mb-4">
            Entre em Contato
          </h1>
          <p className="text-muted-foreground">
            Tem dúvidas ou sugestões? Adoraríamos ouvir você!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {contactLinks.map((link, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center space-y-3">
                <div className="bg-primary/10 p-3 rounded-lg w-fit mx-auto">
                  <link.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">{link.label}</p>
                  <a 
                    href={link.href}
                    className="text-primary hover:underline break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.value}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary">Envie uma Mensagem</CardTitle>
            <CardDescription>
              Preencha o formulário abaixo e retornaremos em breve
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea
                  id="message"
                  placeholder="Como podemos ajudar?"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full gap-2">
                <Send className="h-4 w-4" />
                Enviar Mensagem
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
