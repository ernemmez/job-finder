import React, { useState } from "react";

import "../styles/globals.css";
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import type { UserAgent } from "next-useragent";

import { UserDeviceProvider } from "../context/UserDeviceContext";

const App = ({
  Component,
  pageProps,
}: AppProps<{ ua: UserAgent; dehydratedState: unknown; userLoggedIn: boolean; page: string }>) => {
  const [queryClient] = useState<QueryClient>(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <UserDeviceProvider value={pageProps.ua}>
          <Component {...pageProps} />
        </UserDeviceProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
};

export default appWithTranslation(App);
