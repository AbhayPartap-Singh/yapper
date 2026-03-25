import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import { useAuth } from "../features/auth/hook/useAuth";
import { useEffect } from "react";

const App = () => {
  const Auth = useAuth();

  useEffect(() => {
    Auth.handleGetMe(); // call the function on mount
  }, []);

  return <RouterProvider router={router} />;
};

export default App;