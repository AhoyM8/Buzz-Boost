"use client";

import { useViewportSize } from "@mantine/hooks";
import { useState, useEffect, use } from "react";

export const ViewportSize = () => {
  const { height, width } = useViewportSize();

  const [screenSize, setScreenSize] = useState("xs");

  useEffect(() => {
    // convert the width number to fit the tailwindcss breakpoints
    let num_width = width;

    if (width < 576) {
      setScreenSize("xs - 576px or less (mobile)");
    } else if (width < 768) {
      setScreenSize("sm - 768px or less (tablet)");
    } else if (width < 992) {
      setScreenSize("md - 992px or less (desktop)");
    } else if (width < 1200) {
      setScreenSize("lg - 1200px or less (desktop)");
    } else {
      setScreenSize("xl - 1200px or more (desktop)");
    }
  }, [width]);

  return (
    <>
      {/* for xs,sm,md etc siffernt background color */}
      <div className="bg-teal-950 xs:bg-red-950 sm:bg-green-950 md:bg-blue-950 lg:bg-yellow-950 xl:bg-pink-950 text-xl">
        Width: {width}, height: {height} screenSize: {screenSize}
      </div>
    </>
  );
};
// screens: {
//   xs: "36em",
//   sm: "48em",
//   md: "62em",
//   lg: "75em",
//   xl: "88em",
// },
// },
