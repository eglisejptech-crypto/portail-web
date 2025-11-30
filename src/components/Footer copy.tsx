import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, Twitter } from 'lucide-react';
import logoEjpDark from '../images/logo_ejp_dark.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={logoEjpDark} alt="EJP Logo" className="h-24 mr-2" />
              <span className="text-xl font-bold">EJP | Trois-Rivières</span>
            </div>
            <p className="text-gray-400 mb-4">
              Découvrez les activités et services offerts par EJP Trois-Rivières.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="mailto:info@klocks.ca" className="text-gray-400 hover:text-white">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">
              Have questions or feedback? Reach out to us at:
            </p>
            <a 
              href="mailto:contact@ejp-troisrivieres.com" 
              className="text-indigo-400 hover:text-indigo-300"
            >
              contact@ejp-troisrivieres.com
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} EJP Trois-Rivières. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
