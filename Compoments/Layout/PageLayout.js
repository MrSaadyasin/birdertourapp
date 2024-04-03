import React from "react";

import Header from "./Header";
import Footer from "./Footer";

// const PageLayout = ({ children, color, footer }) => {
  const PageLayout = (props) => {
  const {children, color, footer, setModalOpen = false, tours=[], setSearchTours, setSearch, discoverBirdRef= null, HomeScreen=false, HomeSearchBar = true} = props
  return (
    <>
      <Header menu={true} color={color} dashborad = {false} discoverBirdRef={discoverBirdRef} seacrhBar={HomeSearchBar} HomeScreen={HomeScreen} setModalOpen = {setModalOpen} tours={tours} setSearchTours={setSearchTours} setSearch={setSearch} />
      <main>{children}</main>
        {
            footer && <Footer />
        }

    </>
  );
};

export default PageLayout;
