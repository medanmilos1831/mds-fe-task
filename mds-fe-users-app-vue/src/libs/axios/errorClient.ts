import { ERROR_CODES, ERROR_MESSAGES } from "@/types";
import { AxiosError } from "axios";

const createErrorClient = (error: AxiosError) => {
  return {
    message:
      ERROR_MESSAGES[error.response?.status as keyof typeof ERROR_MESSAGES] ||
      error.message,
    status: error.response?.status,
    code: ERROR_CODES[error.response?.status as keyof typeof ERROR_CODES],
    data: error.response?.data,
  };
};

export { createErrorClient };
