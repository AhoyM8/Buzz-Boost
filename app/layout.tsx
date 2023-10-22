import { theme } from "@/theme";
import {
  ColorSchemeScript,
  DirectionProvider,
  MantineProvider,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { Metadata } from "next";
import "./globals.css";

import { FooterSimple } from "./(layout)/components/FooterSimple";
import { HeaderSimple } from "./(layout)/components/HeaderSimple";

import MainContext from "@/lib/BuzzContext";
import { ViewportSize } from "@/utils/ViewportSize";

import { dbConnect } from "@/lib/db";

dbConnect();

export const metadata: Metadata = {
  title: "Buzz Boost",
  description: "Your Gateway to Social Media Growth",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <>
      <html lang="en" dir="ltr">
        <head>
          <ColorSchemeScript />
          <link rel="shortcut icon" href="/favicon.svg" />
        </head>
        <body>
          <MainContext>
            <DirectionProvider>
              <MantineProvider theme={theme}>
                <HeaderSimple />
                <ViewportSize />
                {children}
                <FooterSimple />
              </MantineProvider>
            </DirectionProvider>
          </MainContext>
        </body>
      </html>
    </>
  );
}
