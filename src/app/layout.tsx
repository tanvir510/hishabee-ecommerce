import "@/assets/sass/app.scss";
import { ReduxProvider } from "@/redux/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer, Header, Loading } from "../app/component";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hishabee | E-commerce",
  description: "An online e-commerce store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {/* Header Block */}
          <Header />
          <main>{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
