import { useState } from "react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState<string>("todos");

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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-16">Nenhum produto encontrado nesta categoria.</p>
        )}
      </div>
    </main>
  );
};

export default Products;
