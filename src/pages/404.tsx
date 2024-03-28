import React from "react";

import type { NextPage } from "next";

import Error from "@/components/Error";

const CustomErrorPage: NextPage = () => {
  return <Error status={404} ua={undefined} />;
};

export default CustomErrorPage;
