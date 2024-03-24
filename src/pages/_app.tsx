import React from "react";

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import type { UserAgent } from "next-useragent";

import { AuthProvider } from "@/context/Auth";

import { UserDeviceProvider } from "../context/UserDeviceContext";

const App = ({ Component, pageProps }: AppProps<{ ua: UserAgent }>) => {
  return (
    <UserDeviceProvider value={pageProps.ua}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </UserDeviceProvider>
  );
};

export default appWithTranslation(App);
