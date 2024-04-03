import React, { useEffect, useRef, useState } from "react";

import style from "./Chat.module.css";
import { Col, Row } from "react-bootstrap";
import Image from "next/image";

import ChatIcon from "../../assets/images/avatarImg.jpg";
import { DeleteIcon, ReadIcon, SendIcon } from "../../Compoments/icons";
import Pusher from "pusher-js";
import { toast, ToastContainer } from "react-toastify";
import { Toaster } from "../../extras/constants";
import { connect } from "react-redux";
import Head from "next/head";
import EmptyNotification from "../../assets/images/emptyNotifiation.png";
import { baseUrl } from "../../constants/baseurl.constants";
import axios from "axios";
import { allMessageProfile } from "../../constants/endpoint.constants";
import SingleChat from "../../Compoments/SingleChat";
import OpenChat from "../../Compoments/Chat";
import PageLayout from "../../Compoments/DashboardLayout/DashboardLayout/DashboardLayout";
import loading from "../loading";
import { useMediaQuery } from "usehooks-ts";
import Link from "next/link";
import { useRouter } from 'next/router'
const Chat = (props) => {
  const { userAuthReducer } = props;
  const router = useRouter()
  
  const [laoding, setLoading] = useState(false);
  const [profile, setProfile] = useState(
    props?.profileList?.length > 0 ? props?.profileList : []
  );
  const [showChat, setShowChat] = useState({
    show: false,
    user: null,
  });

  const getAllChatProfiles = async () => {
    if (loading) {
      try {
        const getAllMessageList = await axios.get(allMessageProfile, {
          headers: {
            Authorization: `Bearer ${userAuthReducer.access_token}`,
          },
        });
        setProfile(
          getAllMessageList.data.profileList?.length > 0
            ? getAllMessageList.data.profileList
            : []
        );
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getAllChatProfiles();
  }, [laoding]);

  useEffect(() => {
    const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
      cluster: process.env.PUSHER_CLUSTER,
    });
    if (userAuthReducer?.userData?._id) {
      let channelName;
      if (userAuthReducer?.userData?.role === "admin") {
        channelName = `earth-birder-admin`;
      } else {
        channelName = `earth-birder-${userAuthReducer?.userData?._id}`;
      }

      pusher.connection.bind("connected", () => {
        // After the connection is established, proceed with binding to the channel
        const channel = pusher.subscribe(channelName);

        // Add error handling for unsubscription and event binding
        channel.bind("subscription_error", (status) => {
          console.error("Subscription Error:", status);
        });

        channel.bind("message-event", (data) => {
          setLoading(true);
        });
      });
    }

    // Unsubscribe and disconnect on component unmount
    return () => {
      pusher.disconnect();
    };
  }, []);
  const isMobileDevice = useMediaQuery("(max-width:991px)");
  const [mobileChat, setMobileChat] = useState(false);
  // check if there is a vendor id open that chat
  useEffect(()=>{
    if(router.query.vendor){
      props?.profileList.map((chat)=>{
        if(router.query.vendor === chat.vendor._id){
          setShowChat({ show: true, user: chat?.vendor });
        }
      })
    }
  },[])
  return (
    <PageLayout color="#1b847a">
      {/*<ToastContainer />*/}
      {isMobileDevice && mobileChat && (
        <div className="mb-2" onClick={() => setMobileChat(false)}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.97474 15.6829C8.13307 15.6829 8.29141 15.6246 8.41641 15.4996C8.65807 15.2579 8.65807 14.8579 8.41641 14.6163L3.79974 9.99961L8.41641 5.38294C8.65807 5.14128 8.65807 4.74128 8.41641 4.49961C8.17474 4.25794 7.77474 4.25794 7.53307 4.49961L2.47474 9.55794C2.23307 9.79961 2.23307 10.1996 2.47474 10.4413L7.53307 15.4996C7.65807 15.6246 7.81641 15.6829 7.97474 15.6829Z"
              fill="black"
              fill-opacity="0.75"
            />
            <path
              d="M3.05703 10.625H17.082C17.4237 10.625 17.707 10.3417 17.707 10C17.707 9.65833 17.4237 9.375 17.082 9.375H3.05703C2.71537 9.375 2.43203 9.65833 2.43203 10C2.43203 10.3417 2.71537 10.625 3.05703 10.625Z"
              fill="black"
              fill-opacity="0.75"
            />
          </svg>{" "}
           back
        </div>
      )}
      <p className={style.breadCrumb}><Link style={{color: 'var(--primary)'}} href="/">Home</Link> / Chat</p>
      <div className={style.chatMenu}>
        <Row>
          {isMobileDevice ? (
            <>
              {!mobileChat ? (
                <Col
                  lg="3"
                  className={style.chat}
                  style={{ borderRight: isMobileDevice && "0" }}
                >
                  <div className="">
                    <h3>Chats</h3>
                    {profile?.length > 0 &&
                      profile?.map((item, index) => (
                        <div
                          onClick={() => {
                            setShowChat({ show: true, user: item?.vendor });
                            setMobileChat(true);
                          }}
                          className={
                            item?.vendor?._id === showChat.user?._id
                              ? style.singleChatactive
                              : style.singleChat
                          }
                          key={index}
                        >
                          <SingleChat read={true} userProfile={item} />
                        </div>
                      ))}
                  </div>
                </Col>
              ) : (
                <Col lg="9">
                  {showChat?.show ? (
                    <OpenChat
                      user={showChat.user}
                      setLoading={setLoading}
                      setShowChat={setShowChat}
                    />
                  ) : (
                    <div className={style.notificationContainer}>
                      <div className="d-flex align-items-center justify-content-center h-100">
                        <div className="text-center">
                          <Image
                            src={EmptyNotification}
                            alt="Chat not active"
                            className="mx-0"
                            style={{ height: 200, width: 240 }}
                          />
                          <p className="mt-4 pt-4">
                            There are no active Chat from any Vendor!
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </Col>
              )}
            </>
          ) : (
            <>
              <Col lg={5} xl={3} className={style.chat}>
                <div className="">
                  <h3>Chats</h3>
                  {profile?.length > 0 &&
                    profile?.map((item, index) => (
                      <div
                        onClick={() => {
                          setShowChat({ show: true, user: item?.vendor });
                        }}
                        className={
                          item?.vendor?._id === showChat.user?._id
                            ? style.singleChatactive
                            : style.singleChat
                        }
                        key={index}
                      >
                        <SingleChat read={true} userProfile={item} />
                      </div>
                    ))}
                </div>
              </Col>

              <Col lg={7} xl={9}>
                {showChat?.show ? (
                  <OpenChat
                    user={showChat.user}
                    setLoading={setLoading}
                    setShowChat={setShowChat}
                  />
                ) : (
                  <div className={style.notificationContainer}>
                    <div className="d-flex align-items-center justify-content-center h-100">
                      <div className="text-center">
                        <Image
                          src={EmptyNotification}
                          alt="Chat not active"
                          className="mx-0"
                          style={{ height: 200, width: 240 }}
                        />
                        <p className="mt-4 pt-4">
                          There are no active Chat from any Vendor!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Col>
            </>
          )}
        </Row>
      </div>
    </PageLayout>
  );
};

// export default Chat;

const mapStoreProps = (state) => {
  return state;
};
export default connect(mapStoreProps)(Chat);

export async function getServerSideProps(context) {
  const get = context.req.cookies["access_token"];
  if (get) {
    try {
      const getAllMessageList = await axios.get(allMessageProfile, {
        headers: {
          Authorization: `Bearer ${get}`,
        },
      });
      return {
        props: {
          token: get,
          profileList: getAllMessageList.data?.profileList || [],
        },
      };
    } catch (e) {
      return {
        props: {
          token: get,
          profileList: [],
        },
      };
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
}
