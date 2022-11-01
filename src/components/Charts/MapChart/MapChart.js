import React, { useContext, useEffect, useState } from "react";
import FilterButton from "../../Buttons/FilterButton/FilterButton";
import SearchBar from "../../SearchBar/SearchBar";
import earthIcon from "../../../Images/Earth-icon.svg";
import earthIconColored from "../../../Images/Earth-iconColored.svg";
import tableIcon from "../../../Images/Table-icon.svg";
import arrowIcon from "../../../Images/Arrow-icon.svg";
import "./MapChart.scss";
import { FilterContext } from "../../../context/FilterContext";
import { coordinates } from "./Cordinates";
import moment from "moment";
import { getMapData } from "../../../actions/GoogleMapApis";
import { FadeLoader } from "react-spinners";
import Map from "./Map";
import { UPDATE_LOADERS } from "../../../actions/types";

const MapChart = () => {
  const [show, setShow] = useState("Globe");
  const globeFilterDrodownList = ["Country", "Influencer", "Hashtag"];
  const [globeFilter, setGlobeFilter] = useState("Filters");
  const [mapDataApi, setMapDataApi] = useState([]);
  const [mapChartLoading, setMapChartLoading] = useState(false);
  const { state, dispatch } = useContext(FilterContext);
  const {
    loaders: { mapChartGlobalLoading },
    filters: {
      countryValue,
      influencerValue,
      hashtagValue,
      dateRangeValue: { fromDate, toDate },
    },
  } = state;

  useEffect(() => {
    if (mapChartGlobalLoading) {
      const callApi = async () => {
        setMapChartLoading(true);
        let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
          ? false
          : null;

        const response = await getMapData(
          fromDate,
          toDate,
          countryValue,
          influencerValue,
          hashtagValue,
          c
        );

        let tempData = [...response.data];

        for (let i = 0; i < tempData.length; i++) {
          for (let j = 0; j < coordinates.length; j++) {
            if (tempData[i]._id === coordinates[j].country) {
              tempData[i]["cordinates"] = [
                coordinates[j]["longitude"],
                coordinates[j]["latitude"],
              ];
              tempData[i]["name"] = tempData[i]._id;
              tempData[i]["ISO3"] = coordinates[j].alpha3;
              tempData[i]["count"] = tempData[i].count;
            }
          }
        }

        setMapDataApi(tempData);
        dispatch({
          type: UPDATE_LOADERS,
          payload: {
            field: "mapChartGlobalLoading",
            value: false,
          },
        });
        setMapChartLoading(false);
      };

      callApi();
    }
  }, [mapChartGlobalLoading]);
  return (
    <div className="mapChart-container">
      <h1 className="map-heading">Sentiment Index</h1>

      <div className="map-filter-wrapper">
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

      <div className="map-chart-container">
        {mapChartLoading ? (
          <FadeLoader color="#F05728" loading={mapChartLoading} size={50} />
        ) : (
          <Map
            influencerdata={
              globeFilter === "Country" ||
              globeFilter === "Influencer" ||
              globeFilter === "Hashtag"
            }
            // hideRank={hideRank}
            mapDataApi={mapDataApi}
          />
        )}
      </div>
    </div>
  );
};

export default MapChart;
