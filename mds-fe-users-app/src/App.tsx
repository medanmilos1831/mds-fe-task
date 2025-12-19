import { RouterProvider } from "react-router-dom";
import { router } from "./libs/router";

const App = () => {
  return <RouterProvider router={router} />;
};

export { App };
