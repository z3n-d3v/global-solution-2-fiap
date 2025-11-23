export interface WeeklyProgress {
  day: string;
  hours: number;
}

export interface MonthlyProgress {
  month: string;
  completed: number;
  inProgress: number;
}

export interface SkillProgress {
  skill: string;
  level: number;
}

export interface ProgressData {
  weeklyProgress: WeeklyProgress[];
  monthlyProgress: MonthlyProgress[];
  skillProgress: SkillProgress[];
  learningStreak: number;
  totalHoursThisWeek: number;
}
