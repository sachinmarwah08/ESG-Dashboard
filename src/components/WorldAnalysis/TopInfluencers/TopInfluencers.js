import React, { useState } from "react";
import "./TopInfluencers.scss";
import FilterButton from "../../Buttons/FilterButton/FilterButton";
import RadioButton from "../../Buttons/RadioButton/RadioButton";
import SearchBar from "../../SearchBar/SearchBar";

const data = [
  {
    id: 1,
    name: "NRP Hralth News",
    numberOne: "68528432457",
    numberTwo: "12,000",
  },
  {
    id: 2,
    name: "NRP Hralth News",
    numberOne: "68528432457",
    numberTwo: "12,000",
  },
  {
    id: 3,
    name: "NRP Hralth News",
    numberOne: "68528432457",
    numberTwo: "12,000",
  },
  {
    id: 4,
    name: "NRP Hralth News",
    numberOne: "68528432457",
    numberTwo: "12,000",
  },
  {
    id: 5,
    name: "NRP Hralth News",
    numberOne: "68528432457",
    numberTwo: "12,000",
  },
  {
    id: 6,
    name: "NRP Hralth News",
    numberOne: "68528432457",
    numberTwo: "12,000",
  },
  {
    id: 7,
    name: "NRP Hralth News",
    numberOne: "68528432457",
    numberTwo: "12,000",
  },
  {
    id: 8,
    name: "NRP Hralth News",
    numberOne: "68528432457",
    numberTwo: "12,000",
  },
  {
    id: 9,
    name: "NRP Hralth News",
    numberOne: "68528432457",
    numberTwo: "12,000",
  },
  {
    id: 10,
    name: "NRP Hralth News",
    numberOne: "68528432457",
    numberTwo: "12,000",
  },
  {
    id: 11,
    name: "NRP Hralth News",
    numberOne: "68528432457",
    numberTwo: "12,000",
  },
  {
    id: 12,
    name: "NRP Hralth News",
    numberOne: "68528432457",
    numberTwo: "12,000",
  },
  {
    id: 13,
    name: "NRP Hralth News",
    numberOne: "68528432457",
    numberTwo: "12,000",
  },
];

const TopInfluencers = () => {
  const globeFilterDrodownList = ["Country", "Influencer", "Hashtag"];
  const [globeFilter, setGlobeFilter] = useState("Filters");
  return (
    <>
      <div className="second-content-wrapper">
        <div className="radio-btn-wrapper-analysis">
          <>
            <RadioButton name="All" />
            <RadioButton name="Person" />
            <RadioButton name="Organisation" />
          </>
        </div>
      </div>
      <div className="searchBar-wrapper-analysis">
        <SearchBar />
        <FilterButton
          data={globeFilter}
          setData={setGlobeFilter}
          dropdownList={globeFilterDrodownList}
        />
      </div>

      <div className="table-wrapper">
        <div className="table-border">
          <table className="fixed_header">
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: "left",
                  }}
                >
                  Influencer
                </th>
                {/* {!influencerValue &&
                !hashtagValue &&
                !countryValue &&
                !hideRank && <th>Rank</th>} */}
                <th>Media Impact</th>
                <th
                  style={{
                    marginRight: "0.8rem",
                  }}
                >
                  Number of followers
                </th>
              </tr>
            </thead>
            <tbody style={{ marginTop: "0.5rem", height: "24.5rem" }}>
              {data.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: "1px solid #2b356e",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                  }}
                >
                  <td
                    style={{
                      textAlign: "left",
                      fontWeight: 600,
                      color: "white",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <p style={{ width: "2rem", margin: 0 }}>{item.id}</p>{" "}
                      {item.name}
                    </div>
                    {/* {item._id} */}
                  </td>
                  {/* {!influencerValue && !hashtagValue && !countryValue && !hideRank && ( */}
                  <td>
                    {item.numberOne}
                    {/* {parseFloat(item.rank, 2)}{" "} */}
                  </td>
                  {/* )} */}
                  <td>
                    {item.numberTwo}
                    {/* {nFormatter(item.count)}{" "} */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TopInfluencers;
