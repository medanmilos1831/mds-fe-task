import { Card, Avatar, Button } from "antd";
import { type IUser } from "@/repositories";
import { AVATAR_PLACEHOLDER, MODAL_NAMES } from "@/types";
import { infrastructure } from "@/infrastructure";

interface UserCardProps {
  user: IUser;
}

const UserCard = ({ user }: UserCardProps) => {
  const { modalClient } = infrastructure;

  return (
    <Card
      style={{ width: "100%" }}
      cover={
        <Avatar
          src={user.avatar || AVATAR_PLACEHOLDER}
          size={100}
          style={{ margin: "16px auto", display: "block" }}
        />
      }
      actions={[
        <Button
          key="remove"
          danger
          type="primary"
          onClick={() => {
            modalClient.openModal({
              modalName: MODAL_NAMES.REMOVE_USER,
              data: user,
            });
          }}
        >
          Remove
        </Button>,
      ]}
    >
      <Card.Meta
        title={`${user.firstName} ${user.lastName}`}
        description={
          <div>
            <div>{user.email}</div>
            <div>{user.country.name}</div>
            <div>{user.role.name}</div>
          </div>
        }
      />
    </Card>
  );
};

export { UserCard };
