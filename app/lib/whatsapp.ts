export const WHATSAPP_PHONE_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917304056607";

export interface WhatsAppProductParams {
  title: string;
  category?: string;
  price: number;
  quantity?: number;
  variant?: string;
  size?: string;
  color?: string;
  url?: string;
}

export interface WhatsAppCartItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
}

/**
 * Builds a direct WhatsApp inquiry URL for a single product (Buy Now flow)
 */
export function buildProductWhatsAppUrl({
  title,
  category,
  price,
  quantity = 1,
  variant,
  size,
  color,
  url,
}: WhatsAppProductParams): string {
  const options = [
    size ? `Size: ${size}` : null,
    color ? `Color: ${color}` : null,
    variant ? `Variant: ${variant}` : null,
  ]
    .filter(Boolean)
    .join(" • ");

  const totalPrice = price * quantity;

  const lines = [
    "✨ *New Product Inquiry — Ashren Haute Marketplace*",
    "",
    `*Product:* ${title}`,
    category ? `*Category:* ${category}` : null,
    options ? `*Selected Option:* ${options}` : null,
    `*Quantity:* ${quantity}`,
    `*Price:* ₹${price.toLocaleString("en-IN")}${
      quantity > 1 ? ` (Total: ₹${totalPrice.toLocaleString("en-IN")})` : ""
    }`,
    url ? `*Link:* ${url}` : null,
    "",
    "Hello Ashren Concierge! I would like to place an order for this item. Please share payment and delivery details!",
  ].filter((line) => line !== null);

  const message = lines.join("\n");
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds a WhatsApp checkout URL with itemized cart list and total (Checkout flow)
 */
export function buildCartWhatsAppUrl(
  cartItems: WhatsAppCartItem[],
  subtotal: number,
  total: number
): string {
  const itemsText = cartItems
    .map((item, index) => {
      const itemTotal = item.price * item.quantity;
      return `${index + 1}. *${item.name}*\n   • Variant: ${
        item.variant || "Standard Edition"
      }\n   • Qty: ${item.quantity} × ₹${item.price.toLocaleString(
        "en-IN"
      )} = ₹${itemTotal.toLocaleString("en-IN")}`;
    })
    .join("\n\n");

  const lines = [
    "🛍️ *New Order Checkout — Ashren Haute Marketplace*",
    "",
    "*Order Summary:*",
    itemsText,
    "",
    "────────────────────",
    `*Subtotal:* ₹${subtotal.toLocaleString("en-IN")}`,
    "*Shipping:* FREE Express (Across India)",
    `*Estimated Total:* ₹${total.toLocaleString("en-IN")}`,
    "────────────────────",
    "",
    "Hello Ashren Concierge! I would like to confirm my order and proceed with payment.",
  ];

  const message = lines.join("\n");
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Opens WhatsApp in a new tab/window
 */
export function openWhatsApp(url: string) {
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
