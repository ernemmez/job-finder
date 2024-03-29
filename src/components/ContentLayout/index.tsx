import React, { FC } from "react";

import { useRouter } from "next/router";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Dialog, DialogContent } from "@/components/ui";
import { useUserDevice } from "@/context/UserDeviceContext";
import { useJobsPageStore } from "@/lib/store/zustand";
import { PAGE_MAP } from "@/lib/utils/pages";

const ContentLayout: FC<IContentProps> = ({ children, userLoggedIn, pagePath }) => {
  const { locale } = useRouter();
  const isJobsPage = pagePath === PAGE_MAP[`${locale}`].Jobs;
  const { isMobile } = useUserDevice();
  const { showAppliedJobs, setShowAppliedJobs } = useJobsPageStore();

  return (
    <main
      className={`flex ${!isJobsPage && "min-h-screen"} flex-col items-center justify-between bg-primary-foreground`}
    >
      {!isJobsPage ? (
        <>
          <Header userLoggedIn={userLoggedIn} />
          {children}
          <Footer />
        </>
      ) : (
        <div className="w-full lg:flex">
          {isMobile ? (
            <>
              <Header userLoggedIn={userLoggedIn} />
              {children}
              <Dialog open={showAppliedJobs} onOpenChange={() => setShowAppliedJobs(false)}>
                <DialogContent className="lg:max-w-auto lg:min-w-[425px] max-w-[325px] rounded-md">
                  <Sidebar userLoggedIn={userLoggedIn} />
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <>
              <div className="w-full lg:h-[100vh] lg:w-3/4">
                <Header userLoggedIn={userLoggedIn} />
                {children}
              </div>
              <div className="lg:w-1/4 lg:h-[100vh]">
                <Sidebar userLoggedIn={userLoggedIn} />
              </div>
            </>
          )}
        </div>
      )}
    </main>
  );
};

export default ContentLayout;
