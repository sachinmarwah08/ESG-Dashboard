import React from "react";
import "./Header.scss";
import logo from "../../../Images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="header-wrapper">
      <div className="header-inside-container">
        <img className="logo" src={logo} />
        <div className="header-container">
          <div className="left-content-header">
            <p className="header-heading">Global ESG Sentiment Index</p>
            <p className="header-title">Powered by ztudium blocksdna</p>
          </div>
          <div className="right-content">
            <div className="date-container">
              <div className="date-one">
                <p className="date">Sept 17, 2022</p>
                <div className="date-icon">
                  <FontAwesomeIcon className="fa" icon={faAngleDown} />
                </div>
              </div>
              <span className="line"></span>
              <div className="date-two">
                <p className="date">Sept 24, 2022</p>
                <div className="date-icon">
                  <FontAwesomeIcon className="fa" icon={faAngleDown} />
                </div>
              </div>
            </div>

            <div className="names-wrapper">
              <div className="names-container">
                <span className="Total-value">1.01 MM</span>
                <span className="absolute-change-value">+0.5 MM</span>

                <span className="percentage-change-value">+0.05%</span>
                <span className="current-date">10 Aug, 2022 Value </span>

                <span className="absolute-change">Absolute Change</span>
                <span className="percentage-change">Percentage Change</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
