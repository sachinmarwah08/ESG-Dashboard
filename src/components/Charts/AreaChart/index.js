import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./AreaChart.scss";
import Chart from "./Chart";

const newsData = [
  {
    heading: "Breaking from Tradition: Contemporary Istanbul",
    title:
      "September sees a flurry of major art and culture events in Istanbul. The city has become a hotspot for new talent in recent years, with showcases like...",
  },
  {
    heading: "Breaking from Tradition: Contemporary Istanbul",
    title:
      "September sees a flurry of major art and culture events in Istanbul. The city has become a hotspot for new talent in recent years, with showcases like...",
  },
  {
    heading: "Breaking from Tradition: Contemporary Istanbul",
    title:
      "September sees a flurry of major art and culture events in Istanbul. The city has become a hotspot for new talent in recent years, with showcases like...",
  },
  {
    heading: "Breaking from Tradition: Contemporary Istanbul",
    title:
      "September sees a flurry of major art and culture events in Istanbul. The city has become a hotspot for new talent in recent years, with showcases like...",
  },
  {
    heading: "Breaking from Tradition: Contemporary Istanbul",
    title:
      "September sees a flurry of major art and culture events in Istanbul. The city has become a hotspot for new talent in recent years, with showcases like...",
  },
  {
    heading: "Breaking from Tradition: Contemporary Istanbul",
    title:
      "September sees a flurry of major art and culture events in Istanbul. The city has become a hotspot for new talent in recent years, with showcases like...",
  },
  {
    heading: "Breaking from Tradition: Contemporary Istanbul",
    title:
      "September sees a flurry of major art and culture events in Istanbul. The city has become a hotspot for new talent in recent years, with showcases like...",
  },
  {
    heading: "Breaking from Tradition: Contemporary Istanbul",
    title:
      "September sees a flurry of major art and culture events in Istanbul. The city has become a hotspot for new talent in recent years, with showcases like...",
  },
];

const AreaChart = () => {
  return (
    <div className="area-chart-wrapper">
      <div className="area-chart-container">
        <h1 className="area-chart-heading">
          Istanbul Media Hype Index/ Worldwide
        </h1>
        <div className="global-regions-btn-wrapper">
          <button className="global-regions-btn">ESG</button>
          <button className="global-regions-btn">Environmental</button>
          <button className="global-regions-btn">Social</button>
          <button className="global-regions-btn">Governance</button>
        </div>
        <div className="area-chart-content-wrapper">
          <div className="area-chart-left-content">
            <div className="area-chart-left-content-header-wrapper">
              <div className="left-content-header-left-side">
                <div className="area-chart-names-wrapper">
                  <div className="area-chart-names-container">
                    <span className="latest-total-value">6.87</span>
                    <span className="daily-change-value">-0,61%</span>
                    <span className="latest-value-heading">Latest value</span>
                    <span className="daily-change-heading">Daily change</span>
                  </div>
                </div>
              </div>
              <div className="left-content-header-right-side">
                <p className="latest-update">Last Update 3 Oct, 02:04:00</p>
              </div>
            </div>

            <div className="area-chart-button-wrapper">
              <div className="area-chart-button-container">
                <button className="area-chart-button">
                  Linear scale
                  <FontAwesomeIcon icon={faAngleDown} />
                </button>
                <button className="area-chart-button">
                  Comparison
                  <FontAwesomeIcon icon={faAngleDown} />
                </button>
              </div>
            </div>

            <div className="area-chart">
              <Chart />
            </div>
          </div>
          <div className="area-chart-right-content">
            <div className="area-chart-right-content-wrapper">
              <h1 className="related-news-heading">Related News</h1>
              <div className="related-news-wrapper">
                {newsData.map((item) => (
                  <div className="related-news-content">
                    <h1 className="related-news-content-heading">
                      {item.heading}
                    </h1>
                    <p className="related-news-content-tilte">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaChart;
