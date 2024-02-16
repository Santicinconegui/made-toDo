import { Link } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import "../styles/stylesComp/navbar.scss";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  // console.log(user);
  return (
    <nav>
      <h1>
        <Link to={"/"} className="LinkMade">
          MADE TO DO
        </Link>
      </h1>

      <ul>
        {isAuthenticated ? (
          <>
            <li>
              {" "}
              <Link to={"/tasks"} className="Link">
                My Tasks
              </Link>
            </li>

            <li>
              <Link to={"/add-task"} className="Link">
                Add Task
              </Link>
            </li>
            <li>
              <Link to={"/"} onClick={() => logout()} className="Link">
                <BiLogOut className="icono" />
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={"/login"} className="Link">
                <BiLogIn className="icono" /> Login
              </Link>
            </li>

            <li>
              <Link to={"/register"} className="Link">
                <FaUserLarge className="icono" />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
