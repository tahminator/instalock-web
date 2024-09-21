import { useUserStore } from "@/app/_store/user";
import { useAuthCheck, useAuthStore } from "@/lib/client/auth";
import { ApiType } from "@/lib/client/schema/api";
import { notifications } from "@mantine/notifications";
import { User } from "@prisma/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  // Get the authentication state and set it initially
  useEffect(() => {
    const checkAuth = async () => {
      const auth = await useAuthCheck();
      useAuthStore.getState().setAuth(auth);
      if (!auth) {
        notifications.show({
          title: "Not logged in",
          message: "Redirecting to login...",
        });
        navigate("/login");
      }
    };
    checkAuth();
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/@me");
      if (res.status === 200) {
        const json: ApiType<User> = await res.json();
        console.log(json.data);
        setUser(json.data);
      } else {
        notifications.show({
          title: "Error",
          message: "Failed to fetch user data",
          color: "red",
        });
        navigate("/login");
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.username}!</p>
    </div>
  );
}
