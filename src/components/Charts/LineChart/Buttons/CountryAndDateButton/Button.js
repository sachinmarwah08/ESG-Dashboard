import React, { useContext, useState } from "react";
import "./Button.scss";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SET_FILTERS } from "../../../../../actions/types";
import { FilterContext } from "../../../../../context/FilterContext";
import { BeatLoader } from "react-spinners";

const Button = ({
  selected,
  setSelected,
  options,
  disabled,
  handleChange,
  lastUserRef,
  loading,
  value,
  onAddCountry,
  handleChangeDrop,
}) => {
  const { dispatch, state } = useContext(FilterContext);
  const {
    filters: { countryValue },
  } = state;
  const [isActive, setActive] = useState(false);

  return (
    <div className="dropdown">
      <div
        onClick={disabled ? () => {} : (e) => setActive(!isActive)}
        className="dropdown-btn"
      >
        <input
          type="text"
          className="lineChart-countryList-drop-input"
          placeholder="Search Country"
          value={selected}
          onChange={(e) => {
            handleChangeDrop(e);
          }}
        />

        {!isActive ? (
          <FontAwesomeIcon icon={faAngleDown} />
        ) : (
          <FontAwesomeIcon icon={faAngleUp} />
        )}
      </div>

      {isActive && (
        <>
          <div className="dropdown-country-wrapper">
            <div className="dropdown-content-countryData">
              {options &&
                options.map((option, index) => {
                  if (options && options.length === index + 1) {
                    return (
                      <div
                        ref={lastUserRef}
                        onClick={
                          disabled
                            ? () => {}
                            : (e) => {
                                dispatch({
                                  type: SET_FILTERS,
                                  payload: {
                                    field: "countryValue",
                                    value: "",
                                  },
                                });
                                setSelected(option);
                                handleChange(option);
                                setActive(false);
                              }
                        }
                        className="dropdown-item-countryData"
                      >
                        {option}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        onClick={
                          disabled
                            ? () => {}
                            : (e) => {
                                dispatch({
                                  type: SET_FILTERS,
                                  payload: {
                                    field: "countryValue",
                                    value: "",
                                  },
                                });
                                setSelected(option);
                                handleChange(option);
                                setActive(false);
                              }
                        }
                        className="dropdown-item-countryData"
                      >
                        {option}
                      </div>
                    );
                  }
                })}

              {loading && (
                <BeatLoader color="#FEC84B" loading={true} size={10} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Button;
