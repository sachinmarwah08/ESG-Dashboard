import React, { useContext } from "react";
import "./GlobalFilter.scss";
import calenderIcon from "../../Images/calenderIcon.svg";
import CalenderButton from "../Buttons/CalenderButton/CalenderButton";
import CountryDropdownButton from "../Buttons/DropdownButton/CountryDropdownButton";
import HashtagDropdownButton from "../Buttons/DropdownButton/HashtagDropdownButton";
import InfluencerDropdownButton from "../Buttons/DropdownButton/InfluencerDropdownButton";
import { FilterContext } from "../../context/FilterContext";
import {
  RESET_FILTERS,
  SET_FILTERS,
  UPDATE_ALL_LOADERS_TRUE,
  TOGGLE_CALENDER,
  CLOSE_CALENDER,
} from "../../actions/types";

const GlobalFilter = () => {
  const { state, dispatch } = useContext(FilterContext);
  const { influencerValue, hashtagValue, countryValue } = state.filters;

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

  const onApplyAllClick = () => {
    dispatch({ type: UPDATE_ALL_LOADERS_TRUE });
    dispatch({ type: TOGGLE_CALENDER });
    dispatch({ type: CLOSE_CALENDER });
    // setShowInpuField(true);
  };

  const onResetFiltersClick = () => {
    // setLoading(true);
    dispatch({ type: RESET_FILTERS });
    // setShowInpuField(false);
    // setLoading(false);
  };

  return (
    <div className="filter-wrapper">
      <div className="buttons-wrapper">
        <div className="dropdown-btn-wrapper">
          <InfluencerDropdownButton
            selectedVal={influencerValue}
            onCountryChange={(val) => onInfluencerChange(val)}
          />
          <HashtagDropdownButton
            selectedVal={hashtagValue}
            onCountryChange={(val) => onHashTagChange(val)}
          />
          <CountryDropdownButton
            selectedVal={countryValue}
            onCountryChange={(val) => onCountryChange(val)}
          />
          <CalenderButton
            // showInputField={showInputField}
            icon={calenderIcon}
          />
        </div>

        <div className="apply-reset-btn">
          <button onClick={onApplyAllClick} className="apply-btn">
            Apply
          </button>
          <button onClick={onResetFiltersClick} className="reset-btn">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalFilter;
