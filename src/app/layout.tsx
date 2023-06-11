import "@/styles/_global.scss";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({
  weight: ["400", "500", "600", "700", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "29CM Frontend Assignment",
  description: "Simple commerce web application :)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
