import React, { useEffect } from "react";
import style from "./Footer.module.css";
import { Accordion, Col, Row } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/images/earthLogo.png";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
 
  // useEffect(() => {
  //   setTimeout(() => {
  //     function googleTranslateElementInit() {
  //       try {
  //         new google.translate.TranslateElement(
  //           {
  //             pageLanguage: "en",
  //             apiKey: process.env.GOOGLETRANSLATE,
  //             multilanguagePage: true,
  //           }, // Set the default language here
  //           "google-translate-widget"
  //         );
  //       } catch (e) {
  //         return;
  //       }
  //     }
  //     if (typeof google !== "undefined") {
  //       googleTranslateElementInit();
  //     } else {
  //       // Load the Google Translate widget script
  //       const googleTranslateScript = document.createElement("script");
  //       googleTranslateScript.type = "text/javascript";
  //       googleTranslateScript.src = `https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
  //       googleTranslateScript.async = true;
  //       document.body.appendChild(googleTranslateScript);
  //     }
  //   }, [2000]);
  //   // Google Translate widget initialization
  // }, []);

  return (
    <>
      <footer className={`footerSection ${style.footer__section}`}>
        <Row className="">
          <div className="d-flex align-items-center mb-5 mb-lg-0 justify-content-center"> 
          <Link className="" href={"/"} style={{ zIndex: "99" }}>
            <Image src={Logo} height={40} alt="Picture of the author" />
          </Link>
          </div>
          <Col lg={8} md={8} xl={6} className="mx-auto text-lg-center mt-lg-5">
            <Row>
              <Col md={4} lg={4}>
                <ul>
                <li>
                    <Link href="/top-tours">{t("TopTours")}</Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">{t("PrivacyPolicy")}</Link>
                  </li>
                 </ul>
               </Col> 
              <Col md={4} lg={4}>
                <ul>
                  <li>
                    <Link href="/terms-and-condition">{t("TermsCondition")}</Link>
                  </li>
                  <li>
                    <Link href="/top-vendors">{t("TopVendors")}</Link>
                  </li>
                  <li>
                    <Link href="/about-us">{t("AboutUs")}</Link>
                  </li>
                </ul>
              </Col>
              <Col md={4} lg={4}>
                <ul>
                  <li>
                    <Link href="/faq">{t("FAQs")}</Link>
                  </li>
                  <li>
                    <Link  href={'/blogs'}>{t("Blogs")}</Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="d-flex align-items-center justify-content-center mt-lg-5 pt-1"></div>
        <div className="d-lg-flex align-items-center mt-lg-0 mt-4 text-center text-md-left">
          <div className={style.footer__copyright}>
            <p className="mb-lg-0">
              {t("AllCopyrightsreservedText")}
            </p>
          </div>
          <div>
            <div id="google-translate-widget" />
          </div>
       
        </div>
      </footer>
    </>
  );
};

export default Footer;
