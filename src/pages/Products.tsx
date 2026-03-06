import { useState } from "react";
import { categories } from "@/data/products";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState<string>("todos");
  const { data: products = [], isLoading } = useProducts();

  const filtered = activeCategory === "todos"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <main className="pt-24 pb-16">
      <div className="container">
        <h1 className="text-3xl md:text-4xl mb-2">Nossos Produtos</h1>
        <p className="text-muted-foreground mb-8">Streetwear masculino com estilo e atitude</p>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory("todos")}
            className={`font-display text-xs tracking-widest uppercase px-4 py-2 border transition-colors ${
              activeCategory === "todos"
                ? "bg-accent text-accent-foreground border-accent"
                : "border-border text-muted-foreground hover:border-accent/50"
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`font-display text-xs tracking-widest uppercase px-4 py-2 border transition-colors ${
                activeCategory === cat.id
                  ? "bg-accent text-accent-foreground border-accent"
                  : "border-border text-muted-foreground hover:border-accent/50"
              }`}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-card border border-border animate-pulse">
                <div className="aspect-square bg-secondary" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-secondary rounded w-3/4" />
                  <div className="h-3 bg-secondary rounded w-1/2" />
                  <div className="h-5 bg-secondary rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {!isLoading && filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-16">Nenhum produto encontrado nesta categoria.</p>
        )}
      </div>
    </main>
  );
};

export default Products;
