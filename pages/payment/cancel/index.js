import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  authLoginUserWithGoogle,
  authRedirectGoogle,
  paymentStripe,
  removeStoreBookingId,
} from "../../../Redux/auth/action";
import { setCookie } from "cookies-next";
import Router from "next/router";
import { Spin } from "antd";
function PaymentCancel(props) {
  const isMounted = useRef(false);
  const [loading, setLoading] = useState(false);

  const getStripeCallback = async (data, token) => {
    const getUserStripeData = await props?.dispatch(paymentStripe(data, token));
    if (getUserStripeData.payload?.status === 200) {
      props?.dispatch(removeStoreBookingId());
      Router.push("/bookings");
    } else {
      Router.push("/");
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      setLoading(true);
      const data = {
        stripe_session_id: props?.code,
        booking_id: props?.userAuthReducer?.booking_id,
      };
      getStripeCallback(data, props?.userAuthReducer?.access_token);
      isMounted.current = true;
    }
    return () => {
      console.log("Component unmounted");
    };
  }, []);

  return (
    <div>
      {loading ? (
        <div
          className="d-flex loader align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
          <Spin />
          &nbsp;loading...
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(PaymentCancel);

export async function getServerSideProps(context) {
  const { resolvedUrl } = context;
  const getCodeInURL = resolvedUrl.split("/payment/cancel?session_id=");
  const getToken = context.req.cookies["access_token"];
  if (getToken) {
    if (getCodeInURL[1]) {
      return {
        props: {
          code: getCodeInURL[1],
        },
      };
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/booking",
        },
      };
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/booking",
      },
    };
  }
}
