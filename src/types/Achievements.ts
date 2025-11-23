export type Achievement = {
  id: string;
  courseName: string;
  description: string;
  category: string;
  hours: number;
  completedDate: string;
  icon: "medal" | "trophy" | "star";
  level: "iniciante" | "intermediário" | "avançado";
};