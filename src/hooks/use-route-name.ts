"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { ROUTE_NAMES } from "@/config/routes"

interface UseRouteNameOptions {
  routeMap?: Record<string, string>
  fallback?: string
}

export function useRouteName(options: UseRouteNameOptions = {}) {
  const { routeMap = ROUTE_NAMES, fallback = "Patient Intake" } = options

  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  const getRouteName = (path: string): string => {
    // Check exact match first
    if ((routeMap as Record<string, string>)[path]) {
      return (routeMap as Record<string, string>)[path]
    }

    // Check for partial matches (longest first)
    const matchingRoute = Object.keys(routeMap)
      .sort((a, b) => b.length - a.length)
      .find((route) => path.startsWith(route))

    if (matchingRoute) {
      return (routeMap as Record<string, string>)[matchingRoute]
    }

    return fallback
  }

  const routeName = mounted ? getRouteName(pathname) : fallback

  return { routeName, pathname, mounted }
}
