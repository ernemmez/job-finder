import React, { FC } from "react";

import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import { getProfile } from "@/services/auth";

const Sidebar: FC<ISidebarProps> = ({ userLoggedIn }) => {
  const { t } = useTranslation("common");

  const { data: profile } = useQuery<TUser>({
    queryKey: ["getProfile"],
    queryFn: getProfile,
    enabled: userLoggedIn,
  });

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
      {profile?.appliedJobs && profile.appliedJobs.length > 0 ? (
        profile.appliedJobs.map(job => (
          <div key={job} className="w-full px-12 flex flex-col justify-start items-center">
            <div className="bg-primary-foreground p-4 border w-full rounded-sm">
              <span className="font-semibold text-center block mb-2">{job}</span>
              <p className="text-sm mb-1">
                <span className="font-semibold">{t("companyName")}: </span>
                Ipsum Dolor
              </p>
              <p className="text-sm">
                <span className="font-semibold">{t("location")}: </span>
                Irving
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
