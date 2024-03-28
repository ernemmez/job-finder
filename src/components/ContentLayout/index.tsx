import React, { FC } from "react";

import { useRouter } from "next/router";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { PAGE_MAP } from "@/lib/utils/pages";

const ContentLayout: FC<IContentProps> = ({ children, userLoggedIn, pagePath }) => {
  const { locale } = useRouter();
  const isJobsPage = pagePath === PAGE_MAP[`${locale}`].Jobs;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-primary-foreground">
      {!isJobsPage ? (
        <>
          <Header userLoggedIn={userLoggedIn} />
          {children}
          <Footer />
        </>
      ) : (
        <div className="w-full min-h-screen lg:flex">
          <div className="w-3/4">
            <Header userLoggedIn={userLoggedIn} />
            {children}
          </div>
          <div className="w-1/4">
            <Sidebar userLoggedIn={userLoggedIn} />
          </div>
        </div>
      )}
    </main>
  );
};

export default ContentLayout;
