// Section 3 colonnes asymétrique selon design.md
// Left: photo carrée, Center: texte, Right: photo carrée

import image2 from '../../assets/images/image_2.jpg';
import image1 from '../../assets/images/image_1.jpg';

export const ThreeColumnSection = () => {
  return (
    <section className="bg-white py-20 md:py-32 px-4 md:px-8 lg:px-16 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Colonne gauche - Photo carrée */}
          <div className="md:col-span-4 order-1 md:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src={image2}
                alt="Jeune femme en prière"
                className="w-full h-full object-fill"
              />
            </div>
          </div>

          {/* Colonne centre - Texte */}
          <div className="md:col-span-4 order-2 md:order-2 text-center md:text-left">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-4 font-medium">
              Notre mission
            </p>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight font-['Montserrat']">
              Gagner et former une génération
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Notre mission est de gagner et de former une génération de jeunes capables de vivre pleinement l'Évangile, d'être transformés intérieurement par la Parole et de devenir des porteurs d'influence positive et durable dans leur communauté.
            </p>
          </div>

          {/* Colonne droite - Photo carrée */}
          <div className="md:col-span-4 order-3 md:order-3">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src={image1}
                alt="Jeune homme tenant la bible"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
