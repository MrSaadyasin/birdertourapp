import { Star } from "../icons";
import style from "./TopVendor.module.css";
import Image from "next/image";
import Avatar from "../../assets/images/userP.svg";
import Lister from "../../assets/images/Lister.svg";
import SuperBirder from "../../assets/images/Super-Birder.svg";
import PDF from "../../assets/images/PDf.svg";
import ToursImag from "../../assets/images/picture-frame.svg";
import { useTranslation } from "react-i18next";
import {VendorDetailModal} from '../vendor/VendorDetailModal'
import {useState }from 'react'

const TopVendorCard = (props) => {
  const {profile_image, name, description, rating, address, documents, badge, total_tours } =
    props.vendor;
  console.log("card", props.vendor);
  const [modal2Open, setModal2Open] = useState(false);

  const { t } = useTranslation();
  return (
    <>
      <div className={`d-flex flex-column justify-content-between ${style.topVendorCard}`}>
        <div>
          {/* <span className={style.heart}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5996 5.62913L12 6.16426L12.4004 5.62913C13.3204 4.39934 14.7949 3.59961 16.44 3.59961C19.2315 3.59961 21.5 5.87341 21.5 8.68961C21.5 9.82523 21.3189 10.8734 21.0043 11.8457L21.0032 11.849C20.249 14.2357 18.7035 16.1592 17.0354 17.5929C15.365 19.0285 13.6004 19.9479 12.4589 20.3363L12.4589 20.3362L12.4536 20.3381C12.3537 20.3734 12.1893 20.3996 12 20.3996C11.8107 20.3996 11.6463 20.3734 11.5464 20.3381L11.5464 20.3381L11.5411 20.3363C10.3996 19.9479 8.635 19.0285 6.96465 17.5929C5.29649 16.1592 3.75096 14.2357 2.99676 11.849L2.99677 11.8489L2.99572 11.8457C2.68114 10.8734 2.5 9.82523 2.5 8.68961C2.5 5.87341 4.76848 3.59961 7.56 3.59961C9.2051 3.59961 10.6796 4.39934 11.5996 5.62913Z"
                fill="black"
                fillOpacity="0.25"
                stroke="white"
              />
            </svg>
          </span> */}
          <div className="p-lg-3 p-3">
            <div className="d-flex align-items-center">
              <div className={`me-2  ${style.imageContainer}`}>
              {profile_image !== '' && profile_image !== null ?<Image
                  src={profile_image}
                  alt={t("TopVendorImage")}
                  className="me-3"
                  width={60}
                  height={60}
                />:
                <Image
                  src={Avatar}
                  alt={t("TopVendorImage")}
                  className="me-3"
                  width={60}
                  height={60}
                />
             }
              </div>
              <div className="flex-1">
                <h3 className={style.name}>{name}</h3>
                <div className={style.address}>
                  <Star />
                  &nbsp;({rating}){" "}
                  {address && `. ${JSON.parse(address).address}`}
                </div>
              </div>
            </div>
            <div>
              {description !== "undefined" && description !== "" && (
                <div>
                  <div className={style.heading}>About</div>
                  <p className={style.paragraph}>{description}</p>
                </div>
              )}
              {badge && (
                <div className="d-flex">
                  <div className={style.heading}>Badge</div>
                  <div className={` mt-2 ms-3 ${style.badge}`}>
                    <Image
                      src={Lister}
                      alt="Top Vendor Image"
                      width={15}
                      height={15}
                    />{" "}
                  </div>
                </div>
              )}
              {/* <div className={style.heading}>Badges</div> */}
              {/* <div className="d-lg-flex justify-content-between">
              <div className={style.badge}>
                <Image
                  src={SuperBirder}
                  alt="Top Vendor Image"
                  width={20}
                  height={20}
                />{" "}
                Superbirder Badge
              </div>
              <div className={style.badge}>
                <Image
                  src={Lister}
                  alt="Top Vendor Image"
                  width={20}
                  height={20}
                />{" "}
                Lister Badge
              </div>
            </div> */}
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex text-center ">
            <div className={style.flex1}>
              <div>
                <Image
                  src={ToursImag}
                  alt="Top Vendor Image"
                  className="mb-1"
                />
              </div>
              <div className={style.noOfTours}> {total_tours} Tours</div>
            </div>
            <div className={style.flex1}>
              <div>
                {" "}
                <Image src={PDF} alt="Top Vendor Image" className="mb-1" />
              </div>
              <div className={style.noOfTours}>
                {documents.length} Certificates
              </div>
            </div>
          </div>
          <div className="text-center p-lg-3 p-3">
            <button className="btnPrimary w-100" onClick={()=>setModal2Open(true)}>View Profile</button>
          </div>
        </div>
      </div>
      <VendorDetailModal modal2Open={modal2Open} setModal2Open={setModal2Open} vendor={props?.vendor} feedbacks={[]}/>

    </>
  );
};
export default TopVendorCard;
