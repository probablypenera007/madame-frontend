import "./TermsAndConditions.css";

const TermsAndConditions = () => {
  return (
    <div className="terms">
      <h1 className="terms__title">Terms and Conditions</h1>
      <h3 className="terms__section-title">DISCLAIMER:</h3>
      <div className="terms__paragraph">
        <span className="terms__step">FOR ENTERTAINMENT PURPOSES ONLY:</span>
        <br />
        The readings and insights provided by Madame Oracle are for
        entertainment purposes only. While we strive for accuracy, we do not
        claim that our readings reflect scientific precision. The content
        should not be taken as literal or factual advice. We do not provide
        recommendations on health, legal, financial, or other specific
        professional matters. Users are advised to use their discretion and
        consult qualified professionals for advice on such topics.
        <br />
        <br />
        <div className="terms__paragraph">
          <span className="terms__step">VOICE DISCLAIMER:</span>
          <br />
          The voice you hear from Madame Oracle is generated by "Alloy," an
          advanced AI, and does not represent a real person.
        </div>
      </div>
      <h3 className="terms__section-title">TERMS OF USE:</h3>
      <div className="terms__paragraph-bottom">
        <br />
        By using Madame Oracle, users agree to these terms and conditions. Any
        reliance on the content provided through Madame Oracle is at the
        user’s own risk. Users must be 18 years or older or have parental
        consent to interact with Madame Oracle. We reserve the right to modify
        or discontinue our service at any time without notice. We are not
        liable for any modifications, interruptions, or discontinuation of the
        service.
        <br />
        <br />
        Users must not use Madame Oracle for unlawful purposes or in a way
        that may harm others. This includes refraining from posting or
        transmitting harmful or offensive content. We reserve the right to
        terminate or restrict access to our service for any user who violates
        these terms.
        <br />
        <br />
        All content provided by Madame Oracle is protected by copyright and
        intellectual property laws. Reproduction, distribution, or
        unauthorized use of any content without express permission is strictly
        prohibited.
      </div>
    </div>
  );
};

export default TermsAndConditions;
