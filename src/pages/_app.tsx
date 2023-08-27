import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Yeeter</title>
        <meta name="description" content="Yeeeeeet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
