import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import earthIcon from "../../../Images/Earth-icon.svg";
import earthIconColored from "../../../Images/Earth-iconColored.svg";
import tableIcon from "../../../Images/Table-icon.svg";
import arrowIcon from "../../../Images/Arrow-icon.svg";
import SearchBar from "../../SearchBar/SearchBar";
import FilterButton from "../../Buttons/FilterButton/FilterButton";
import Globe from "./Globe";
import "./Globe.scss";
import { countryCordinatesData } from "./Cordinates";
import {
  getCountryDropdownData,
  getHashtagDropdownData,
  getInfluencerDropdownData,
} from "../../../actions/DropdownApis";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import { FilterContext } from "../../../context/FilterContext";
import { getMapData } from "../../../actions/GoogleMapApis";
import { notifyError } from "../../Toast/Index";
import { SET_FILTERS } from "../../../actions/types";

let timer = "";
const GlobeContainer = () => {
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [globeFilter, setGlobeFilter] = useState("Filters");
  const globeFilterDrodownList = ["Country", "Influencer", "Hashtag"];
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [globeLoading, setGlobeLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [hashtagData, setHashtagData] = useState([]);
  const [influencerData, setInfluencerData] = useState([]);
  const [mapDataApi, setMapDataApi] = useState([]);
  const [show, setShow] = useState("Globe");
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

  const onInfluencerChange = (val) => {
    dispatch({
      type: SET_FILTERS,
      payload: { field: "influencerValue", value: val },
    });
  };
  const onHashTagChange = (val) => {
    dispatch({
      type: SET_FILTERS,
      payload: { field: "hashtagValue", value: val },
    });
  };
  const onCountryChange = (val) => {
    dispatch({
      type: SET_FILTERS,
      payload: { field: "countryValue", value: val },
    });
  };

  useEffect(() => {
    if (countryLineChartLoading) {
      setGlobeLoading(true);
      const callApi = async () => {
        let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
          ? false
          : null;

        try {
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
            tempData[i]["coordinates"] = [];
          }

          let colors = ["#D1B000"];
          for (let i = 0; i < tempData.length; i++) {
            for (let j = 0; j < countryCordinatesData.length; j++) {
              if (tempData[i]._id === countryCordinatesData[j].country) {
                tempData[i]["coordinates"] = [
                  countryCordinatesData[j]["latitude"],
                  countryCordinatesData[j]["longitude"],
                ];
                tempData[i]["city"] = tempData[i]._id;
                tempData[i]["ISO3"] = countryCordinatesData[j].alpha3;
                // tempData[i]["value"] = tempData[i].count;
                tempData[i]["value"] = countryCordinatesData[j].value || 350;
                tempData[i]["id"] = i;
                tempData[i]["color"] =
                  countryCordinatesData[j].color ||
                  colors[Math.floor(Math.random() * colors.length)];
              }
            }
          }
          tempData = tempData.filter((item) => item.coordinates.length > 0);

          setMapDataApi(tempData);
          setGlobeLoading(false);
        } catch (error) {
          notifyError(error.message);
        }
      };
      callApi();
    }
  }, [countryLineChartLoading]);

  useEffect(() => {
    setCountryData([]);
    setInfluencerData([]);
    setHashtagData([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    const getSearchItems = async () => {
      if (globeFilter === "Country") {
        const country = await getCountryDropdownData(page, query);
        setLoading(false);
        setHasMore(country.length > 0);
        setCountryData((prevBooks) => {
          return [...new Set([...prevBooks, ...country.map((b) => b)])];
        });
      }
      if (globeFilter === "Influencer") {
        const influencer = await getInfluencerDropdownData(page, query);
        setLoading(false);
        setHasMore(influencer.length > 0);
        setInfluencerData((prevBooks) => {
          return [...new Set([...prevBooks, ...influencer.map((b) => b)])];
        });
      }
      if (globeFilter === "Hashtag") {
        const hashtag = await getHashtagDropdownData(page, query);
        setLoading(false);
        setHasMore(hashtag.length > 0);
        setHashtagData((prevBooks) => {
          return [...new Set([...prevBooks, ...hashtag.map((b) => b)])];
        });
      }
    };

    getSearchItems();
  }, [page, query]);

  const observer = useRef();
  const lastElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const handleChange = useCallback(
    (e) => {
      setIsFilterActive(true);
      setInputValue(e.target.value);

      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setQuery(e.target.value);
        setPage(1);
      }, 500);

      if (globeFilter === "Filters") {
        setInputValue("");
        setIsFilterActive(false);
        notifyError("ERROR! Please select a filter.");
      }
    },
    [inputValue, globeFilter]
  );

  const searchBarDropDownClick = async (option) => {
    if (globeFilter === "Filters" && inputValue === "") {
      notifyError("ERROR! Please select a filter.");
    } else if (
      inputValue === "" &&
      globeFilter === "Country" &&
      "Influncer" &&
      "Hashtag"
    ) {
      notifyError("ERROR! Search keyword field is required.");
    } else {
      setGlobeLoading(true);
      onCountryChange(option);
      onInfluencerChange(option);
      onHashTagChange(option);
      setQuery(() => "");
      setIsFilterActive(false);

      let countryTypedValue = "";
      let influencerTypedValue = "";
      let hashtagTypedValue = "";
      if (globeFilter === "Country") {
        countryTypedValue = option || countryValue;
      }
      if (globeFilter === "Influencer") {
        influencerTypedValue = option || influencerValue;
      }
      if (globeFilter === "Hashtag") {
        hashtagTypedValue = option || hashtagValue;
      }

      let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
        ? false
        : null;

      try {
        const response = await getMapData(
          fromDate,
          toDate,
          countryTypedValue,
          influencerTypedValue,
          hashtagTypedValue,
          c
        );

        let tempData = [...response.data];
        for (let i = 0; i < tempData.length; i++) {
          tempData[i]["coordinates"] = [];
        }

        let colors = ["#D1B000"];
        for (let i = 0; i < tempData.length; i++) {
          for (let j = 0; j < countryCordinatesData.length; j++) {
            if (tempData[i]._id === countryCordinatesData[j].country) {
              tempData[i]["coordinates"] = [
                countryCordinatesData[j]["latitude"],
                countryCordinatesData[j]["longitude"],
              ];
              tempData[i]["city"] = tempData[i]._id;
              tempData[i]["ISO3"] = countryCordinatesData[j].alpha3;
              // tempData[i]["value"] = tempData[i].count;
              tempData[i]["value"] = countryCordinatesData[j].value || 300;
              tempData[i]["id"] = i;
              tempData[i]["color"] =
                countryCordinatesData[j].color ||
                colors[Math.floor(Math.random() * colors.length)];
            }
          }
        }
        tempData = tempData.filter((item) => item.coordinates.length > 0);

        setMapDataApi(tempData);
      } catch (error) {
        notifyError(error.message);
      }
    }
    setGlobeLoading(false);
  };

  const globeFilterDropDownClick = useCallback(
    (option) => {
      setGlobeFilter(option);
    },
    [globeFilter]
  );
  return (
    <div>
      {/* <h1 className="globe-heading">Globe</h1> */}
      {/* <div className="radio-btn-wrapper">
        <RadioButton name="Positive Sentiments" />
        <RadioButton name="Negative Sentiments" />
      </div> */}
      <div className="left-content">
        <SearchBar
          data={
            (globeFilter === "Country" && countryData) ||
            (globeFilter === "Influencer" && influencerData) ||
            (globeFilter === "Hashtag" && hashtagData)
          }
          lastElement={lastElement}
          handleChange={handleChange}
          searchBarDropDownClick={searchBarDropDownClick}
          inputValue={inputValue}
          loading={loading}
          isFilterActive={isFilterActive}
          setIsFilterActive={setIsFilterActive}
        />
        <FilterButton
          setData={globeFilterDropDownClick}
          data={globeFilter}
          dropdownList={globeFilterDrodownList}
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

      <ToastContainer />
    </div>
  );
};

export default GlobeContainer;
