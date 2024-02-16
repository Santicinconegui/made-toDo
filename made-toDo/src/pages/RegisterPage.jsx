import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/stylesComp/register.scss";
import { useEffect } from "react";
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="container-formulario_register">
      <div className="form-div">
        <span className="login--tittle">SIGN UP !</span>
        {registerErrors.map((error, i) => (
          <div className="text-error" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <div className="wrap">
            <div className="f1">
              <label>Name</label>
              <input
                type="name"
                name="name"
                placeholder="Your name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-error">Your name is required</p>
              )}
            </div>
            <div className="f2">
              <label>LastName</label>
              <input
                type="name"
                name="lastname"
                placeholder="Your lastname"
                {...register("lastname", { required: true })}
              />
              {errors.lastname && (
                <p className="text-error">Your lastname is required</p>
              )}
            </div>
          </div>
          <div className="wrap">
            <div className="f1">
              <label>Username</label>
              <input
                type="name"
                name="username"
                placeholder="Your Username"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <p className="text-error">Username is required</p>
              )}
            </div>
            <div className="f2">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="youremail@gmail.com"
                className="emailRegister"
                {...register("email", { required: true })}
              />
              {errors.email && <p className="text-error">Email is required</p>}
            </div>
            {/* aca */}
          </div>
          <div className="wrap2">
            {" "}
            <div className="f2">
              <label>Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="******"
                className="passwordRegister"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-error">Password is required</p>
              )}
            </div>
            <button className="btn--form_register" type="submit">
              Register
            </button>
            <p className="textEndForm">
              Do you already have an account?
              <Link to="/login" className="Link">
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

export default RegisterPage;
