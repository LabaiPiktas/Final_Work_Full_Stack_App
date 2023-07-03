import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { PROFILE_ROUTE, topbarNavigationItems } from "../../routes/const";
import { showUserFullName } from "../../utils/user";
import { FaUserCircle } from "react-icons/fa";
import LogoImage from "../Logo/LogoImage";
import "./Topbar.scss";

const Topbar = () => {
  const { user } = useContext(UserContext);

  return (
    <nav className="navigation">
      <div>
        <LogoImage />
      </div>
      <div className="navigation-items">
        {topbarNavigationItems.map((navItem) => (
          <Link to={navItem.route} key={navItem.title}>
            {navItem.title}
          </Link>
        ))}
      </div>
      <Link to={PROFILE_ROUTE} className="user-container">
        <FaUserCircle />
        {showUserFullName(user)}
      </Link>
    </nav>
  );
};

export default Topbar;
