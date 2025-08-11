import { BaseListRequestDto } from "@/lib/model/BaseListRequestDto";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  role_id: number | null;
  status: string;
  created_at?: Date | null;
  updated_at?: Date | null;
};

export type UserList = {
  result: User[];
  totalRecords: number;
};

export interface UserListDto extends BaseListRequestDto<UserListItemDto> {}

export interface UserListItemDto {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  status?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserDto {
  first_name: string;
  last_name: string;
  email: string;
  role_id: number | null;
  password: string;
  status?: string;
  created_at?: Date | null;
  updated_at?: Date | null;
}

export interface UpdateUserDto {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  role_id: number | null;
  status?: string;
  updated_at: Date | null;
}

export interface iUserFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: number | string;
  password: string;
  status?: string;
}

export interface ResetPasswordDto {
  user_id: number;
  password: string;
}

export interface Role {
  id: number;
  name: string;
}
