import { Link } from "react-router-dom";
import { topbarNavigationItems } from "../../routes/const";

import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      {topbarNavigationItems.map((navItem) => (
        <Link to={navItem.route} key={navItem.title}>
          {navItem.title}
        </Link>
      ))}
    </footer>
  );
};

export default Footer;
