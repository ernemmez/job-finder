import React, { FC } from "react";

import { useTranslation } from "next-i18next";

const JobsPage: FC<IJobsPageProps> = ({ pageData }) => {
  const { t } = useTranslation("common");

  console.log("jobs page data -->", pageData, t);

  return <div className="w-full h-full border p-12"></div>;
};

export default JobsPage;
