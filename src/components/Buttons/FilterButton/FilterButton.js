import React, { memo, useState } from "react";
import "./FilterButton.scss";
import filterIcon from "../../../Images/filter.svg";

const FilterButton = ({ data, dropdownList, setData }) => {
  const [active, setActive] = useState(false);

  return (
    <div
      onClick={() => setActive(!active)}
      className="filter-wrapper-container"
    >
      <img className="filter-icon" src={filterIcon} />
      <span className="filter-heading">{data}</span>

      {active && (
        <div className="filter-dropdown-wrapper">
          {dropdownList.map((option) => (
            <div
              onClick={() => setData(option)}
              className="dropdown-filter-container"
            >
              <div className="filter-dropdown-item">{option}</div>
              <div className="filter-dropdown-circle">
                {data === option && (
                  <div className="filter-dropdwon-inner-circle"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(FilterButton);
