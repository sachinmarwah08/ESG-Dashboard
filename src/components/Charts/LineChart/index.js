import React, { useContext, useEffect, useState, useRef } from "react";
import moment from "moment";
import CompareTime from "./CompareTime/Filter";
import "react-toastify/dist/ReactToastify.css";
import CompareCountry from "./CompareCountry/Filter";
import { ToastContainer, toast } from "react-toastify";
import { UPDATE_LOADERS } from "../../../actions/types";
import { FilterContext } from "../../../context/FilterContext";
import CompareTimeLineChart from "./CompareTime/CompareTimeLineChart";
import { getCountryDropdownData } from "../../../actions/DropdownApis";
import CountryAndDateButton from "./Buttons/CountryAndDateButton/Button";
import CountryAndTimeButton from "./Buttons/CountryAndTimeButton/Button";
import { compareCountry, compareTime } from "../../../actions/LineChartApis";
import CompareCountryLineChart from "./CompareCountry/CompareCountryLineChart";
import "./index.scss";
import { notifyError } from "../../Toast/Index";

let timer;
const LineChartData = () => {
  const { state, dispatch } = useContext(FilterContext);
  const {
    loaders: { countryLineChartLoading },
    filters: {
      countryValue,
      influencerValue,
      hashtagValue,
      dateRangeValue: { fromDate, toDate },
    },
  } = state;
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [compareTimeInputValue, setDateValue] = useState("");
  const [contryNameState, setContryNameState] = useState("");
  const [compareCountryInputValue, setCompareCountryInputValue] = useState("");
  const [barChartData, setBarChartData] = useState([]);
  const [LineChartData, setLineChartData] = useState([]);
  const [countrySelect, setCountrySelect] = useState([]);
  const [backUpLineChartData, setBackUpLineChartData] = useState([]);
  const [dataForLineBarChart, setDataForLineBarChart] = useState([]);
  const [chooseTimeLineChartData, setChooseTimeLineChartData] = useState([]);
  const [chooseTimeBarDataState, setChooseTimeBarDataState] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lineChartLoading, setLineChartLoading] = useState(false);
  const [selectCountry, setselectCountry] = useState("Worldwide");
  const [compareCountryActive, setCompareCountryActive] =
    useState("compareCountry");
  const [backupCompareTimeLineChart, setBackupCompareTimeLineChart] = useState(
    []
  );

  useEffect(() => {
    if (countryLineChartLoading) {
      setLineChartLoading(true);
      const callApi = async () => {
        let country = countryValue || "Worldwide";
        var currentDate = moment().subtract(1, "days").format("YYYY-MM-DD");
        let fromDatetime = "2022-05-01";

        let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
          ? false
          : null;

        let isTrue = moment(toDate).isSame(
          moment(new Date()).format("YYYY-MM-DD")
        )
          ? true
          : null;

        const response = await compareCountry(
          fromDate,
          toDate,
          country,
          influencerValue,
          hashtagValue,
          c,
          isTrue
        );

        const responseComapreTime = await compareTime(
          fromDatetime,
          currentDate,
          country,
          influencerValue,
          hashtagValue,
          c,
          isTrue
        );

        response.line_chart_data[country].sort(function (a, b) {
          return new Date(a._id) - new Date(b._id);
        });

        response.line_chart_data[country].forEach((item) => {
          item[country] = item.count;
        });

        responseComapreTime.line_chart_data[country].forEach((item) => {
          item[country] = item.count;
          item["MonthName"] = getTheNameOfMonth(item.MonthValue - 1);
        });

        let tempBarData = [];

        tempBarData[0] = {
          name: country,
          pv: response.bar_graph_data[country].happy,
          sad: response.bar_graph_data[country].sad,
        };

        let tempChooseTimeBarData = [];

        tempChooseTimeBarData[0] = {
          name: country,
          pv: response.bar_graph_data[country].happy,
          sad: response.bar_graph_data[country].sad,
        };

        setDataForLineBarChart(tempBarData);
        setChooseTimeBarDataState(tempChooseTimeBarData);
        setBarChartData(response.bar_graph_data[country]);
        setLineChartData(response.line_chart_data[country]);
        setBackUpLineChartData(response.line_chart_data[country]);
        setChooseTimeLineChartData(
          responseComapreTime.line_chart_data[country]
        );
        setBackupCompareTimeLineChart(
          responseComapreTime.line_chart_data[country]
        );

        dispatch({
          type: UPDATE_LOADERS,
          payload: {
            field: "countryLineChartLoading",
            value: false,
          },
        });
        setLineChartLoading(false);
      };
      callApi();
    }
  }, [countryLineChartLoading]);

  // LINE CHART LEFT COUNTRY LIST DROPDOWN BUTTON

  useEffect(() => {
    setLoading(true);
    const getSearchItems = async () => {
      const country = await getCountryDropdownData(page, query);
      setLoading(false);
      setHasMore(country.length > 0);
      setCountrySelect((prevBooks) => {
        return [...new Set([...prevBooks, ...country.map((b) => b)])];
      });
    };

    getSearchItems();
  }, [page, query]);

  useEffect(() => {
    setCountrySelect([]);
  }, [query]);

  const observer = useRef();

  const lastUserRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPageNumber) => prevPageNumber + 1);
      }
    });
    if (node) observer.current.observe(node);
  };

  const handleChangeDrop = (e, option) => {
    setselectCountry(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setQuery(e.target.value);
      setPage(1);
    }, 500);
  };

  // LINE CHART LEFT COUNTRY LIST DROPDOWN BUTTON

  const closeCompareCountry = () => {
    setLineChartData(backUpLineChartData);
    setContryNameState("");
    setCompareCountryInputValue(false);
  };

  const closeCompareTime = () => {
    setContryNameState("");
    setChooseTimeLineChartData(backupCompareTimeLineChart);
    setDateValue(false);
  };

  const getTheNameOfMonth = (month) => {
    let months = [
      "January, 2022",
      "February, 2022",
      "March, 2022",
      "April, 2022",
      "May, 2022",
      "June, 2022",
      "July, 2022",
      "August, 2022",
      "September, 2022",
      "October, 2022",
    ];
    return months[month];
  };

  const handleChange = async (option) => {
    if (contryNameState && compareCountryInputValue) {
      setLineChartLoading(true);

      setPage(1);
      let country = compareCountryInputValue;

      let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
        ? false
        : null;

      try {
        const dropResponse = await compareCountry(
          fromDate,
          toDate,
          option,
          "",
          "",
          c
        );
        const response = await compareCountry(
          fromDate,
          toDate,
          country,
          "",
          "",
          c
        );

        dropResponse.line_chart_data[option].sort(function (a, b) {
          return new Date(a._id) - new Date(b._id);
        });

        // BAR CHART

        let tempBarData = [...dataForLineBarChart];

        tempBarData[0] = { ...dataForLineBarChart[0] };

        tempBarData[0] = {
          name: option,
          pv: dropResponse.bar_graph_data[option].happy,
          sad: dropResponse.bar_graph_data[option].sad,
        };

        setDataForLineBarChart(tempBarData);

        // BAR CHART

        let tempData = [...dropResponse.line_chart_data[option]];
        for (let i = 0; i < tempData.length; i++) {
          tempData[i]["compare"] = 0;
        }
        let equal_ids = [];

        if (
          response &&
          response.line_chart_data &&
          response.line_chart_data[country] &&
          response.line_chart_data[country].length
        ) {
          let countryData = response.line_chart_data[country];

          for (let i = 0; i < countryData.length; i++) {
            for (let j = 0; j < tempData.length; j++) {
              if (!equal_ids.includes(tempData[j]._id)) {
                equal_ids.push(tempData[j]._id);
              }
              if (countryData[i]._id === tempData[j]._id) {
                if (countryData[i]) {
                  tempData[j]["compare"] = countryData[i].count;
                }
              }
            }
          }

          for (let i = 0; i < countryData.length; i++) {
            if (!equal_ids.includes(countryData[i]._id)) {
              countryData[i]["compare"] = countryData[i]["count"];
              countryData[i]["count"] = 0;
              tempData.push(countryData[i]);
            }
          }
        }

        response.line_chart_data[country].sort(function (a, b) {
          return new Date(a._id) - new Date(b._id);
        });

        tempData.forEach((item) => {
          item[option] = item.count;
          item[country] = item.compare;
        });

        setLineChartData(tempData);
        setBackUpLineChartData(dropResponse.line_chart_data[option]);
        setLineChartLoading(false);
      } catch (error) {
        notifyError("No records found...!");
      }
    } else if (contryNameState && compareTimeInputValue) {
      setLineChartLoading(true);

      setPage(1);
      let country = compareTimeInputValue;

      let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
        ? false
        : null;

      try {
        let fromDateCompareTime = "2022-05-01";
        let toDateCompareTime = moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD");

        const dropResponse = await compareTime(
          fromDateCompareTime,
          toDateCompareTime,
          option,
          "",
          "",
          c
        );

        const response = await compareTime(
          fromDateCompareTime,
          toDateCompareTime,
          country,
          "",
          "",
          c
        );

        // BAR CHART

        let tempChooseTimeBarData = [...chooseTimeBarDataState];

        tempChooseTimeBarData[0] = { ...chooseTimeBarDataState[0] };

        tempChooseTimeBarData[0] = {
          name: option,
          pv: dropResponse.bar_graph_data[option].happy,
          sad: dropResponse.bar_graph_data[option].sad,
        };

        setChooseTimeBarDataState(tempChooseTimeBarData);

        // BAR CHART

        let tempData = [...dropResponse.line_chart_data[option]];
        for (let i = 0; i < tempData.length; i++) {
          tempData[i]["compare"] = 0;
        }
        let equal_ids = [];

        if (
          response &&
          response.line_chart_data &&
          response.line_chart_data[country] &&
          response.line_chart_data[country].length
        ) {
          let countryData = response.line_chart_data[country];

          for (let i = 0; i < countryData.length; i++) {
            for (let j = 0; j < tempData.length; j++) {
              if (!equal_ids.includes(tempData[j].MonthValue)) {
                equal_ids.push(tempData[j].MonthValue);
              }
              if (countryData[i].MonthValue === tempData[j].MonthValue) {
                if (countryData[i]) {
                  tempData[j]["compare"] = countryData[i].count;
                }
              }
            }
          }

          for (let i = 0; i < countryData.length; i++) {
            if (!equal_ids.includes(countryData[i].MonthValue)) {
              countryData[i]["compare"] = countryData[i]["count"];
              countryData[i]["count"] = 0;
              tempData.push(countryData[i]);
            }
          }
        }

        tempData.forEach((item) => {
          item[option] = item.count;
          item[country] = item.compare;
        });

        dropResponse.line_chart_data[option].forEach((item) => {
          item[option] = item.count;
          item["MonthName"] = getTheNameOfMonth(item.MonthValue - 1);
        });

        setChooseTimeLineChartData(tempData);
        setBackupCompareTimeLineChart(dropResponse.line_chart_data[option]);
        setLineChartLoading(false);
      } catch (error) {
        notifyError("No records found...!");
      }
    } else {
      setLineChartLoading(true);
      let country = option;

      let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
        ? false
        : null;

      const response = await compareCountry(
        fromDate,
        toDate,
        country,
        "",
        "",
        c
      );

      response.line_chart_data[country].sort(function (a, b) {
        return new Date(a._id) - new Date(b._id);
      });

      let fromDateCompareTime = "2022-05-01";
      let toDateCompareTime = moment().subtract(1, "days").format("YYYY-MM-DD");

      const responseComapreTime = await compareTime(
        fromDateCompareTime,
        toDateCompareTime,
        country,
        "",
        "",
        c
      );

      // BAR CHART

      let tempCompareCountryBarData = [...dataForLineBarChart];

      tempCompareCountryBarData[0] = { ...dataForLineBarChart[0] };

      tempCompareCountryBarData[0] = {
        name: country,
        pv: response.bar_graph_data[country].happy,
        sad: response.bar_graph_data[country].sad,
      };

      setDataForLineBarChart(tempCompareCountryBarData);

      // BAR CHART

      // BAR CHART

      let tempChooseTimeBarData = [...chooseTimeBarDataState];

      tempChooseTimeBarData[0] = { ...chooseTimeBarDataState[0] };

      tempChooseTimeBarData[0] = {
        name: country,
        pv: responseComapreTime.bar_graph_data[country].happy,
        sad: responseComapreTime.bar_graph_data[country].sad,
      };

      setChooseTimeBarDataState(tempChooseTimeBarData);

      // BAR CHART

      let tempData = [...responseComapreTime.line_chart_data[country]];
      for (let i = 0; i < tempData.length; i++) {
        tempData[i]["compare"] = 0;
      }
      let equal_ids = [];
      if (
        response &&
        response.line_chart_data &&
        response.line_chart_data[selectCountry] &&
        response.line_chart_data[selectCountry].length
      ) {
        let countryData = responseComapreTime.line_chart_data[selectCountry];

        for (let i = 0; i < countryData.length; i++) {
          for (let j = 0; j < tempData.length; j++) {
            if (!equal_ids.includes(tempData[j].MonthValue)) {
              equal_ids.push(tempData[j].week);
            }
            if (countryData[i].week === tempData[j].week) {
              if (countryData[i]) {
                tempData[j]["compare"] = countryData[i].count;
              }
            }
          }
        }

        for (let i = 0; i < countryData.length; i++) {
          if (!equal_ids.includes(countryData[i].week)) {
            countryData[i]["compare"] = countryData[i]["count"];
            countryData[i]["count"] = 0;
            tempData.push(countryData[i]);
          }
        }
      }

      tempData.forEach((item) => {
        item[selectCountry] = item.count;
        item[selectCountry] = item.compare;
      });

      setChooseTimeLineChartData(responseComapreTime.line_chart_data[option]);

      response.line_chart_data[country].sort(function (a, b) {
        return new Date(a._id) - new Date(b._id);
      });

      response.line_chart_data[country].forEach((item) => {
        item[country] = item.count;
      });

      responseComapreTime.line_chart_data[country].forEach((item) => {
        item[country] = item.count;
        item["MonthName"] = getTheNameOfMonth(item.MonthValue - 1);
      });

      setBarChartData(response.bar_graph_data[option]);
      setLineChartData(response.line_chart_data[option]);
      setBackUpLineChartData(response.line_chart_data[option]);
      setLineChartLoading(false);
    }
  };

  const CompareCountryDropDownClick = async (item) => {
    setLineChartLoading(true);

    let country = item;
    let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
      ? false
      : null;

    try {
      setCompareCountryInputValue(item);
      const response = await compareCountry(
        fromDate,
        toDate,
        country,
        "",
        "",
        c
      );

      console.log(response.bar_graph_data[country].happy, "coming heere");

      // BAR CHART

      let tempBarData = [];

      tempBarData[0] = { ...dataForLineBarChart[0] };

      tempBarData[1] = {
        name: country,
        pv: response.bar_graph_data[country].happy,
        sad: response.bar_graph_data[country].sad,
      };

      setDataForLineBarChart(tempBarData);

      // BAR CHART

      let tempData = [...LineChartData];
      for (let i = 0; i < tempData.length; i++) {
        tempData[i]["compare"] = 0;
      }
      let equal_ids = [];

      if (
        response &&
        response.line_chart_data &&
        response.line_chart_data[country] &&
        response.line_chart_data[country].length
      ) {
        let countryData = response.line_chart_data[country];

        for (let i = 0; i < countryData.length; i++) {
          for (let j = 0; j < tempData.length; j++) {
            if (!equal_ids.includes(tempData[j]._id)) {
              equal_ids.push(tempData[j]._id);
            }
            if (countryData[i]._id === tempData[j]._id) {
              if (countryData[i]) {
                tempData[j]["compare"] = countryData[i].count;
              }
            }
          }
        }

        for (let i = 0; i < countryData.length; i++) {
          if (!equal_ids.includes(countryData[i]._id)) {
            countryData[i]["compare"] = countryData[i]["count"];
            countryData[i]["count"] = 0;
            tempData.push(countryData[i]);
          }
        }
      }

      response.line_chart_data[country].sort(function (a, b) {
        return new Date(a._id) - new Date(b._id);
      });

      tempData.forEach((item) => {
        item[selectCountry] = item.count;
        item[country] = item.compare;
      });

      setLineChartData(tempData);
      setLineChartLoading(false);
    } catch (error) {
      notifyError("No records found...!");
    }
  };

  const CompareTimeDropDownClick = async (item) => {
    setLineChartLoading(true);

    let fromDateCompareTime = "2022-05-01";
    let toDateCompareTime = moment().subtract(1, "days").format("YYYY-MM-DD");
    let country = item;

    let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
      ? false
      : null;

    try {
      setDateValue(item);
      const response = await compareTime(
        fromDateCompareTime,
        toDateCompareTime,
        country,
        "",
        "",
        c
      );

      // BAR CHART

      let tempChooseTimeBarData = [];

      tempChooseTimeBarData[0] = { ...chooseTimeBarDataState[0] };

      tempChooseTimeBarData[1] = {
        name: country,
        pv: response.bar_graph_data[country].happy,
        sad: response.bar_graph_data[country].sad,
      };

      setChooseTimeBarDataState(tempChooseTimeBarData);

      // BAR CHART

      let tempData = [...chooseTimeLineChartData];

      for (let i = 0; i < tempData.length; i++) {
        tempData[i]["compare"] = 0;
      }
      let equal_ids = [];

      if (
        response &&
        response.line_chart_data &&
        response.line_chart_data[country] &&
        response.line_chart_data[country].length
      ) {
        let countryData = response.line_chart_data[country];

        for (let i = 0; i < countryData.length; i++) {
          for (let j = 0; j < tempData.length; j++) {
            if (!equal_ids.includes(tempData[j].MonthValue)) {
              equal_ids.push(tempData[j].MonthValue);
            }
            if (countryData[i].MonthValue === tempData[j].MonthValue) {
              if (countryData[i]) {
                tempData[j]["compare"] = countryData[i].count;
              }
            }
          }
        }

        for (let i = 0; i < countryData.length; i++) {
          if (!equal_ids.includes(countryData[i].MonthValue)) {
            countryData[i]["compare"] = countryData[i]["count"];
            countryData[i]["count"] = 0;
            tempData.push(countryData[i]);
          }
        }
      }

      tempData.forEach((item) => {
        item["MonthName"] = getTheNameOfMonth(item.MonthValue - 1);
      });

      setChooseTimeLineChartData(tempData);
      setLineChartLoading(false);
    } catch (error) {
      setLoading(false);
      notifyError("No records found...!");
    }
  };

  return (
    <>
      <div className="lineChart-container">
        <div className="whole-container">
          <div className="heading-content">
            <div className="heading">ESG Interest Analysis Over Time</div>
          </div>

          <div className="global-regions-btn-wrapper">
            <button className="global-regions-btn">ESG</button>
            <button className="global-regions-btn">Environmental</button>
            <button className="global-regions-btn">Social</button>
            <button className="global-regions-btn">Governance</button>
          </div>

          {/* DATE AND COUNTRY BUTTONS */}

          <div className="buttons">
            <div className="left-button">
              <div className="select-country-btn">
                <CountryAndDateButton
                  disabled={false}
                  loading={loading}
                  options={countrySelect}
                  selected={selectCountry}
                  handleChangeDrop={handleChangeDrop}
                  lastUserRef={lastUserRef}
                  handleChange={handleChange}
                  setSelected={setselectCountry}
                  // value={inputValue}
                />
              </div>
            </div>

            {/* COMPARE COUNTRY AND COMPARE TIME BUTTONS */}

            <div className="right-button">
              <CountryAndTimeButton
                value="compareCountry"
                name="Compare Country"
                compareCountryvalue="compareCountry"
                compareCountryActive={compareCountryActive}
                onClick={() => setCompareCountryActive("compareCountry")}
              />

              <CountryAndTimeButton
                value="compareTime"
                name="Compare Time"
                compareTimevalue="compareTime"
                compareCountryActive={compareCountryActive}
                onClick={() => setCompareCountryActive("compareTime")}
              />
            </div>
          </div>

          {!compareCountryActive ? <div className="border"></div> : null}

          {/* COMPARE COUNTRY */}

          {compareCountryActive === "compareCountry" && (
            <CompareCountry
              compareCountryInputValue={compareCountryInputValue}
              title={selectCountry}
              closeAddCountry={closeCompareCountry}
              CompareCountryDropDownClick={CompareCountryDropDownClick}
              contryNameState={contryNameState}
              setContryNameState={setContryNameState}
            />
          )}

          {/* COMPARE TIME */}

          {compareCountryActive === "compareTime" && (
            <CompareTime
              title={selectCountry}
              compareTimeInputValue={compareTimeInputValue}
              setDateClick={closeCompareTime}
              CompareTimeDropDownClick={CompareTimeDropDownClick}
              contryNameState={contryNameState}
              setContryNameState={setContryNameState}
            />
          )}
        </div>

        {/* LINE CHART */}

        <div className="chart">
          {compareCountryActive === "compareCountry" && (
            <CompareCountryLineChart
              loading={lineChartLoading}
              compareCountryInputValue={compareCountryInputValue}
              barData={barChartData}
              lineChartData={LineChartData}
              selectCountry={selectCountry}
              contryNameState={compareCountryInputValue}
              dataForLineBarChart={dataForLineBarChart}
              compareCountryActive={compareCountryActive === "compareCountry"}
            />
          )}
          {compareCountryActive === "compareTime" && (
            <CompareTimeLineChart
              loading={lineChartLoading}
              compareTimeInputValue={compareTimeInputValue}
              contryNameState={compareTimeInputValue}
              selectCountry={selectCountry}
              chooseTimeLineChartData={chooseTimeLineChartData}
              chooseTimeBarDataState={chooseTimeBarDataState}
              compareTimeActive={compareCountryActive === "compareTime"}
            />
          )}
        </div>
      </div>

      {/* TOST MESSAGE */}

      <ToastContainer />
    </>
  );
};

export default LineChartData;
