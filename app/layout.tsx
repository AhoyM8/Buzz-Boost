import "@mantine/core/styles.css";
import "./globals.css";
import React from "react";
import {
  MantineProvider,
  ColorSchemeScript,
  DirectionProvider,
} from "@mantine/core";
import { theme } from "@/theme";
import { Metadata } from "next";

import { HeaderSimple } from "./(layout)/components/HeaderSimple";
import { FooterSimple } from "./(layout)/components/FooterSimple";

import { ViewportSize } from "@/utils/ViewportSize";

export const metadata: Metadata = {
  title: "Buzz Boost",
  description: "Your Gateway to Social Media Growth",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
      </head>
      <body>
        <DirectionProvider>
          <MantineProvider theme={theme}>
            <HeaderSimple />
            <ViewportSize />
            {children}
            <FooterSimple />
          </MantineProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}
