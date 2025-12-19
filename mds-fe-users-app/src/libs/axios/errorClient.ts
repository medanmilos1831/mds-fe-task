import { AxiosError } from "axios";

const createErrorClient = (error: AxiosError) => {
  return error;
};

export { createErrorClient };
