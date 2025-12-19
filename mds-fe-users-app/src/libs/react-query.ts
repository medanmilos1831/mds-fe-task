import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const createReactQuery = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
};

export { createReactQuery, QueryClientProvider };
