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
      height: collapsed ? 40 : 84,
      marginTop: collapsed ? 0 : 5,
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
        }}
      />
    ) : (
      <Image
        src="/images/logo.png"
        alt="Align Logo"
        width={width || 212}
        height={height || 84}
        style={{
          objectFit: "contain",
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
