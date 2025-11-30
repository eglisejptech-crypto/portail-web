import { useEffect, useRef } from 'react';
import photoEjp from '../../assets/images/photo-ejp2.jpg';

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current && contentRef.current) {
        const scrolled = window.pageYOffset;
        const heroHeight = heroRef.current.offsetHeight;
        
        // Quand on dépasse la hauteur du hero, on cache complètement le contenu
        if (scrolled > heroHeight * 0.35) {
          contentRef.current.style.opacity = '0';
          contentRef.current.style.pointerEvents = 'none';
        } else {
          // Effet de fade progressif qui commence plus tôt
          const fadeStart = heroHeight * 0.05; // Commence à 5%
          const fadeEnd = heroHeight * 0.35; // Se termine à 30%
          let opacity = 1;
          
          if (scrolled > fadeStart) {
            opacity = Math.max(0, 1 - (scrolled - fadeStart) / (fadeEnd - fadeStart));
          }
          
          contentRef.current.style.opacity = String(opacity);
          contentRef.current.style.pointerEvents = opacity > 0 ? 'auto' : 'none';
          
          // Effet parallax subtil sur le contenu
          contentRef.current.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
        
        // Effet parallax sur l'image de fond (seulement si on est dans le hero)
        if (scrolled < heroHeight) {
          const rate = scrolled * 0.3;
          heroRef.current.style.transform = `translateY(${rate}px)`;
        } else {
          // Quand on dépasse le hero, on arrête l'effet parallax
          heroRef.current.style.transform = `translateY(${heroHeight * 0.2}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative h-screen w-full flex items-center justify-start px-4 md:px-8 lg:px-16 xl:px-24 overflow-hidden"
      style={{
        backgroundImage: `url(${photoEjp})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // S'assurer que l'image commence au top pour passer derrière le header
        marginTop: 0,
      }}
    >
      {/* Overlay sombre pour la lisibilité - plus sombre */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
      
      {/* Contenu */}
      <div ref={contentRef} className="relative z-10 max-w-2xl text-white transition-opacity duration-300 px-4 md:px-0">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight font-['Montserrat'] drop-shadow-lg">
          Vivre la foi par l'amour
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white/90 font-light drop-shadow-md">
          Rejoignez-nous ce dimanche
        </p>
        
        <a
          href="https://www.fij-ejp.com/"
          className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-[#D4AF37] text-black rounded-full font-semibold text-base sm:text-lg hover:bg-[#B8941F] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rejoignez-nous aujourd'hui
        </a>
      </div>
    </section>
  );
};
