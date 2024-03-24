import React from "react";

import { Inter } from "next/font/google";
import type { NextPage, GetServerSideProps } from "next/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useUserAgent } from "next-useragent";

const inter = Inter({ subsets: ["latin"] });

const Jobs: NextPage = () => {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}>jobs page</main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale, req }) => {
  const ua = useUserAgent(`${req.headers["user-agent"]}`);

  return {
    props: {
      ua,
      ...(await serverSideTranslations(`${locale}`, ["common"])),
    },
  };
};

export default Jobs;
