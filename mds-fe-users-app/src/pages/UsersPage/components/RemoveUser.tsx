import { AntModal } from "@/components";
import { type IUser } from "@/repositories";
import { infrastructure } from "@/infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { useRemoveUserMutation } from "../hooks";

interface Props {
  data: IUser;
  closeModal: () => void;
  modalName: string;
}

const RemoveUser = ({ data, closeModal, modalName }: Props) => {
  const { removeUser, isRemovingUser } = useRemoveUserMutation();
  const { userRepository } = infrastructure;
  const { data: response, isLoading } = useQuery({
    queryKey: [modalName, data.id],
    queryFn: () => userRepository.getUser(data.id),
  });
  return (
    <>
      {isLoading ? (
        <Spin spinning={isLoading} />
      ) : (
        <>
          <AntModal.RemoveConfirmationCommands
            onRemove={() => removeUser(response!)}
            onClose={() => closeModal()}
            isLoading={isRemovingUser}
          >
            <>
              <h1>Remove User</h1>
              <p>
                Are you sure you want to remove this user? {data?.firstName}{" "}
                {data?.lastName}
              </p>
            </>
          </AntModal.RemoveConfirmationCommands>
        </>
      )}
    </>
  );
};

export { RemoveUser };
