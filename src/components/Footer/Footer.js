import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Link className="footer__terms_link" to="/terms-and-conditions">
        Terms and Conditions
      </Link>
      <div className="footer__section">
        <Link className="footer__terms_link" to="/aboutus">
          © 2023 James Penera. All rights reserved.
        </Link>
      </div>
    </footer>
  );
};
export default Footer;
