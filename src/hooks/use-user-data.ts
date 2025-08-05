"use client"

import { iUser } from "@/app/login/interfaces/iUserInterface"
import { useState, useEffect } from "react"


export function useUserData() {
    const [user, setUser] = useState<iUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getUserData = () => {
            try {
                const userData = localStorage.getItem("user")
                if (userData) {
                    const parsedUser = JSON.parse(userData)
                    const userWithName = {
                        ...parsedUser,
                        name: `${parsedUser.first_name || ""} ${parsedUser.last_name || ""}`.trim(),
                    }
                    setUser(userWithName)
                }
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error)
                setUser(null)
            } finally {
                setIsLoading(false)
            }
        }

        getUserData()

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "user") {
                getUserData()
            }
        }

        window.addEventListener("storage", handleStorageChange)
        return () => window.removeEventListener("storage", handleStorageChange)
    }, [])

    return { user, isLoading }
}
