import React, { useContext, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/dist/svg-arrow.css";
import ReactTooltip from "react-tooltip";
import { scaleLinear } from "d3-scale";
import { FilterContext } from "../../../context/FilterContext";
import "./MapChart.scss";

const geoUrl =
  "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

const colorScale = scaleLinear().domain([0, 220]).range(["#B22222", "#FF7F50"]);

const Map = ({ mapDataApi, influencerdata, hideRank }) => {
  const { state } = useContext(FilterContext);
  const { influencerValue, hashtagValue, countryValue } = state.filters;
  const [tootilp, setTooltip] = useState("");
  const [mapMarkerTootilp, setMapMarkerTooltip] = useState("");

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
      <ReactTooltip className="react-tool-tip">{tootilp}</ReactTooltip>
      <ReactTooltip className="react-tool-tip">{mapMarkerTootilp}</ReactTooltip>

      <div
        data-tip=""
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <ComposableMap>
          <ZoomableGroup zoom={1.2}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const isos =
                    mapDataApi && mapDataApi.find((s) => s.ISO3 === geo.id);

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      strokeWidth="0.2px"
                      stroke="#282828"
                      fill={
                        isos
                          ? colorScale(isos.rank) ||
                            colorScale(
                              !influencerValue &&
                                !hashtagValue &&
                                !countryValue &&
                                !influencerdata
                            )
                          : "#FFA07A"
                      }
                      onMouseEnter={() => {
                        setTooltip(
                          <>
                            <div className="country-name-heading">
                              {isos._id}
                            </div>
                            <pre></pre>

                            {!influencerValue &&
                              !hashtagValue &&
                              !countryValue &&
                              !hideRank &&
                              isos.rank && (
                                <div className="map-tooltip-title">
                                  Rank:{" "}
                                  <span
                                    style={{
                                      fontWeight: 600,
                                      color: "#FDB022",
                                    }}
                                  >
                                    {parseFloat(isos.rank, 2)}
                                  </span>
                                </div>
                              )}

                            <pre></pre>
                            <div className="map-tooltip-title">
                              Wellbeing Interest :{" "}
                              <span
                                style={{ fontWeight: 600, color: "#FDB022" }}
                              >
                                {nFormatter(isos.count)}
                              </span>
                            </div>
                            <pre></pre>
                            <div className="map-tooltip-title">
                              Positive:{" "}
                              <span
                                style={{ fontWeight: 600, color: "#FDB022" }}
                              >
                                {parseFloat(
                                  isos.happy % 1 !== 0
                                    ? isos.happy.toFixed(2)
                                    : isos.happy
                                )}
                                %
                              </span>
                            </div>
                            <pre></pre>
                            <div className="map-tooltip-title">
                              Negative:{" "}
                              <span
                                style={{ fontWeight: 600, color: "#FDB022" }}
                              >
                                {parseFloat(
                                  isos.sad_per % 1 !== 0
                                    ? isos.sad_per.toFixed(2)
                                    : isos.sad_per
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
                                <div className="map-tooltip-title">
                                  Net Change in Rank:{" "}
                                  <span
                                    style={{
                                      fontWeight: 600,
                                      color: "#FDB022",
                                    }}
                                  >
                                    {parseFloat(isos.change_in_rank, 2)}
                                  </span>
                                </div>
                              )}
                            <pre></pre>
                            <div className="map-tooltip-title">
                              Change in Wellbeing Interest:{" "}
                              <span
                                style={{ fontWeight: 600, color: "#FDB022" }}
                              >
                                {ParseFloat(isos.change_in_index_persentage, 2)}
                                %
                              </span>
                            </div>
                            <pre></pre>
                          </>
                        );
                      }}
                      onMouseLeave={() => {
                        setTooltip("");
                      }}
                      style={{
                        default: {
                          // fill: "#D6D6DA",
                          outline: "none",
                        },
                        hover: {
                          fill: "#FDB022",
                          outline: "none",
                        },
                        pressed: {
                          fill: "#E42",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
            {countryValue && (
              <>
                {mapDataApi &&
                  mapDataApi.length &&
                  mapDataApi.map(
                    ({
                      name,
                      cordinates,
                      rank,
                      count,
                      happy,
                      sad_per,
                      change_in_rank,
                      change_in_index_persentage,
                    }) => (
                      <Marker
                        onMouseEnter={() => {
                          setMapMarkerTooltip(
                            <>
                              <div className="country-name-heading">{name}</div>
                              <pre></pre>
                              {!influencerValue &&
                                !hashtagValue &&
                                !countryValue &&
                                !hideRank &&
                                rank && (
                                  <div className="map-tooltip-title">
                                    Rank:{" "}
                                    <span
                                      style={{
                                        fontWeight: 600,
                                        color: "#FDB022",
                                      }}
                                    >
                                      {parseFloat(rank, 2)}
                                    </span>
                                  </div>
                                )}
                              <pre></pre>
                              <div className="map-tooltip-title">
                                Wellbeing Interest :{" "}
                                <span
                                  style={{ fontWeight: 600, color: "#FDB022" }}
                                >
                                  {nFormatter(count)}
                                </span>
                              </div>
                              <pre></pre>
                              <div className="map-tooltip-title">
                                Positive:{" "}
                                <span
                                  style={{ fontWeight: 600, color: "#FDB022" }}
                                >
                                  {parseFloat(
                                    happy % 1 !== 0 ? happy.toFixed(2) : happy
                                  )}
                                </span>
                              </div>
                              <pre></pre>
                              <div className="map-tooltip-title">
                                Negative:{" "}
                                <span
                                  style={{ fontWeight: 600, color: "#FDB022" }}
                                >
                                  {parseFloat(
                                    sad_per % 1 !== 0
                                      ? sad_per.toFixed(2)
                                      : sad_per
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
                                  <div className="map-tooltip-title">
                                    Net Change in Rank:{" "}
                                    <span
                                      style={{
                                        fontWeight: 600,
                                        color: "#FDB022",
                                      }}
                                    >
                                      {parseFloat(change_in_rank, 2)}
                                    </span>
                                  </div>
                                )}
                              <pre></pre>
                              <div className="map-tooltip-title">
                                Change in Wellbeing Index:{" "}
                                <span
                                  style={{ fontWeight: 600, color: "#FDB022" }}
                                >
                                  {ParseFloat(change_in_index_persentage, 2)}%
                                </span>
                              </div>
                              <pre></pre>
                            </>
                          );
                        }}
                        onMouseLeave={() => {
                          setMapMarkerTooltip("");
                        }}
                        key={name}
                        coordinates={
                          cordinates && cordinates.length ? cordinates : []
                        }
                      >
                        <circle
                          r={6}
                          fill="#FDB022"
                          stroke="#fff"
                          strokeWidth={1}
                        />
                      </Marker>
                    )
                  )}
              </>
            )}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </>
  );
};

export default Map;
