import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              &nbsp; &nbsp;
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div style={{ display: "flex" }}>
              <div>
                <Link to="/login">Login</Link>
              </div>
              <div>
                <Link to="/signup">Sign up</Link>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
