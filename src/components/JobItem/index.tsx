import React, { FC, useState } from "react";

import dayjs from "dayjs";
import { BriefcaseBusiness } from "lucide-react";
import { useTranslation } from "next-i18next";

import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { useUserDevice } from "@/context/UserDeviceContext";
import { useAppliedJobsStore } from "@/lib/store/zustand";
import { applyJob, withdrawJob } from "@/services/jobs";

const JobItem: FC<IJobItemProps> = ({
  job: { companyName, name, description, salary, location, keywords, createdAt, id },
  job: jobObject,
}) => {
  const [showJobDetail, setShowJobDetail] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);

  const { isMobile } = useUserDevice();
  const { t } = useTranslation("common");
  const { appliedJobs, add, remove } = useAppliedJobsStore();
  const isApplied = appliedJobs.find(({ id: jId }) => jId === id);

  const handleApply = async () => {
    setPending(true);

    try {
      const { message } = await applyJob(id);
      message && add(jobObject);
      setShowJobDetail(false);
      setPending(false);
    } catch (err) {
      setError(true);
      setPending(false);
    }
  };

  const handleWithdraw = async () => {
    try {
      const { message } = await withdrawJob(id);
      message && remove(id);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <>
      <div className="w-full bg-white border-b-2 border-black lg:py-8 lg:px-12 flex justify-between items-start overflow-x-hidden">
        <div className="w-full lg:w-10/12 flex justify-start lg:gap-4 items-start p-4">
          {!isMobile && <BriefcaseBusiness className="lg:w-1/12 h-8" />}
          <div className="flex flex-col justify-between items-start gap-2">
            <div className="text-xl">
              {isMobile ? (
                <>
                  <div className="flex items-center gap-1">
                    <BriefcaseBusiness className="lg:w-1/12 h-8" />
                    <span className="font-bold">{name}</span>
                  </div>
                  <span className="font-semibold text-gray-700">{companyName}</span>
                </>
              ) : (
                <>
                  <span className="font-bold">{companyName} / </span>
                  <span className="font-semibold text-gray-700">{name}</span>
                </>
              )}
            </div>
            <p>{description}</p>
            <p className="text-sm">
              <span className="font-semibold">{t("location")}:</span> {location}
            </p>
            <p className="text-sm">
              <span className="font-semibold">{t("jobItem.salary")}:</span> {salary}$
            </p>
            {keywords && keywords.length > 0 && (
              <div className="flex justfiy-start lg:justify-between items-center gap-2 mt-2 flex-wrap">
                {keywords.map((k, i) => (
                  <Badge key={i}>{k}</Badge>
                ))}
              </div>
            )}
            {isMobile && (
              <div className="lg:w-2/12 flex lg:flex-col lg:px-12 gap-3 mt-2 lg:mt-0">
                {isApplied && (
                  <Button size="sm" variant="secondary" onClick={handleWithdraw}>
                    {t("jobItem.withdraw")}
                  </Button>
                )}
                <Button size="sm" onClick={() => setShowJobDetail(true)}>
                  {t("jobItem.detail")}
                </Button>
              </div>
            )}
          </div>
        </div>
        {!isMobile && (
          <div className="w-2/12 flex flex-col px-12 gap-3">
            <Button size="sm" variant="secondary" onClick={() => setShowJobDetail(true)}>
              {t("jobItem.detail")}
            </Button>
            {isApplied && (
              <Button size="sm" onClick={handleWithdraw}>
                {t("jobItem.withdraw")}
              </Button>
            )}
          </div>
        )}
      </div>
      {showJobDetail && (
        <Dialog open={showJobDetail} onOpenChange={() => setShowJobDetail(false)}>
          <DialogContent className="lg:max-w-auto lg:min-w-[425px] max-w-[325px] rounded-md">
            <DialogHeader>
              <DialogTitle className="text-3xl text-center mt-2">{t("jobItem.applyJob")}</DialogTitle>
              {error && (
                <DialogDescription className="text-red-700 text-center text-xs">
                  {t("auth.message.error.somethingWentWrong")}
                </DialogDescription>
              )}
            </DialogHeader>
            <ul className="mb-3">
              <li className="text-sm mb-1">
                <span className="font-semibold">{t("companyName")}:</span> {companyName}
              </li>
              <li className="text-sm mb-1">
                <span className="font-semibold">{t("jobItem.jobName")}:</span> {name}
              </li>
              <li className="text-sm mb-1">
                <span className="font-semibold">{t("jobItem.createdAt")}:</span> {dayjs(createdAt).format("DD.MM.YYYY")}
              </li>
              <li className="text-sm mb-1">
                <span className="font-semibold">{t("location")}:</span> {location}
              </li>
              <li className="text-sm mb-2">
                <span className="font-semibold">{t("jobItem.keywords")}:</span>
                {keywords && keywords.length > 0 && (
                  <div className="w-3/4 flex justify-start items-center flex-wrap gap-3 mt-2">
                    {keywords.map((k, i) => (
                      <Badge key={i}>{k}</Badge>
                    ))}
                  </div>
                )}
              </li>
              <li className="text-sm mb-1">
                <span className="font-semibold">{t("jobItem.salary")}:</span> {salary}$
              </li>
              <li className="text-sm mb-1">
                <span className="font-semibold">{t("jobItem.jobDesc")}:</span>{" "}
                <p className="border p-2 mt-2">{description}</p>
              </li>
            </ul>
            <DialogFooter className="flex justify-between items-center gap-2 px-12">
              <Button variant="outline" size="sm" className="w-full" onClick={() => setShowJobDetail(false)}>
                {t("jobItem.close")}
              </Button>
              <Button size="sm" disabled={pending} className="w-full" onClick={handleApply}>
                {t("jobItem.apply")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default JobItem;
