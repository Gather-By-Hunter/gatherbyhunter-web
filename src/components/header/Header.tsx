import { SmallLogo } from "@components/index.ts";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const NavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className="group text-gbh-black hover:text-gbh-gold transition-colors text-xl font-montserrat-light"
  >
    <span className="relative inline-block">
      {children}
      <span className="absolute bottom-0 left-0 w-full h-px bg-gbh-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-center -mb-1"></span>
    </span>
  </Link>
);

const Divider = () => <div className="h-6 w-px bg-gbh-black" />;

export const Header = () => {
  const [percentScrolled, setPercentScrolled] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const max = window.outerHeight / 2;

      if (window.scrollY >= max) setPercentScrolled(1);
      else if (Math.abs(window.scrollY / max - percentScrolled) > 0.05)
        setPercentScrolled(window.scrollY / max);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="bg-gbh-cream flex items-center justify-between h-20 px-12 border-t border-b border-gbh-black sticky top-0 z-50 transition-all duration-300 shadow-lg">
      <div className="flex items-center">
        <Link to="/">
          <SmallLogo
            style={{
              height: `calc(var(--spacing) * ${14 * (percentScrolled + 1)})`,
            }}
            className={`rounded-full border border-gbh-black transition-all duration-300`}
          />
        </Link>
      </div>
      <nav className="flex items-center space-x-6">
        <NavLink to="/match-your-vibe">Match Your Vibe</NavLink>
        <Divider />
        <NavLink to="/collections">Collections</NavLink>
        <Divider />
        <NavLink to="/gallery">Gallery</NavLink>
        <Divider />
        <NavLink to="/about-us">About Us</NavLink>
        <Divider />
        <NavLink to="/about-us">Get In Touch</NavLink>
      </nav>
      <div className="flex items-center">
        <Link
          to="/cart"
          className="bg-gbh-green border-gbh-black text-gbh-white px-6 py-2 rounded-md hover:bg-gbh-gold transition-colors font-montserrat-light"
        >
          Cart
        </Link>
      </div>
    </header>
  );
};
