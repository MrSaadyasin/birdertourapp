import PageLayout from "../../Compoments/Layout/PageLayout";
import { Container } from "react-bootstrap";
import style from "./EarthBirderAuthentic.module.css";
import Image from "next/image";
import { useEffect } from "react";

const EarthBirderAuthentic = () => {
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
      <PageLayout footer={true}>
        <section className={style.banner__section}>
          <div className={style.overlay}></div>

          <Image
            className={style.videoSection}
            src={require("../../assets/images/bgAuthentic.png")}
            type=""
          />

          <div>
            <h1>
            We take pride in providing a unique,{" "}
              <br className="d-none d-lg-block" /> authentic, and informative bird-<br className="d-none d-lg-block" />
              watching experience.
            </h1>
          </div>
        </section>

        <section className={style.TermCondition} style={{ marginTop: "80px" }}>
          <Container className="my-lg-5 my-0 pb-5 py-lg-5 px-4 px-lg-3">
            <div className="">
              <p
                style={{ width: "120px", borderTop: "1px solid #00000033" }}
              ></p>
            </div>

            <h1 className=" mt-4 pt-3">Is EarthBirder Authentic?</h1>
            <p>
              Yes, EarthBirder is a trustworthy partner for real birding
              experiences. We are aware that the number of platforms and offers
              in the digital realm can occasionally be overwhelming. You can
              rest assured that EarthBirder is not another spam website. We take
              pride in providing a unique, authentic, and informative
              bird-watching experience.
            </p>

            <div className="mt-5 pt-4">
              <p
                style={{ width: "120px", borderTop: "1px solid #00000033" }}
              ></p>
            </div>
            <h1 className=" mt-4 pt-3">Our Commitment to Authenticity</h1>
            <p>
              Our commitment to authenticity is rooted in several key aspects,
            </p>

            <h2>Expert Guides</h2>
            <p>
              Experience the thrill of bird-watching all around the world, from
              distant countries and lush rainforests to your own country&apos;s
              beautiful woodlands. We provide an extensive list of bird-watching
              sites categorized by proximity to your location or by your own
              choice. You may now begin a trip to discover the rich and exciting
              world of birds, no matter where you are.
            </p>

            <h2>Boundaries and Respect</h2>
            <p>
              Our knowledgeable vendors are more than simply guides; they are
              bird enthusiasts who contribute a wealth of avian expertise and
              know everything about bird-watching excursions. With their help,
              you&apos;ll gain insights that will go beyond the pages of guidebooks,
              improving your awareness of bird behavior, habitats, and
              conservation activities.
            </p>

            <h2>Personalized Experience</h2>
            <p>
              We recognize that your schedule may change, which is why
              EarthBirder allows you to customize your ideal bird-watching
              experience. You can select between half-day and full-day trips
              depending on whether you have a full day or only a few hours. This
              guarantees that your bird-watching adventure coincides with your
              interests and commitments.
            </p>
          </Container>
        </section>
      </PageLayout>
    </>
  );
};
export default EarthBirderAuthentic;
