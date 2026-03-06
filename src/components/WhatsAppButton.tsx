import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/554196818448"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[hsl(142,70%,45%)] text-[hsl(0,0%,100%)] px-5 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-display text-sm tracking-wider uppercase"
      aria-label="Pedir no WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline">Pedir no WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;
