import React from "react";
import HeaderDashboard from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../../Layout/Header";
import { useMediaQuery } from "usehooks-ts";

const DashboardLayout = ({ children }) => {
  const isMobileDevice = useMediaQuery("(max-width:991px)");
  return (
    <>
      {/*<HeaderDashboard />*/}
        <Header menu={true} color={"#1b847a"} dashborad = {true} />
      <section className="d-lg-flex" style={{paddingTop:70, height: !isMobileDevice && 'calc(100vh - 0px)'}}>
        <Sidebar />
        <div style={{marginLeft:  !isMobileDevice && '280px', flex:1}} className="innerPageWrapper">{children}</div>
      </section>
    </>
  );
};  

export default DashboardLayout;
