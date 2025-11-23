import { useAuth } from "@/context/AuthContext";
import { useUserContext } from "@/context/UserContext";

export function useCurrentUserData() {
  const { user } = useAuth();
  const users = useUserContext();

  if (!user) return null;
  return users.find(u => u.id === user.id) || null;
}