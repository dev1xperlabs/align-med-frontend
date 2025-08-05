"use client"

import type React from "react"
import { useRouteName } from "@/hooks/use-route-name"
import type { JSX } from "react/jsx-runtime"

interface RouteDisplayProps {
  routeMap?: Record<string, string>
  fallback?: string
  className?: string
  style?: React.CSSProperties
  as?: keyof JSX.IntrinsicElements
  children?: (routeName: string, pathname: string) => React.ReactNode
}

export function RouteDisplay({
  routeMap,
  fallback,
  className,
  style,
  as: Component = "span",
  children,
}: RouteDisplayProps) {
  const { routeName, pathname, mounted } = useRouteName({
    routeMap,
    fallback,
  })

  if (!mounted) {
    return (
      <Component className={className} style={style}>
        {fallback || "Dashboard"}
      </Component>
    )
  }

  if (children) {
    return <>{children(routeName, pathname)}</>
  }

  return (
    <Component className={className} style={style}>
      {routeName}
    </Component>
  )
}
