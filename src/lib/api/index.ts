import {
  CreateUserDto,
  ResetPasswordDto,
  UpdateUserDto,
  User,
  UserListDto,
} from "@/app/user-management/interface/user-management";
import { iAttorney } from "@/model/attorneys/attorneys";
import {
  iBonusCalculationResult,
  iCalculateBonusRequest,
} from "@/model/bonus-calculation/bonusCalculation";
import {
  CreateDoctorBonusRule,
  DoctorBonusRule,
  UpdateDoctorBonusRule,
} from "@/model/doctor-bonus-rule/doctor-bonus-rule";
import { iDoctor } from "@/model/doctor/doctor";
import axios, { type AxiosInstance } from "axios";
import { BaseResponseDto } from "../model/BaseResponseDto";

const createBackendServer = (baseURL: string) => {
  const api: AxiosInstance = axios.create({
    baseURL: `${baseURL}`,
    withCredentials: false,
    headers: {
      Accept: "application/json",
    },
    timeout: 60 * 5000,
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const message = error?.response?.data?.message;
      error.message = message ?? error.message;

      if (error?.response?.data?.errors) {
        error.errors = error?.response?.data?.errors;
      }

      console.log("API Error:", error?.response?.data?.message);

      if (
        error?.response?.status === 401 ||
        error?.response?.data?.message === "Unauthenticated."
      ) {
        localStorage.removeItem("authToken");
        const currentPath = window.location.pathname;
        if (currentPath !== "/login" && currentPath !== "/signup") {
          window.location.href = "/login";
        }
      }

      return Promise.reject(error);
    }
  );

  // Auth APIs
  const authLogin = async (body: any): Promise<any> => {
    const response = await api.post("/auth/login", body);
    return response.data;
  };

  const authRegister = async (body: any): Promise<any> => {
    const response = await api.post("/auth/register", body);
    return response.data;
  };
  // Patient APIs
  // Using POST body for patient count and sum summaries
  const getCountOfNewPatientsByLocation = async (body?: any): Promise<any> => {
    const response = await api.post(
      "api/v1/patients/get-count-of-new-patients-by-location",
      body ?? {}
    );
    return response.data;
  };

  const getSumOfNewPatientsByLocation = async (body?: any): Promise<any> => {
    const response = await api.post(
      "api/v1/patients/get-sum-of-new-patients-by-location",
      body ?? {}
    );
    return response.data;
  };

  const getCountOfNewPatientsByAttorney = async (body?: any): Promise<any> => {
    const response = await api.post(
      "api/v1/attornies/get-count-of-new-patient-by-attorney",
      body ?? {}
    );
    return response.data;
  };

  const getSumOfNewPatientsByAttorney = async (body?: any): Promise<any> => {
    const response = await api.post(
      "api/v1/attornies/get-sum-of-new-patient-by-attorney",
      body ?? {}
    );
    return response.data;
  };

  const getPatientsStatistics = async (): Promise<any> => {
    const response = await api.post(
      "api/v1/patients/get-new-patients-statistics"
    );
    return response.data;
  };

  const getBillingSummary = async (): Promise<any> => {
    const response = await api.post("api/v1/bills/get-bills-statistics");
    return response.data;
  };

  const getSettlementsByDate = async (body?: any): Promise<any> => {
    console.log(body, "body aa rhi hy");
    const response = await api.post(
      "api/v1/settlements/get-settlements-by-date",
      body ?? {}
    );
    return response.data;
  };

  const getSettlementsByAttorney = async (body?: any): Promise<any> => {
    const response = await api.post(
      "api/v1/settlements/get-settlements-by-attorneys",
      body ?? {}
    );
    return response.data;
  };

  const getSettlementsBillingCards = async (): Promise<any> => {
    const response = await api.get(
      "api/v1/settlements/get-settlements-statistics"
    );
    return response.data;
  };

  // Doctors & Attorneys
  const getDoctors = async (): Promise<iDoctor[]> => {
    const response = await api.get("api/v1/doctors");
    return response.data;
  };

  const getAttorneys = async (): Promise<iAttorney[]> => {
    const response = await api.get("api/v1/attornies");
    return response.data;
  };

  // Rules
  const getRules = async (): Promise<DoctorBonusRule[]> => {
    const response = await api.get("api/v1/rules");
    return response.data;
  };

  const createRule = async (data: CreateDoctorBonusRule): Promise<any> => {
    const response = await api.post("api/v1/rules", data);
    return response.data;
  };

  const updateRule = async (
    id: string,
    data: UpdateDoctorBonusRule
  ): Promise<any> => {
    const response = await api.put(`api/v1/rules/${id}`, data);
    return response.data;
  };

  const deleteRule = async (id: string): Promise<any> => {
    const response = await api.delete(`api/v1/rules/${id}`);
    return response.data;
  };

  const calculateBonus = async (
    data: iCalculateBonusRequest
  ): Promise<iBonusCalculationResult[]> => {
    const response = await api.post("api/v1/doctors/calculate-bonus", data);
    return response.data;
  };

  // -------------------------User Management-------------------------
  // User Management APIs
  const getUsers = async (userListDto: UserListDto): Promise<UserListDto> => {
    const response = await api.post("api/v1/users/get-all-users", userListDto);

    if (!response.data) {
      userListDto.success = false;
      userListDto.result = [];
    } else {
      userListDto.result = response.data.result;
      userListDto.totalRecords = response.data.totalRecords;
      userListDto.success = true;
    }
    return userListDto;
  };

  const getUserById = async (id: number): Promise<BaseResponseDto<User>> => {
    const response = await api.get(`api/v1/users/get-user/${id}`);
    return response.data;
  };

  const createUser = async (createUserDto: CreateUserDto): Promise<any> => {
    createUserDto.created_at = new Date();
    createUserDto.updated_at = new Date();
    const response = await api.post("api/v1/users/create-user", createUserDto);
    return response.data;
  };

  const updateUser = async (updateUserDto: UpdateUserDto): Promise<any> => {
    const response = await api.put(`api/v1/users/update-user`, updateUserDto);
    return response.data;
  };

  const resetPassword = async (
    resetPasswordDto: ResetPasswordDto
  ): Promise<any> => {
    const response = await api.put(
      `api/v1/users/reset-password`,
      resetPasswordDto
    );
    return response.data;
  };

  const deleteUser = async (id: string): Promise<any> => {
    const response = await api.delete(`api/v1/users/delete-user/${id}`);
    return response.data;
  };

  // --------------------------roles---------------------------
  const getRoles = async (): Promise<any[]> => {
    const response = await api.get("api/v1/roles/get-all-roles");
    return response.data;
  };

  return {
    authLogin,
    authRegister,
    getCountOfNewPatientsByLocation,
    getSumOfNewPatientsByLocation,
    getCountOfNewPatientsByAttorney,
    getSumOfNewPatientsByAttorney,
    getPatientsStatistics,
    getBillingSummary,
    getSettlementsByDate,
    getSettlementsByAttorney,
    getSettlementsBillingCards,
    getDoctors,
    getAttorneys,
    getRules,
    createRule,
    updateRule,
    deleteRule,
    calculateBonus,
    getUserById,
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    getRoles,
    resetPassword,
  };
};

const api = createBackendServer(
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
);
export { api };
