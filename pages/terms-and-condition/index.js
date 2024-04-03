import Link from "next/link";
import PageLayout from "../../Compoments/Layout/PageLayout";
import { Container } from "react-bootstrap";
import style from "./TermCondition.module.css";
import ReactHtmlParser from "react-html-parser";
import { adminGetTerms } from "../../constants/endpoint.constants";


import { useTranslation } from "react-i18next";
import moment from "moment";
const TermCondition = (props) => {
  console.log('props',props)
  const { terms } = props;

  const { t } = useTranslation(); 
  return (
    <>
      <PageLayout color={"#1b847a"} footer={true}>
        <section className={style.TermCondition} style={{ marginTop: "110px" }}>
          <Container className="my-lg-3 my-0 pb-5 py-lg-5 px-4 px-lg-3">
            <h1>Terms and Conditions</h1>
            <p>Last updated :  {moment(terms.termsCondition[0].updatedAt).format("MMM Do YYYY")}</p>
            {terms.termsCondition && terms.termsCondition.length > 0 && ReactHtmlParser(terms.termsCondition[0].terms_condition)}
          </Container>
        </section>
      </PageLayout>
    </>
  );
};
export default TermCondition;
export async function getServerSideProps() {
  try {
    const termsRes = await fetch(adminGetTerms, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },

    });
    const terms = await termsRes.json()
    return {
      props: {
        terms: terms,
      },
    };
  } catch (e) {
    console.log('e',e)
    return {
      props: {
        terms: [],
      },
    };
  }
}
