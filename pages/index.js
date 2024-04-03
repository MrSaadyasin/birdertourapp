import Head from "next/head";
import PageLayout from "../Compoments/Layout/PageLayout";
import Banner from "../Compoments/Banner/Banner";
import React, { useEffect, useRef, useState } from "react";
import ComingTour from "../Compoments/ComingTour/ComingTour";
import DiscoverBird from "../Compoments/DiscroverBird/DiscoverBird";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import Testimonial from "../Compoments/Testimonial/Testimonial";
import Carousel from "react-elastic-carousel";
import axios from "axios";
import {
  allBlogs,
  allTours,
  allVendors,
  upcomingTour,
} from "../constants/endpoint.constants";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  MarkerClusterer
} from "@react-google-maps/api";
import { BlogData, mapThemeConfiguation } from "../extras/constants";
import Pusher from "pusher-js";
import Image from "next/image";
import VendorImage from "../assets/images/userP.svg";
import { Star } from "../Compoments/icons";
import BlogSection from "../Compoments/blog/BlogSection";
import { useTranslation } from 'react-i18next';

function Home(props) {
  const { Tours, getAllMarks, blog } = props;
  const { t } = useTranslation();
  // selected Marker Display
  const [search, setSearch] = useState(false);
  const [searchTours, setSearchTours] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const isMobileDevice = useMediaQuery("(max-width:991px)");
  // Map styl]ing
  const mapContainerStyle = {
    width: "100vw",
    height: isMobileDevice ? "60vh" : "100vh",
    padding: 0,
  };
  // Map Center
  const center = {
    lat: 31.4723719,
    lng: 74.4056565,
  };
  // check ssr and map Loader
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
    libraries: ["maps", "places"],
  });

  // Notification UseEffect
  useEffect(() => {
    const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
      cluster: process.env.PUSHER_CLUSTER,
    });
    if (props?.userAuthReducer?.userData?._id) {
      const channelName = `earth-birder-${props?.userAuthReducer?.userData?._id}`;
      pusher.connection.bind("connected", () => {
        // After the connection is established, proceed with binding to the channel
        const channel = pusher.subscribe(channelName);

        // Add error handling for unsubscription and event binding
        channel.bind("subscription_error", (status) => {
          console.error("Subscription Error:", status);
        });

        channel.bind("notification-event", (data) => {
          // alert(data.message);
          console.log(data);
        });
      });
    }

    // Listen for the "connected" event to confirm successful connection
    pusher.connection.bind("connected", () => {
      // After the connection is established, proceed with binding to the channel
      const channel = pusher.subscribe("earth-birder");

      // Add error handling for unsubscription and event binding
      channel.bind("subscription_error", (status) => {
        console.error("Subscription Error:", status);
      });

      channel.bind("notification-event", (data) => {
        alert(data.message);
      });
    });

    // Unsubscribe and disconnect on component unmount
    return () => {
      pusher.disconnect();
    };
  }, []);



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

  const [items, setItems] = useState([
    { id: 1, title: "item #1" },
    { id: 2, title: "item #2" },
    { id: 3, title: "item #3" },
    { id: 4, title: "item #4" },
    { id: 5, title: "item #5" },
  ]);

  const breakPoint = [
    {
      width: 1,
      itemsToShow: 1.15,
      itemsToScroll: 1,
    },
    {
      width: 550,
      itemsToShow: 1,
      itemsToScroll: 1,
    },
    {
      width: 750,
      itemsToShow: 2,
      itemsToScroll: 1,
    },
    {
      width: 1120,
      itemsToShow: 3,
      itemsToScroll: 1,
    },
  ];
  const discoverBirdRef = useRef(null);



  return (
    <>
      <PageLayout footer={true} discoverBirdRef={discoverBirdRef} HomeScreen={true} tours={Tours} setSearchTours={setSearchTours} setSearch={setSearch}>
        <Head>
          <title>Earth Bird</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          {/*<script*/}
          {/*  type="text/javascript"*/}
          {/*  src={`https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`}*/}
          {/*  defer={true}*/}
          {/*/>*/}
        </Head>

        {/* home page */}
        <>
          <Banner />
          <DiscoverBird title={`${t("DiscoverHeading")}`} discoverBirdRef={discoverBirdRef} tours={Tours} search={search}  searchTours={searchTours}/>
  <div>
  </div>
          {Tours?.tours && Tours?.tours?.length > 3 && (
            <div className="d-flex align-items-center justify-content-center  mt-4 mt-lg-4 mb-2 mb-lg-4 py-0 pb-5">
              <Link href={"/tours"}>
                <button className="py-2 px-3 btn-md btnSeeMore">
                  {t("ViewAll")}
                </button>
              </Link>
            </div>
          )}

          

          {/*<ComingTour UpcomingTour={UpcomingTour} />*/}
          
          {/* <DiscoverBird title="Weekend Birding Adventures" /> */}
         
          {/* GoogleMap */}
          <section
            className={"container d-lg-none d-block"}
            style={{ padding: "0px 25px" }}
          >
            <div className="padding120 pb-0">
              <h2 className="discover__bird mb-4">
                {t("ExploreMapText")}
              </h2>
            </div>
          </section>
          {isLoaded ? (
            <div className="mapContainers position-relative">
              <section
                className={"container d-lg-block absoluteContainer d-none"}
                style={{ padding: "0px 25px" }}
              >
                <div className="pb-0">
                  <h2
                    className="discover__bird mb-0"
                    style={{
                      fontSize: "20px",
                      lineHeight: "34px",
                      padding: "16px 0",
                    }}
                  >
                    {t("ExploreMapTextLargeScreen1")} <br />  {t("ExploreMapTextLargeScreen2")}
                  </h2>
                </div>
              </section>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={3}
                center={center}
                options={{
                  styles: mapThemeConfiguation,
                  disableDefaultUI: true,
                  zoomControl: true,
                  keyboardShortcuts: false,
                  mapTypeControl: false,
                  clickableIcons: false,
                }}
              >

                {getAllMarks?.length > 0 && <MarkerClusterer>
                  {(clusterer) => getAllMarks?.map((items, index) => {
                    return (
                        <Marker
                            key={index}
                            position={{
                              lat: items?.address?.latitude,
                              lng: items?.address?.longitude,
                            }}
                            clusterer={clusterer}
                            onClick={() => setSelectedMarker(items)}
                        />
                    );
                  })}

                </MarkerClusterer>}


                {selectedMarker && (
                  <InfoWindow
                    position={{
                      lat: selectedMarker?.address?.latitude,
                      lng: selectedMarker?.address?.longitude,
                    }}
                    onCloseClick={() => setSelectedMarker(null)}
                  >
                    <div className={"d-flex "}>
                      <Image
                        className={" me-3 infoWindowImage"}
                        src={
                          selectedMarker?.profile_image
                            ? selectedMarker?.profile_image
                            : VendorImage
                        }
                        alt="Vendor image"
                        width={50}
                        height={50}
                      />
                      <div>
                        <h3 className={"mb-0 text-capitalize"}>
                          {selectedMarker?.name}
                        </h3>
                        <small>{selectedMarker?.address?.address}</small>
                        <p className={"mb-0 d-flex align-items-center"}>
                          <Star /> &nbsp;(
                          <strong>{selectedMarker?.rating}</strong>)
                        </p>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </div>
          ) : null}
          {/*Blogs*/}
          {blog?.length > 0 && <BlogSection title={("Blogs")} blogs={blog}/>}
          {blog && blog?.length > 2 && (
              <div className="d-flex align-items-center justify-content-center  mt-4 mt-lg-0  py-0 ">
                <Link href={"/blogs"}>
                  <button className="py-2 px-3 btn-md btnSeeMore">
                    {t("ViewAll")}
                  </button>
                </Link>
              </div>
          )}

          <section className="section__testimonial">
            <div className=" container ">
              <h1 className="discover__bird mb-4">
                {t("ReviewHeading")}
              </h1>
              <Carousel breakPoints={breakPoint}>
                {items?.map((item, index) => (
                  <Testimonial key={index} item={item} />
                ))}
              </Carousel>
            </div>
          </section>
        </>
      </PageLayout>
    </>
  );
}

const mapStoreProps = (state) => {
  return state;
};

export default connect(mapStoreProps)(Home);

export async function getServerSideProps(context) {
  try {
    const get = context.req.cookies["access_token"];
    // const getAllTours = await axios.get(allTours);
    const [tours, vendors, blogs] = await Promise.all([
      fetch(allTours, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          Authorization: `Bearer ${get}`,
        },
      }),
      fetch(allVendors, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          Authorization: `Bearer ${get}`,
        },
      }),
      fetch(allBlogs, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          Authorization: `Bearer ${get}`,
        },
      }),
    ]);
    const getAllTours = await tours.json();
    const getAllVendors = await vendors.json();
    const getAllBlogs  = await blogs.json();
    const getAllAddress = getAllVendors?.vendors
      ?.map((item, index) => {
        if (
          item?.address &&
          Object.keys(JSON.parse(item?.address))?.length > 0
        ) {
          return {
            ...item,
            address: JSON.parse(item?.address),
          };
          return null;
        }
      })
      .filter(Boolean);
    return {
      props: {
        Tours: getAllTours,
        blog: getAllBlogs || [],
        getAllMarks: getAllAddress || null,
        access_token: get || null,
      },
    };
  } catch (error) {
    return {
      props: {
        Tours: [],
        getAllMarks: [],
        blog: [],
      },
    };
  }
}
