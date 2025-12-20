import { type IUser } from "@/repositories";
import { infrastructure } from "@/infrastructure";
import { useQueryParams } from "@/providers";
import { MODAL_NAMES, REACT_QUERY_KEYS } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";

const useRemoveUserMutation = () => {
  const { modalClient, userRepository } = infrastructure;
  const { getSearchParams } = useQueryParams();
  const queryClient = useQueryClient();
  const { mutate: removeUser, isPending: isRemovingUser } = useMutation({
    mutationFn: (user: IUser) => userRepository.removeUser(user.id),
    onSuccess: (_, user: IUser) => {
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.USERS, getSearchParams()],
      });
      modalClient.closeModal({ modalName: MODAL_NAMES.REMOVE_USER });
      notification.success({
        message: `User ${user.firstName} ${user.lastName} removed successfully`,
      });
    },
    onError: (error: any) => {
      console.error(error);
    },
  });
  return {
    removeUser,
    isRemovingUser,
  };
};

export { useRemoveUserMutation };
