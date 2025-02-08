import { CartItem } from "@/stores/useCartStore";
import { AddressSchema } from "@/validations/addressSchema";

export const sendWhatsappCheckoutNotification = async (
  data: AddressSchema,
  cart: CartItem[]
) => {
  // Formatar a mensagem dos itens do carrinho
  const itemsMessage = cart
    .map(
      (item) =>
        `*${item.title}*
        - Quantidade: ${item.quantity}
        - Preço: R$ ${item.price.toFixed(2)}`
    )
    .join("\n");

  // Calcular o total do pedido
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Formatar a mensagem do endereço
  const addressMessage = `
🏠 *Endereço de entrega:*
Nome: ${data.customerName}
Rua: ${data.street}, ${data.number}
Complemento: ${data.complement || "N/A"}
Bairro: ${data.neighborhood}
Cidade: ${data.city} - ${data.state}
CEP: ${data.zipCode}
  `.trim();

  // Mensagem completa
  const fullMessage = `
🎉 *Novo Pedido!* 🎉

📦 *Itens do pedido:*
${itemsMessage}

💰 *Total do pedido:* R$ ${totalPrice.toFixed(2)}

${addressMessage}
  `.trim();

  sendWhatsappNotification(fullMessage);
};

export const sendWhatsappNotification = (message: string) => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const encodedMessage = encodeURIComponent(message);

  const whatsappUrl = isMobile
    ? `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
};
