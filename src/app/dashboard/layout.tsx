import MarginWidthWrapper from "@/components/ui/dashboard/margin-width-wrapper";
import PageWrapper from "@/components/ui/dashboard/page-wrapper";
import Navbar from "@/components/ui/dashboard/navbar/Navbar";
import NavbarMobile from "@/components/ui/dashboard/navbar/NavbarMobile";
import Sidebar from "@/components/ui/dashboard/sidebar/Sidebar";
import React from "react";

function layout({ children }:any) {
  return (
    <div className="flex w-full">
      <div className="">
        <Sidebar/>
      </div>
      <div className="flex-row w-full">
      <MarginWidthWrapper>
        <Navbar/>
        <NavbarMobile/>
        <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
      </div>
    </div>
  );
}

export default layout;
