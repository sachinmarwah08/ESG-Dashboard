import React from "react";
import LineChart from "../Chart/LineChart";
import { FadeLoader } from "react-spinners";

const CompareTimeLineChart = ({
  compareTimeInputValue,
  compareTimeActive,
  chooseTimeLineChartData,
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
          {compareTimeActive && (
            <div className="line-chart-bar-condition">
              <LineChart
                compareTimeInputValue={compareTimeInputValue}
                compareTimeActive={compareTimeActive}
                chooseTimeLineChartData={chooseTimeLineChartData}
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

export default CompareTimeLineChart;
