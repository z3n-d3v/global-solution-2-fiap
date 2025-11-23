import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ListChecks, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { useCurrentUserData } from "@/hooks/useCurrentUserData";

export default function Workflows() {
  const currentUser = useCurrentUserData();

  const [trilhas, setTrilhas] = useState([
    {
      id: 1,
      titulo: "Aprender Docker",
      passos: [
        { id: 1, titulo: "Estudar virtualização", done: true },
        { id: 2, titulo: "Estudar Linux", done: false },
      ],
    },
  ]);

  const [novaTrilha, setNovaTrilha] = useState("");

  function adicionarTrilha() {
    if (!novaTrilha.trim()) return;
    setTrilhas([
      ...trilhas,
      {
        id: Date.now(),
        titulo: novaTrilha,
        passos: [],
      },
    ]);
    setNovaTrilha("");
  }

  function togglePasso(trilhaId, passoId) {
    setTrilhas((prev) =>
      prev.map((t) =>
        t.id === trilhaId
          ? {
              ...t,
              passos: t.passos.map((p) =>
                p.id === passoId ? { ...p, done: !p.done } : p
              ),
            }
          : t
      )
    );
  }

  function adicionarPasso(trilhaId) {
    const titulo = prompt("Nome do passo:");
    if (!titulo) return;
    setTrilhas((prev) =>
      prev.map((t) =>
        t.id === trilhaId
          ? {
              ...t,
              passos: [...t.passos, { id: Date.now(), titulo, done: false }],
            }
          : t
      )
    );
  }

  function calcularProgresso(passos) {
    if (passos.length === 0) return 0;
    const feitos = passos.filter((p) => p.done).length;
    return Math.round((feitos / passos.length) * 100);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <motion.h1
        className="text-3xl font-bold flex items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ListChecks /> Minhas Trilhas
      </motion.h1>

      {/* Criar nova trilha */}
      <div className="flex gap-3">
        <Input
          placeholder="Criar nova trilha..."
          value={novaTrilha}
          onChange={(e) => setNovaTrilha(e.target.value)}
        />
        <Button onClick={adicionarTrilha}>
          <Plus />
        </Button>
      </div>

      {/* Lista de trilhas */}
      <div className="grid gap-4">
        {trilhas.map((trilha) => {
          const progresso = calcularProgresso(trilha.passos);

          return (
            <motion.div
              key={trilha.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="shadow-md border p-4 rounded-2xl">
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">{trilha.titulo}</h2>
                    <span className="text-sm opacity-70">{progresso}% completo</span>
                  </div>

                  {/* Lista de passos */}
                  <div className="space-y-2 mt-2">
                    {trilha.passos.map((passo) => (
                      <div
                        key={passo.id}
                        className="flex items-center gap-3 border rounded-xl p-2"
                      >
                        <Checkbox
                          checked={passo.done}
                          onCheckedChange={() => togglePasso(trilha.id, passo.id)}
                        />
                        <span className={passo.done ? "line-through opacity-60" : ""}>
                          {passo.titulo}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="secondary"
                    className="w-full mt-3"
                    onClick={() => adicionarPasso(trilha.id)}
                  >
                    Adicionar passo
                  </Button>

                  {/* Feedback sobre a trilha */}
                  <div className="mt-4 p-3 bg-accent rounded-xl text-sm">
                    {progresso === 0 && (
                      <p>
                        🔥 Comece sua jornada! Você ainda não marcou nenhum passo como feito.
                      </p>
                    )}
                    {progresso > 0 && progresso < 100 && (
                      <p>
                        🚀 Bom progresso! Você completou {progresso}% da trilha. Continue assim.
                      </p>
                    )}
                    {progresso === 100 && (
                      <p className="flex gap-2 items-center font-medium">
                        <CheckCircle2 /> Trilha concluída! Excelente trabalho.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
