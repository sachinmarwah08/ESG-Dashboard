import React, { useState } from "react";
import "./GeneralIndex.scss";
import IndexNewsAndSocialMedia from "./IndexNewsAndSocialMedia/IndexNewsAndSocialMedia";
import IndexNewsFeeds from "./IndexNewsFeeds/IndexNewsFeeds";
import IndexSocialMediaFeeds from "./IndexSocialMediaFeeds/IndexSocialMediaFeeds";

const GeneralIndex = () => {
  const [active, setActive] = useState("index-news-and-social-media");
  return (
    <div className="general-analysis-container-wrapper">
      <div className="container-content">
        <div className="heading-wrapper">
          <div className="container-headings">
            <div
              onClick={() => setActive("index-news-feeds")}
              className={
                active === "index-news-feeds"
                  ? "real-time-news-colored"
                  : "real-time-news"
              }
            >
              Index on News feeds
            </div>
            <div
              onClick={() => setActive("index-social-media-feeds")}
              className={
                active === "index-social-media-feeds"
                  ? "real-time-tweets-colored"
                  : "real-time-tweets"
              }
            >
              Index on Social Media feeds
            </div>
            <div
              onClick={() => setActive("index-news-and-social-media")}
              className={
                active === "index-news-and-social-media"
                  ? "top-influencers-colored"
                  : "top-influencers"
              }
            >
              Indexes on News & Social Media
            </div>
          </div>
        </div>
        <div className="border-bottom"></div>

        <div className="table-wrapper-analysis">
          {active === "index-news-feeds" && <IndexNewsFeeds />}
          {active === "index-social-media-feeds" && <IndexSocialMediaFeeds />}
          {active === "index-news-and-social-media" && (
            <IndexNewsAndSocialMedia />
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralIndex;
