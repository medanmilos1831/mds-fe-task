import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { createReactQuery } from "../libs";

const Root = () => {
  return (
    <QueryClientProvider client={createReactQuery()}>
      <Outlet />
    </QueryClientProvider>
  );
};

export { Root };
