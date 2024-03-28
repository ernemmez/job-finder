import React from "react";

import { useRouter } from "next/router";
import type { NextPage, GetServerSideProps } from "next/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useUserAgent } from "next-useragent";
import { pathToRegexp } from "path-to-regexp";

import ContentLayout from "@/components/ContentLayout";
import ErrorBoundary from "@/components/Error/ErrorBoundary";
import { PAGE_MAP, PAGE_TO_METHODS, RenderPage, SupportedLanguages } from "@/lib/utils/pages";

const Slug: NextPage<IPage> = ({ page, userLoggedIn, ...props }) => {
  const { locale } = useRouter();
  const Comp = RenderPage(page, locale || "en");

  return (
    <ErrorBoundary>
      {Comp && (
        <ContentLayout userLoggedIn={userLoggedIn} pagePath={`${page}`}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Comp userLoggedIn={userLoggedIn} {...props} />
        </ContentLayout>
      )}
    </ErrorBoundary>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale, req, resolvedUrl }) => {
  if (resolvedUrl.includes("/_next/") || resolvedUrl.includes("/static/")) return { props: {} };

  const $locale = locale as string;
  const ua = useUserAgent(`${req.headers["user-agent"]}`);
  const userLoggedIn = !!req.cookies?.accessToken || false;
  const getURL = resolvedUrl
    .split(`/`)
    .filter(Boolean)
    .filter(l => !SupportedLanguages.includes(l));
  const $finalURL = new URL(`${getURL.join("/")}`, `https://${req.headers.host}`);
  const $PagePath = Object.values(PAGE_MAP[$locale] || PAGE_MAP["en"]).find(item => {
    return pathToRegexp(item).exec($finalURL.pathname);
  });

  if (!$PagePath) {
    return {
      notFound: true,
    };
  }

  const pageData = PAGE_TO_METHODS($locale)[$PagePath]
    ? await PAGE_TO_METHODS($locale)[$PagePath](`${req.cookies?.accessToken}`)
    : {};

  return {
    props: {
      ua,
      ...(await serverSideTranslations(`${locale}`, ["common"])),
      userLoggedIn,
      page: $PagePath,
      pageData,
    },
  };
};

export default Slug;
