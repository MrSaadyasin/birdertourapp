import Image from "next/image";
import Link from "next/link";
import React from "react";
import style from "./Header.module.css";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import Logo from "../../../assets/images/earthLogo.png";
import LogoBlack from "../../../assets/images/blackLogo.png";
import Avatar from "../../../assets/images/avatar.png";
import Notification from "../../../Compoments/icons/Notification";

const HeaderDashboard = () => {
  return (
    <Navbar
      expand="lg"
      className={`fixed-top ${style.topbar__menu}`}
      id="myTopnav"
    >
      <Container fluid className="px-0">
        <Link href={'/'}>
          <Image src={Logo} alt="Picture of the author" />
        </Link>

        <div className="d-flex align-items-center">
          <div id="dropdown-basic" className={`p-1 mx-2 ${style.notification}`}>
            <Notification />
          </div>

          <div className={`p-0 ${style.avatar}`}>
            <div
              className={`d-flex align-items-center border p-1 ${style.menuBorder}`}
            >
              <Image
                src={Avatar}
                width={35}
                heifgt={35}
                alt="User Avatar image"
              />
              <div className="mx-2 text-left" style={{ lineHeight: "15px" }}>
                <div className="mb-0 text-small text-capitalize">Sikandar</div>
                <small className="mb-0">sikandar@techmatetech.com</small>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default HeaderDashboard;
