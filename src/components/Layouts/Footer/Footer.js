import React from "react";
import footerLogo from "../../../Images/logo.svg";
import facebookLogo from "../../../Images/Facebook.svg";
import youtubeLogo from "../../../Images/Youtube.svg";
import InLogo from "../../../Images/in.svg";
import twitterLogo from "../../../Images/Twitter.svg";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="left-footer-content">
          <img className="footer-logo" src={footerLogo} />
          <p className="footer-logo-title">Powered by ztudium Blocksdna</p>
        </div>
        <div className="right-footer-content">
          <div className="social-media-logo">
            <img className="facebook-logo" src={facebookLogo} />
            <img className="youtube-logo" src={youtubeLogo} />
            <img className="in-logo" src={InLogo} />
            <img className="twitter-logo" src={twitterLogo} />
          </div>

          <p className="footer-title">
            2022-2022, ESG, Inc. All rights reserved. ESG and its logo are ESG’s
            trademarks or registered trademarks in the US and elsewhere.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
