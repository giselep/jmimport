import { Link } from "react-router-dom";
import { type Product, formatPrice, resolveImageUrl, getOptimizedImageUrl, getOptimizedSrcSet } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => {
  const isRemote = product.image?.includes("/storage/v1/object/public/");
  return (
    <Link
      to={`/produto/${product.slug}`}
      className="group block bg-card border border-border overflow-hidden hover:border-accent/50 transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden bg-secondary">
        <img
          src={isRemote ? getOptimizedImageUrl(product.image, { width: 600 }) : resolveImageUrl(product.image)}
          srcSet={isRemote ? getOptimizedSrcSet(product.image, [300, 500, 700]) : undefined}
          sizes="(max-width: 768px) 50vw, 25vw"
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
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
        {product.price > 0 && (
          <p className="font-display text-lg text-accent mt-2">{formatPrice(product.price)}</p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
