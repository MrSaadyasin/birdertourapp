import { Col, Container, Row } from "react-bootstrap";
import style from "./Blogs.module.css";
import style1 from "../../../Compoments/Slider/Slider.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import PageLayout from "../../../Compoments/Layout/PageLayout";
import {
  allBlogs,
  allCategories,
  allTours,
  allVendors,
  blogDetail,
} from "../../../constants/endpoint.constants";
import axios from "axios";
import Head from "next/head";
import ReactHtmlParser from "react-html-parser";
import AdminAvatar from "../../../assets/images/adminAvatar.png";
import moment from "moment";
import TextInput from "../../../Compoments/TextInput";
import { useForm } from "react-hook-form";
import TextareaInput from "../../../Compoments/TextareaInput";
import RecentBlog from "../../../Compoments/blog/RecentBlog";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";
const BlogsDetail = (props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const blog = props.blog[0];
  const [blogImg, setBlogImg] = useState("");

  const sanitizedMetaTitle = blog?.yoast_head_json?.og_title
    ? blog.yoast_head_json?.og_title.replace(/<!--[\s\S]*?-->/g, "")
    : "";
  const pageTitle = sanitizedMetaTitle
    ? `${sanitizedMetaTitle} - EarthBirder`
    : `${blog?.title.rendered} - EarthBirder`;
  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (
        document.body.scrollTop > 60 ||
        document.documentElement.scrollTop > 60
      ) {
        document.getElementById("myTopnav").style.backgroundColor = "#000";
        document.getElementById("myTopnav1").style.backgroundColor = "#000";
        document.getElementById("myTopnav").style.paddingTop = "10px";
        document.getElementById("myTopnav").style.paddingBottom = "10px";
        document.getElementById("myTopnav").style.paddingBottom = "10px";
        document.getElementById("myTopnav").style.transition = ".1s";
      } else {
        document.getElementById("myTopnav").style.backgroundColor = "";
        document.getElementById("myTopnav1").style.backgroundColor = "";
      }
    });
  }, []);
  useEffect(() => {
    const blogImgFun = async () => {
      try {
        const data = await fetch(blog._links["wp:featuredmedia"][0].href);
        const imgUrl = await data.json();
        setBlogImg(imgUrl.source_url);
      } catch (error) {
        console.log(error);
      }
    };
    blogImgFun();
  }, []);
  const SendEmail = async (value) => {
    console.log(value);
    // delete  value.password;
    // setLoading({
    //   ...loading,
    //   forget: true
    // });
    // const getForgetPassword  = await props?.dispatch(authForgetPassword(value));
    // if(getForgetPassword.payload?.status === 200){
    //   toast.success(getForgetPassword.payload?.data?.message, Toaster);
    //   setLoading({
    //     ...loading,
    //     forget: false
    //   });
    //   handleCloseForgot()
    //   return ;
    // }else{
    //   setLoading({
    //     ...loading,
    //     forget: false
    //   });
    //   if (getForgetPassword.payload?.response?.data?.message) return  toast.error(getForgetPassword.payload?.response?.data?.message, Toaster);
    //   return toast.error(getForgetPassword.payload.message);
    // }
  };
  const isMobileDevice = useMediaQuery("(max-width:991px)");
  return (
    <>
      <PageLayout color="#1b847a" footer={true}>
        <Head>
          <title>{pageTitle}</title>
          {blog?.yoast_head_json?.og_description && (
            <meta
              name="description"
              content={blog?.yoast_head_json?.og_description}
            />
          )}
          {blog?.keywords?.length > 0 && (
            <meta name="keywords" content={blog?.keywords.join(", ")} />
          )}
        </Head>
        <section
          className={style.TermCondition}
          style={{
            marginTop: "62px",
            marginBottom: 80,
            backgroundColor: "#0000000a",
          }}
        >
          <Container className="my-lg-5 my-0 pb-5 py-lg-5 px-4 px-lg-3">
            <div
              class={"position-relative"}
              style={{
                width: "100%",
                overflow: "hidden",
                objectFit: "cover",
              }}
            >
              <Image
                src={blogImg}
                width={1000}
                height={600}
                className={`${style1.bgImageSlug} w-100`}
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="text-center">
              <div className="col-md-8 mx-auto">
                <h1>{blog.title.rendered}</h1>
              </div>
              <div className="col-lg-6 mx-auto">
                <h3 style={{ lineHeight: "1.54" }} class={"mt-4 line4"}>
                  {ReactHtmlParser(blog?.content.rendered)}
                </h3>
                <p className={"mt-4 mb-2"}>admin</p>
                <p className="mb-2">
                  {moment(blog?.date).format("MMMM Do YYYY")}
                </p>
                {/* <p className="mb-2">location</p> */}
              </div>
            </div>
          </Container>
        </section>

        <section className="my-lg-5 my-4 py-3">
          <Container>
            <Row>
              <Col lg="9" className="pe-lg-5">
                <p>{ReactHtmlParser(blog?.content.rendered)}</p>

                <div className="mt-5 pt-3">
                  <h2 className={`border-0 ${style.sideTitle}`}>
                    Leave a Reply
                  </h2>
                  <p>
                    Your email address will not be published. Required fields
                    are marked *
                  </p>

                  <div className="form-group mb-3">
                    <label className={style.fieldLabel}>
                      Comment <span className="text-danger">*</span>
                    </label>
                    <TextareaInput
                      style={{ height: 200 }}
                      name={"Comment"}
                      className="form-control form-control-login "
                      rules={{
                        required: "Comment is required.",
                      }}
                      control={control}
                      placeholder="Comment"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className={style.fieldLabel}>
                      Name <span className="text-danger">*</span>
                    </label>
                    <TextInput
                      name={"Name"}
                      className="form-control form-control-login "
                      rules={{
                        required: "Name is required.",
                      }}
                      control={control}
                      placeholder="Name"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className={style.fieldLabel}>
                      Email <span className="text-danger">*</span>
                    </label>
                    <TextInput
                      name={"Email "}
                      className="form-control form-control-login "
                      rules={{
                        required: "Email  is required.",
                        pattern: {
                          value:
                            /^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/,
                          message: "Invalid email address.",
                        },
                      }}
                      control={control}
                      placeholder="Email "
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className={style.fieldLabel}>Website</label>
                    <TextInput
                      name={"Website"}
                      className="form-control form-control-login "
                      rules={{
                        required: false,
                      }}
                      control={control}
                      placeholder="Website"
                    />
                  </div>

                  <button
                    onClick={handleSubmit(SendEmail)}
                    className="btnPrimary px-4 my-4"
                    type="submit"
                  >
                    Post Comment
                  </button>
                </div>
              </Col>
              <Col lg="3">
                <div className="mb-5 mt-5 mt-lg-0">
                  <h3 className={style.sideTitle}>AUTHOR</h3>
                  <div className="d-flex mt-4">
                    <Image
                      src={AdminAvatar}
                      width={50}
                      height={50}
                      style={{ borderRadius: "50px" }}
                      alt=""
                    />
                    <div className="ms-3" style={{ lineHeight: "1.4" }}>
                      <small className="mb-0">Written by</small>
                      <p className="mb-0">
                        <strong>admin</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-5 pt-3">
                  <h3 className={style.sideTitle}>RECENT BLOGS</h3>
                  {props?.blogList &&
                    props?.blogList?.length > 0 &&
                    props?.blogList?.slice(0, 3).map((blog, index) => {
                      return <RecentBlog key={index} blog={blog} />;
                    })}
                </div>

                <div className="mb-5 pt-3">
                  <h3 className={style.sideTitle}>CATEGORIES</h3>
                  <ul
                    className={`my-4 ${style.categoryList}`}
                    style={{ cursor: "pointer" }}
                  >
                    {props?.category &&
                      props?.category?.length > 0 &&
                      props.category?.map((category, index) => {
                        return (
                          <li className="mb-1" key={index}>
                            <Link href={"#"}>{category?.name}</Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </Col>
            </Row>

              {props?.blogList?.length > 0 && (
                <h2 className={`mt-5 ${style.sideTitle}`}>
                  TRENDING
                </h2>
              )}
            <Row>
              {props?.blogList &&
                props?.blogList?.length > 0 &&
                props?.blogList?.slice(0, 4).map((blog, index) => {
                  return (
                    <Col lg={3} key={index}>
                      <RecentBlog
                        blog={blog}
                        categories={props.category}
                      />
                    </Col>
                  );
                })}
            </Row>
          </Container>
        </section>
      </PageLayout>
    </>
  );
};
export default BlogsDetail;

export async function getServerSideProps(context) {
  const { params } = context;
  try {
    if (params?.slug) {
      const details = await axios.get(allBlogs + `/?slug=${params?.slug}`);
      const categories = await axios.get(allCategories);
      const getAllBlogs = await axios.get(allBlogs);
      return {
        props: {
          blog: details.data,
          category: categories.data,
          blogList: getAllBlogs.data || [],
        },
      };
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/Blogs",
        },
      };
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/Blogs",
      },
    };
  }
}
