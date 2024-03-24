import React, { FC, useEffect, useState } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import LoginModal from "@/components/LoginModal";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui";
import { useAuth } from "@/context/Auth";
import { useUserDevice } from "@/context/UserDeviceContext";
import { clearSearchParams } from "@/lib/utils/clearSeearchParams";
import { getAuthTokens, logout } from "@/services/auth";

const Header: FC<IHeaderProps> = () => {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  const router = useRouter();
  const { isMobile } = useUserDevice();
  const { t } = useTranslation("common");
  const { isLoggedIn, user } = useAuth();
  const { accessToken } = getAuthTokens();
  const middlewareRedirect = useSearchParams().get("loginRedirect") as string;

  useEffect(() => {
    if (!accessToken && middlewareRedirect) {
      setShowLoginModal(true);
      clearSearchParams();
    }
  }, [middlewareRedirect]);

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          <span className="inline-block font-extrabold text-4xl italic">SHFT</span>
        </Link>
        <div className="flex items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1 gap-2 lg:gap-4">
            {!isLoggedIn ? (
              <>
                <Button variant="outline" size={isMobile ? "sm" : "lg"} onClick={() => setShowLoginModal(true)}>
                  {t("auth.login")}
                </Button>
                <Button size={isMobile ? "sm" : "lg"}>{t("auth.signup")}</Button>
              </>
            ) : (
              <>
                <Link href="/jobs" className="text-blue-600 underline text-sm font-medium hover:text-accent-foreground">
                  Joblist
                </Link>
                <Button
                  variant="ghost"
                  className="p-0 h-auto text-blue-600 underline hover:bg-transparent"
                  onClick={() => {
                    logout();
                    router.reload();
                  }}
                >
                  Logout
                </Button>
                <div className="flex items-center space-x-1 gap-[2px]">
                  <span className="text-sm font-medium">{user?.email}</span>
                  <Button variant="ghost" className="p-0 h-auto text-blue-600 underline hover:bg-transparent">
                    <Avatar>
                      <AvatarImage src={user?.profileImage} alt="SHFT" />
                      <AvatarFallback>SH</AvatarFallback>
                    </Avatar>
                  </Button>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>

      <LoginModal
        open={showLoginModal}
        close={() => setShowLoginModal(false)}
        openSignUpModal={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </header>
  );
};

export default Header;
