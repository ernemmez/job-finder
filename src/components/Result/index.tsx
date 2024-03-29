import React, { FC } from "react";

import { useTranslation } from "next-i18next";

import Error from "@/components/Error";
import JobItem from "@/components/JobItem";
import { Icons } from "@/components/ui";

const Result: FC<IResultProps> = ({ result, isLoading }) => {
  const { t } = useTranslation("common");

  if (isLoading) {
    return (
      <div className="h-full lg:h-[89.4%] overflow-y-scroll py-64">
        <Icons.spinner className="h-24 w-24 m-auto animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-full lg:h-[89.4%] overflow-y-scroll">
      {result && result.length > 0 ? (
        <div>
          {result.map((job, i) => (
            <JobItem key={i} job={job} />
          ))}
        </div>
      ) : (
        <Error result={t("sorryErrorOccured")} />
      )}
    </div>
  );
};

export default Result;
