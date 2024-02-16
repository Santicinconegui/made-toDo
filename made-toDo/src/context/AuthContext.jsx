import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    // this function makes a user registration request
    try {
      const res = await registerRequest(user);
      // console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    // this function makes a login request
    try {
      const res = await loginRequest(user);
      // console.log(res);
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };
  const logout = () => {
    //the token is removed
    Cookies.remove("token");
    //change authentication status
    setIsAuthenticated(false);
    //user information is cleared
    setUser(null);
  };
  useEffect(() => {
    // with this hook the error messages are eliminated
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      // If the timer is not in use it is eliminated
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        //here we compare whether a token exists
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
        //this returns a null setuser
      }
      try {
        //here we verify that the token exists in the database
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          //If the backend doesn't return any data this returns the following
          setIsAuthenticated(false);
          //authenticated in false
          setLoading(false);
          // //finish loading
          return;
        }
        //If the backend returns a data,the following is returned
        setIsAuthenticated(true);
        //authenticated to true
        setUser(res.data);
        //save user in state
        setLoading(false);
        //finish loading
      } catch (error) {
        //If an error occurs, reach the catch and return the following
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        user,
        isAuthenticated,
        errors,
        loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
