export enum UserStatus {
    Active = "1",
    Inactive = "0",
}




export const status = Object.entries(UserStatus).map(([key, value]) => [key, value]);