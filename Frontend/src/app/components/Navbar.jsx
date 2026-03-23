import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div style={{ padding: "10px", background: "black", color: "white" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Dashboard</Link>

      <div style={{ float: "right" }}>
        {user ? (
          <span>Welcome, {user.username}</span>
        ) : (
          <>
            <Link to="/login" style={{ margin: "10px" }}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;