import "@/styles/_global.scss";
import { Inter } from "next/font/google";
import GlobalContextProviders from "./global-context-provider";
import LayoutHeader from "./layout-header";
import LayoutMain from "./layout-main";

const inter = Inter({
  weight: ["400", "500", "600", "700", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "29CM Frontend Assignment",
  description: "Simple commerce web application :)",
};

export default function RootLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <GlobalContextProviders>
          <LayoutHeader />

          <LayoutMain>{children}</LayoutMain>
        </GlobalContextProviders>
      </body>
    </html>
  );
}
