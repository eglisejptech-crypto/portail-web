import { useState, useEffect } from 'react';
import '../../styles/slider.scss';

import image1 from '../../assets/images/image_1.jpg';
import EjpFilm from '../../assets/images/ejp-film2.jpg';
import image2 from '../../assets/images/image_2.jpg';

interface SliderInfo {
  id: number;
  titre: string;
  alt: string;
  description?: string;
  image: string;
  lien: string;
}

const infos: SliderInfo[] = [
  {
    id: 1,
    titre: "Découvre comment Dieu a libéré Keyliah de la dépendance affective",
    alt: "Keyliah en prière",
    description: "Découvre comment Dieu a libéré Keyliah de la dépendance affective",
    image: image1,
    lien: "https://www.instagram.com/reel/DPjlwGaDRrL/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA=="
  },
  {
    id: 2,
    titre: "Notre dernier court-metrage",
    alt: "à coeur ouvert film",
    image: EjpFilm,
    lien: "https://youtu.be/0Xg1A9xthTs?si=8DlpK2xr6FXvvU9g"
  },
  {
    id: 3,
    titre: "GBI ❤️‍🩹",
    description: "Écoute notre dernière composition.",
    alt: "Photo écrit Guérir",
    image: image2,
    lien: "https://www.youtube.com/watch?v=3WYS5o4Jm6I&list=PLqX6FL34VnLMzRFcXEp8wcc_nhQy67vhV"
  }
];

const Slider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev === infos.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slider-cadre">
      <div
        className="flex w-full h-full"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: "transform 0.5s ease-in-out"
        }}
      >
        {infos.map((info) => (
          <a
            key={info.id}
            href={info.lien}
            target="_blank"
            rel="noreferrer"
            className="block min-w-full h-full relative"
          >
            <img
              src={info.image}
              alt={info.alt}
              className="w-full h-full object-contain object-center block"
            />

            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-5 pb-10 text-white text-center">
              <h3 className="m-0 text-xl md:text-2xl font-semibold drop-shadow-lg">
                {info.titre}
              </h3>
            </div>
          </a>
        ))}
      </div>

      <div className="slider-points">
        {infos.map((info, i) => (
          <button
            key={info.id}
            type="button"
            className={`point ${i === index ? 'actif' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Aller à la diapositive ${i + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
