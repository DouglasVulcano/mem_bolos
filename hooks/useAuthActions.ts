"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

export function useAuthActions() {
  const { email, password, errors, setEmail, setPassword, signIn, logout } =
    useAuthStore();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "email") setEmail(e.target.value);
    if (e.target.id === "password") setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(router.push);
  };

  const logOut = () => logout(router.push);

  return {
    formData: { email, password },
    errors,
    handleChange,
    handleSubmit,
    logOut,
  };
}
