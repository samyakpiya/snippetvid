import React from "react";
import LandingPageNavBar from "@/app/(website)/_components/navbar";
import { Footer } from "./_components/footer";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="flex flex-col px-10 py-10 xl:px-0 container ">
        <LandingPageNavBar />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
