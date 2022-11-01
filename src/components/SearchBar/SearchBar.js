import React, { memo, useEffect, useRef } from "react";
import "./SearchBar.scss";
import searchIcon from "../../Images/SearchIcon.svg";
import { BeatLoader } from "react-spinners";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/dist/svg-arrow.css";

const SearchBar = ({
  handleChange,
  data,
  lastElement,
  searchBarDropDownClick,
  inputValue,
  loading,
  isFilterActive,
  setIsFilterActive,
}) => {
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsFilterActive(false);
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

  return (
    <>
      <div ref={wrapperRef} className="sort-wrapper">
        <div className="sort-content">
          <div className="search-filter">
            <input
              value={inputValue}
              onChange={(e) => handleChange(e)}
              type="text"
              placeholder="Search..."
              className="sort-input"
            />

            <Tippy
              arrow={false}
              theme={"red"}
              interactive={true}
              content={
                <div
                  style={{
                    fontWeight: 400,
                    fontFamily: "Sora",
                    fontSize: "12px",
                  }}
                >
                  Search
                </div>
              }
            >
              <img
                onClick={() => searchBarDropDownClick()}
                className="Search-icon"
                src={searchIcon}
              />
            </Tippy>

            {isFilterActive && (
              <div className="sort-filter-dropwown-wrapper">
                <div className="sort-filter-dropwown-overflow-wrapper">
                  {data &&
                    data.map((option, index) => {
                      if (data && data.length === index + 1) {
                        return (
                          <div
                            ref={lastElement}
                            key={index}
                            onClick={() => searchBarDropDownClick(option)}
                            className="sort-filter-dropdown-filter-item"
                          >
                            <ul style={{ margin: "0%", padding: "0%" }}>
                              <li
                                style={{ fontFamily: "Sora" }}
                                className="sort-filter-dropdown-list"
                              >
                                {option}
                              </li>
                            </ul>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={index}
                            onClick={() => searchBarDropDownClick(option)}
                            className="sort-filter-dropdown-filter-item"
                          >
                            <ul style={{ margin: "0%", padding: "0%" }}>
                              <li
                                style={{ fontFamily: "Sora" }}
                                className="sort-filter-dropdown-list"
                              >
                                {option}
                              </li>
                            </ul>
                          </div>
                        );
                      }
                    })}
                  {loading && (
                    <div className="search-bar-loader-wrapper">
                      <BeatLoader color="#FEC84B" loading={true} size={10} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(SearchBar);
