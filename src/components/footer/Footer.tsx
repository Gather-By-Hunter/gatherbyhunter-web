import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="bg-black-rich text-off-white pt-12 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gold/50 pb-8 mb-8">
        {/* Brand Info Column */}
        <div className="footer-col">
          <h4 className="text-2xl font-serif text-gold mb-3">
            Gather by Hunter Collective
          </h4>
          <p className="text-sm">Curated rentals.</p>
        </div>
        {/* Company Links */}
        <div className="footer-col">
          <h4 className="text-lg font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-gold transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* Resources Links */}
        <div className="footer-col">
          <h4 className="text-lg font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/policies" className="hover:text-gold transition">
                Rental Policies
              </Link>
            </li>
            <li>
              <Link to="/faqs" className="hover:text-gold transition">
                FAQs
              </Link>
            </li>
          </ul>
        </div>
        {/* Account Links */}
        <div className="footer-col">
          <h4 className="text-lg font-semibold mb-3">Account</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/signin" className="hover:text-gold transition">
                Sign In / Register
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-gold transition">
                View Cart
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom text-center text-xs text-gray-500 pt-4">
        <p>&copy; 2025 Gather By Hunter Collective. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
