import { AntModal } from "@/components";
import type { IUser } from "@/repositories";
import { MODAL_NAMES } from "@/types";
import { Filters } from "./components";
import { UsersTable } from "./components/UsersTable";

const UsersPage = () => {
  return (
    <>
      <h1>Users Page</h1>
      <AntModal<IUser>
        modalName={MODAL_NAMES.REMOVE_USER}
        initialOpen={false}
        Component={(params) => {
          console.log(params);
          return <div>Remove User</div>;
        }}
      />
      <div style={{ marginBottom: "1rem" }}>
        <Filters />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <UsersTable columns={[]} />
      </div>
    </>
  );
};

export { UsersPage };
