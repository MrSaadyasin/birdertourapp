import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  authLoginUserWithGoogle,
  authRedirectFaceBook,
  authRedirectGoogle,
} from "../../../Redux/auth/action";
import { setCookie } from "cookies-next";
import Router from "next/router";
import { Spin } from "antd";
function FaceBook(props) {
  const isMounted = useRef(false);
  const [loading, setLoading] = useState(false);

  const getGoogleCallback = async () => {
    const getUserLoginData = await props?.dispatch(
      authRedirectFaceBook(`${props?.code}&role=user`)
    );
    if (getUserLoginData.payload?.status === 200) {
      setLoading(false);
      setCookie("access_token", getUserLoginData.payload?.data?.token, {
        maxAge: 60 * 60 * 24 * 6,
      }); // Expires in 6 days
      props?.dispatch(authLoginUserWithGoogle(getUserLoginData.payload));
      Router.push("/");
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      setLoading(true);
      getGoogleCallback();
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

export default connect(mapStateToProps)(FaceBook);

export async function getServerSideProps(context) {
  const { resolvedUrl } = context;
  const getCodeInURL = resolvedUrl?.split("/auth/facebook");

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
        destination: "/",
      },
    };
  }
}
