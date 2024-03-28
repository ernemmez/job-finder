import React, { FC, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import { useAppliedJobsStore } from "@/lib/store/zustand";
import { getProfile } from "@/services/auth";

const Sidebar: FC<ISidebarProps> = ({ userLoggedIn }) => {
  const { t } = useTranslation("common");
  const { appliedJobs, addMany } = useAppliedJobsStore();

  const { data: profile } = useQuery<TUser>({
    queryKey: ["getProfile"],
    queryFn: getProfile,
    enabled: userLoggedIn,
  });

  useEffect(() => {
    if (profile?.appliedJobs && profile.appliedJobs.length > 0) {
      addMany(profile.appliedJobs);
    }
  }, []);

  return (
    <section className="w-full h-full bg-white border overflow-y-scroll flex flex-col justify-start items-center lg:py-24 gap-8">
      <div>
        <Avatar className="w-16 h-16 m-auto mb-2">
          <AvatarImage src={profile?.profileImage} alt="SHFT" />
          <AvatarFallback>SH</AvatarFallback>
        </Avatar>
        <span>{profile?.email}</span>
      </div>
      <div className="text-lg font-bold">{t("appliedJobs")}</div>
      {appliedJobs.length > 0 ? (
        appliedJobs.map((job, i) => (
          <div key={i} className="w-full px-12 flex flex-col justify-start items-center">
            <div className="bg-primary-foreground p-4 border w-full rounded-sm">
              <span className="font-semibold text-center block mb-2">{job.name}</span>
              <p className="text-sm mb-1">
                <span className="font-semibold">{t("companyName")}: </span>
                {job.companyName}
              </p>
              <p className="text-sm">
                <span className="font-semibold">{t("location")}: </span>
                {job.location}
              </p>
            </div>
          </div>
        ))
      ) : (
        <span className="text-sm text-gray-500">{t("noJobs")}</span>
      )}
    </section>
  );
};

export default Sidebar;
