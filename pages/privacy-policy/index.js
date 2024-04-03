import Link from "next/link";
import PageLayout from "../../Compoments/Layout/PageLayout";
import { Container } from "react-bootstrap";
import style from "./PrivacyPolicy.module.css";
import { useTranslation } from "react-i18next";

const TermCondition = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageLayout color={"#1b847a"} footer={true}>
        <section className={style.TermCondition} style={{ marginTop: "110px" }}>
          <Container className="my-lg-5 my-0 pb-5 py-lg-5 px-4 px-lg-3">
            <h1>{t("PrivacyPolicyheading")}</h1>
            <p>{t("Lastupdated")}</p>

            <p>
              {t("paragraph")}
            </p>
            <p>
              {t("paragraph2")}{" "}
              <Link
                target="_blank"
                href={
                  "https://www.freeprivacypolicy.com/free-privacy-policy-generator/"
                }
              >
                {t("PrivacyGenerator")}
              </Link>
            </p>

            <h1>{t("Interpretation and Definitions")}</h1>
            <p>
              {t("Interpretationparagraph")}
            </p>
            <h1>{t("Definitions")}</h1>

            <p>{t("purposesPrivacyPolicy")}</p>
            <ul>
              <li>
                <strong>{t("Account")} </strong> {t("Accountparagraph")}
              </li>
              <li>
                <strong>{t("Affiliate")} </strong>{t("affilateprivacyparagraph")}
              </li>
              <li>
                <strong>{t("Company")}</strong> {t("companyparagraphy")}
              </li>
              <li>
                <strong>{t("Cookies")} </strong> {t("cookieparagraph")}
              </li>

              <li>
                <strong>{t("Country")} </strong>{t("Countryparagraph")}
              </li>
              <li>
                <strong>{t("Device")} </strong> {t("Deviceparagraph")}
              </li>

              <li>
                <strong>{t("Data")} </strong>{t("dataparagraph")}
              </li>
              <li>
                <strong>{t("Service")} </strong> {t("referstotheWebsite")}
              </li>
              <li>
                <strong>{t("ServiceProvider")}</strong> {t("ServiceProviderParagraph")}
              </li>

              <li>
                <strong>{t("Third-party Social Media Service")} </strong> {t("thirdpartyprivacy")}
              </li>

              <li>
                <strong>{t("Usage Data")} </strong>{t("usagedataparagraph")}
              </li>
              <li>
                <strong>{t("Website")} </strong> {t("websiteprivacyparagraph")}&nbsp;
                <Link href={"https://earthbirder.com/"} target="_blank">
                  {t("https://earthbirder.com/")}
                </Link>
              </li>
              <li>
                <strong>{t("You")} </strong> {t("youparagraph")}
              </li>
            </ul>

            <h1>{t("PersonalData")}</h1>
            <h1>{t("Types of Data Collected")}</h1>
            <h1>{t("Personal Data")}</h1>
            <p>
              {t("Datacollectedparagraph")}
            </p>
            <ul>
              <li>{t("email")}</li>
              <li> {t("fname,lname")} </li>
              <li>{t("number")}</li>
              <li>{t("address")}</li>
              <li>{t("Usage Data")}</li>
            </ul>
            <h1>{t("Usage Data")}</h1>

            <p>{t("Usagedataparagraph1")}</p>
            <p>
            {t("Usagedataparagraph2")}
            </p>
            <p>
              {t("Usagedataparagraph3")}
            </p>
            <p>
              {t("Usagedataparagraph4")}
            </p>

            <h1>{t("InformationThird-Party")}</h1>
            <p>
              {t("InformationThird-Partyparagraph1")}
            </p>
            <ul>
              <li>{t("Google")}</li>
              <li>{t("Facebook")}</li>
              <li>{t("Instagram")}</li>
              <li>{t("Twitter")}</li>
              <li>{t("LinkedIn")}</li>
            </ul>
            <p>
              {t("InformationThird-Partyparagraph2")}
            </p>
            <p>
              {t("InformationThird-Partyparagraph3")}
            </p>
            <h1>{t("TrackingTechnologies")}</h1>
            <p>
            {t("TrackingTechnologiesparagraph")}
            </p>

            <ul>
              <li>
                <strong>{t("Cookies or Browser Cookies.")}</strong> {t("cookiespara")}
              </li>
              <li>
                <strong>{t("Web Beacons.")}</strong> {t("Webbeaconspara")}
              </li>
            </ul>
            <p>
              {t("Webbeaconspara1")}{" "}
              <Link
                target="_blank"
                href={
                  "https://www.freeprivacypolicy.com/blog/sample-privacy-policy-template/#Use_Of_Cookies_And_Tracking"
                }
              >
                {t("FreePolicy")}
              </Link>{" "}
              {t("article")}
            </p>
            <p>
              {t("Webbeaconspara2")}
            </p>

            <ul>
              <li>
                <strong>{t("Necessary")}</strong>
                <p className="my-0">{t("Type")}</p>
                <p className="my-0">{t("Administered by: Us")}</p>
                <p className="mt-0">
                  {t("necessarypara")}
                </p>
              </li>
              <li>
                <strong>{t("CookiesPolicy")}</strong>{" "}
                <p className="my-0">{t("Type: Persistent Cookies")}</p>
                <p className="my-0">{t("Administered by: Us")}</p>
                <p className="mt-0">
                  {t("CookiesPolicypara")}
                </p>
              </li>
              <li>
                <strong>{t("Functionality Cookies")}</strong> 
                <p className="my-0">{t("Type: Persistent Cookies")}</p>
                <p className="my-0">{t("Administered by: Us")}</p>
                <p className="mt-0">
                  {t("FunctionalityCookiepara")}
                </p>
              </li>
            </ul>
            <p>
              {t("FunctionalityCookiepara2")}
            </p>

            <h1>{t("UsePersonalData")}</h1>
            <p>{t("UsePersonalDatapara")}</p>
            <ul>
              <li>
                <strong>{t("maintainService")}</strong> {t("ourService")}
              </li>
              <li>
                <strong>{t("TomanageAccount")} </strong> {t("TomanageAccountpara")}
              </li>
              <li>
                <strong>{t("performancecontract")} </strong> {t("performancecontractpara")}
              </li>
              <li>
                <strong>{t("contactYou")} </strong> {t("contactYoupara")}
              </li>
              <li>
                <strong>{t("provideYou")} </strong> {t("provideYoupara")}
              </li>
              <li>
                <strong>{t("Torequests")} </strong> {t("Torequestspara")}
              </li>
              <li>
                <strong>{t("Forbusiness")} </strong> {t("Forbusinesspara")}
              </li>
              <li>
                <strong>{t("otherpurposes")}</strong> {t("otherpurposespara")}
              </li>
            </ul>

            <p>
              {t("otherpurposespara1")}
            </p>
            <ul>
              <li>
                <strong>{t("WithServiceProviders")} </strong> {t("WithServiceProviderspara")}
              </li>
              <li>
                <strong> {t("Forbusiness")} </strong> {t("Forbusiness1")}</li>
              <li>
                <strong> {t("WithAffiliates")} </strong> {t("WithAffiliatespara")}
              </li>
              <li>
                <strong> {t("businesspartners")} </strong> {t("businesspartnerspara")}
              </li>
              <li>
                <strong> {t("otherusers")}</strong> {t("otheruserspara")}
              </li>
              <li>
                <strong> {t("consent")} </strong> {t("consentpara")}
              </li>
            </ul>

            <h1>{t("RetentionPersonalData")}</h1>
            <p>
              {t("RetentionPersonalDatapara")}
            </p>
            <p>
              {t("RetentionPersonalDatapara2")}
            </p>

            <h1>{t("TransferPersonalData")}</h1>
            <p>
              {t("TransferPersonalDatapara1")}
            </p>
            <p>{t("TransferPersonalDatapara2")}</p>
            <p>
              {t("TransferPersonalDatapara3")}
            </p>

            <h1>{t("DeletePersonalData")}</h1>
            <p className="mb-2">
              {t("DeletePersonalDatapara1")}
            </p>

            <p className="mb-2">
            {t("DeletePersonalDatapara2")}
            </p>

            <p className="mb-2"> {t("DeletePersonalDatapara3")}
            </p>

            <p>
              {t("DeletePersonalDatapara4")}
            </p>

            <h1>{t("DisclosurePersonalData")}</h1>
            <h1>{t("BusinessTransactions")}</h1>
            <p>
              {t("DisclosurePersonalDatapara")}
            </p>

            <h1>{t("Law")}</h1>
            <p>
              {t("Lawpara")}
            </p>
            <h1>{t("legalrequirements")}</h1>
            <p>
              {t("legalrequirementspara")}
            </p>
            <ul>
              <li>{t("legalrequirementspoint1")}</li>
              <li>{t("legalrequirementspoint2")}</li>
              <li>
                {t("legalrequirementspoint3")}
              </li>
              <li>
                {" "}
                {t("legalrequirementspoint4")}
              </li>
              <li>{t("legalrequirementspoint5")}</li>
            </ul>
            <h1>{t("SecurityPersonalData")}</h1>
            <p>
              {t("SecurityPersonalDatapara")}
            </p>

            <h1>{t("ChildrensPrivacy")}</h1>
            <p>
              {t("ChildrensPrivacypara")}
            </p>
            <p>
              {t("ChildrensPrivacypara1")}
            </p>
            <h1>{t("LinkstoOtherWebsites")}</h1>
            <p>
              {t("LinkstoOtherWebsitespara")}
            </p>
            <p>
              {t("LinkstoOtherWebsitespara1")}
            </p>

            <h1>{t("ChangePrivacyPolicy")}</h1>
            <p className="mb-2">
              {t("ChangePrivacyPolicypara1")}
            </p>
            <p className="mb-2">
              {t("ChangePrivacyPolicypara2")}
            </p>
            <p className="mb-2">
              {t("ChangePrivacyPolicypara3")}
            </p>
            <h1>{t("ContactUs")}</h1>
            <p>
              {t("contactuspara")}
            </p>

            <p>
              {t("By email:")}{" "}
              <Link href="mailto:info@earthbirder.com">
                {t("info@earthbirder.com")}
              </Link>
            </p>
          </Container>
        </section>
      </PageLayout>
    </>
  );
};
export default TermCondition;
