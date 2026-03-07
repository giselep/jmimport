import { Link } from "react-router-dom";
import { MapPin, MessageCircle, Truck } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-xl tracking-widest mb-4">
              LOJA <span className="text-accent">STREETWEAR</span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Estilo e atitude para jovens que gostam de se vestir bem.
            </p>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-display text-sm tracking-widest mb-4 text-foreground">MENU</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-muted-foreground text-sm hover:text-accent transition-colors">Início</Link>
              <Link to="/produtos" className="text-muted-foreground text-sm hover:text-accent transition-colors">Produtos</Link>
              <Link to="/sobre" className="text-muted-foreground text-sm hover:text-accent transition-colors">Sobre</Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-sm tracking-widest mb-4 text-foreground">CATEGORIAS</h4>
            <div className="flex flex-col gap-2">
              {["Camisetas", "Bermudas", "Calças", "Bonés", "Tênis"].map((cat) => (
                <Link
                  key={cat}
                  to="/produtos"
                  className="text-muted-foreground text-sm hover:text-accent transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm tracking-widest mb-4 text-foreground">CONTATO</h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/554196818448"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground text-sm hover:text-accent transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                (41) 9681-8448
              </a>
              <div className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Dr. Motta Junior 1099, São José dos Pinhais – PR</span>
              </div>
              <div className="flex items-center gap-2 text-accent text-sm font-medium">
                <Truck className="w-4 h-4" />
                Entrega para todo o Brasil
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} LOJA STREETWEAR. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
