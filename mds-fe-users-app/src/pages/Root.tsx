import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { createReactQuery } from "@/libs";
import { QueryParamsProvider } from "@/providers";

const Root = () => {
  return (
    <QueryClientProvider client={createReactQuery()}>
      <QueryParamsProvider>
        <Outlet />
      </QueryParamsProvider>
    </QueryClientProvider>
  );
};

export { Root };
