import { Modal } from "antd";
import Image from "next/image";
import style from "../../pages/tourDetails/TourDetail.module.css";
import { BadgeIcon, MapIcon, Star, VerifiedIcon } from "../icons";
import CardImage1 from "../../assets/images/cardImage.png";
import Carousel from "react-elastic-carousel";
import Testimonial from "../Testimonial/Testimonial";
const breakPoint1 = [
    {
      width: 1,
      itemsToShow: 1,
      itemsToScroll: 1,
    },
    {
      width: 550,
      itemsToShow: 2,
      itemsToScroll: 1,
    },
    {
      width: 750,
      itemsToShow: 2,
      itemsToScroll: 1,
    },
    {
      width: 1150,
      itemsToShow: 2,
      itemsToScroll: 1,
    },
  ];
export const VendorDetailModal = ({vendor,feedbacks ,modal2Open, setModal2Open }) => {
  return (
    <div>
      <Modal
        centered
        width={800}
        height={550}
        style={{ overflowY: "auto" }}
        footer={false}
        open={modal2Open}
        fChoose
        Date
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        <div className="py-lg-4 px-lg-3">
          <div className="text-center py-2">
            <div className="d-inline-block text-center justify-content-between">
              <div className="position-relative">
                <Image
                  src={
                    vendor?.profile_image
                      ? vendor?.profile_image
                      : CardImage1
                  }
                  alt="Table image"
                  className={style.imageTable1}
                  width={100}
                  height={100}
                />
                <span className={style.badge}>
                  <BadgeIcon />
                </span>
              </div>
            </div>
          </div>
          <div className="text-center mt-lg-1">
            <h1 className={`p-0 mb-1 ${style.table__title}`}>
              <strong>{vendor?.name}</strong>
            </h1>
            <div className="d-lg-flex align-items-center justify-content-center">
              <div className={style.info}>
                <Star />
                &nbsp;{" "}
                {vendor?.rating
                  ? vendor?.rating
                  : 0}{" "}
                Reviews
              </div>
              <div className={style.info}>
                <VerifiedIcon />
                &nbsp; Identity Verified
              </div>
            </div>
          </div>

          <div className="mt-3">
            <h1 className={`p-0 mb-1 ${style.table__title}`}>
              <strong>About {vendor?.name} </strong>
            </h1>
            <div>
              <MapIcon /> location Static
            </div>
            <div className="my-2">
              {vendor?.description !== "undefined" &&
                vendor?.description}
            </div>
          </div>

          {vendor?.document && (
            <div className="my-5">
              <h1 className={`p-0 mb-2 ${style.table__title}`}>
                <strong>
                  About {vendor?.name} Certifications{" "}
                </strong>
              </h1>
              <div className="row">
                {vendor?.documents?.map((doc, index) => {
                  return (
                    <div className="col-lg-6" key={index}>
                      <div
                        className="d-flex align-items-center border p-2"
                        style={{ borderRadius: "8px" }}
                      >
                        <Image
                          src={PDF}
                          alt="pdf"
                          style={{ height: "50px", maxWidth: "50px" }}
                        />
                        <div className="mx-2 d-flex align-items-center">
                          <div className="me-4">
                            <div>
                              <strong>Certificate </strong>
                            </div>
                            <div className={style.text__muted}>
                              Issued Feb, 2019
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

         {feedbacks && feedbacks.length >0 && <div className="my-5 pb-4">
            <h1 className={`p-0 mb-2 ${style.table__title}`}>
              <strong>Testimonials </strong>
            </h1>
            <Carousel breakPoints={breakPoint1}>
              {feedbacks?.map((item, index) => (
                <Testimonial key={index} item={item} />
              ))}
            </Carousel>
          </div>}

          {/* {vendorDetailResponse?.vendorDetail?.tours &&
              vendorDetailResponse?.vendorDetail?.tours?.length > 0 && (
                <>
                  <div className="mb-5 pb-5">
                    <h2 className="mb-lg-4 text-capitalize">
                      Tours By {tourDetails.tours?.vendor?.name}
                    </h2>
                    <Slider tours={vendorDetailResponse?.vendorDetail} />
                  </div>
                </>
              )} */}
        </div>
      </Modal>
    </div>
  );
};
