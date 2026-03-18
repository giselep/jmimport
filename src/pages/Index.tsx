import { Link } from "react-router-dom";
import { ArrowRight, Truck } from "lucide-react";
import heroImage from "@/assets/hero-model.jpg";
import { categories } from "@/data/products";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";

const Index = () => {
  const { data: products = [], isLoading } = useProducts();
  const newProducts = products.filter((p) => p.isNew);
  const bestSellers = products.filter((p) => p.isBestseller);

  return (
    <main>
      {/* Hero */}
      <section className="relative h-screen min-h-[700px] flex items-end pb-24 mt-20">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Streetwear masculino" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>
        <div className="relative container">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[0.95] mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Estilo que representa sua{" "}
              <span className="text-accent">atitude</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Vista J&M IMPORTS. Streetwear masculino com qualidade e personalidade.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Link
                to="/produtos"
                className="bg-accent text-accent-foreground px-8 py-3 font-display text-sm tracking-widest uppercase hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                Comprar camisetas
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/produtos"
                className="border border-foreground text-foreground px-8 py-3 font-display text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors"
              >
                Ver coleção
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl">Novidades</h2>
            <Link to="/produtos" className="text-accent text-sm font-display tracking-wider uppercase flex items-center gap-1 hover:gap-2 transition-all">
              Ver tudo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-card border border-border animate-pulse">
                    <div className="aspect-square bg-secondary" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-secondary rounded w-3/4" />
                      <div className="h-5 bg-secondary rounded w-1/3" />
                    </div>
                  </div>
                ))
              : newProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Best sellers */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl">Mais Vendidos</h2>
            <Link to="/produtos" className="text-accent text-sm font-display tracking-wider uppercase flex items-center gap-1 hover:gap-2 transition-all">
              Ver tudo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-card border border-border animate-pulse">
                    <div className="aspect-square bg-secondary" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-secondary rounded w-3/4" />
                      <div className="h-5 bg-secondary rounded w-1/3" />
                    </div>
                  </div>
                ))
              : bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-2xl md:text-3xl mb-10 text-center">Categorias</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to="/produtos"
                className="bg-card border border-border p-8 text-center hover:border-accent/50 transition-all group"
              >
                <span className="text-4xl block mb-3">{cat.emoji}</span>
                <span className="font-display text-sm tracking-widest uppercase text-muted-foreground group-hover:text-accent transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping banner */}
      <section className="py-12 bg-accent">
        <div className="container flex items-center justify-center gap-3 text-accent-foreground">
          <Truck className="w-6 h-6" />
          <p className="font-display text-lg md:text-xl tracking-widest uppercase">
            Enviamos para todo o Brasil
          </p>
        </div>
      </section>
    </main>
  );
};

export default Index;
