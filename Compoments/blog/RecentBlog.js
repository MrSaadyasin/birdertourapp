import React, { useEffect, useState } from "react";
import Image from "next/image";
import BlogImage from "../../assets/images/blogImage.jpg";
import Link from "next/link";

const RecentBlog = ({ blog, categories }) => {
  const [blogImg, setBlogImg] = useState("");

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
  return (
    <>
      <Link href="#">
        <div className="mt-4" style={{ cursor: "pointer" }}>
          <Image
            src={blogImg}
            width={"200"}
            height={"200"}
            alt=""
            className="mb-3 w-100"
          />
          <div className="" style={{ lineHeight: "1.4" }}>
            {categories && (
              <>
                {" "}
                {categories &&
                  categories?.length > 0 &&
                  categories?.map((category, index) => {
                    return (
                      <>
                        {category?.id == blog?.categories[0] && (
                          <p className="mb-2" style={{ color: "#000000bf" }}>
                            {category?.name}
                          </p>
                        )}
                      </>
                    );
                  })}
              </>
            )}

            <p className="mb-0" style={{ color: "#000000bf" }}>
              <strong>{blog?.title?.rendered}</strong>
            </p>
            <small className="mb-0 text-muted">admin</small>
          </div>
        </div>
      </Link>
    </>
  );
};

export default RecentBlog;
