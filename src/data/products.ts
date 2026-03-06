import camisetaStreetBasic from "@/assets/products/camiseta-street-basic.jpg";
import camisetaUrbanWhite from "@/assets/products/camiseta-urban-white.jpg";
import camisetaGraphicGray from "@/assets/products/camiseta-graphic-gray.jpg";
import bermudaCargo from "@/assets/products/bermuda-cargo.jpg";
import calcaJogger from "@/assets/products/calca-jogger.jpg";
import boneSnapback from "@/assets/products/bone-snapback.jpg";
import tenisUrban from "@/assets/products/tenis-urban.jpg";

export type Product = {
  id: string;
  name: string;
  model: string;
  description: string;
  price: number;
  image: string;
  category: string;
  colors: string[];
  sizes: string[];
  isNew?: boolean;
  isBestseller?: boolean;
};

export const products: Product[] = [
  {
    id: "camiseta-street-basic",
    name: "Camiseta Street Basic",
    model: "Oversized",
    description: "Camiseta oversized em algodão premium. Corte amplo e confortável, perfeita para o dia a dia com estilo streetwear.",
    price: 129.90,
    image: camisetaStreetBasic,
    category: "camisetas",
    colors: ["Preto", "Branco", "Cinza"],
    sizes: ["P", "M", "G", "GG"],
    isNew: true,
    isBestseller: true,
  },
  {
    id: "camiseta-urban-graphic",
    name: "Camiseta Urban Graphic",
    model: "Oversized",
    description: "Camiseta com estampa exclusiva urbana. Tecido de alta qualidade com caimento perfeito.",
    price: 149.90,
    image: camisetaUrbanWhite,
    category: "camisetas",
    colors: ["Branco", "Preto"],
    sizes: ["P", "M", "G", "GG"],
    isNew: true,
  },
  {
    id: "camiseta-essential-gray",
    name: "Camiseta Essential",
    model: "Regular Fit",
    description: "Camiseta básica essencial em algodão. Corte regular, ideal para composições minimalistas.",
    price: 99.90,
    image: camisetaGraphicGray,
    category: "camisetas",
    colors: ["Cinza", "Preto", "Branco"],
    sizes: ["P", "M", "G", "GG"],
    isBestseller: true,
  },
  {
    id: "bermuda-cargo-street",
    name: "Bermuda Cargo Street",
    model: "Cargo",
    description: "Bermuda cargo com bolsos laterais funcionais. Tecido resistente e confortável para o verão.",
    price: 179.90,
    image: bermudaCargo,
    category: "bermudas",
    colors: ["Preto", "Verde Militar", "Bege"],
    sizes: ["P", "M", "G", "GG"],
    isNew: true,
    isBestseller: true,
  },
  {
    id: "calca-jogger-premium",
    name: "Calça Jogger Premium",
    model: "Jogger",
    description: "Calça jogger em moletom premium. Punho na barra e cintura elástica com cordão.",
    price: 219.90,
    image: calcaJogger,
    category: "calcas",
    colors: ["Preto", "Cinza"],
    sizes: ["38", "40", "42", "44"],
    isBestseller: true,
  },
  {
    id: "bone-snapback-classic",
    name: "Boné Snapback Classic",
    model: "Snapback",
    description: "Boné snapback com aba reta e ajuste traseiro. Design minimalista com logo bordado.",
    price: 89.90,
    image: boneSnapback,
    category: "bones",
    colors: ["Preto", "Branco"],
    sizes: ["Único"],
    isNew: true,
  },
  {
    id: "tenis-urban-high",
    name: "Tênis Urban High",
    model: "High Top",
    description: "Tênis cano alto estilo urbano. Solado emborrachado e design exclusivo streetwear.",
    price: 349.90,
    image: tenisUrban,
    category: "tenis",
    colors: ["Preto/Branco"],
    sizes: ["38", "39", "40", "41", "42", "43"],
    isBestseller: true,
  },
];

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
    `Olá! Quero fazer um pedido na LOJA DO JAO.\n\n` +
    `Produto: ${product.name}\n` +
    `Modelo: ${product.model}\n` +
    `Tamanho: ${size}\n` +
    `Cor: ${color}\n` +
    `Quantidade: ${quantity}\n\n` +
    `Pode confirmar disponibilidade?`
  );
  return `https://wa.me/554196818448?text=${message}`;
};
