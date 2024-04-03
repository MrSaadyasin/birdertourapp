import PageLayout from "../../Compoments/Layout/PageLayout";
import { Col, Container, Row } from "react-bootstrap";
import style from "./TopVendors.module.css";
import Image from "next/image";
import { useEffect } from "react";
import TopVendorCard from "../../Compoments/TopVendorCard/TopVendor";
import { useTranslation } from "react-i18next";
import { topVendors } from "../../constants/endpoint.constants";
import axios from "axios";

const TopVendors = (props) => {
  const { t } = useTranslation();
  const {topVendors} = props
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
        <section className={style.TermCondition} style={{ marginTop: "140px" }}>
          <Container className="px-4">
            <h1 className=" mt-4 pt-3">{t("Topvendormainheading")}</h1>
            <p>{t("topvendormainparagraph")}</p>
            {/* "AtEarthBirder,wetakeimmenseprideinworkingwithexperiencedbird-watchingvendorswhoelevatetheartofavianexploration.Ourselectedtopvendorsstandoutbecauseoftheirunwaveringcommitmenttoprovidingunforgettableexperiencesthatenrichyourbird-watchingjourneys.":"في إيرث بيردر, نحن نفخر بشدة بالعمل مع بائعي مراقبة الطيور ذوي الخبرة الذين يرفعون مستوى فن استكشاف الطيور. يبرز أفضل البائعين المختارين لدينا بسبب التزامهم الثابت بتقديم تجارب لا تُنسى تُثري رحلات مراقبة الطيور الخاصة بك." */}

            <Row className="mt-5 ">
            {topVendors &&
                topVendors.map((vendor, i) => {
                  return (
                      <Col key={i} md={6} lg={3} className="mb-3" >
                        <TopVendorCard vendor={vendor}/>
                      </Col>
                  );
                })}
            </Row>
          </Container>
        </section>

        <section className={style.TermCondition}>
          <Container className="mb-lg-3 mt-lg-0 mb-0 mt-3 pb-5 py-lg-3 px-4 px-lg-3">
            <h1 className=" mt-4 pt-3">{t("What makes them Unique")}</h1>
            <p>
              {t(
                "They are at the top of their game for the following reasons,"
              )}
            </p>

            <h2>{t("Topvendormakethemuniqueheadingfirst")}</h2>
            <p>{t("Topvendormakethemuniqueparagraphfirst")}</p>

            <h2>{t("Topvendormakethemuniqueheadingsecond")}</h2>
            <p>{t("Topvendormakethemuniqueparagraphsecond")}</p>

            <h2>{t("Topvendormakethemuniqueheadingthird")}</h2>
            <p>{t("Topvendormakethemuniqueparagraphthird")}</p>

            <h2>{t("Topvendormakethemuniqueheadingfourth")}</h2>
            <p>{t("Topvendormakethemuniqueparagraphfourth")}</p>
            <h2>{t("Topvendormakethemuniqueheadingfifth")}</h2>
            <p>{t("Topvendormakethemuniqueparagraphfifth")}</p>
            <h2>{t("Topvendormakethemuniqueheadingsixth")}</h2>
            <p>{t("Topvendormakethemuniqueparagraphsixth")}</p>
            <h2>{t("Topvendormakethemuniqueheadingseventh")}</h2>
            <p>{t("Topvendormakethemuniqueparagraphseventh-one")}</p>
            <p>{t("Topvendormakethemuniqueparagraphseventh-two")}</p>
          </Container>
        </section>
      </PageLayout>
    </>
  );
};
export default TopVendors;

export async function getServerSideProps() {
  try {
    const vendorCall = await axios.get(topVendors);
    return {
      props: {
        topVendors: vendorCall.data.topVendors,
      },
    };
  } catch (error) {
    return {
      props: {
        terms: [],
      },
    };
  }
}
