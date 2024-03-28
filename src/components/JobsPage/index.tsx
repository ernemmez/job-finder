import React, { FC } from "react";

import { useTranslation } from "next-i18next";

import Result from "@/components/Result";

const JobsPage: FC<IJobsPageProps> = ({ pageData }) => {
  const { t } = useTranslation("common");
  let jobs = pageData.data;

  console.log("jobs page data -->", pageData, t);

  return (
    <div className="w-full h-full">
      <div className="border bg-primary-foreground py-2 lg:pl-24 lg:flex justify-start items-center gap-12">
        <select>
          <option>select a field</option>
        </select>
        <input type="text" className="border" />
      </div>
      <Result result={jobs} />
    </div>
  );
};

export default JobsPage;
