import React, { useEffect, useState } from "react";
import PageLayout from "../../Compoments/DashboardLayout/DashboardLayout/DashboardLayout";
import style from "./Wishlist.module.css";
import { Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import { allTours, wishListTours } from "../../constants/endpoint.constants";
import WishListCard from "../../Compoments/Slider/WishList";
import { connect } from "react-redux";
import { addTourWishList } from "../../Redux/auth/action";
import { Toaster } from "../../extras/constants";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import NoTours from '../../assets/images/NoToursWishList.svg'

const Wishlists = (props) => {
  const [loading, setLoading] = useState(false);
  const [wishListTour, setWishListTour] = useState(
    props?.wishlists?.length > 0 ? [...props?.wishlists] : []
  );
  const handleLike = async (event, id) => {
    event.preventDefault();
    try {
      const data = {
        tour_id: id,
      };
      if (props?.userAuthReducer?.access_token) {
        const addWishList = await props?.dispatch(
          addTourWishList(data, props?.userAuthReducer?.access_token)
        );
        setLoading(true);
        toast.success(addWishList.payload.data?.message, Toaster);
      } else {
        toast.error("You are not logged in.", Toaster);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllWishTour = async () => {
    try {
      const getAllWishlists = await axios.get(wishListTours, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          Authorization: `Bearer ${props?.userAuthReducer?.access_token}`,
        },
      });

      setLoading(false);
      setWishListTour(
        getAllWishlists.data?.wishlists?.length > 0
          ? [...getAllWishlists.data?.wishlists]
          : []
      );
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (loading) {
      getAllWishTour();
    }
  }, [loading]);

  return (
    <PageLayout color="#1b847a">
      <div className="">
        <p className={style.breadCrumb}>
          <Link style={{ color: "var(--primary)" }} href="/">
            Home
          </Link>{" "}
          / Wishlists{" "}
        </p>
        <h2 className="mb-0"><strong>Wishlists</strong></h2>
      </div>
      <Row className="my-4">
        {wishListTour.length > 0 ? (
          wishListTour?.map((item, index) => {
            return (
              <Col lg={6} xl={3} className="mb-4" key={index}>
                <WishListCard
                  margin="0"
                  tour={item?.tour}
                  handleLike={handleLike}
                />
              </Col>
            );
          })
        ) : (
          <>
           <div className="d-flex align-items-center justify-content-center my-lg-5 py-5">
            <div className="text-center">
              <Image
                src={NoTours}
                className="img-fluid mb-4"
                alt="no tours found."
              />
              <h2>
                <strong>Nothing in Wishlist!</strong>
              </h2>
              <p>There are no tours saved by you!</p>
            </div>
          </div>
          </>
        )}
      </Row>
    </PageLayout>
  );
};

// export default Wishlists;
const mapStoreProps = (state) => {
  return state;
};

export default connect(mapStoreProps)(Wishlists);

export async function getServerSideProps(context) {
  const get = context.req.cookies["access_token"];
  if (get) {
    const getAllWishlist = await axios.get(wishListTours, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        Authorization: `Bearer ${get}`,
      },
    });

    return {
      props: getAllWishlist.data,
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
}
