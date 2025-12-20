import { type IUser } from "@/repositories";
import { infrastructure } from "@/infrastructure";
import { useQueryParams } from "@/providers";
import {
  MODAL_NAMES,
  REACT_QUERY_KEYS,
  type IErrorClient,
  type IResponse,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";

const useRemoveUserMutation = () => {
  const { modalClient, userRepository } = infrastructure;
  const { getSearchParams } = useQueryParams();
  const queryClient = useQueryClient();
  const { mutate: removeUser, isPending: isRemovingUser } = useMutation({
    mutationFn: (user: IResponse<IUser>) => {
      return userRepository.removeUser(user.result.id);
    },
    onSuccess: (_, user: IResponse<IUser>) => {
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.USERS, getSearchParams()],
      });
      modalClient.closeModal({ modalName: MODAL_NAMES.REMOVE_USER });
      notification.success({
        message: `User ${user.result.firstName} ${user.result.lastName} removed successfully`,
      });
    },
    onError: (error: IErrorClient) => {
      notification.error({
        message: error.message,
      });
    },
  });
  return {
    removeUser,
    isRemovingUser,
  };
};

export { useRemoveUserMutation };
