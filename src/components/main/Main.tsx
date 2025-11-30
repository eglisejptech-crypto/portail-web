import { Hero } from './Hero';
import { ThreeColumnSection } from './ThreeColumnSection';
import Slider from './Slider';

const Main = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <ThreeColumnSection />
      
      {/* Section avec slider et contenu additionnel */}
      <section className="bg-gray-50 py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-['Montserrat']">
              Découvrez nos contenus
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explorez nos témoignages, films et compositions musicales
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Slider />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
