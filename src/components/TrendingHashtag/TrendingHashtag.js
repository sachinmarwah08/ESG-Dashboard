import React, { useState } from "react";
import FilterButton from "../Buttons/FilterButton/FilterButton";
import SearchBar from "../SearchBar/SearchBar";
import "react-tree-graph/dist/style.css";
import "./TrendingHashtag.scss";
import { Tree } from "react-tree-graph";

const data = [
  {
    id: "",
    hashtag: "#sdgs",
  },
  {
    id: "",
    hashtag: "#investing",
  },
  {
    id: "",
    hashtag: "#corpgov",
  },
  {
    id: "",
    hashtag: "#sustainablefinance",
  },
  {
    id: "",
    hashtag: "#innovation",
  },
  {
    id: "",
    hashtag: "#governance",
  },
  {
    id: "",
    hashtag: "#esginvesting",
  },
  {
    id: "",
    hashtag: "#impactinvesting",
  },
  {
    id: "",
    hashtag: "#sustainableinsurance",
  },
  {
    id: "",
    hashtag: "#responsibleinvesting",
  },
  {
    id: "",
    hashtag: "#greenenergy",
  },
  {
    id: "",
    hashtag: "#smartbanking",
  },
  {
    id: "",
    hashtag: "#opportunitydesk",
  },
  {
    id: "",
    hashtag: "#impact",
  },
  {
    id: "",
    hashtag: "#ethicalinvesting",
  },
  {
    id: "",
    hashtag: "#corporatesustainability",
  },
  {
    id: "",
    hashtag: "#esgfinance",
  },
  {
    id: "",
    hashtag: "#investment",
  },
  {
    id: "",
    hashtag: "#prayforistanbul",
  },
  {
    id: "",
    hashtag: "#sustainability",
  },
];

const treeData = [
  {
    name: "1920",
    gProps: {
      className: "blue-node",
      onClick: function noRefCheck() {},
    },

    textProps: { x: 58, y: 0, className: "blue" },
    children: [
      {
        // name: "prayforistanbul#",
        pathProps: { className: "blue" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "blue" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "blue" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "blue" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "blue" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "blue" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "blue" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "blue" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "blue" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "blue" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
    ],
  },
  {
    name: "1080",
    gProps: {
      className: "red-node",
      onClick: function noRefCheck() {},
    },
    textProps: { x: 58, y: 0, className: "red" },
    children: [
      {
        // name: "prayforistanbul#",
        pathProps: { className: "red" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "red" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },

      {
        // name: "prayforistanbul#",
        pathProps: { className: "red" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "red" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "red" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "red" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "red" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },

      {
        // name: "prayforistanbul#",
        pathProps: { className: "red" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "red" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "red" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
    ],
  },
  {
    name: "5122",
    gProps: {
      className: "light-node",
      onClick: function noRefCheck() {},
    },
    textProps: { x: 58, y: 0, className: "light" },
    children: [
      {
        // name: "prayforistanbul#",
        pathProps: { className: "light" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "light" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },

      {
        // name: "prayforistanbul#",
        pathProps: { className: "light" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "light" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "light" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "light" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "light" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },

      {
        // name: "prayforistanbul#",
        pathProps: { className: "light" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "light" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "light" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
    ],
  },
  {
    name: "1966",
    gProps: {
      className: "orrange-node",
      onClick: function noRefCheck() {},
    },
    textProps: { x: 58, y: 0, className: "orrange" },
    children: [
      {
        // name: "prayforistanbul#",
        pathProps: { className: "orrange" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },

      {
        // name: "prayforistanbul#",
        pathProps: { className: "orrange" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "orrange" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "orrange" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "orrange" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "orrange" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },

      {
        // name: "prayforistanbul#",
        pathProps: { className: "orrange" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "orrange" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "orrange" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
      {
        // name: "prayforistanbul#",
        pathProps: { className: "orrange" },
        textProps: { x: -15, y: 0, className: "grey" },
        children: [],
      },
    ],
  },
];

const TrendingHashtag = () => {
  const globeFilterDrodownList = ["Country", "Influencer", "Hashtag"];
  const [globeFilter, setGlobeFilter] = useState("Filters");
  return (
    <div className="trending-hashtag-wrapper">
      <div className="trending-hashtag-container">
        <div className="trending-hashtag-header">
          <div className="trending-hashtag-header-left">
            <h1 className="trending-hashtag-heading">Trending Hashtags</h1>
            <p className="trending-hashtag-title">
              Top 20 Hashtags related and Associations
            </p>
          </div>
          <div className="trending-hashtag-header-right">
            <SearchBar />
            <FilterButton
              data={globeFilter}
              setData={setGlobeFilter}
              dropdownList={globeFilterDrodownList}
            />
          </div>
        </div>
        <div className="trending-hashtag-btn-wrapper">
          <button className="global-regions-btn">ESG</button>
          <button className="global-regions-btn">Environmental</button>
          <button className="global-regions-btn">Social</button>
          <button className="global-regions-btn">Governance</button>
        </div>
        <div className="treding-hashtag-content-wrapper">
          <div className="trending-hashtag-content">
            <div className="trending-hashtag-content-left">
              {data.map((item) => (
                <div className="top-hashtags-wrapper">
                  <p className="top-hastag-container">{item.hashtag}</p>
                </div>
              ))}
            </div>
            <div className="trending-hashtag-content-right">
              <div className="tree-graph">
                {treeData.map((item) => (
                  <Tree
                    svgProps={{
                      className: "custom",
                    }}
                    animated={true}
                    data={item}
                    nodeRadius={15}
                    margins={{ top: 100, bottom: 80, left: -10, right: 80 }}
                    height={440}
                    direction="rtl"
                    width={1090}
                  />
                ))}
              </div>

              <p className="top-four-hashtag-one">#esg</p>
              <p className="top-four-hashtag-two">#sustainability</p>
              <p className="top-four-hashtag-three">#csr</p>
              <p className="top-four-hashtag-four">#investment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingHashtag;
