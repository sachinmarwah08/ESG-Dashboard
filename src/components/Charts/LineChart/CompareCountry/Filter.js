import React, { useContext, useEffect, useRef, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import xCircle from "../../../../Images/x-circle.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/dist/svg-arrow.css";
import { FilterContext } from "../../../../context/FilterContext";
import { BeatLoader } from "react-spinners";
import { getCountryDropdownData } from "../../../../actions/DropdownApis";

let timer = "";
const CompareCountry = ({
  title,
  compareCountryInputValue,
  closeAddCountry,
  CompareCountryDropDownClick,
  contryNameState,
  setContryNameState,
}) => {
  const { state } = useContext(FilterContext);
  const { countryValue } = state.filters;
  const [isActive, setIsActive] = useState(false);
  const [query, setQuery] = useState("");
  const [compareCountryDropData, setCompareCountryDropData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [showDropdown, setShowDropDown] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getSearchItems = async () => {
      const country = await getCountryDropdownData(page, query);
      setLoading(false);
      setHasMore(country.length > 0);
      setCompareCountryDropData((prevBooks) => {
        return [...new Set([...prevBooks, ...country.map((b) => b)])];
      });
    };

    getSearchItems();
  }, [page, query]);

  useEffect(() => {
    setCompareCountryDropData([]);
  }, [query]);

  const CompareCountryobserver = useRef();

  const lastElement = (node) => {
    if (loading) return;
    if (CompareCountryobserver.current)
      CompareCountryobserver.current.disconnect();
    CompareCountryobserver.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPageNumber) => prevPageNumber + 1);
      }
    });
    if (node) CompareCountryobserver.current.observe(node);
  };

  const CompareCountryHandleChangeDrop = (e) => {
    setContryNameState(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setQuery(e.target.value);
      setPage(1);
    }, 500);
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowDropDown(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const dropdownVisible = () => {
    setShowDropDown(true);
  };

  return (
    <>
      <div className="Add-country">
        <div className="country">
          <div className="three-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <p className="title">{countryValue ? countryValue : title}</p>
        </div>
        {!isActive ? (
          <button
            onClick={() => setIsActive(!isActive)}
            className="country-add"
          >
            <>
              <span className="faplus">
                <FontAwesomeIcon className="fa" icon={faPlus} />
              </span>

              <p
                style={{
                  fontFamily: "Work-Sans",
                }}
                className="title"
              >
                Add Country
              </p>
            </>
          </button>
        ) : (
          !compareCountryInputValue && (
            <Tippy
              theme={"light"}
              interactive={true}
              content={
                <div
                  style={{
                    padding: "0.5rem",
                    fontWeight: 400,
                    fontFamily: "Work-Sans",
                    fontSize: "14px",
                  }}
                >
                  <p
                    style={{
                      fontWeight: 600,
                      marginTop: 0,
                    }}
                  >
                    Choose Country
                  </p>
                  Choose a time period for comparison of a country's wellbeing
                  index score.
                </div>
              }
            >
              <div className="country-time">
                <button
                  ref={wrapperRef}
                  onClick={dropdownVisible}
                  className="compare-time"
                >
                  <>
                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <input
                        type="text"
                        className="compare-time-input"
                        placeholder="Search country name"
                        value={contryNameState}
                        onChange={(e) => {
                          CompareCountryHandleChangeDrop(e);
                        }}
                      />
                    </div>
                    {showDropdown && contryNameState && (
                      <>
                        <div className="dropdown-wrapper">
                          <div className="dropdown-content">
                            {compareCountryDropData &&
                              compareCountryDropData.map((item, index) => {
                                if (
                                  compareCountryDropData &&
                                  compareCountryDropData.length === index + 1
                                ) {
                                  return (
                                    <div
                                      ref={lastElement}
                                      key={item.value}
                                      onClick={() =>
                                        CompareCountryDropDownClick(item)
                                      }
                                      className="drop-item"
                                    >
                                      {item}
                                    </div>
                                  );
                                } else {
                                  return (
                                    <div
                                      key={item.value}
                                      onClick={() =>
                                        CompareCountryDropDownClick(item)
                                      }
                                      className="drop-item"
                                    >
                                      {item}
                                    </div>
                                  );
                                }
                              })}

                            {loading && (
                              <BeatLoader
                                color="#FEC84B"
                                loading={true}
                                size={10}
                              />
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </>
                </button>
              </div>
            </Tippy>
          )
        )}

        {compareCountryInputValue && (
          <div className="country-added">
            <span className="circle-line-added-country-time"></span>
            <p className="title-line-added-country">
              {compareCountryInputValue}
              <button
                className="close-addCountry-btn"
                onClick={closeAddCountry}
              >
                <img alt="xCircle" src={xCircle} />
              </button>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CompareCountry;
