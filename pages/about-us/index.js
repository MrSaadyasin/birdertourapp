import React from "react";
import PageLayout from "../../Compoments/Layout/PageLayout";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <PageLayout color="#1b847a" footer={true}>
      <section style={{ marginTop: "80px" }}>
        <Container className="my-3 py-5">
          <h1 className="my-3 pt-lg-3">
            <strong>{t("About Us")}</strong>
          </h1>
          <p style={{fontSize: '16px'}} className="my-4">
             {t("Aboutfirstparagraphcontent")}
          </p>

          <p style={{fontSize: '16px'}} className="my-4">
          {t("Aboutsecondparagraphcontent")}
          </p>

          <p style={{fontSize: '16px'}} className="my-4">
          {t("Aboutthirdparagraphcontent")}
          </p>

          <p style={{fontSize: '16px'}} className="my-4">
          {t("Aboutfourthparagraphcontent")}
          </p>
        </Container>
      </section>
    </PageLayout>
  );
};

export default AboutUs;
