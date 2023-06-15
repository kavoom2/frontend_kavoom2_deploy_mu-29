import "@/styles/_global.scss";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import GlobalContextProviders from "./global-context-provider";
import LayoutHeader from "./layout-header";
import LayoutMain from "./layout-main";
import RootIsolatedComponents from "./root-isolated-components";

const inter = Inter({
  weight: ["400", "500", "600", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "감도 깊은 취향 셀렉트샵 29CM",
  description:
    "패션, 라이프스타일, 컬처까지 29CM만의 감도 깊은 셀렉션을 만나보세요",
  viewport:
    "device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=cover",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <RootIsolatedComponents />

        <GlobalContextProviders>
          <LayoutHeader />

          <LayoutMain>{children}</LayoutMain>
        </GlobalContextProviders>
      </body>
    </html>
  );
}
