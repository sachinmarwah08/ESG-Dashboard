import React, { memo, useContext, useState } from "react";
import ReactGlobe from "react-globe";
import { FilterContext } from "../../../context/FilterContext";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Globe.scss";
import { FadeLoader } from "react-spinners";

const Globe = ({ mapDataApi, influencerdata, hideRank, loading }) => {
  const { state } = useContext(FilterContext);
  const { influencerValue, hashtagValue, countryValue } = state.filters;
  const [tooltipData, setTooltipData] = useState(false);
  const [data, setData] = useState("");
  const [globe, setGlobe] = useState(null);

  const options = {
    cameraRotateSpeed: 0.1,
    focusAnimationDuration: 2000,
    globeGlowColor: "#191961",
    markerTooltipRenderer: (marker) => marker && `${marker.city}`,
  };

  function ParseFloat(str, val) {
    str = str.toString();
    str = str.slice(0, str.indexOf(".") + val + 1);
    return Number(str);
  }

  function nFormatter(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num;
  }

  return (
    <>
      <div className="globe-loader">
        {loading ? (
          <FadeLoader color="#FEC84B" loading={loading} size={50} />
        ) : (
          <div style={{ width: "100%", height: "100%" }}>
            {mapDataApi && mapDataApi.length && (
              <ReactGlobe
                height="524px"
                // onDefocus={onDefocus}
                globeBackgroundTexture={null}
                markers={mapDataApi}
                options={options}
                globeTexture="https://unpkg.com/three-globe@2.18.5/example/img/earth-blue-marble.jpg"
                width="100%"
                onClickMarker={(marker, markerObject, event) => {
                  setData(
                    <>
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "20px",
                            color: "#ffffff",
                          }}
                        >
                          {marker.city}
                        </div>
                        <button
                          onClick={() => setTooltipData(false)}
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                        >
                          <FontAwesomeIcon
                            className="fa-globe-tooltip-closeIcon"
                            icon={faXmark}
                          />
                        </button>
                      </div>
                      <pre></pre>
                      {!influencerValue &&
                        !hashtagValue &&
                        !countryValue &&
                        !hideRank &&
                        marker.rank && (
                          <div
                            style={{
                              fontWeight: 400,
                              fontSize: "14px",
                              fontFamily: "Sora",
                              color: "#ffffff",
                            }}
                          >
                            Rank:{" "}
                            <span
                              style={{
                                fontWeight: 600,
                                color: "#FDB022",
                              }}
                            >
                              {parseFloat(marker.rank, 2)}
                            </span>
                          </div>
                        )}
                      <pre></pre>
                      <div
                        style={{
                          fontWeight: 400,
                          fontSize: "14px",
                          fontFamily: "Sora",
                          color: "#ffffff",
                          marginTop: "-0.5rem",
                        }}
                      >
                        Wellbeing Interest :{" "}
                        <span style={{ fontWeight: 600, color: "#FDB022" }}>
                          {nFormatter(marker.count)}
                        </span>
                      </div>
                      <pre></pre>
                      <div
                        style={{
                          fontWeight: 400,
                          fontSize: "14px",
                          fontFamily: "Sora",
                          color: "#ffffff",
                          marginTop: "-0.5rem",
                        }}
                      >
                        Positive:{" "}
                        <span style={{ fontWeight: 600, color: "#FDB022" }}>
                          {parseFloat(
                            marker.happy % 1 !== 0
                              ? marker.happy.toFixed(2)
                              : marker.happy
                          )}
                          %
                        </span>
                      </div>
                      <pre></pre>
                      <div
                        style={{
                          fontWeight: 400,
                          fontSize: "14px",
                          fontFamily: "Sora",
                          color: "#ffffff",
                          marginTop: "-0.5rem",
                        }}
                      >
                        Negative:{" "}
                        <span style={{ fontWeight: 600, color: "#FDB022" }}>
                          {parseFloat(
                            marker.sad_per % 1 !== 0
                              ? marker.sad_per.toFixed(2)
                              : marker.sad_per
                          )}
                          %
                        </span>
                      </div>
                      <pre></pre>
                      {!influencerValue &&
                        !hashtagValue &&
                        !countryValue &&
                        !influencerdata &&
                        !hideRank && (
                          <div
                            style={{
                              fontWeight: 400,
                              fontSize: "14px",
                              fontFamily: "Sora",
                              color: "#ffffff",
                              marginTop: "-0.5rem",
                            }}
                          >
                            Net Change in Rank:{" "}
                            <span
                              style={{
                                fontWeight: 600,
                                color: "#FDB022",
                              }}
                            >
                              {parseFloat(marker.change_in_rank, 2)}
                            </span>
                          </div>
                        )}
                      <pre></pre>
                      <div
                        style={{
                          fontWeight: 400,
                          fontSize: "14px",
                          fontFamily: "Sora",
                          color: "#ffffff",
                          marginTop: "-0.5rem",
                        }}
                      >
                        Change in Wellbeing Interest:{" "}
                        <span style={{ fontWeight: 600, color: "#FDB022" }}>
                          {ParseFloat(marker.change_in_index_persentage, 2)}%
                        </span>
                      </div>
                    </>
                  );
                  setTooltipData(true);
                }}
                onGetGlobe={setGlobe}
                onMouseOutMarker={(marker, markerObject, event) =>
                  console.log(marker, markerObject, event)
                }
                onGlobeTextureLoaded={() => console.log("globe loaded")}
                onMouseOverMarker={(marker, markerObject, event) => (
                  <div style={{ background: "white" }}>{marker.city}</div>
                )}
              />
            )}

            {tooltipData && (
              <div className="tooltip-container">
                <div>{data}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default memo(Globe);
