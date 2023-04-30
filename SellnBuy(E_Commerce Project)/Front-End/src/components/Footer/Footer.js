import React from "react";
import paypalSrc from "../../assets/paypal2.png";
import "./Footer.css";

const Footer = (props) => {
  return (
    <div className="footer">
      <div className="footer_sub">
        <div className="footerAboutUs">
          <h4>About Us</h4>
          <h5 className="team">Sell, Buy! We do it all for you</h5>
        </div>
        <div style={{ width: "320px" }}>
          <img src={paypalSrc} alt="paypal" />
          <br></br>
          <h5>We promise safe transactions!</h5>
        </div>
      </div>
      <div className="fontIcon">
        <a href="#">
          <i className="fab fa-github" />
        </a>
        <a href="#">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#">
          <i className="fab fa-google-plus-g"></i>
        </a>
      </div>
      <div>
        <h6>Terms and conditions | Privacy Policy | Sitemap</h6>
      </div>
    </div>
  );
};

export default Footer;
