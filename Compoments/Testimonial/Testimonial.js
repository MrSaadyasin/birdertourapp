import React from "react";
import style from "./Testimonial.module.css";
import { Card } from "react-bootstrap";
import Image from "next/image";
import { Star } from "../icons";
import UserAvatar from "../../assets/images/userAvatar.png"
import { Rate } from "antd";
const Testimonial = ({item}) => {
  return (
    <>
      <div className={style.link}>
        <Card.Body className={style.card__body}>
          <div className="d-flex align-items-center mb-3 ">
            <Image src={UserAvatar} alt="user avatar"  />
            <h6 className="mx-2 mb-0" style={{fontWeight: 600}}>{item?.user?.name}</h6>
          </div>
          <p className={style.description}>
            {item?.comment}
          </p>
          <Rate value={item?.rating} />
        </Card.Body>
      </div>
    </>
  );
};

export default Testimonial;
