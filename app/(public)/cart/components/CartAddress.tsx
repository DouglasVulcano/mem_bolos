"use client";

import { sendWhatsappCheckoutNotification } from "@/utils/whatsappUtils";
import { AddressSchema } from "@/validations/addressSchema";
import { useAddressForm } from "@/hooks/useAddressForm";
import { useCart } from "@/hooks/useCart";
import InputField from "./InputField";
import { useRouter } from "next/navigation";

export default function CartAddress() {
  const router = useRouter();

  const { totalPrice, cart, clearCart } = useCart();
  const {
    register,
    handleSubmit,
    errors,
    loading,
    invalidCep,
    handleCepChange,
    saveAddressToStorage,
  } = useAddressForm();

  const onSubmit = (data: AddressSchema) => {
    saveAddressToStorage(data);
    sendWhatsappCheckoutNotification(data, cart);
    clearCart();
    router.push("/");
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-6 mt-6">
        Informações do Comprador
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
          <InputField
            label="Nome Completo"
            register={register("customerName")}
            error={errors.customerName?.message}
            className="mb-4"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <InputField
              label="CEP"
              register={register("zipCode")}
              error={errors.zipCode?.message}
              maxLength={9}
              placeholder="00000-000"
              onChange={handleCepChange}
            />
            <InputField
              label="Rua"
              register={register("street")}
              error={errors.street?.message}
              disabled
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <InputField
              label="Número"
              type="number"
              register={register("number")}
              error={errors.number?.message}
            />
            <InputField
              label="Bairro"
              register={register("neighborhood")}
              error={errors.neighborhood?.message}
              disabled
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <InputField
              label="Cidade"
              register={register("city")}
              error={errors.city?.message}
              disabled
            />
            <InputField
              label="Estado"
              register={register("state")}
              error={errors.state?.message}
              disabled
            />
          </div>

          <InputField
            label="Complemento"
            register={register("complement")}
            error={errors.complement?.message}
            className="mb-4"
          />

          {loading && (
            <p className="text-blue-500 text-sm mt-2">Buscando endereço...</p>
          )}
        </div>

        <div className="mt-6 bg-gray-100 rounded-lg p-6">
          <h2 className="text-xl font-semibold">
            Total: R$ {totalPrice.toFixed(2)}
          </h2>
          <button
            type="submit"
            disabled={invalidCep}
            className="w-full mt-4 px-4 py-2 rounded-lg transition-all active:scale-95 bg-pink-500 hover:bg-pink-600 text-white"
          >
            Finalizar Pedido
          </button>
        </div>
      </form>
    </>
  );
}
