import React, { createContext, useContext } from "react";
import UsersData from '@/data/users.json';
import { User } from "@/types/User";

const USERS: User[] = UsersData.users;
const UserContext = createContext<User[] | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => (
    <UserContext.Provider value={USERS}>
        {children}
    </UserContext.Provider>
);

export function useUserContext() {
    const data = useContext(UserContext);
    if (!data) throw new Error("UserContext is missing");
    return data;
}