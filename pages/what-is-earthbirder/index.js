import PageLayout from "../../Compoments/Layout/PageLayout";
import { Container } from "react-bootstrap";
import style from "./EarthBirderAbout.module.css";
import Image from "next/image";
import { useEffect } from "react";

const EarthBirderAbout = () => {
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
            src={require("../../assets/images/bgEarthbirder.png")}
            type=""
          />

          <div>
            <h1>
              Explore the extraordinary beauty of{" "}
              <br className="d-none d-lg-block" /> our feathered friends with th
              e help of <br className="d-none d-lg-block" />
              our experts.
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

            <h1 className=" mt-4 pt-3">Welcome to EarthBirder</h1>
            <p>
              We are passionate about connecting bird enthusiasts with the
              awe-inspiring beauty of birds in their natural habitats at
              EarthBirder. Our platform is designed to give you an unforgettable
              bird-watching experience by combining global reach with local
              convenience.
            </p>
            <p>
              We invite you to join us on a remarkable adventure that goes
              beyond traditional bird-watching with EarthBirder. Explore the
              extraordinary beauty of our feathered friends with the help of our
              experts who are dedicated to enriching your encounters and making
              them unforgettable for you.
            </p>
            <p>
              EarthBirder promises a tailored and immersive experience that
              aligns perfectly with your interests and schedule, whether you&apos;re
              a curious newcomer seeking your first glimpse of a rare species or
              a dedicated birder in search of new horizons. We are here to help
              you.
            </p>
            <div className="mt-5 pt-4">
              <p
                style={{ width: "120px", borderTop: "1px solid #00000033" }}
              ></p>
            </div>
            <h1 className=" mt-4 pt-3">What makes us Unique</h1>
            <p>Here are a few things that make us unique,</p>

            <h2>Global Reach, Local Convenience</h2>
            <p>
              Experience the thrill of bird-watching all around the world, from
              distant countries and lush rainforests to your own country&apos;s
              beautiful woodlands. We provide an extensive list of bird-watching
              sites categorized by proximity to your location or by your own
              choice. You may now begin a trip to discover the rich and exciting
              world of birds, no matter where you are.
            </p>

            <h2>Expert Guides at Your Service</h2>
            <p>
              Our knowledgeable vendors are more than simply guides; they are
              bird enthusiasts who contribute a wealth of avian expertise and
              know everything about bird-watching excursions. With their help,
              you&apos;ll gain insights that will go beyond the pages of guidebooks,
              improving your awareness of bird behavior, habitats, and
              conservation activities.
            </p>

            <h2>Your Time, Your Way</h2>
            <p>
              We recognize that your schedule may change, which is why
              EarthBirder allows you to customize your ideal bird-watching
              experience. You can select between half-day and full-day trips
              depending on whether you have a full day or only a few hours. This
              guarantees that your bird-watching adventure coincides with your
              interests and commitments.
            </p>

            <h2>Join the Bird-Watching Revolution</h2>
            <p>
              Whether you&apos;re a beginner looking for your first sighting of a
              rare species or an experienced birder looking for new challenges,
              EarthBirder invites you to join us in enjoying the joy of
              bird-watching. Our platform is about interaction, education, and
              respect for the natural world, not just observation. Book your
              bird-watching vacation with EarthBirder today and let our skilled
              guides help you make memories that will last a lifetime.
            </p>

            <p>
              The sky is full of possibilities at EarthBirder, and every flutter
              of bird wings is a new novel waiting to be written.
            </p>

            <p>
              Welcome to a world where birds and humans coexist together and
              where nature&apos;s splendor unfolds before your eyes.
            </p>
          </Container>
        </section>
      </PageLayout>
    </>
  );
};
export default EarthBirderAbout;
