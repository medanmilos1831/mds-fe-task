import { createBrowserRouter } from "react-router-dom";
import { Root, UsersPage } from "@/pages";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        index: true,
        element: <UsersPage />,
      },
    ],
  },
]);

export { router };
