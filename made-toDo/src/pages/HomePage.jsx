import React from "react";
import "../styles/stylesComp/home.scss";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import background from "../assets/img/background.png";

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="containerHomePage">
      <div className="homeDesc">
        {isAuthenticated ? (
          <>
            <h2>
              Welcome <span>{user.username}</span> !
            </h2>
            <h4>
              You can now start with your{" "}
              <Link to={"/add-task"} className="Link">
                Tasks
              </Link>
            </h4>
          </>
        ) : (
          <>
            <h2>Hello Guest!</h2>
            <h4>
              {" "}
              <Link to={"/login"} className="Link">
                Login
              </Link>{" "}
              to start your tasks
            </h4>
          </>
        )}
        <p>
          <span>MADE TO-DO</span> Is an application that{" "}
          <span>
            provides a comprehensive solution for the organization and
            management of tasks{" "}
          </span>
          , both individually and in team work environments, with a focus on
          simplicity, productivity and versatility.
        </p>
      </div>
      <div className="backGround">
        <img src={background} />
      </div>
    </div>
  );
};

export default HomePage;
