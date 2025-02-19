import "server-only";

import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  sendTextMessage(
    `Ola, Douglas! Seu pagamento de R$${paymentData.transaction_amount} foi realizado com sucesso!`
  );

  return;
}

export async function sendTextMessage(message: string) {
  try {
    const response = await fetch(
      `${process.env.EVOLUTION_BASE_URL}/message/sendText/${process.env.EVOLUTION_INSTANCE_NAME}`,
      {
        method: "POST",
        headers: {
          apikey: `${process.env.PUBLIC_EVOLUTION_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: `${process.env.WHATSAPP_NUMBER}@s.whatsapp.net`,
          text: message,
          preview_url: true,
        }),
      }
    );

    return await response.json();
  } catch (error) {
    console.error("Erro ao enviar mensagem via Evolution API:", error);
    return {
      error: true,
      message: "Erro ao enviar mensagem",
    };
  }
}
