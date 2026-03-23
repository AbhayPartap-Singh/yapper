import { RouterProvider } from "react-router-dom";
import { Router } from "./app.routes";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      {/* Navbar must be inside the RouterProvider */}
      <RouterProvider router={Router}>
        <Navbar />
        {/* Outlet for nested routes will render here */}
      </RouterProvider>
    </div>
  );
};

export default App;