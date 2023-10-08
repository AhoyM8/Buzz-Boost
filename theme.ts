"use client";
import { createTheme, CSSVariablesResolver } from "@mantine/core";

export const theme = createTheme({
  /* Put your mantine theme override here */
  // colors: {
  //   gray: [
  //     "#ffffff",
  //     "#fffdeb",
  //     "#fffad7",
  //     "#fff8c3",
  //     "#fff6af",
  //     "#fff49b",
  //     "#fff186",
  //     "#ffef70",
  //     "#ffed58",
  //     "#ffeb3b",
  //   ],
  //   dark: [
  //     "#1f1c0f",
  //     "#363217",
  //     "#4f491d",
  //     "#6a6123",
  //     "#867b28",
  //     "#a3962d",
  //     "#c1b132",
  //     "#dfce37",
  //     "#ffeb3b",
  //     "#000000",
  //   ],
  // },
  // primaryColor: "yellow",
});

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    // "--mantine-color-body": "#FFF9DB",
  },
  dark: {
    // "--mantine-color-body": "#1A1B1E",
  },
});
