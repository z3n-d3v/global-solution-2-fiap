import { Achievement } from "./Achievements";

export type User = {
    id: number;
    name: string;
    email: string;
    achievements: Achievement[];
};