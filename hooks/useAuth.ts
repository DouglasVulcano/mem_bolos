"use client";

import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import auth from "@/config/firebase";

export function useAuth(redirect: boolean = true) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (redirect && !currentUser) router.push("/admin");
    });
    return () => unsubscribe();
  }, [redirect, router]);

  return { user };
}
