import { useCurrentUserData } from "./useCurrentUserData";
import { ProgressData, WeeklyProgress, MonthlyProgress, SkillProgress } from "@/types/Progress";

export function useUserProgress(): ProgressData | null {
  const user = useCurrentUserData();

  if (!user) return null;

  const weeklyProgress: WeeklyProgress[] = [
    { day: "Seg", hours: 2 },
    { day: "Ter", hours: 3 },
    { day: "Qua", hours: 1.5 },
    { day: "Qui", hours: 4 },
    { day: "Sex", hours: 2.5 },
    { day: "Sáb", hours: 5 },
    { day: "Dom", hours: 3 }
  ];

  const monthlyProgress: MonthlyProgress[] = user.achievements
    .reduce<Record<string, MonthlyProgress>>((acc, achievement) => {
      const month = new Date(achievement.completedDate.split("/").reverse().join("-")).toLocaleString("pt-BR", { month: "short" });
      if (!acc[month]) acc[month] = { month, completed: 0, inProgress: 0 };
      acc[month].completed += 1;
      return acc;
    }, {});

  const monthlyProgressArray = Object.values(monthlyProgress);

  const skillProgress: SkillProgress[] = user.next_steps.map(step => ({
    skill: step.title,
    level: step.progress
  }));

  const learningStreak = 12;

  const totalHoursThisWeek = weeklyProgress.reduce((sum, day) => sum + day.hours, 0);

  return {
    weeklyProgress,
    monthlyProgress: monthlyProgressArray,
    skillProgress,
    learningStreak,
    totalHoursThisWeek
  };
}