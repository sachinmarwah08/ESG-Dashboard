import React from "react";
import LineChart from "../Chart/LineChart";
import { FadeLoader } from "react-spinners";

const CompareCountryLineChart = ({
  compareCountryInputValue,
  compareCountryActive,
  barData,
  lineChartData,
  selectCountry,
  contryNameState,
  loading,
}) => {
  return (
    <>
      {loading ? (
        <div className="lineChart-loader">
          <FadeLoader color="#FEC84B" loading={loading} size={50} />
        </div>
      ) : (
        <>
          {compareCountryActive && (
            <div className="line-chart-bar-condition">
              <LineChart
                barData={barData}
                lineChartData={lineChartData}
                compareCountryInputValue={compareCountryInputValue}
                compareCountryActive={compareCountryActive}
                selectCountry={selectCountry}
                contryNameState={contryNameState}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CompareCountryLineChart;
