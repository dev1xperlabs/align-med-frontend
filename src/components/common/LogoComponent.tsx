"use client";

import Image from "next/image";
import { StyledLogoContainer } from "../styled";

interface LogoProps {
  collapsed?: boolean;
  width?: number;
  height?: number;
}

export const AlignLogo = ({ collapsed = false, width, height }: LogoProps) => (
  <StyledLogoContainer
    sx={{
      justifyContent: collapsed ? "center" : "flex-start",
      height: collapsed ? 40 : 70,
      marginTop: collapsed ? 0 : 5,
      transition: "all 0.3s ease-in-out",
    }}
  >
    {collapsed ? (
      <Image
        src="/images/logo.png"
        alt="Align"
        width={width || 32}
        height={height || 32}
        style={{
          objectFit: "contain",
          transition: "all 0.3s ease-in-out",
        }}
      />
    ) : (
      <Image
        src="/images/logo.png"
        alt="Align Logo"
        width={width || 200}
        height={height || 70}
        style={{
          objectFit: "contain",
          transition: "all 0.3s ease-in-out",
          // width: "75%",
          // height: "90%",
          // position: "fixed",
          // left: "50%",
          // right: "50%",
          // transform: "translateX(-50%)",
        }}
      />
    )}
  </StyledLogoContainer>
);
