import { Link } from 'react-router-dom';
import logoEjp from '../assets/images/ejp-logo-beige.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <img src={logoEjp} alt="EJP Logo" className="h-20 md:h-24 mr-2" />
              <span className="text-xl font-bold font-['Montserrat']">EJP | Croissy</span>
            </div>
            <p className="text-gray-400 mb-4 text-sm">
              Découvrez les activités et services offerts par <br></br>l'Église des Jeunes Prodiges - Croissy.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/eglisedesjeunesprodiges" 
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.youtube.com/@EgliseJeunesProdiges" 
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300"
                aria-label="YouTube"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com/@eglisedesjeunesprodiges" 
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300"
                aria-label="TikTok"
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-['Montserrat']">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300">
                  Conditions d'utilisation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-['Montserrat']">Contact</h3>
            <p className="text-gray-400 mb-2 text-sm">
              Des questions ou des commentaires ? Contactez-nous :
            </p>
            <a 
              href="mailto:contact@ejp-croissy.com" 
              className="text-[#D4AF37] hover:text-[#B8941F] transition-colors duration-300 text-sm"
            >
              contact@ejp-croissy.com
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Impact Prodige - EJP Croissy. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
