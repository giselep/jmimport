import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { products, formatPrice, buildWhatsAppLink } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

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

  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

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
              <img
                src={gallery[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 md:w-20 md:h-20 shrink-0 overflow-hidden border-2 transition-colors ${
                      activeImage === i ? "border-accent" : "border-border hover:border-accent/50"
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
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
            <p className="font-display text-3xl text-accent mb-6">{formatPrice(product.price)}</p>
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
