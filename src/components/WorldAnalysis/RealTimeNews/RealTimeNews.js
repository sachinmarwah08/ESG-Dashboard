import React, { useState } from "react";
import FilterButton from "../../Buttons/FilterButton/FilterButton";
import RadioButton from "../../Buttons/RadioButton/RadioButton";
import SearchBar from "../../SearchBar/SearchBar";
import "./RealTimeNews.scss";

const data = [
  {
    id: 1,
    date: "1 Day Ago",
    author: "fticonsulting.com",
    name: "ESG in India: It’s Time to Take Notice",
    headline:
      "Commitment to change and sustainability is imperative for any organisation to evolve into a future-proof business...",
  },
  {
    id: 1,
    date: "1 Day Ago",
    author: "prnewswire.com",
    name: "Fosun International Garners Two Major ESG Reporting Accolades in Hong Kong",
    headline:
      "On the evening of 19 October, HKMA held an award ceremony for the Best Annual Reports Awards 2022 in Hong Kong and Fosun International was granted the Excellence Award in Environmental, Social and Governance Reporting...",
  },
  {
    id: 1,
    date: "1 Day Ago",
    author: "prnewswire.com",
    name: "Taranis Releases First Environmental, Social, and Governance (ESG) Report",
    headline:
      "The report highlights commitments to drive sustainable, equitable, and prosperous impacts for Taranis' customers, employees, and stakeholders.",
  },
  {
    id: 1,
    date: "1 Day Ago",
    author: "businesswire.com",
    name: "E2open Releases Annual Environmental, Social, and Governance Report",
    headline:
      "Report outlines approach to corporate purpose and sustainability, and the value it provides to clients’ ESG goals...",
  },
  {
    id: 1,
    date: "1 Day Ago",
    author: "economictimes.indiatimes.com",
    name: "ESG Investing: Why investors need to add a flavour of sustainability in their portfolios",
    headline: "The ESG regulation race is on",
  },
  {
    id: 1,
    date: "1 Day Ago",
    author: "fticonsulting.com",
    name: "ESG in India: It’s Time to Take Notice",
    headline:
      "Commitment to change and sustainability is imperative for any organisation to evolve into a future-proof business...",
  },
  {
    id: 1,
    date: "1 Day Ago",
    author: "prnewswire.com",
    name: "Fosun International Garners Two Major ESG Reporting Accolades in Hong Kong",
    headline:
      "On the evening of 19 October, HKMA held an award ceremony for the Best Annual Reports Awards 2022 in Hong Kong and Fosun International was granted the Excellence Award in Environmental, Social and Governance Reporting...",
  },
  {
    id: 1,
    date: "1 Day Ago",
    author: "prnewswire.com",
    name: "Taranis Releases First Environmental, Social, and Governance (ESG) Report",
    headline:
      "The report highlights commitments to drive sustainable, equitable, and prosperous impacts for Taranis' customers, employees, and stakeholders.",
  },
  {
    id: 1,
    date: "1 Day Ago",
    author: "businesswire.com",
    name: "E2open Releases Annual Environmental, Social, and Governance Report",
    headline:
      "Report outlines approach to corporate purpose and sustainability, and the value it provides to clients’ ESG goals...",
  },
  {
    id: 1,
    date: "1 Day Ago",
    author: "economictimes.indiatimes.com",
    name: "ESG Investing: Why investors need to add a flavour of sustainability in their portfolios",
    headline: "The ESG regulation race is on",
  },
];

const RealTimeNews = () => {
  const globeFilterDrodownList = ["Country", "Influencer", "Hashtag"];
  const [globeFilter, setGlobeFilter] = useState("Filters");
  return (
    <>
      <div className="second-content-wrapper">
        <div className="radio-btn-wrapper-analysis">
          <>
            <RadioButton name="All" />
            <RadioButton name="Positive" />
            <RadioButton name="Negative" />
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

      <div className="left-content-wrapper-news">
        {data.map((item) => (
          <div key={item.id} className="left-content-News">
            <div className="news-date-title">
              <p className="date-ago">{item.date}</p>
              <p className="news-title-content">{item.author}</p>
            </div>

            <a
              // href={item.url}
              rel="noreferrer"
              target="_blank"
              className="left-content-heading-news"
            >
              {/* {item.news_source} */}
              {item.name}
            </a>
            <p className="hashtags-news">
              {/* {item.headline} */}

              {item.headline}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default RealTimeNews;
