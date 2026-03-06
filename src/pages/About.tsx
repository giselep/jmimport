import { MapPin, MessageCircle, Truck, Calendar } from "lucide-react";

const About = () => {
  return (
    <main className="pt-24 pb-16">
      <div className="container max-w-3xl">
        <h1 className="text-4xl md:text-5xl mb-6">
          Loja do <span className="text-accent">Jao</span>
        </h1>

        <div className="flex items-center gap-2 text-accent mb-8">
          <Calendar className="w-5 h-5" />
          <span className="font-display tracking-widest uppercase text-sm">Desde 2016</span>
        </div>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            A LOJA DO JAO é uma loja de roupas masculinas com estilo jovem e urbano, focada em streetwear e moda casual masculina.
          </p>
          <p>
            Desde 2016, trazemos estilo e atitude para jovens que gostam de se vestir bem. Trabalhamos com roupas masculinas modernas, com qualidade e estilo streetwear.
          </p>
          <p>
            Vendemos peças modernas para homens que gostam de estilo e atitude.
          </p>
        </div>

        <div className="grid gap-6 mt-12">
          <div className="bg-card border border-border p-6 flex items-start gap-4">
            <Truck className="w-6 h-6 text-accent shrink-0 mt-1" />
            <div>
              <h3 className="font-display text-sm tracking-widest uppercase mb-1">Entregas</h3>
              <p className="text-muted-foreground text-sm">Enviamos para todo o Brasil</p>
            </div>
          </div>

          <div className="bg-card border border-border p-6 flex items-start gap-4">
            <MapPin className="w-6 h-6 text-accent shrink-0 mt-1" />
            <div>
              <h3 className="font-display text-sm tracking-widest uppercase mb-1">Loja Física</h3>
              <p className="text-muted-foreground text-sm">
                Dr. Motta Junior 1099<br />
                São José dos Pinhais – PR<br />
                CEP 83005-170
              </p>
            </div>
          </div>

          <div className="bg-card border border-border p-6 flex items-start gap-4">
            <MessageCircle className="w-6 h-6 text-accent shrink-0 mt-1" />
            <div>
              <h3 className="font-display text-sm tracking-widest uppercase mb-1">WhatsApp</h3>
              <a
                href="https://wa.me/554196818448"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent text-sm hover:underline"
              >
                (41) 9681-8448
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
