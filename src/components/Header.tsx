import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthProvider';
import '../styles/header.scss';

// Import des images
import logo from '../assets/images/ejp-logo-beige.png';
import instaLogo from '../assets/images/insta-logo.png';
import youtubeLogo from '../assets/images/ytb.png';
import tiktokLogo from '../assets/images/tiktok.png';

const DASHBOARD_ROLES = ['PASTORAL', 'COORDINATOR', 'PILOT'];

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const canAccessDashboard =
    isAuthenticated &&
    Boolean(user?.roles?.some((r) => DASHBOARD_ROLES.includes(r)));
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        hamburgerRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-top">
        <img
          src={logo}
          alt="Logo Église des jeunes prodiges"
          className="logo-ejp"
        />

        {/* Bouton hamburger pour mobile */}
        <button 
          ref={hamburgerRef}
          className="hamburger-btn"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X size={28} className="text-white" />
          ) : (
            <Menu size={28} className="text-white" />
          )}
        </button>
      </div>

      {/* Menu desktop et mobile */}
      <div 
        ref={menuRef}
        className={`menu-container ${isMenuOpen ? 'menu-open' : ''}`}
      >
        <nav className="menu">
          <Link to="/" onClick={closeMenu}>Accueil</Link>
          <a 
            href="https://eglisedesjeunesprodiges.com/qui-sommes-nous/" 
            onClick={closeMenu}
          >
            À propos
          </a>
          {canAccessDashboard && (
            <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
          )}
          {isAuthenticated ? (
            <button
              type="button"
              className="menu-link"
              onClick={() => {
                logout();
                closeMenu();
              }}
            >
              Déconnexion
            </button>
          ) : (
            <Link to="/login" onClick={closeMenu}>Se connecter</Link>
          )}
        </nav>

        <nav className="contact">
          <a
            href="https://www.instagram.com/eglisedesjeunesprodiges"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-100 transition-opacity"
            aria-label="Instagram"
            onClick={closeMenu}
          >
            <img src={instaLogo} alt="Instagram" />
          </a>

          <a
            href="https://www.youtube.com/@EgliseJeunesProdiges"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-100 transition-opacity"
            aria-label="YouTube"
            onClick={closeMenu}
          >
            <img src={youtubeLogo} alt="YouTube" />
          </a>

          <a
            href="https://www.tiktok.com/@eglisedesjeunesprodiges"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-100 transition-opacity"
            aria-label="TikTok"
            onClick={closeMenu}
          >
            <img src={tiktokLogo} alt="TikTok" />
          </a>
          
          <a
            href="https://eglisedesjeunesprodiges.com/dons/"
            className="ml-4 px-6 py-2 bg-[#D4AF37] text-black rounded-full font-semibold hover:bg-[#B8941F] transition-all duration-300"
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
          >
            Dons
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
