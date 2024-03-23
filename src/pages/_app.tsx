import React from "react";

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import type { UserAgent } from "next-useragent";

import { UserDeviceProvider } from "../context/UserDeviceContext";

const App = ({ Component, pageProps }: AppProps<{ ua: UserAgent }>) => {
  return (
    <UserDeviceProvider value={pageProps.ua}>
      <Component {...pageProps} />
    </UserDeviceProvider>
  );
};

export default appWithTranslation(App);
