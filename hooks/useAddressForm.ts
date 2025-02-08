"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressSchema, addressSchema } from "@/validations/addressSchema";

const ADDRESS_STORAGE_KEY = "cart_address";

export function useAddressForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  const [invalidCep, setInvalidCep] = useState(false);

  // Função para formatar CEP
  const formatCep = (cep: string) => {
    return cep
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);
  };

  // Busca endereço via API do ViaCEP
  const fetchAddress = async (cep: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cep.replace("-", "")}/json/`
      );
      const data = await response.json();

      if (data.erro) {
        setValue("street", "");
        setValue("neighborhood", "");
        setValue("city", "");
        setValue("state", "");
        // Define erro no React Hook Form
        setError("zipCode", { type: "manual", message: "CEP inválido" });
        setInvalidCep(true);
      } else {
        // Remove erro caso o CEP seja válido
        clearErrors("zipCode");
        setValue("street", data.logradouro);
        setValue("neighborhood", data.bairro);
        setValue("city", data.localidade);
        setValue("state", data.uf);
        setInvalidCep(false);
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      setError("zipCode", { type: "manual", message: "Erro ao buscar CEP" });
      setInvalidCep(true);
    } finally {
      setLoading(false);
    }
  };

  // Manipula entrada do CEP e busca endereço
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCep = formatCep(e.target.value);
    setValue("zipCode", formattedCep);

    if (formattedCep.length === 9) {
      await fetchAddress(formattedCep);
    }
  };

  // Salva endereço validado no LocalStorage
  const saveAddressToStorage = (data: AddressSchema) => {
    localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(data));
  };

  // Carrega endereço salvo ao iniciar o componente
  useEffect(() => {
    const savedAddress = localStorage.getItem(ADDRESS_STORAGE_KEY);
    if (savedAddress) {
      const parsedData: AddressSchema = JSON.parse(savedAddress);
      Object.keys(parsedData).forEach((key) => {
        setValue(
          key as keyof AddressSchema,
          parsedData[key as keyof AddressSchema]
        );
      });
    }
  }, [setValue]);

  return {
    invalidCep,
    errors,
    loading,
    register,
    handleSubmit,
    handleCepChange,
    saveAddressToStorage,
    getValues,
  };
}
