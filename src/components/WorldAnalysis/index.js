import React, { useState } from "react";
import RealTimeNews from "./RealTimeNews/RealTimeNews";
import RealTimeTweets from "./RealTimeTweets/RealTimeTweets";
import TopInfluencers from "./TopInfluencers/TopInfluencers";
import "./index.scss";

const WorldAnalysis = () => {
  const [active, setActive] = useState("real-time-news");

  return (
    <div className="analysis-container-wrapper">
      <div className="container-content">
        <div className="heading-wrapper">
          <div className="container-headings">
            <div
              onClick={() => setActive("real-time-news")}
              className={
                active === "real-time-news"
                  ? "real-time-news-colored"
                  : "real-time-news"
              }
            >
              Real-time News
            </div>
            <div
              onClick={() => setActive("real-time-tweets")}
              className={
                active === "real-time-tweets"
                  ? "real-time-tweets-colored"
                  : "real-time-tweets"
              }
            >
              Real-time Tweets
            </div>
            <div
              onClick={() => setActive("top-influencers")}
              className={
                active === "top-influencers"
                  ? "top-influencers-colored"
                  : "top-influencers"
              }
            >
              Influencer Analysis
            </div>
          </div>
        </div>
        <div className="border-bottom"></div>

        <div className="table-wrapper-analysis">
          {active === "real-time-news" && <RealTimeNews />}
          {active === "real-time-tweets" && <RealTimeTweets />}
          {active === "top-influencers" && <TopInfluencers />}
        </div>
      </div>
    </div>
  );
};

export default WorldAnalysis;
