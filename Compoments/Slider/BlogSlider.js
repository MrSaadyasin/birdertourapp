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
import BlogCard from "./BlogCard";

const BlogSlider = ({ blogs }) => {
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


  return (
    <>
      <div className="styling-example  py-0 pb-lg-4 mb-2">
        {blogs?.length > 3 ? (
          <Carousel breakPoints={breakPoint}>
            {blogs?.map((item, index) => {
              return (
                <BlogCard key={index} blog={item} />
              );
            })}
          </Carousel>
        ) : (
          <>
            {isMobileDevice ? (
              <Carousel breakPoints={breakPoint}>
                {blogs?.map((item, index) => {
                  return (
                    <BlogCard
                     
                      key={index}
                      blog={item}
                    />
                  );
                })}
              </Carousel>
            ) : (
              <div className="d-lg-flex">
                {blogs?.map((item, index) => {
                  return (
                    <div className="me-3 w-33 mb-3" key={index}>
                      <BlogCard blog={item} />
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

export default connect(mapStoreProps)(BlogSlider);
