import { iUser } from "@/app/login/interfaces/iUserInterface"

export interface AuthResponse {
    user: iUser
    accessToken: string
    refreshToken: string
}