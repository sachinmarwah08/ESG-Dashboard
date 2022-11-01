import React from "react";
import "./CountryChart.scss";
import LineChart from "./LineChart";
import MapChart from "./MapChart/MapChart";

const CountryChart = () => {
  return (
    <div className="map-line-Chart-wrapper">
      <div className="map-line-chart-container">
        <div className="mapChart-wrapper">
          <MapChart />
        </div>
        <div className="lineChart-inside-wrapper">
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default CountryChart;
