import { List, Spin, Empty } from "antd";

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
    <List
      dataSource={users}
      renderItem={(user) => (
        <List.Item style={{ padding: 0, border: "none", width: "100%" }}>
          <UserCard user={user} />
        </List.Item>
      )}
    />
  );
};

export { UserCardList };
