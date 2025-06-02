import '../AllStyling/Header.css';
import { FaTags, FaTicketAlt, FaBell ,FaQuestionCircle, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();

  const token = localStorage.getItem("token"); 

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <span className="logo">Easy Ride</span>
        </Link>
        <span className="trusted">
          Trusted by <strong>Travellers</strong>
        </span>
      </div>
      <nav className="nav">
 {!token && (
          <NavItem icon={<FaUser />} label="Login/SignUp" to="/login" highlight />
        )}       
         <NavItem icon={<FaTicketAlt />} label="My Bookings" to="/booking" />
        <NavItem icon={<FaBell />} to="/notification" label="Notifications!" highlight />

        <NavItem icon={<FaTags />} label="Offers" to="/offers" />
        <NavItem icon={<FaQuestionCircle />} to="/needHelp" label="Need Help?" />
       

       
       
        {token && (
          <div>
            <button
            style={{padding:"8px",backgroundColor:"red",cursor:"pointer",color:"white",fontWeight:"bold",borderRadius:"10px",fontSize:"14px",border:"none"}}
            onClick={()=>{
              localStorage.removeItem("token");
  navigate("/", { replace: true });
 setTimeout(() => {
    window.location.reload();
  }, 100);           
  
            }}
            >logout</button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
