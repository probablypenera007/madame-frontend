import "./Footer.css";

const Footer = ({ onAboutUs, onTermsAndConditions }) => {
  return (
    <footer className="footer">
      <button
        className="footer__terms_button"
        type="text"
        onClick={onTermsAndConditions}
      >
        Terms and Conditions
      </button>
      <div className="footer__music_attribution">
        Music: "Aurora" by Scott Buckley | 
        <a className="music__link" href="https://www.scottbuckley.com.au" target="_blank" rel="noopener noreferrer">
          www.scottbuckley.com.au
        </a>
        <br />
        Music promoted by <a className="music__link" href="https://www.chosic.com/free-music/all/" target="_blank" rel="noopener noreferrer">Chosic.com</a>
        <br />
        Creative Commons CC BY 4.0
        <br />
        <a className="music__link" href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">
          https://creativecommons.org/licenses/by/4.0/
        </a>
      </div>
      <div className="footer__section">
        <button className="footer__terms_button" type="text" onClick={onAboutUs}>
          © 2023 James Penera. All rights reserved.
        </button>
      </div>
     
    </footer>
  );
};
export default Footer;
