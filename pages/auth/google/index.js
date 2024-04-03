import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  authLoginUserWithGoogle,
  authRedirectGoogle,
} from "../../../Redux/auth/action";
import { setCookie } from "cookies-next";
import Router from "next/router";
import { Spin } from "antd";
function Google(props) {
  const isMounted = useRef(false);
  const [loading, setLoading] = useState(false);

    const getGoogleCallback = async () => {
        const getUserLoginData = await props?.dispatch(authRedirectGoogle(`${props?.code}&role=user`));
        if(getUserLoginData.payload?.status === 200 && getUserLoginData.payload?.data?.user?.role === "user"){
            setLoading(false);
            setCookie('access_token' , getUserLoginData.payload?.data?.token, {maxAge : 60 * 60 * 24 * 6});  // Expires in 6 days
            props?.dispatch(authLoginUserWithGoogle(getUserLoginData.payload));
            Router.push('/');
        }
    }

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
          className="d-flex  loader align-items-center justify-content-center"
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

export default connect(mapStateToProps)(Google);

export async function getServerSideProps(context) {
  const { resolvedUrl } = context;
  const getCodeInURL = resolvedUrl.split("/auth/google");
  return {
    props: {
      code: getCodeInURL[1],
    },
  };
}
