import React, { FC, useState } from "react";

import Link from "next/link";
import { useTranslation } from "next-i18next";

import LoginModal from "@/components/LoginModal";
import { Button } from "@/components/ui";
import { useUserDevice } from "@/context/UserDeviceContext";

const Header: FC<IHeaderProps> = () => {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  const { isMobile } = useUserDevice();
  const { t } = useTranslation("common");

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          <span className="inline-block font-extrabold text-4xl italic">SHFT</span>
        </Link>
        <div className="flex items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1 gap-2 lg:gap-4">
            <Button variant="outline" size={isMobile ? "sm" : "lg"} onClick={() => setShowLoginModal(true)}>
              {t("auth.login")}
            </Button>
            <Button size={isMobile ? "sm" : "lg"}>{t("auth.signup")}</Button>
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
