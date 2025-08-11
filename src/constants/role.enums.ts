export enum UserRoles {
    ADMIN = 1,
    USER = 2,
}



export const roles = Object.entries(UserRoles).map(([key, value]) => [key, value]);