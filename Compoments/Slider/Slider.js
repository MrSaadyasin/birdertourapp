import React from "react";
import style from "./Slider.module.css";
import CustomCard from "./Card";
import { Row } from "react-bootstrap";
import Carousel from "react-elastic-carousel";
import Link from "next/link";
import { consts } from "react-elastic-carousel";
import { connect } from "react-redux";
import { addTourWishList } from "../../Redux/auth/action";
import { toast } from "react-toastify";
import { Toaster } from "../../extras/constants";
import { useMediaQuery } from "usehooks-ts";

const Slider = ({ tour, userAuthReducer, dispatch }) => {
  const isMobileDevice = useMediaQuery("(max-width:991px)");
 
  const breakPoint = [
    {
      width: 1,
      itemsToShow: 1.15,
      itemsToScroll: 1,
    },
    {
      width: 550,
      itemsToShow: 2,
      itemsToScroll: 1,
    },
    {
      width: 750,
      itemsToShow: 3,
      itemsToScroll: 1,
    },
    {
      width: 1150,
      itemsToShow: 4,
      itemsToScroll: 1,
    },
  ];

  const handleLike = async (event, id) => {
    event.preventDefault();
    try {
      const data = {
        tour_id: id,
      };
      if (userAuthReducer?.access_token) {
        const addWishList = await dispatch(
          addTourWishList(data, userAuthReducer?.access_token)
        );
        toast.success(addWishList.payload.data?.message, Toaster);
      } else {
        toast.error("You are not logged in.", Toaster);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="styling-example mt-4 pb-0 pt-3 pb-lg-0">
        {tour?.length > 3 ? (
          <Carousel breakPoints={breakPoint}>
            {tour?.map((item, index) => {
              return (
                <CustomCard handleLike={handleLike} key={index} tour={item} />
              );
            })}
          </Carousel>
        ) : (
          <>
            {isMobileDevice ? (
              <Carousel breakPoints={breakPoint}>
                {tour?.map((item, index) => {
                  return (
                    <CustomCard
                      handleLike={handleLike}
                      key={index}
                      tour={item}
                    />
                  );
                })}
              </Carousel>
            ) : (
              <div className="d-lg-flex">
                {tour?.map((item, index) => {
                  return (
                    <div className="me-3 w-33 mb-3" key={index}>
                      <CustomCard handleLike={handleLike} tour={item} />
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

const mapStoreProps = (state) => {
  return state;
};

export default connect(mapStoreProps)(Slider);
