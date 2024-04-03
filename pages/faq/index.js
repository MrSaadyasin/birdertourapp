import PageLayout from "../../Compoments/Layout/PageLayout";
import { Accordion, Container } from "react-bootstrap";
import style from "./FAQ.module.css";
import Image from "next/image";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const FAQ = () => {
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
        document.getElementById("myTopnav").style.backgroudColor = "";
        document.getElementById("myTopnav1").style.backgroundColor = "";
      }
    });
  }, []);
  return (
    <>
      <PageLayout color={"#1b847a"} footer={true}>
        <section className={style.TermCondition} style={{ marginTop: "80px" }}>
          <Container className="my-lg-5 my-0 pb-5 py-lg-5 px-4 px-lg-3 FAQ">
            <h1 className="mb-4">Frequently Asked Questions</h1>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  {t("FAQquestionone")}
                </Accordion.Header>
                <Accordion.Body>
                  {t("FQAanswerone")}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  {t("FAQquestiontwo")}
                </Accordion.Header>
                <Accordion.Body>
                  {t("FQAanswertwo")}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  {t("FAQquestionthree")}
                </Accordion.Header>
                <Accordion.Body>
                 {t("FQAanswerthree")}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  {t("FAQquestionfour")}
                </Accordion.Header>
                <Accordion.Body>
                  {t("FAQanswerfour")}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>
                  {t("FAQquestionfive")}
                </Accordion.Header>
                <Accordion.Body>
                  {t("FAQanswerfive")}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Container>
        </section>
      </PageLayout>
    </>
  );
};
export default FAQ;
