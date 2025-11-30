import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© 2024 Impact Prodige - EJP Croissy. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-sm hover:text-blue-400">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm hover:text-blue-400">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
