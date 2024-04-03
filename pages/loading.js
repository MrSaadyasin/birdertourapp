import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <>
      <div>
        <div className="container">
          <div
            className="d-flex align-items-center justify-content-center flex-column"
            style={{ height: "100vh"}}
          >
            <div>
              <Image src={require("../assets/images/logo.svg")} />
            </div>
            <div className="my-3">
              <Image width={50} src={require("../assets/images/spinnerLoader.gif")} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
