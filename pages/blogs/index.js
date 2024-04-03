import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { allBlogs, allTours } from "../../constants/endpoint.constants";
import PageLayout from "../../Compoments/Layout/PageLayout";
import CustomCard from "../../Compoments/Slider/Card";

import style from "../../Compoments/Slider/Slider.module.css";
import { Col, Row } from "react-bootstrap";
import NoTours from "../../assets/images/noTours.svg";
import { useMediaQuery } from "usehooks-ts";
import Image from "next/image";
import BlogCard from "../../Compoments/Slider/BlogCard";
import {BlogData} from "../../extras/constants";
import { useTranslation } from "react-i18next";


function Blogs(props) {
  const { t } = useTranslation();
  const {blogs} = props
  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (
        document.body.scrollTop > 120 ||
        document.documentElement.scrollTop > 120
      ) {
        document.getElementById("myTopnav").style.backgroundColor = "#000";
        document.getElementById("myTopnav1").style.backgroundColor = "#000";
        document.getElementById("myTopnav").style.paddingTop = "10px";
        document.getElementById("myTopnav").style.paddingBottom = "10px";
        document.getElementById("myTopnav").style.paddingBottom = "10px";
        document.getElementById("myTopnav").style.transition = ".1s";
      } else {
        document.getElementById("myTopnav").style.backgroundColor = "#000";
        document.getElementById("myTopnav1").style.backgroundColor = "#000";
      }
    });
  }, []);

  const [Blogs, setBlogs] = useState(blogs);
  const isMobileDevice = useMediaQuery("(max-width:1121px)");
  // useEffect(()=>{
  //   setBlogs(blogs)

  // },[])
  return (
      <>
        <PageLayout color="#1b847a" footer={true}>
          <section className={`container my-5 ${style.sectionDiscover}`}>
            <div className="padding120 px-0 pb-0">
              <h2 className="discover__bird mb-4">
                {t("Articles for Bird Lovers")}
              </h2>
            </div>

          <Row className="mt-5">
            {Blogs && Blogs?.length > 0 ? (
              <>
                {" "}
                {Blogs?.map((item, index) => (
                  <Col lg={3} key={index} className="mb-4">
                    <BlogCard blog={item} />
                  </Col>
                  
                ))}
              </>
            ) : (
              <>
                <div className="d-flex align-items-center justify-content-center my-lg-5 py-5">
                  <div className="text-center">
                    <Image
                      src={NoTours}
                      className="img-fluid mb-4"
                      alt="no tours found."
                    />
                    <h2>
                      <strong>Content Not Available at the Moment!</strong>
                    </h2>
                  </div>
                </div>
              </>
            )}
          </Row>
        </section>
      </PageLayout>
    </>
  );
}

const mapStoreProps = (state) => {
  return state;
};

export default connect(mapStoreProps)(Blogs);

export async function getServerSideProps(context) {
  try {
    const getAllBlogs = await axios.get(allBlogs);
    return {
      props: {
        blogs: getAllBlogs.data || [],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        blogs: [],
      },
    };
  }
}
