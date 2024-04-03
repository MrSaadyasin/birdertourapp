import PageLayout from "../../Compoments/Layout/PageLayout";
import { Col, Container, Row } from "react-bootstrap";
import style from "./TopTours.module.css";
import Image from "next/image";
import { useEffect } from "react";
import TopToursCard from "../../Compoments/TopTourCard/TopTours";
import { useTranslation } from "react-i18next";
import { allTours, topToursApi } from "../../constants/endpoint.constants";
import axios from "axios";

const TopTours = (props) => {
  const { topTours } = props
  const { t } = useTranslation();
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
  return (
    <>
      <PageLayout color={"#1b847a"} footer={true}>
        <section className={style.TermCondition} style={{ marginTop: "110px" }}>
          <Container className="px-4">
            <h1 className=" mt-lg-4 pt-lg-3">
              {t("Toptoursmainheading")}
            </h1>
            <p>
              {t("Toptoursmainparagraph")}
            </p>
            <Row className="mt-5">
              {topTours && topTours.map((tour, i) => {
                return (
                    <Col key={i} md={6} lg={3} className="mb-3">
                      <TopToursCard margin="0" tour={tour}/>
                    </Col>
                )
              })}

            </Row>
          </Container>
        </section>

        <section className={style.TermCondition}>
          <Container className="mb-lg-5 mt-lg-0 mb-0 mt-3 pb-5 py-lg-3 px-4 px-lg-3">

            <h1 className=" mt-4 pt-3">{t("What makes them Unique")}</h1>
            <p>{t("somereasonsoftoptour")}</p>

            <h2>{t("Toptourssubheading-one")}</h2>
            <p>
              {t("Toptoursparagraph-one")}
            </p>

            <h2>{t("Toptourssubheading-two")}</h2>
            <p>
              {t("Toptoursparagraph-two")}
            </p>

            <h2>{t("Toptourssubheading-three")}</h2>
            <p>
              {t("Toptoursparagraph-three")}
            </p>

            <h2>{t("Toptourssubheading-four")}</h2>
            <p>
              {t("Toptoursparagraph-four")}
            </p>

            <p>
              {t("Toptoursparagraph-five")}
            </p>
          </Container>
        </section>
      </PageLayout>
    </>
  );
};

export async function getServerSideProps() {
  try {
    const tourCall = await axios.get(topToursApi);
    return {
      props: {
        topTours: tourCall.data.tours,
      },
    };
  } catch (error) {
    console.log(error.message)
    return {
      props: {
        topTours: [],
      },
    };
  }
}
export default TopTours;
