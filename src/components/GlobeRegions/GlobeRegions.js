import React, { useState } from "react";
import FilterButton from "../Buttons/FilterButton/FilterButton";
import GlobeContainer from "../Charts/Globe";
import earthIcon from "../../Images/Earth-icon.svg";
import earthIconColored from "../../Images/Earth-iconColored.svg";
import tableIcon from "../../Images/Table-icon.svg";
import arrowIcon from "../../Images/Arrow-icon.svg";
import SearchBar from "../SearchBar/SearchBar";
import bar from "../../Images/bars.svg";
import "./GlobeRegions.scss";

const GlobeRegions = () => {
  const [show, setShow] = useState("Globe");
  const globeFilterDrodownList = ["Country", "Influencer", "Hashtag"];
  const [globeFilter, setGlobeFilter] = useState("Filters");

  return (
    <div className="global-regions-wrapper">
      <div className="global-regions-container">
        <div className="global-regions-btn-wrapper">
          <button className="global-regions-btn">ESG</button>
          <button className="global-regions-btn">Environmental</button>
          <button className="global-regions-btn">Social</button>
          <button className="global-regions-btn">Governance</button>
        </div>
        <div className="global-filter-wrapper">
          <SearchBar />
          <FilterButton
            data={globeFilter}
            dropdownList={globeFilterDrodownList}
            setData={setGlobeFilter}
          />
          <div className="selection">
            <button onClick={() => setShow("Globe")} className="earth-icon-btn">
              {!show === "Globe" ? (
                <img className="earth-icon" src={earthIcon} />
              ) : (
                <img className="earth-icon-colored" src={earthIconColored} />
              )}
            </button>

            <img className="Table-icon" src={tableIcon} />
            <img className="Arrow-icon" src={arrowIcon} />
          </div>
        </div>

        <div className="global-main-wrapper">
          <div className="global-bg-image">
            <div className="globe-container-wrapper">
              <div className="globe-left">
                <button className="range-btn">
                  Range: 1st Sep - 5th Oct 2022
                </button>

                <h1 className="esg-heading-globe">
                  ESG Media Sentiment Monitor
                </h1>

                <div className="media">
                  <p className="interest">Media Interest</p>
                  <p className="score">11.2K</p>
                </div>
                <div className="media">
                  <p className="interest">News Interest</p>
                  <p className="score">1K</p>
                </div>
                <div className="media">
                  <p className="interest">Influencers</p>
                  <p className="score">5.5K</p>
                </div>
              </div>
              <div className="globe-right">
                <img className="bar-one" src={bar}></img>
                <img className="bar-two" src={bar}></img>
                <img className="bar-three" src={bar}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobeRegions;
