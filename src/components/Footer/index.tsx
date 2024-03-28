import React, { FC } from "react";

import Link from "next/link";
import { useTranslation } from "next-i18next";

const Footer: FC = () => {
  const { t } = useTranslation("common");

  return (
    <div className="w-full bg-white border">
      <footer className="container py-8 lg:flex">
        <div className="lg:w-1/2 border-b lg:border-b-0 pb-4 lg:pb-0 mb-4 lg:mb-0 lg:border-r border-black flex-col lg:flex lg:justify-between items-center lg:items-start gap-8">
          <Link href="/" className="block text-center lg:text-left">
            <span className="inline-block font-extrabold text-4xl italic">SHFT</span>
          </Link>
          <div className="lg:pr-8 text-center lg:text-left">
            <span className="text-lg font-semibold mb-2">{t("footerDesc.title")}</span>
            <p>{t("footerDesc.desc")}</p>
          </div>
        </div>
        <div className="lg:w-1/2 lg:pl-12 h-auto text-center lg:text-left lg:self-end">
          <p className="font-semibold">
            &copy; 2010 - 2024{" - "}
            <Link href="#" className="hover:text-blue-600">
              {t("privacyTerms")}
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
