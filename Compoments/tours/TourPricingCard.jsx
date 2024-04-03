import React from "react";
import style from "../../pages/tourDetails/TourDetail.module.css";
export const TourPricingCard = ({ tourDetails, currentPlan, cardDetail }) => {
  return (
    <div className={style.priceSection}>
      <div
        className={
          currentPlan === cardDetail
            ? [`${style.priceContainer} ${style.activeBorder}`]
            : style.priceContainer
        }
      >
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className={style.plan}>
            {cardDetail === "multi_day"
              ? "Multi-Dates"
              : cardDetail === "full_day"
              ? "Full-Day"
              : "Half-Day"}
          </div>
          <div className={style.price} style={{ color: "var(--primary)" }}>
            ${JSON.parse(tourDetails?.tours?.pricing.full_day)?.price}
            <sup style={{ fontSize: "10px" }}>Per Day</sup>
          </div>
        </div>
        <div className={style.person}>
          {cardDetail == "multi_day" || cardDetail == "full_day"  ?  JSON.parse(tourDetails?.tours?.pricing.full_day)?.person:
           JSON.parse(tourDetails?.tours?.pricing.half_day)?.person
          } Persons
        </div>
        <div>
          <strong className={style.extra}>
            Extra person will be charged $
            {cardDetail === "full_day" || cardDetail === "multi_day"
              ? JSON.parse(tourDetails?.tours?.pricing.full_day)?.extra
              : JSON.parse(tourDetails?.tours?.pricing.half_day)?.extra}
          </strong>
        </div>
        <div className="mt-lg-5 mt-3">
          <button
            className={
              currentPlan == cardDetail
                ? "btn btnPrimary"
                : style.btn__secondary
            }
          >
            {currentPlan == "multi_day" ? "Current Plan" : "Choose Plan"}
          </button>
        </div>
      </div>
    </div>
  );
};
