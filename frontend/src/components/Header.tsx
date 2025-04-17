import '../AllStyling/Header.css';
import { FaTags, FaTicketAlt, FaQuestionCircle, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import React from 'react';

type NavItemProps = {
  icon: JSX.Element;
  label: string;
  to: string;
  highlight?: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ icon, label, to, highlight = false }) => (
  <Link to={to} className={`nav__item ${highlight ? 'highlight' : ''}`}>
    {icon}
    <span>{label}</span>
  </Link>
);

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <span className="logo">Mybus</span>
        </Link>
        <span className="trusted">
          Trusted by <strong>Travellers</strong>
        </span>
      </div>
      <nav className="nav">
        <NavItem icon={<FaUser />} label="Login/SignUp" to="/login" highlight />
        <NavItem icon={<FaTicketAlt />} label="Track Ticket" to="/booking" />
        <NavItem icon={<FaTags />} label="Offers" to="/offers" />
        <NavItem icon={<FaQuestionCircle />} label="Need Help?" to="/help" />
      </nav>
    </header>
  );
};

export default Header;
