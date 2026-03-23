import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VerifyEmail from "../pages/VerifyEmail";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

import Dashboard from "../features/chat/pages/Dashboard";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
   { path: "/login", element: <Login /> },
  // ✅ ADD THIS (fixes your error)
  { path: "/verify-email", element: <VerifyEmail /> },

  { path: "/dashboard", element: <Dashboard /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;