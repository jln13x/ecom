import { Analytics } from "@/features/analytics/Analytics";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Footer, Header } from "../components";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <main className="grow pb-32">
          <Component {...pageProps} />
        </main>
        <Footer />
        <ReactQueryDevtools />
        <Analytics />
      </QueryClientProvider>
    </>
  );
};

export default App;
