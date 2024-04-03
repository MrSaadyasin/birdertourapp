import Image from "next/image";
import React from "react";
import PageLayout from "../Compoments/Layout/PageLayout";
import { Col, Row } from "react-bootstrap";

const Custom404 = () => {
  return (
    <>
      <PageLayout footer={false} color={"color"}>
        <div>
          <div className="container">
            <Row
              className="d-flex align-items-center"
              style={{ height: "calc(100vh - 0px)", padding: "0" }}
            >
              <Col lg="6">
                <div>
                  <Image
                    className="mb-3"
                    src={require("../assets/images/logo.svg")}
                  />
                  <div
                    style={{
                      fontSize: "100px",
                      lineHeight: "120px",
                      fontWeight: 700,
                      color: "var(--primary)",
                    }}
                  >
                    404
                  </div>
                  <h1
                    style={{
                      fontSize: "50px",
                      lineHeight: "55px",
                      fontWeight: 700,
                      color: "rgba(0, 0, 0, 0.75)",
                    }}
                  >
                    Page Not Found!
                  </h1>
                  <p
                    className="my-2"
                    style={{
                      fontSize: "20px",
                      lineHeight: "28px",
                      fontWeight: 500,
                      color: "rgba(0, 0, 0, 0.75)",
                    }}
                  >
                    We are sorry the page you have requested could not found.
                    You can click the below button to go back to the home page.
                  </p>
                </div>
              </Col>
              <Col lg="6">
                <div className="d-flex align-items-center justify-content-center">
                  <Image
                    className="mb-3"
                    src={require("../assets/images/bird404.svg")}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Custom404;
