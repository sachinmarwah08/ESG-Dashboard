import React, { useRef, useEffect, useState } from "react";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BeatLoader } from "react-spinners";
import userIcon from "../../../Images/userIcon.svg";
import { getInfluencerDropdownData } from "../../../actions/DropdownApis";

let timer;
const InfluencerDropdownButton = ({ onCountryChange, selectedVal }) => {
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [influencerData, setInfluencerData] = useState([]);

  const observer = useRef();

  const lastElement = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPageNumber) => prevPageNumber + 1);
      }
    });
    if (node) observer.current.observe(node);
  };

  useEffect(() => {
    setInfluencerData([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    const getSearchItems = async () => {
      const influencer = await getInfluencerDropdownData(page, query);
      setLoading(false);
      setHasMore(influencer.length > 0);
      setInfluencerData((prevBooks) => {
        return [...new Set([...prevBooks, ...influencer.map((b) => b)])];
      });
    };

    getSearchItems();
  }, [query, page]);

  const selectChange = (option) => {
    onCountryChange(option);
    setQuery(() => "");
  };

  const handleChange = (e, option) => {
    onCountryChange(option);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setQuery(e.target.value);
      setPage(1);
    }, 1000);
  };

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
      <button
        ref={wrapperRef}
        onClick={() => setIsFilterActive(!isFilterActive)}
        className={`${"dropdown-filter-button"}`}
      >
        <div className="dropdown-filter-content">
          <div className="filter-content">
            <img className="user-Icon" src={userIcon}></img>

            <input
              className="dropdown-input"
              placeholder="Search Influencer"
              value={selectedVal}
              type="text"
              onChange={(e) => {
                handleChange(e);
                onCountryChange(null);
              }}
            />
          </div>
          <div className="dropdown-Icon">
            {!isFilterActive ? (
              <FontAwesomeIcon className="faAngleDown" icon={faAngleDown} />
            ) : (
              <FontAwesomeIcon className="faAngleDown" icon={faAngleUp} />
            )}
          </div>
        </div>
        {isFilterActive && (
          <div className="dropdown-filter-wrapper">
            <div className="overflow-wrapper">
              {influencerData &&
                influencerData.map((option, index) => {
                  if (influencerData && influencerData.length === index + 1) {
                    return (
                      <div
                        ref={lastElement}
                        key={index}
                        onClick={() => selectChange(option)}
                        className="dropdown-filter-item"
                      >
                        <ul style={{ margin: "0%", padding: "0%" }}>
                          <li
                            style={{ fontFamily: "Sora" }}
                            className="dropdown-list-two"
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
                        onClick={() => selectChange(option)}
                        className="dropdown-filter-item"
                      >
                        <ul style={{ margin: "0%", padding: "0%" }}>
                          <li
                            style={{ fontFamily: "Sora" }}
                            className="dropdown-list-two"
                          >
                            {option}
                          </li>
                        </ul>
                      </div>
                    );
                  }
                })}
              {loading && (
                <BeatLoader color="#FEC84B" loading={true} size={10} />
              )}
            </div>
          </div>
        )}
      </button>
    </>
  );
};

export default InfluencerDropdownButton;
