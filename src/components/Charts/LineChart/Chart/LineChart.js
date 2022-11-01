import React, { useContext } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import { FilterContext } from "../../../../context/FilterContext";

const Chart = ({
  compareCountryInputValue,
  compareCountryActive,
  compareTimeActive,
  compareTimeInputValue,
  lineChartData,
  chooseTimeLineChartData,
  selectCountry,
  contryNameState,
}) => {
  const { state } = useContext(FilterContext);
  const { influencerValue, hashtagValue, countryValue, filterActive } =
    state.filters;

  function nFormatter(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num;
  }

  function kFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  }

  function renderTooltip(item) {
    if (item && item.payload && item.payload.length) {
      return (
        <div>
          {lineChartData && (
            <>
              <p
                style={{
                  fontSize: "20px",
                  color: "#ffffff",
                  fontWeight: 700,
                  marginTop: 0,
                  marginBottom: "0.5rem",
                  width: "max-content",
                }}
              >
                {item.payload[0].payload._id}
              </p>

              <div
                style={{
                  gap: "0.5rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                    color: "#ffffff",
                    fontWeight: 700,
                    gap: "25px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      color: "#D0D5DD",
                      width: "max-content",
                    }}
                  >
                    {countryValue ? countryValue : selectCountry}
                  </span>
                  <span
                    style={{
                      fontSize: "20px",
                      color: "#FDB022",
                      width: "max-content",
                    }}
                  >
                    {kFormatter(item.payload[0].payload.count)}
                  </span>
                </div>
                {item.payload[1] && item.payload[1].payload && (
                  <div
                    style={{
                      fontSize: "20px",
                      color: "#ffffff",
                      fontWeight: 700,
                      gap: "25px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "20px",
                        color: "#D0D5DD",
                        width: "max-content",
                      }}
                    >
                      {contryNameState}
                    </span>
                    <span
                      style={{
                        fontSize: "20px",
                        color: "#2A00FF",
                        width: "max-content",
                      }}
                    >
                      {kFormatter(item.payload[1].payload.compare)}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}

          {chooseTimeLineChartData && (
            <>
              <p
                style={{
                  fontSize: "20px",
                  color: "#ffffff",
                  fontWeight: 700,
                  marginTop: 0,
                  marginBottom: "0.5rem",
                }}
              >
                {item.payload[0].payload.MonthName}
              </p>

              <div
                style={{
                  gap: "0.5rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                    color: "#ffffff",
                    fontWeight: 700,
                    gap: "25px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      color: "#D0D5DD",
                      width: "max-content",
                    }}
                  >
                    {countryValue ? countryValue : selectCountry}
                  </span>
                  <span
                    style={{
                      fontSize: "20px",
                      color: "#FDB022",
                      width: "max-content",
                    }}
                  >
                    {kFormatter(item.payload[0].payload.count)}
                  </span>
                </div>

                {item.payload[1] && item.payload[1].payload && (
                  <div
                    style={{
                      fontSize: "20px",
                      color: "#ffffff",
                      fontWeight: 700,
                      gap: "25px",
                      display: "flex",
                      marginBottom: "0.5rem",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "20px",
                        color: "#D0D5DD",
                        width: "max-content",
                      }}
                    >
                      {contryNameState}
                    </span>
                    <span
                      style={{
                        fontSize: "20px",
                        color: "#2A00FF",
                        width: "max-content",
                      }}
                    >
                      {kFormatter(item.payload[1].payload.compare)}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      );
    }
    return null;
  }

  return (
    <div>
      <ResponsiveContainer width="99%" height="100%" aspect={3.1}>
        <AreaChart
          data={
            (compareCountryActive && lineChartData) ||
            (compareTimeActive && chooseTimeLineChartData)
          }
          width="auto"
          height="auto"
          margin={{ top: 30, right: 60, left: 10, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorView" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF9900" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#FF9900" stopOpacity={0.0} />
              <stop offset="95%" stopColor="#FF9900" stopOpacity={0.0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#344054" horizontal={true} vertical={false} />
          <XAxis
            style={{ fontFamily: "Sora" }}
            dataKey={
              (compareTimeActive && "MonthName") ||
              (compareCountryActive && "_id")
            }
            stroke="#D0D5DD"
            fontWeight={400}
            dy={8}
            fontSize="0.875rem"
            interval={"preserveStartEnd"}
            tickFormatter={(value) => value + ""}
          />
          <YAxis
            style={{ fontFamily: "Sora" }}
            tickFormatter={nFormatter}
            type="number"
            dy={-4}
            fontWeight={400}
            fontSize="0.875rem"
            domain={["dataMin", "dataMax"]}
            allowDecimals={false}
            scale="auto"
            stroke="#D0D5DD"
          />
          <Tooltip
            content={(item, index) => renderTooltip(item, index)}
            wrapperStyle={{
              boxShadow:
                "-4px 0px 8px rgba(0, 0, 0, 0.08), 0px 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "0.5rem",
              zIndex: "99",
              border: "1px solid #EEEEEE",
              outline: "none",
            }}
          />

          <Area
            type="monotone"
            dataKey="count"
            strokeDasharray="4 4"
            // strokeLinecap=""
            strokeWidth={4}
            fill="url(#colorView)"
            stroke="#FF9900"
            dot={false}
          />
          {compareTimeInputValue || compareCountryInputValue ? (
            <Area
              type="monotone"
              dataKey="compare"
              stroke="#2A00FF"
              strokeWidth={4}
              dot={false}
            />
          ) : (
            ""
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
