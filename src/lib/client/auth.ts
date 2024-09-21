import { useUserStore } from "@/app/_store/user";
import { create } from "zustand";

type AuthStore = {
  auth: boolean;
  setAuth: (value: boolean) => void;
};

/**
 * A store for managing the authentication state of the client.
 *
 * NOTE: THIS DOES NOT ACTUALLY HANDLE AUTHENTICATION, IT JUST STORES THE STATE.
 * You should use the `useCheckAuth` function to actually check if the user is authenticated.
 * @returns `AuthStore` - The store for managing the authentication state.
 *
 * Check the `authenticated` property to see if the user is authenticated, and use the `setAuthenticated` function to update the state.
 */
export const useAuthStore = create<AuthStore>()((set) => ({
  auth: false,
  setAuth: (value) => set({ auth: value }),
}));

/**
 * Makes a network request to the backend to check if the user is authenticated.
 * @returns `boolean` - `true` if the user is authenticated, `false` otherwise.
 * @example
 * ```ts
 * useEffect(() => {
 *   useAuthCheck().then((auth) => {
 *     useAuthStore.getState().setAuth(auth);
 *     if (auth) {
 *       notifications.show({
 *         title: "Already logged in",
 *         message: "Redirecting to dashboard...",
 *       });
 *       navigate("/dashboard");
 *     }
 *   });
 * }, []);
 * ```
 */
export async function useAuthCheck() {
  const res = await fetch("/api/auth/check");
  if (res.status === 200) {
    return true;
  }
  return false;
}

export async function logOut() {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });
    if (res.status === 200) {
      return true;
    }
    throw new Error("Failed to log out");
  } catch (e) {
    return false;
  } finally {
    useAuthStore.getState().setAuth(false);
    useUserStore.getState().setUser(null);
  }
}
