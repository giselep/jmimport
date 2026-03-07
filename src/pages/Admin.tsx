import { useState } from "react";
import { categories, formatPrice, resolveImageUrl, type Product } from "@/data/products";
import { useProducts } from "@/hooks/useProducts";
import { Lock, Eye, Plus, Copy, Check, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ADMIN_PASSWORD = "jao2016";

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const { data: products = [], isLoading } = useProducts();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Senha incorreta");
    }
  };

  if (!authenticated) {
    return (
      <main className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-sm mx-auto p-8 border border-border bg-card">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-accent" />
            <h1 className="font-display text-xl tracking-widest uppercase">Painel Admin</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="font-display text-xs tracking-widest uppercase text-muted-foreground block mb-2">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-accent transition-colors"
                placeholder="Digite a senha"
              />
            </div>
            {error && <p className="text-destructive text-xs">{error}</p>}
            <button
              type="submit"
              className="w-full bg-accent text-accent-foreground py-3 font-display text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              Entrar
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16 min-h-screen">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl">Painel Administrativo</h1>
            <p className="text-muted-foreground text-sm mt-1">Gerencie seus produtos</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 font-display text-xs tracking-wider uppercase hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              Novo Produto
            </button>
            <button
              onClick={() => setAuthenticated(false)}
              className="flex items-center gap-2 border border-border px-4 py-2 font-display text-xs tracking-wider uppercase text-muted-foreground hover:border-accent/50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Produtos" value={products.length} />
          <StatCard label="Categorias" value={categories.length} />
          <StatCard label="Novidades" value={products.filter(p => p.isNew).length} />
          <StatCard label="Mais Vendidos" value={products.filter(p => p.isBestseller).length} />
        </div>

        {showAddForm && <AddProductHelper onClose={() => setShowAddForm(false)} />}

        {/* Products Table */}
        <div className="border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left p-4 font-display text-xs tracking-widest uppercase text-muted-foreground">Produto</th>
                  <th className="text-left p-4 font-display text-xs tracking-widest uppercase text-muted-foreground hidden md:table-cell">Categoria</th>
                  <th className="text-left p-4 font-display text-xs tracking-widest uppercase text-muted-foreground">Preço</th>
                  <th className="text-left p-4 font-display text-xs tracking-widest uppercase text-muted-foreground hidden md:table-cell">Cores</th>
                  <th className="text-left p-4 font-display text-xs tracking-widest uppercase text-muted-foreground hidden md:table-cell">Tamanhos</th>
                  <th className="text-left p-4 font-display text-xs tracking-widest uppercase text-muted-foreground hidden sm:table-cell">Tags</th>
                  <th className="text-left p-4 font-display text-xs tracking-widest uppercase text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">Carregando...</td></tr>
                ) : (
                  products.map((product) => (
                    <ProductRow key={product.id} product={product} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

const StatCard = ({ label, value }: { label: string; value: number }) => (
  <div className="border border-border bg-card p-4">
    <p className="font-display text-xs tracking-widest uppercase text-muted-foreground mb-1">{label}</p>
    <p className="font-display text-2xl text-accent">{value}</p>
  </div>
);

const ProductRow = ({ product }: { product: Product }) => {
  const categoryName = categories.find(c => c.id === product.category)?.name || product.category;

  return (
    <tr className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <img src={resolveImageUrl(product.image)} alt={product.name} className="w-12 h-12 object-cover bg-secondary shrink-0" />
          <div>
            <p className="font-display text-sm tracking-wider text-foreground">{product.name}</p>
            <p className="text-muted-foreground text-xs">{product.model}</p>
          </div>
        </div>
      </td>
      <td className="p-4 text-muted-foreground hidden md:table-cell">{categoryName}</td>
      <td className="p-4 font-display text-accent">{product.price > 0 ? formatPrice(product.price) : "—"}</td>
      <td className="p-4 text-muted-foreground text-xs hidden md:table-cell">{product.colors.join(", ")}</td>
      <td className="p-4 text-muted-foreground text-xs hidden md:table-cell">{product.sizes.join(", ")}</td>
      <td className="p-4 hidden sm:table-cell">
        <div className="flex gap-1">
          {product.isNew && (
            <span className="text-[10px] font-display tracking-widest bg-accent text-accent-foreground px-2 py-0.5 uppercase">Novo</span>
          )}
          {product.isBestseller && (
            <span className="text-[10px] font-display tracking-widest bg-foreground text-background px-2 py-0.5 uppercase">Top</span>
          )}
        </div>
      </td>
      <td className="p-4">
        <Link
          to={`/produto/${product.slug}`}
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-accent transition-colors text-xs"
        >
          <Eye className="w-4 h-4" />
        </Link>
      </td>
    </tr>
  );
};

const AddProductHelper = ({ onClose }: { onClose: () => void }) => {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: "",
    model: "",
    description: "",
    price: "",
    category: "camisetas",
    colors: "",
    sizes: "",
    isNew: true,
    isBestseller: false,
  });

  const generateTemplate = () => {
    return `Adicione este produto na J&M IMPORTS:

Nome: ${form.name || "[nome do produto]"}
Modelo: ${form.model || "[modelo]"}
Descrição: ${form.description || "[descrição]"}
Preço: R$ ${form.price || "[preço]"}
Categoria: ${form.category}
Cores: ${form.colors || "[cores separadas por vírgula]"}
Tamanhos: ${form.sizes || "[tamanhos separados por vírgula]"}
Novidade: ${form.isNew ? "Sim" : "Não"}
Mais vendido: ${form.isBestseller ? "Sim" : "Não"}

(Envie as fotos do produto junto com esta mensagem)`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateTemplate());
    setCopied(true);
    toast.success("Modelo copiado! Cole no chat do Lovable.");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-accent/30 bg-card p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-sm tracking-widest uppercase">Novo Produto</h2>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-xs">Fechar</button>
      </div>
      <p className="text-muted-foreground text-xs mb-4">
        Preencha os dados e copie o modelo para enviar no chat do Lovable junto com as fotos.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <InputField label="Nome" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Camiseta Example" />
        <InputField label="Modelo" value={form.model} onChange={(v) => setForm({ ...form, model: v })} placeholder="Oversized" />
        <InputField label="Preço" value={form.price} onChange={(v) => setForm({ ...form, price: v })} placeholder="129.90" />
        <div>
          <label className="font-display text-xs tracking-widest uppercase text-muted-foreground block mb-2">Categoria</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-accent transition-colors"
          >
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
            ))}
          </select>
        </div>
        <InputField label="Cores" value={form.colors} onChange={(v) => setForm({ ...form, colors: v })} placeholder="Preto, Branco, Cinza" />
        <InputField label="Tamanhos" value={form.sizes} onChange={(v) => setForm({ ...form, sizes: v })} placeholder="P, M, G, GG" />
      </div>

      <InputField label="Descrição" value={form.description} onChange={(v) => setForm({ ...form, description: v })} placeholder="Descrição do produto..." />

      <div className="flex gap-4 mt-4 mb-4">
        <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
          <input type="checkbox" checked={form.isNew} onChange={(e) => setForm({ ...form, isNew: e.target.checked })} className="accent-accent" />
          Novidade
        </label>
        <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
          <input type="checkbox" checked={form.isBestseller} onChange={(e) => setForm({ ...form, isBestseller: e.target.checked })} className="accent-accent" />
          Mais vendido
        </label>
      </div>

      <button
        onClick={handleCopy}
        className="flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 font-display text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? "Copiado!" : "Copiar Modelo"}
      </button>
    </div>
  );
};

const InputField = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) => (
  <div>
    <label className="font-display text-xs tracking-widest uppercase text-muted-foreground block mb-2">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/50"
    />
  </div>
);

export default Admin;
