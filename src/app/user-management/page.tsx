"use client";

import type React from "react";
import { Box } from "@mui/material";
import { api } from "../../lib/api";
import { useState, useMemo } from "react";
import { List } from "@/components/user-management/List";
import { StyledPrimaryButton } from "@/components/styled";
import CreateUser from "@/components/user-management/CreateUser";
import UpdateUser from "@/components/user-management/UpdateUser";
import ResetPassword from "@/components/user-management/ResetPassword";
import { DashboardLayout } from "@/components/dahboard/Dashboard-layout";
import { UserListDto, UserListItemDto } from "./interface/user-management";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function UserManagementPage() {
  const [pageSize, setPageSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isUpdateUserOpen, setIsUpdateUserOpen] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [updateUserId, setUpdateUserId] = useState<number>(0);

  const {
    data: users,
    isLoading: isLoadingUsers,
    refetch: refetchUserList,
  } = useQuery({
    queryKey: ["users", startIndex, pageSize],
    queryFn: () =>
      api
        .getUsers({ startIndex: startIndex + 1, pageSize }) // API expects 1-based index
        .then((response) => response),
  });

  const handleOpenUpdateUser = (userListItemDto: UserListItemDto) => {
    setUpdateUserId(userListItemDto.id); // set the user to be edited
    setIsUpdateUserOpen(true); // open the dialog
  };

  const handleOpenResetPassword = (userListItemDto: UserListItemDto) => {
    setUpdateUserId(userListItemDto.id); // set the user to reset password
    setIsResetPassword(true);
  };

  const handleOpenCreateUser = () => setIsCreateUserOpen(true);
  const handleCloseCreateUser = () => setIsCreateUserOpen(false);

  return (
    <>
      <DashboardLayout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            p: 2,
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <StyledPrimaryButton
            onClick={handleOpenCreateUser}
            sx={{
              "&:hover": { backgroundColor: "#7CB342" },
            }}
          >
            Add New User
          </StyledPrimaryButton>
        </Box>
        <List
          userListDto={users}
          refetch={refetchUserList}
          setStartIndex={setStartIndex}
          setPageSize={setPageSize}
          onUpdateUser={handleOpenUpdateUser} // Pass the function that opens update dialog
          onResetPassword={handleOpenResetPassword}
        />
        <CreateUser
          open={isCreateUserOpen}
          onClose={handleCloseCreateUser}
          refetchUserList={refetchUserList}
        />
        <UpdateUser
          open={isUpdateUserOpen}
          onClose={() => setIsUpdateUserOpen(false)}
          refetchUserList={refetchUserList}
          updateUserId={updateUserId}
        />
        <ResetPassword
          userId={updateUserId}
          openResetPassword={isResetPassword} // Assuming you want to show reset password when updating user
          onCloseResetPassword={() => setIsResetPassword(false)}
        />
      </DashboardLayout>
    </>
  );
}
