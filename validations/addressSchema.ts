import { z } from "zod";

export const addressSchema = z.object({
  customerName: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  zipCode: z.string().regex(/^\d{5}-\d{3}$/, "CEP inválido"),
  street: z.string().min(3, "Rua obrigatória"),
  number: z.string().min(1, "Número obrigatório"),
  neighborhood: z.string().min(3, "Bairro obrigatório"),
  city: z.string().min(2, "Cidade obrigatória"),
  state: z.string().min(2, "Estado obrigatório"),
  complement: z.string().optional(),
});

export type AddressSchema = z.infer<typeof addressSchema>;
