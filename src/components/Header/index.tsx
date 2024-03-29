import React, { FC, useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { LogOut, Briefcase } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import LoginModal from "@/components/LoginModal";
import SignupModal from "@/components/SignupModal";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { useUserDevice } from "@/context/UserDeviceContext";
import { clearSearchParams } from "@/lib/utils/clearSeearchParams";
import { getAuthTokens, getCurrentUser, logout } from "@/services/auth";

const Header: FC<IHeaderProps> = ({ userLoggedIn }) => {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);

  const router = useRouter();
  const { isMobile } = useUserDevice();
  const { t } = useTranslation("common");
  const { accessToken } = getAuthTokens();
  const middlewareRedirect = useSearchParams().get("loginRedirect") as string;

  const { data: user } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: getCurrentUser,
    enabled: userLoggedIn,
  });

  useEffect(() => {
    if (!accessToken && middlewareRedirect) {
      setShowLoginModal(true);
      clearSearchParams();
    }
  }, [middlewareRedirect]);

  return (
    <header className="bg-white sticky top-0 z-40 w-full border-b">
      <div className="container lg:px-4 flex h-16 items-center space-x-4 justify-between sm:space-x-0 px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="inline-block font-extrabold text-4xl italic">SHFT</span>
        </Link>
        <div className="flex items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1 gap-2 lg:gap-4">
            {!userLoggedIn ? (
              <>
                <Button variant="outline" size={isMobile ? "sm" : "lg"} onClick={() => setShowLoginModal(true)}>
                  {t("auth.login")}
                </Button>
                <Button size={isMobile ? "sm" : "lg"} onClick={() => setShowSignUpModal(true)}>
                  {t("auth.signup")}
                </Button>
              </>
            ) : (
              <>
                {isMobile ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="focus:outline-none">
                        <Avatar>
                          <AvatarImage src={user?.profileImage} alt="SHFT" />
                          <AvatarFallback>SH</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <Link href={t("dynamicJobsPageUrl")}>
                        <DropdownMenuItem className="cursor-pointer">
                          <Briefcase className="mr-2 h-4 w-4" />
                          <span>{t("joblist")}</span>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                        className="cursor-pointer border-t rounded-none"
                        onClick={() => {
                          logout();
                          router.reload();
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Link
                      href={t("dynamicJobsPageUrl")}
                      className="text-blue-600 underline text-sm font-medium hover:text-accent-foreground"
                    >
                      {t("joblist")}
                    </Link>
                    <Button
                      variant="ghost"
                      className="p-0 h-auto text-blue-600 underline hover:bg-transparent"
                      onClick={() => {
                        logout();
                        router.reload();
                      }}
                    >
                      {t("auth.logout")}
                    </Button>
                    <div className="grid grid-cols-[auto,1fr] items-center space-x-1 gap-[2px]">
                      <p className="text-sm font-medium text-right w-32 truncate">{user?.email}</p>
                      <Button variant="ghost" className="p-0 h-auto text-blue-600 underline hover:bg-transparent">
                        <Avatar>
                          <AvatarImage src={user?.profileImage} alt="SHFT" />
                          <AvatarFallback>SH</AvatarFallback>
                        </Avatar>
                      </Button>
                    </div>
                  </>
                )}
              </>
            )}
          </nav>
        </div>
      </div>

      {showLoginModal && (
        <LoginModal
          open={showLoginModal}
          close={() => setShowLoginModal(false)}
          openSignUpModal={() => {
            setShowLoginModal(false);
            setShowSignUpModal(true);
          }}
        />
      )}
      {showSignUpModal && (
        <SignupModal
          open={showSignUpModal}
          close={() => setShowSignUpModal(false)}
          openLoginModal={() => {
            setShowSignUpModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </header>
  );
};

export default Header;
