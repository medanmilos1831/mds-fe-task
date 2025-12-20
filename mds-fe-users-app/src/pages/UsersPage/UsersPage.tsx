import { AntModal } from "@/components";
import type { IUser } from "@/repositories";
import { MODAL_NAMES } from "@/types";
import { Filters, RemoveUser } from "./components";
import { UsersTable } from "./components/UsersTable";

const UsersPage = () => {
  return (
    <>
      <h1>Users Page</h1>
      <AntModal<IUser>
        modalName={MODAL_NAMES.REMOVE_USER}
        initialOpen={false}
        Component={(params) => {
          return <RemoveUser {...params} />;
        }}
      />
      <div style={{ marginBottom: "1rem" }}>
        <Filters />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <UsersTable />
      </div>
    </>
  );
};

export { UsersPage };
