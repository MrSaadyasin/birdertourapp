import { Col } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import { DeleteIcon, SendIcon } from "./icons";
import style from "../pages/chats/Chat.module.css";
import ChatIcon from "../assets/images/userP.svg";
import Image from "next/image";
import { connect } from "react-redux";
import Pusher from "pusher-js";
import { toast } from "react-toastify";
import { Toaster } from "../extras/constants";
import axios from "axios";
import {
  allMessageofUser,
  sendChatMessage,
} from "../constants/endpoint.constants";
import moment from "moment";
import { baseUrl } from "../constants/baseurl.constants";
import { Modal } from "antd";
import { useMediaQuery } from "usehooks-ts";

const OpenChat = (props) => {
  const { userAuthReducer, user } = props;
  const [modal1Open, setModal1Open] = useState(false);
  const [value, setValue] = useState("");
  const [message, setMessage] = useState([]);
  const messagesContainerRef = useRef(null);
  const [openI, setOpenI] = useState(true)
  const [channelPusher, setChannelPusher] = useState(null);
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };
  const handleNewMessage = async () => {
    try {
      const newMessage = {
        type: "user",
        message: value,
        user: userAuthReducer?.userData?._id,
        vendor: user?._id,
        sender: userAuthReducer?.userData?._id,
        receiver: user?._id,
      };
      // setMessage((messages) => [...messages, newMessage]);
      setValue("");
      scrollToBottom();
      try {
        const sendMessage = await axios.post(sendChatMessage, newMessage, {
          headers: {
            Authorization: `Bearer ${userAuthReducer?.access_token}`,
          },
        });
        setMessage((message) => [...message, sendMessage.data.chat]);
      } catch (e) {
        console.log(e);
      }
    } catch (e) {}
  };

  useEffect(() => {
    scrollToBottom();
  }, [message]);

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
        setChannelPusher(channel);
        // Add error handling for unsubscription and event binding
        channel.bind("subscription_error", (status) => {
          console.error("Subscription Error:", status);
        });

        channel.bind("message-event", (data) => {
          // alert("Yes New Messgae");
          setMessage((newMessage) => [...newMessage, data?.chat]);
        });
      });
    }

    // Unsubscribe and disconnect on component unmount
    return () => {
      pusher.disconnect();
    };
  }, []);

  useEffect(() => {
    getAllMessageOfUser();
  }, [user]);

  const handleOnDelete = async (e) => {
    if (message.length > 0) {
      try {
        const data = {
          vendor_id: user?._id,
          user_id: userAuthReducer?.userData?._id,
        };
        const deleteAllMessage = await axios.post(
          `${baseUrl}/chat/delete`,
          data,
          {
            headers: {
              Authorization: `Bearer ${userAuthReducer?.access_token}`,
            },
          }
        );
        toast.success(deleteAllMessage.data?.message, Toaster);
        props?.setLoading(true);
        setMessage([]);
        props?.setShowChat({
          show: false,
          user: null,
        });
      } catch (e) {
        console.log(e);
        toast.error("server error", Toaster);
      }
    }
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value) {
      handleNewMessage();
    }
  };
  const getAllMessageOfUser = async (user_id) => {
    try {
      try {
        const data = {
          vendor_id: user?._id,
          user_id: userAuthReducer?.userData?._id,
        };
        const getAllMessgaes = await axios.post(allMessageofUser, data, {
          headers: {
            Authorization: `Bearer ${userAuthReducer?.access_token}`,
          },
        });
        setMessage(getAllMessgaes.data?.chatMessageList);
        props?.setLoading(true);
      } catch (e) {
        console.log(e);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const isMobileDevice = useMediaQuery("(max-width:991px)");
  return (
    <>
      <Modal
        title=""
        centered
        width={500}
        style={{
          top: 20,
        }}
        footer={[
          <button
            key="submit"
            className="btn  mx-2 btn-md btn-secondary"
            type="primary"
            onClick={() => setModal1Open(false)}
          >
            Cancel
          </button>,
          <button
            key="submit"
            className="btn btn-md btn-primary"
            type="primary"
            onClick={handleOnDelete}
          >
            Delete
          </button>,
        ]}
        open={modal1Open}
        onCancel={() => setModal1Open(false)}
      >
        <div className="text-center p-4 pt-5">
          <h3 className="mb-0">
            Are you sure you want to delete your chat?
          </h3>
        </div>
      </Modal>

      <div className={style.chatMessage}>
        <div>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center flex-1">
              <Image src={user?.profile_image ?  user?.profile_image : ChatIcon} width={50} height={50} alt="user avatar" />
              <div>
                <h6 className="mb-0 text-capitalize">{user?.name}</h6>
              </div>
            </div>

            <div>
              <button
                className={style.deleteBtn}
                onClick={() => setModal1Open(true)}
              >
                <DeleteIcon />
                {!isMobileDevice && <span className="mx-2">Delete Chat</span>}
                
              </button>
            </div>
          </div>
          <hr
            className="my-4 "
            style={{ borderTop: "1px solid var(--border)" }}
          />

          <section className={style.chatSection} ref={messagesContainerRef}>
            {message?.map((message, index) => {
              return (
                <>
                  {message.type == "vendor" ? (
                    <div className="d-lg-flex align-items-center mb-4">
                      <div className={style.receiver}>{message.message}</div>
                      <small className={style.date}>
                        {moment(message?.createdAt).format("hh:mm A")}
                      </small>
                    </div>
                  ) : (
                    <div
                      className="d-lg-flex align-items-center mb-4"
                      style={{ direction: "rtl" }}
                    >
                      {/* <div>
            				       <ReadIcon />
            					</div> */}

                      <div className={style.sender}>{message.message}</div>
                      <small className={style.date}>
                        {moment(message?.createdAt).format("hh:mm A")}
                      </small>
                    </div>
                  )}
                </>
              );
            })}
          </section>
        </div>
      </div>
       {/*i icon */}
       <div className={style.iIcon} >
        {!openI ?
          <svg fill="#E6D000" onClick={() => setOpenI(true)} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
            <path d="M25,2C12.297,2,2,12.297,2,25s10.297,23,23,23s23-10.297,23-23S37.703,2,25,2z M25,11c1.657,0,3,1.343,3,3s-1.343,3-3,3 s-3-1.343-3-3S23.343,11,25,11z M29,38h-2h-4h-2v-2h2V23h-2v-2h2h4v2v13h2V38z"></path>
          </svg> :
          <div className={style.iIconDiv} >
            <div className="d-flex align-items-center">
              <span>
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 9.71875C7.74375 9.71875 7.53125 9.50625 7.53125 9.25V6.125C7.53125 5.86875 7.74375 5.65625 8 5.65625C8.25625 5.65625 8.46875 5.86875 8.46875 6.125V9.25C8.46875 9.50625 8.25625 9.71875 8 9.71875Z" fill="black" fillOpacity="0.75" />
                  <path d="M8 11.7496C7.9625 11.7496 7.91875 11.7434 7.875 11.7371C7.8375 11.7309 7.8 11.7184 7.7625 11.6996C7.725 11.6871 7.6875 11.6684 7.65 11.6434C7.61875 11.6184 7.5875 11.5934 7.55625 11.5684C7.44375 11.4496 7.375 11.2871 7.375 11.1246C7.375 10.9621 7.44375 10.7996 7.55625 10.6809C7.5875 10.6559 7.61875 10.6309 7.65 10.6059C7.6875 10.5809 7.725 10.5621 7.7625 10.5496C7.8 10.5309 7.8375 10.5184 7.875 10.5121C7.95625 10.4934 8.04375 10.4934 8.11875 10.5121C8.1625 10.5184 8.2 10.5309 8.2375 10.5496C8.275 10.5621 8.3125 10.5809 8.35 10.6059C8.38125 10.6309 8.4125 10.6559 8.44375 10.6809C8.55625 10.7996 8.625 10.9621 8.625 11.1246C8.625 11.2871 8.55625 11.4496 8.44375 11.5684C8.4125 11.5934 8.38125 11.6184 8.35 11.6434C8.3125 11.6684 8.275 11.6871 8.2375 11.6996C8.2 11.7184 8.1625 11.7309 8.11875 11.7371C8.08125 11.7434 8.0375 11.7496 8 11.7496Z" fill="black" fillOpacity="0.75" />
                  <path d="M11.7915 14.3504H4.21645C2.9977 14.3504 2.06645 13.9066 1.59145 13.1066C1.1227 12.3066 1.1852 11.2754 1.77895 10.2066L5.56645 3.39414C6.19145 2.26914 7.05395 1.65039 8.00395 1.65039C8.95395 1.65039 9.81645 2.26914 10.4415 3.39414L14.229 10.2129C14.8227 11.2816 14.8915 12.3066 14.4165 13.1129C13.9415 13.9066 13.0102 14.3504 11.7915 14.3504ZM8.00395 2.58789C7.41645 2.58789 6.84145 3.03789 6.3852 3.85039L2.60395 10.6691C2.17895 11.4316 2.1102 12.1316 2.40395 12.6379C2.6977 13.1441 3.3477 13.4191 4.2227 13.4191H11.7977C12.6727 13.4191 13.3165 13.1441 13.6165 12.6379C13.9165 12.1316 13.8415 11.4379 13.4165 10.6691L9.6227 3.85039C9.16645 3.03789 8.59145 2.58789 8.00395 2.58789Z" fill="black" fillOpacity="0.75" />
                </svg>
              </span>

              <span className="ms-3 me-4">Please remember that communicating outside of EarthBirder before the day of your tour, or paying outside of EarthBirder is a violation of our Terms of Service</span>
            </div>
            <div onClick={() => setOpenI(false)} className={`${style.wCross}`}>
              <svg width="18" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5013 18.9577C5.55964 18.9577 1.54297 14.941 1.54297 9.99935C1.54297 5.05768 5.55964 1.04102 10.5013 1.04102C15.443 1.04102 19.4596 5.05768 19.4596 9.99935C19.4596 14.941 15.443 18.9577 10.5013 18.9577ZM10.5013 2.29102C6.2513 2.29102 2.79297 5.74935 2.79297 9.99935C2.79297 14.2493 6.2513 17.7077 10.5013 17.7077C14.7513 17.7077 18.2096 14.2493 18.2096 9.99935C18.2096 5.74935 14.7513 2.29102 10.5013 2.29102Z" fill="black" fillOpacity="0.75" />
                <path d="M8.14245 12.9831C7.98411 12.9831 7.82578 12.9248 7.70078 12.7998C7.45911 12.5581 7.45911 12.1581 7.70078 11.9165L12.4174 7.1998C12.6591 6.95814 13.0591 6.95814 13.3008 7.1998C13.5424 7.44147 13.5424 7.84147 13.3008 8.08314L8.58411 12.7998C8.46745 12.9248 8.30078 12.9831 8.14245 12.9831Z" fill="black" fillOpacity="0.75" />
                <path d="M12.8591 12.9831C12.7008 12.9831 12.5424 12.9248 12.4174 12.7998L7.70078 8.08314C7.45911 7.84147 7.45911 7.44147 7.70078 7.1998C7.94245 6.95814 8.34245 6.95814 8.58411 7.1998L13.3008 11.9165C13.5424 12.1581 13.5424 12.5581 13.3008 12.7998C13.1758 12.9248 13.0174 12.9831 12.8591 12.9831Z" fill="black" fillOpacity="0.75" />
              </svg>

            </div>
          </div>}
      </div>
      <div className="mt-3 position-relative">
        <input
          type="text"
          name="message"
          value={value}
          onKeyDown={handleOnKeyDown}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type a message..."
          className={`form-control w-100 ${style.sendMessageInput}`}
        />
        {value.length !== 0 && (
          <div className={style.sendIcon} onClick={handleNewMessage}>
            <SendIcon />
          </div>
        )}
      </div>
    </>
  );
};
// export default  OpenChat

const mapStoreProps = (state) => {
  return state;
};
export default connect(mapStoreProps)(OpenChat);
