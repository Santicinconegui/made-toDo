import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../styles/stylesComp/register.scss";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: singinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    //if the user is authenticated
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <div className="container-formulario">
      <div className="form-div">
        <span className="login--tittle">LOGIN !</span>
        {singinErrors.map((error, i) => (
          <div className="text-error" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <div className="wrap2">
            <div className="f1">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="youremail@gmail.com"
                {...register("email", { required: true })}
              />
              {errors.email && <p className="text-error">Email is required</p>}
            </div>
            <div className="f2">
              <label>Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="******"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-error">Password is required</p>
              )}
            </div>

            <button className="btn--form_register" type="submit">
              Login
            </button>
            <p className="textEndForm">
              Do not you have an account yet?
              <Link to="/register" className="Link">
                {" "}
                click here!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
