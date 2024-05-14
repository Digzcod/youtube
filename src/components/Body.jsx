import React from "react";
import {SideBar, SideBarIcons} from "./SideBar";

import VideosContainer from "./VideosContainer";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Head from "./Head";

const Body = () => {
  const isMenuDrawerOpen = useSelector((state) => state.appMenu.isMenuOpen);

  return (
    <>
    <Head/>
    <section className="w-full flex">
      {isMenuDrawerOpen ? (
        <div className="w-[15rem] h-screen shadow-md">
          <SideBar />
        </div>
      ) : <SideBarIcons/>}
      <div className="w-screen px-[2rem]">
        <Outlet/>
      </div>
    </section>
  </>
  );
};

export default Body;
