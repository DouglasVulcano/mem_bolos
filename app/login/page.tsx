"use client";

import { useAuthActions } from "@/hooks/useAuthActions";
import { InputField } from "@/components/InputField";

export default function Admin() {
  const { formData, errors, handleChange, handleSubmit } = useAuthActions();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-geist-sans">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full max-w-xs">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <InputField
              label="E-mail"
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <InputField
              label="Senha"
              id="password"
              type="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
            <div className="flex justify-end">
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Entrar
              </button>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} M&M Bolos. Todos os direitos
            reservados.
          </p>
        </div>
      </main>
    </div>
  );
}
