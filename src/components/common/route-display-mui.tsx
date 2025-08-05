"use client";

import type React from "react";
import { Typography, type TypographyProps } from "@mui/material";
import { useRouteName } from "@/hooks/use-route-name";

interface MuiRouteDisplayProps extends Omit<TypographyProps, "children"> {
  routeMap?: Record<string, string>;
  fallback?: string;
  loading?: React.ReactNode;
  customText?: string;
}

export function MuiRouteDisplay({
  routeMap,
  fallback,
  loading,
  customText,
  ...typographyProps
}: MuiRouteDisplayProps) {
  const { routeName, mounted } = useRouteName({
    routeMap,
    fallback,
  });

  if (!mounted && loading) {
    return <>{loading}</>;
  }

  const displayText = customText || routeName;

  return <Typography {...typographyProps}>{displayText}</Typography>;
}
