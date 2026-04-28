import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { formatPrice, buildWhatsAppLink, resolveImageUrl, getOptimizedImageUrl, getOptimizedSrcSet } from "@/data/products";
import { useProduct } from "@/hooks/useProducts";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) {
    return (
      <main className="pt-24 pb-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 animate-pulse">
            <div className="aspect-square bg-secondary" />
            <div className="space-y-4">
              <div className="h-8 bg-secondary rounded w-3/4" />
              <div className="h-6 bg-secondary rounded w-1/4" />
              <div className="h-10 bg-secondary rounded w-1/3" />
              <div className="h-20 bg-secondary rounded" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="pt-24 pb-16">
        <div className="container text-center py-20">
          <h1 className="text-2xl mb-4">Produto não encontrado</h1>
          <Link to="/produtos" className="text-accent font-display tracking-wider uppercase">
            Voltar aos produtos
          </Link>
        </div>
      </main>
    );
  }

  const handleOrder = () => {
    if (!selectedSize || !selectedColor) return;
    const url = buildWhatsAppLink(product, selectedSize, selectedColor, quantity);
    window.open(url, "_blank");
  };

  const gallery = product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <main className="pt-24 pb-16">
      <div className="container">
        <Link to="/produtos" className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8 font-display text-sm tracking-wider uppercase">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-3">
            <div className="aspect-square bg-secondary overflow-hidden">
              {(() => {
                const current = gallery[activeImage];
                const isRemote = current?.includes("/storage/v1/object/public/");
                return (
                  <img
                    src={isRemote ? getOptimizedImageUrl(current, { width: 1000 }) : resolveImageUrl(current)}
                    srcSet={isRemote ? getOptimizedSrcSet(current, [600, 900, 1200]) : undefined}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt={product.name}
                    className="w-full h-full object-cover"
                    decoding="async"
                  />
                );
              })()}
            </div>
            {gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {gallery.map((img, i) => {
                  const isRemote = img?.includes("/storage/v1/object/public/");
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`w-16 h-16 md:w-20 md:h-20 shrink-0 overflow-hidden border-2 transition-colors ${
                        activeImage === i ? "border-accent" : "border-border hover:border-accent/50"
                      }`}
                    >
                      <img
                        src={isRemote ? getOptimizedImageUrl(img, { width: 160 }) : resolveImageUrl(img)}
                        alt={`${product.name} ${i + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex gap-2 mb-3">
              {product.isNew && (
                <span className="text-[10px] font-display tracking-widest bg-accent text-accent-foreground px-2 py-0.5 uppercase">Novo</span>
              )}
              {product.isBestseller && (
                <span className="text-[10px] font-display tracking-widest bg-foreground text-background px-2 py-0.5 uppercase">Mais vendido</span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl mb-1">{product.name}</h1>
            <p className="text-muted-foreground text-sm mb-4">{product.model}</p>
            {product.price > 0 && (
              <p className="font-display text-3xl text-accent mb-6">{formatPrice(product.price)}</p>
            )}
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">{product.description}</p>

            {/* Colors */}
            <div className="mb-6">
              <label className="font-display text-xs tracking-widest uppercase text-muted-foreground block mb-3">Cor</label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border text-sm font-display tracking-wider uppercase transition-colors ${
                      selectedColor === color
                        ? "border-accent text-accent"
                        : "border-border text-muted-foreground hover:border-accent/50"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <label className="font-display text-xs tracking-widest uppercase text-muted-foreground block mb-3">Tamanho</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border text-sm font-display transition-colors ${
                      selectedSize === size
                        ? "border-accent text-accent"
                        : "border-border text-muted-foreground hover:border-accent/50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="font-display text-xs tracking-widest uppercase text-muted-foreground block mb-3">Quantidade</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-border flex items-center justify-center hover:border-accent/50 transition-colors text-foreground"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-display text-lg w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-border flex items-center justify-center hover:border-accent/50 transition-colors text-foreground"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Order button */}
            <button
              onClick={handleOrder}
              disabled={!selectedSize || !selectedColor}
              className="w-full bg-accent text-accent-foreground py-4 font-display text-sm tracking-widest uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-5 h-5" />
              Fazer Pedido
            </button>
            {(!selectedSize || !selectedColor) && (
              <p className="text-muted-foreground text-xs text-center mt-2">Selecione cor e tamanho para continuar</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
