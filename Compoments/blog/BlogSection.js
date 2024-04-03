import React, { useEffect, useState } from "react";
import Slider from "../Slider/Slider";
import style from "../Slider/Slider.module.css";
import Image from "next/image";
import NoTours from "../../assets/images/noTours.svg";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { connect } from "react-redux";
import { SearchByLocation, SearchByVendor } from "../../Redux/auth/action";
import { da } from "date-fns/locale";
import { useMediaQuery } from "usehooks-ts";
import { DatePicker } from "antd";
import BlogSlider from "../Slider/BlogSlider";
import BlogCard from "../Slider/BlogSlider";

const BlogSection = ({ title, blogs, dispatch }) => {
    const isMobileDevice = useMediaQuery("(max-width:1121px)");
    const [showDD, setShowDD] = useState(false);
    const [value, setValue] = useState("By Location");
    const [blogState, setBlogState] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [vendorText, setVendorText] = useState("");
    const handleDropDown = () => {
        setShowDD(!showDD);
    };
    useEffect(() => {
        if (blogs && blogs?.length > 0) {
            setBlogState([...blogs]);
        } else {
            setBlogState([]);
        }
    }, []);

    return (
        <>
            <section className={`container ${style.sectionDiscover}`}>
                <div className="padding120 pb-0">
                    <h2 className="discover__bird mb-4">{title}</h2>
                    <div className="d-flex position-relative">
                        <div
                            className="position-relative"
                            onClick={handleDropDown}
                            style={{ flex: 0.15 }}
                        >

                        </div>
                    </div>

                </div>
                {blogState && blogState?.length > 0 ? (
                    <BlogSlider blogs={blogs} />
                ) : (
                    <div className="d-flex align-items-center justify-content-center my-lg-5 py-5">
                        <div className="text-center">
                            <Image
                                src={NoTours}
                                className="img-fluid mb-4"
                                alt="no blog found."
                            />
                            <h2>
                                <strong>No blog is available!</strong>
                            </h2>
                            <p>There are no blog available at the moment!</p>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

const mapStoreProps = (state) => {
    return state;
};

export default connect(mapStoreProps)(BlogSection);
