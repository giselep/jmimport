import { Link } from "react-router-dom";
import { type Product, formatPrice, resolveImageUrl } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      to={`/produto/${product.slug}`}
      className="group block bg-card border border-border overflow-hidden hover:border-accent/50 transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden bg-secondary">
        <img
          src={resolveImageUrl(product.image)}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex gap-2 mb-2">
          {product.isNew && (
            <span className="text-[10px] font-display tracking-widest bg-accent text-accent-foreground px-2 py-0.5 uppercase">
              Novo
            </span>
          )}
          {product.isBestseller && (
            <span className="text-[10px] font-display tracking-widest bg-foreground text-background px-2 py-0.5 uppercase">
              Mais vendido
            </span>
          )}
        </div>
        <h3 className="font-display text-sm tracking-wider text-foreground uppercase">{product.name}</h3>
        <p className="text-muted-foreground text-xs mt-1">{product.model}</p>
        <p className="font-display text-lg text-accent mt-2">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
