import camisetaStreetBasic from "@/assets/products/camiseta-street-basic.jpg";
import camisetaUrbanWhite from "@/assets/products/camiseta-urban-white.jpg";
import camisetaGraphicGray from "@/assets/products/camiseta-graphic-gray.jpg";
import bermudaCargo from "@/assets/products/bermuda-cargo.jpg";
import calcaJogger from "@/assets/products/calca-jogger.jpg";
import boneSnapback from "@/assets/products/bone-snapback.jpg";
import tenisUrban from "@/assets/products/tenis-urban.jpg";
import camisetaEmporioArmani from "@/assets/products/camiseta-emporio-armani.jpg";
import camisetaEmporioArmani2 from "@/assets/products/camiseta-emporio-armani-2.jpg";
import camisetaEmporioArmani3 from "@/assets/products/camiseta-emporio-armani-3.jpg";
import camisetaEmporioArmani4 from "@/assets/products/camiseta-emporio-armani-4.jpg";
import camisetaEmporioArmaniCores from "@/assets/products/camiseta-emporio-armani-cores.jpg";

export type Product = {
  id: string;
  slug: string;
  name: string;
  model: string;
  description: string;
  price: number;
  image: string;
  gallery: string[];
  category: string;
  colors: string[];
  sizes: string[];
  isNew: boolean;
  isBestseller: boolean;
};

// Map of static asset images for migrated products
const staticImages: Record<string, string> = {
  "/products/camiseta-street-basic.jpg": camisetaStreetBasic,
  "/products/camiseta-urban-graphic.jpg": camisetaUrbanWhite,
  "/products/camiseta-essential-gray.jpg": camisetaGraphicGray,
  "/products/bermuda-cargo-street.jpg": bermudaCargo,
  "/products/calca-jogger-premium.jpg": calcaJogger,
  "/products/bone-snapback-classic.jpg": boneSnapback,
  "/products/tenis-urban-high.jpg": tenisUrban,
  "/products/camiseta-emporio-armani-ea7.jpg": camisetaEmporioArmani,
  "/products/camiseta-emporio-armani-ea7-2.jpg": camisetaEmporioArmani2,
  "/products/camiseta-emporio-armani-ea7-3.jpg": camisetaEmporioArmani3,
  "/products/camiseta-emporio-armani-ea7-4.jpg": camisetaEmporioArmani4,
  "/products/camiseta-emporio-armani-ea7-cores.jpg": camisetaEmporioArmaniCores,
};

/** Resolve image URL: static assets or remote URLs */
export const resolveImageUrl = (url: string): string => {
  return staticImages[url] || url;
};

export const categories = [
  { id: "camisetas", name: "Camisetas", emoji: "👕" },
  { id: "bermudas", name: "Bermudas", emoji: "🩳" },
  { id: "calcas", name: "Calças", emoji: "👖" },
  { id: "bones", name: "Bonés", emoji: "🧢" },
  { id: "tenis", name: "Tênis", emoji: "👟" },
];

export const formatPrice = (price: number) =>
  price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const buildWhatsAppLink = (product: Product, size: string, color: string, quantity: number) => {
  const message = encodeURIComponent(
    `Olá! Quero fazer um pedido na LOJA STREETWEAR.\n\n` +
    `Produto: ${product.name}\n` +
    `Modelo: ${product.model}\n` +
    `Tamanho: ${size}\n` +
    `Cor: ${color}\n` +
    `Quantidade: ${quantity}\n\n` +
    `Pode confirmar disponibilidade?`
  );
  return `https://wa.me/5541999939763?text=${message}`;
};
