import { Empty, Flex, Spin } from "antd";

import { type IUser } from "@/repositories";
import { UserCard } from "./UserCard";

interface UserCardListProps {
  users: IUser[];
  loading?: boolean;
}

const UserCardList = ({ users, loading }: UserCardListProps) => {
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px 0" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!users || users.length === 0) {
    return <Empty description="No users found" />;
  }

  return (
    <Flex vertical gap={16}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </Flex>
  );
};

export { UserCardList };
