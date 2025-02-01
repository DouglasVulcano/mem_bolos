import { create } from "zustand";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import auth from "@/config/firebase";
import { authSchema } from "@/validations/authSchema";
import Cookies from "js-cookie";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  email: string;
  password: string;
  errors: { email?: string; password?: string };
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  signIn: (navigate: (path: string) => void) => Promise<void>;
  logout: (navigate: (path: string) => void) => Promise<void>;
  checkAuthState: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  email: "",
  password: "",
  errors: {},

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),

  signIn: async (navigate) => {
    set({ errors: {} });

    try {
      const { email, password } = useAuthStore.getState();

      const result = authSchema.safeParse({ email, password });
      if (!result.success) {
        const newErrors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          newErrors[issue.path[0]] = issue.message;
        });
        set({ errors: newErrors });
        return;
      }

      // Autenticação Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      // Salvar token nos cookies (expira em 7 dias)
      Cookies.set("authToken", token, { expires: 7 });

      set({ user, isAuthenticated: true, email: "", password: "", errors: {} });
      navigate("/admin");
    } catch {
      set({ errors: { email: "E-mail ou senha incorretos." } });
    }
  },

  logout: async (navigate) => {
    await signOut(auth);
    Cookies.remove("authToken");
    set({ user: null, isAuthenticated: false, email: "", password: "" });
    navigate("/login");
  },

  checkAuthState: () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        Cookies.set("authToken", token, { expires: 7 });
        set({ user, isAuthenticated: true });
      } else {
        Cookies.remove("authToken");
        set({ user: null, isAuthenticated: false });
      }
    });
  },
}));
