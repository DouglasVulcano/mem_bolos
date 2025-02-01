"use client";

import { useState } from "react";
import auth from "@/config/firebase";
import { useRouter } from "next/navigation";
import { authSchema } from "../validations/authSchema";
import { signInWithEmailAndPassword } from "firebase/auth";

type FormData = {
  email: string;
  password: string;
};

export function useAuthForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      // Armazena o token nos cookies para que o middleware possa validá-lo
      document.cookie = `authToken=${token}; path=/; secure; HttpOnly;`;

      router.push("/admin/dashboard");
      setFormData({ email: "", password: "" });
      setErrors({});
    } catch {
      setErrors({
        email: "E-mail ou senha incorretos.",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = authSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        newErrors[issue.path[0]] = issue.message;
      });
      setErrors(newErrors);
    } else {
      signIn();
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
}
