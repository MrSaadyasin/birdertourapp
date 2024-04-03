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
import {useTranslation} from "react-i18next";

const DiscoverBird = ({ title, tours, dispatch  , searchTours, search , discoverBirdRef}) => {
  const {t} = useTranslation();
  const isMobileDevice = useMediaQuery("(max-width:1121px)");
  const [showDD, setShowDD] = useState(false);
  const [value, setValue] = useState("By Location");
  const [tour, setTour] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [vendorText, setVendorText] = useState("");
  const handleDropDown = () => {
    setShowDD(!showDD);
  };

  useEffect(() => {
    console.log("woorking", search);
    if(search)
    {
      console.log({searchTours});
      setTour(searchTours);
    }else{
      if (tours?.tours && tours?.tours?.length > 0) {
        setTour([...tours?.tours]);
      } else {
        setTour([]);
      }
    }
  }, [searchTours]);

  const handleOnTourLocation = async (e) => {
    console.log(e);
    const countryFullNamesToAbbreviations = {
      "United States": "USA",
      "United Kingdom": "UK",
      "Canada": "CA",
      "Australia": "AU",
      "France": "FR",
      "Germany": "DE",
      "Italy": "IT",
      "Spain": "ES",
      "Japan": "JP",
      "China": "CN",
      "India": "IN",
      "Brazil": "BR",
      "Russia": "RU",
      "Mexico": "MX",
      "Argentina": "AR",
      "South Africa": "ZA",
      "Egypt": "EG",
      "Nigeria": "NG",
      "Kenya": "KE",
      "Saudi Arabia": "SA",
      // You can add more mappings as needed
    };



    if (e?.formatted_address) {
      const address = e.formatted_address;
      // Check if the address is in the countryAbbreviations mapping
      const mappedAddress = countryFullNamesToAbbreviations[address] || address;
      console.log({mappedAddress});
      const payload = {
        latitude: e?.geometry?.location?.lat(),
        longitude: e?.geometry?.location?.lng(),
        address: mappedAddress,
        type: "location",
      };
      try {
        const searchByAddress = await dispatch(SearchByLocation(payload));
        setTour(searchByAddress?.payload?.data?.tours);
      } catch (e) {
        console.log(e);
        setTour([]);
      }
    } else {
      if (tours?.tours?.length > 0) {
        setTour(tours?.tours);
      } else {
        setTour([]);
      }
    }
  };

  const searchByVendor = async (e) => {
    try {
      const payload = {
        type: "vendor",
        name: e.target.value,
      };
      const searchByVendor = await dispatch(SearchByVendor(payload));
      setTour(searchByVendor?.payload?.data?.tours);
    } catch (e) {
      console.log(e);
      setTour([]);
    }
  }
  // const handleOnChange = (e) => {
  //   if(tours?.tours?.length == 0){
  //     setTour([...tours?.tours]);
  //   }
  //
  //
  //
  //   // if (
  //   //   value === "By Name" &&
  //   //   e.target.value !== "" &&
  //   //   tours?.tours?.length > 0
  //   // ) {
  //   //   setVendorText(e.target.value);
  //   //   let newReg = new RegExp(e.target.value, "gi");
  //   //   const searchVisitorTypes = tours?.tours?.filter((item) => {
  //   //     if (item?.vendor?.name.match(newReg)) {
  //   //       return item;
  //   //     }
  //   //   });
  //   //   setTour(searchVisitorTypes);
  //   // } else {
  //   //   setTour([...tours?.tours]);
  //   // }
  // };


 const   handleOnKeyPress  = (e) => {
   console.log("ek");
   if(e.key === "Enter"){
     if(e.target.value.length > 0){
       searchByVendor(e)
     }
   }
 }
  const handleDateChange = (date, dateString) => {
    if (date === null){
      if (tours?.tours && tours?.tours?.length > 0) {
        setTour([...tours?.tours]);
      } else {
        setTour([]);
      }
      return;
    }
    console.log("date", date);
    console.log("string", dateString);
    setSelectedDate(dateString);
    handleVendorSearchTours(dateString);
  };
  const handleVendorSearchTours = async (dateString) => {
    try {
      const payload = {
        type: "vendor",
        date: dateString,
        name: vendorText,
      };
      const searchByVendor = await dispatch(SearchByVendor(payload));
      setTour(searchByVendor?.payload?.data?.tours);
    } catch (e) {
      console.log(e);
      setTour([]);
    }
  };

  return (
    <>
      <section className={`container ${style.sectionDiscover}`} ref={discoverBirdRef} >
        <div className="padding120 pb-0">
          <h2 className="discover__bird mb-4">{title}</h2>
          <div className="d-flex position-relative">
            {value === "By Location" ? (
              <div
                className="position-relative mb-1 mb-lg-0"
                style={{ flex: 0.85 }}
              >
                <div className="searchIcon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z"
                      fill="black"
                      fillOpacity="0.5"
                    />
                    <path
                      d="M22.0004 22.7504C21.8104 22.7504 21.6204 22.6804 21.4704 22.5304L19.4704 20.5304C19.1804 20.2404 19.1804 19.7604 19.4704 19.4704C19.7604 19.1804 20.2404 19.1804 20.5304 19.4704L22.5304 21.4704C22.8204 21.7604 22.8204 22.2404 22.5304 22.5304C22.3804 22.6804 22.1904 22.7504 22.0004 22.7504Z"
                      fill="black"
                      fillOpacity="0.5"
                    />
                  </svg>
                </div>
                <ReactGoogleAutocomplete
                  apiKey={process.env.GOOGLE_MAP_API_KEY}
                  placeholder={`${t("SearchTour")}`}
                  name="location"
                  onPlaceSelected={handleOnTourLocation}
                  onChange={(e) => {
                    if (!e.target.value) {
                      if (tours?.tours?.length > 0) {
                        setTour(tours?.tours);
                      } else {
                        setTour([]);
                      }
                    }
                  }}
                  className="form-control customInputSearch"
                  options={{
                    types: [`(regions)`],
                  }}
                />
              </div>
            ) : (
              <div
                className="position-relative mb-1 mb-lg-0"
                style={{ flex: 0.85 }}
              >
                <input
                  className="form-control customInputSearch"
                  placeholder={`${t("SearchVendor")}`}
                  onChange={(e) => {
                    if (!e.target.value) {
                      if (tours?.tours?.length > 0) {
                        setTour(tours?.tours);
                      } else {
                        setTour([]);
                      }
                    }else {
                      setVendorText(e.target.value)
                    }
                  }}
                  onKeyDown={handleOnKeyPress}

                />
                <div className="searchIcon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z"
                      fill="black"
                      fillOpacity="0.5"
                    />
                    <path
                      d="M22.0004 22.7504C21.8104 22.7504 21.6204 22.6804 21.4704 22.5304L19.4704 20.5304C19.1804 20.2404 19.1804 19.7604 19.4704 19.4704C19.7604 19.1804 20.2404 19.1804 20.5304 19.4704L22.5304 21.4704C22.8204 21.7604 22.8204 22.2404 22.5304 22.5304C22.3804 22.6804 22.1904 22.7504 22.0004 22.7504Z"
                      fill="black"
                      fillOpacity="0.5"
                    />
                  </svg>
                </div>
              </div>
            )}

            <div
              className="position-relative"
              onClick={handleDropDown}
              style={{ flex: 0.15 }}
            >
              {isMobileDevice ? (
                <>
                  <input
                    className="form-control customInputSelect"
                    readOnly
                    //  placeholder={}
                  />
                  <div className="caretIcon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_2697_8827)">
                        <path
                          d="M12 6C12 6.53043 12.2107 7.03914 12.5858 7.41421C12.9609 7.78929 13.4696 8 14 8C14.5304 8 15.0391 7.78929 15.4142 7.41421C15.7893 7.03914 16 6.53043 16 6C16 5.46957 15.7893 4.96086 15.4142 4.58579C15.0391 4.21071 14.5304 4 14 4C13.4696 4 12.9609 4.21071 12.5858 4.58579C12.2107 4.96086 12 5.46957 12 6Z"
                          stroke="black"
                          strokeOpacity="0.75"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 6H12"
                          stroke="black"
                          strokeOpacity="0.75"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 6H20"
                          stroke="black"
                          strokeOpacity="0.75"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 12C6 12.5304 6.21071 13.0391 6.58579 13.4142C6.96086 13.7893 7.46957 14 8 14C8.53043 14 9.03914 13.7893 9.41421 13.4142C9.78929 13.0391 10 12.5304 10 12C10 11.4696 9.78929 10.9609 9.41421 10.5858C9.03914 10.2107 8.53043 10 8 10C7.46957 10 6.96086 10.2107 6.58579 10.5858C6.21071 10.9609 6 11.4696 6 12Z"
                          stroke="black"
                          strokeOpacity="0.75"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 12H6"
                          stroke="black"
                          strokeOpacity="0.75"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 12H20"
                          stroke="black"
                          strokeOpacity="0.75"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 18C15 18.5304 15.2107 19.0391 15.5858 19.4142C15.9609 19.7893 16.4696 20 17 20C17.5304 20 18.0391 19.7893 18.4142 19.4142C18.7893 19.0391 19 18.5304 19 18C19 17.4696 18.7893 16.9609 18.4142 16.5858C18.0391 16.2107 17.5304 16 17 16C16.4696 16 15.9609 16.2107 15.5858 16.5858C15.2107 16.9609 15 17.4696 15 18Z"
                          stroke="black"
                          strokeOpacity="0.75"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 18H15"
                          stroke="black"
                          strokeOpacity="0.75"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19 18H20"
                          stroke="black"
                          strokeOpacity="0.75"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2697_8827">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </>
              ) : (
                <>
                  <input
                    className={
                      value == "By Name"
                        ? "form-control customInputSelect forVendor"
                        : "form-control customInputSelect"
                    }
                    readOnly
                    placeholder={`${value === "By Name" ? t("ByName") : t("ByLocation")}`}
                  />
                  <div className="caretIcon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.99928 14.0005C9.41595 14.0005 8.83262 13.7755 8.39095 13.3339L2.95762 7.90052C2.71595 7.65885 2.71595 7.25885 2.95762 7.01719C3.19928 6.77552 3.59928 6.77552 3.84095 7.01719L9.27428 12.4505C9.67428 12.8505 10.3243 12.8505 10.7243 12.4505L16.1576 7.01719C16.3993 6.77552 16.7993 6.77552 17.041 7.01719C17.2826 7.25885 17.2826 7.65885 17.041 7.90052L11.6076 13.3339C11.166 13.7755 10.5826 14.0005 9.99928 14.0005Z"
                        fill="black"
                        fillOpacity="0.75"
                      />
                    </svg>
                  </div>
                </>
              )}
            </div>
            {showDD && (
              <>
                <div className="dropdownMenu shadow" style={{ right: value == "By Name" && "12%" }}
>
                  <div
                    style={{
                      color: value == "By Location" && "#1b847a",
                      fontWeight: value == "By Location" && 500,
                    }}
                    onClick={() => {
                      setValue("By Location");
                      setShowDD(false);
                    }}
                  >
                    {t("ByLocation")}
                  </div>

                  <div
                    style={{
                      color: value == "By Name" && "#1b847a",
                      fontWeight: value == "By Location" && 500,
                    }}
                    onClick={() => {
                      setValue("By Name");
                      setShowDD(false);
                    }}
                  >
                    {t("ByName")}
                  </div>
                </div>
              </>
            )}
            {value == "By Name" && (
              <div>
                <DatePicker
                  style={{ backgroundColor: "#d3d3d36e" }}
                  onChange={handleDateChange}
                  className="customInputSelect"
                  size="large"
                  placeholder = {`${t("SelectDate")}`}
                />
              </div>
            )}
          </div>
          <div className="d-block d-lg-none">
            <small>
              Search: <small style={{ color: "#1b847a" }}>{value}</small>
            </small>
          </div>
        </div>
        {tour && tour?.length > 0 ? (
          <Slider tour={tour} />
        ) : (
          <div className="d-flex align-items-center justify-content-center my-lg-5 py-5">
            <div className="text-center">
              <Image
                src={NoTours}
                className="img-fluid mb-4"
                alt="no tours found."
              />
              <h2>
                <strong>{t("NoTourAvailableText")}!</strong>
              </h2>
              <p>{t("NoTourDetailText")}!</p>
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

export default connect(mapStoreProps)(DiscoverBird);
