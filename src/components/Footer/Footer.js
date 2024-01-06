import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__terms_link" to="/terms-and-conditions">
        Terms and Conditions
      </div>
      <div className="footer__section">
        <div className="footer__terms_link" to="/aboutus">
          © 2023 James Penera. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
export default Footer;
