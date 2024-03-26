import React, { FC } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const ContentLayout: FC<IContentProps> = ({ children, userLoggedIn }) => {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between bg-primary-foreground`}>
      <Header userLoggedIn={userLoggedIn} />
      {children}
      <Footer />
    </main>
  );
};

export default ContentLayout;
