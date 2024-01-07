import "./Footer.css";

const Footer = ({
  onAboutUs,
  onTermsAndConditions,
}) => {
  return (
    <footer className="footer">
      <button className="footer__terms_link" type="text" onClick={onTermsAndConditions}>
        Terms and Conditions
      </button>
      <div className="footer__section">
        <button className="footer__terms_link" type="text" onClick={onAboutUs}>
          © 2023 James Penera. All rights reserved.
        </button>
      </div>
    </footer>
  );
};
export default Footer;
