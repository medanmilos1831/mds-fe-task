import { infrastructure } from "@/infrastructure";
import { createQueryParamsClient } from "@/infrastructure/queryParamsClient";
import { createContext, type PropsWithChildren, useContext } from "react";
import { useSearchParams } from "react-router-dom";

const QueryParamsContext = createContext<
  ReturnType<typeof createQueryParamsClient> | undefined
>(undefined);
const QueryParamsProvider = ({ children }: PropsWithChildren) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { createQueryParamsClient } = infrastructure;
  const queryParamsClient = createQueryParamsClient({
    mutateUrl(
      items: {
        method: "set" | "delete";
        value: string;
        key: string;
      }[]
    ) {
      setSearchParams((prev) => {
        items.forEach(({ method, value, key }) => {
          if (method === "set") {
            prev.set(key, value);
          } else {
            prev.delete(key);
          }
        });
        return prev;
      });
    },
    get(key: string) {
      return searchParams.get(key);
    },
    entries: () => searchParams.entries(),
  });
  return (
    <QueryParamsContext.Provider value={queryParamsClient}>
      {children}
    </QueryParamsContext.Provider>
  );
};

const useQueryParams = () => {
  const context = useContext(QueryParamsContext);
  if (!context) {
    throw new Error("QueryParamsContext not found");
  }
  return context;
};

export { QueryParamsProvider, useQueryParams };
