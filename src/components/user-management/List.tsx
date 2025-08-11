"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Typography,
  TablePagination,
} from "@mui/material";
import { Delete, Edit, LockReset } from "@mui/icons-material";
import {
  StyledDashboardCard,
  StyledTable,
  StyledTableBody,
  StyledTableContainer,
  StyledTableHead,
} from "../styled"; // <- make sure this exists
import {
  UserListDto,
  UserListItemDto,
} from "@/app/user-management/interface/user-management";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type ListProps = {
  userListDto: UserListDto | undefined;
  refetch: () => void;
  setStartIndex: (index: number) => void;
  setPageSize: (size: number) => void;
  onUpdateUser: (user: UserListItemDto) => void;
  onResetPassword: (user: UserListItemDto) => void;
};

export const List = ({
  userListDto,
  refetch,
  setStartIndex,
  setPageSize,
  onUpdateUser,
  onResetPassword,
}: ListProps) => {
  const handleUpdateUser = (user: any) => {
    onUpdateUser(user);
  };

  const handleResetPassword = (user: any) => {
    onResetPassword(user);
  };

  const handleDeleteUser = (user: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Deleting ${user.email}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#999",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate(user.id);
        refetch();
      }
    });
  };

  const deleteUserMutation = useMutation<any, Error, number>({
    mutationFn: (id) => api.deleteUser(id.toString()),
    onSuccess: () => {
      toast.success("User deleted successfully.");
      refetch();
    },
    onError: (error) => {
      toast.error(`Error deleting user`);
    },
  });

  console.log(userListDto, "data aa rha hy");
  return (
    <>
      <StyledDashboardCard>
        <StyledTableContainer>
          <StyledTable>
            <StyledTableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </StyledTableHead>

            <StyledTableBody>
              {userListDto?.totalRecords == 0 ? (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: "center", py: 4 }}>
                    <Typography variant="h6" color="text.secondary">
                      No Users Found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                userListDto?.result?.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      {user.firstname} {user.lastname}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.role === "admin" ? "Admin" : "User"}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "inline-block",
                          px: 2,
                          py: 0.5,
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: 500,
                          backgroundColor:
                            user.status === "1" ? "#e8f5e8" : "#ffebee",
                          color: user.status === "1" ? "#2e7d32" : "#c62828",
                        }}
                      >
                        {user.status === "1" ? "Active" : "Inactive"}
                      </Box>
                    </TableCell>
                    {user.role !== "admin" ? (
                      <TableCell>
                        {user.role !== "admin" && (
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              justifyContent: "center",
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() => handleUpdateUser(user)}
                              sx={{ color: "#666" }}
                            >
                              <Edit fontSize="small" />
                            </IconButton>

                            <IconButton
                              size="small"
                              onClick={() => handleResetPassword(user)}
                              sx={{ color: "#666" }}
                            >
                              <LockReset fontSize="small" />
                            </IconButton>

                            <IconButton
                              size="small"
                              onClick={() => handleDeleteUser(user)}
                              sx={{ color: "#d32f2f" }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Box>
                        )}
                      </TableCell>
                    ) : (
                      <Box></Box>
                    )}
                  </TableRow>
                ))
              )}
            </StyledTableBody>
          </StyledTable>

          {/* Pagination (optional - uncomment when needed) */}

          <TablePagination
            component="div"
            count={userListDto?.totalRecords || 0}
            page={userListDto?.startIndex ? userListDto?.startIndex - 1 : 0}
            rowsPerPage={userListDto?.pageSize || 10}
            rowsPerPageOptions={[5, 10, 15]}
            onPageChange={(_, newPage) => setStartIndex(newPage)}
            onRowsPerPageChange={(e) => {
              setPageSize(parseInt(e.target.value, 10));
              setStartIndex(0); // reset to first page
            }}
          />
        </StyledTableContainer>
      </StyledDashboardCard>
    </>
  );
};
