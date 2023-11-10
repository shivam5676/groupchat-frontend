import axios from "axios";
import { useRef } from "react";
import logincss from "../login/login.module.css";
import { SiMinutemailer } from "react-icons/si";
import { RiLockPasswordLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate=useNavigate()
  const emailref = useRef();
  const passwordref = useRef();
  const logindetailHandler = () => {
    const myobj = {
      email: emailref.current.value,
      password: passwordref.current.value,
    };
    axios
      .post("http://localhost:4000/user/login", myobj)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("isLoggedIn",true)
        navigate("/")
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const signuppageRediecter=()=>{
navigate("/signup")
  }
  return (
    <div className={logincss.loginmain}>
      {" "}
      <div className={logincss.container}>
        <div className={logincss.leftContainer}>
          <div className={logincss.logo}></div>
          <div className={logincss.welcome}>
            <h1>Welcome Page</h1>
            <h4>login now & enjoy all features </h4>
            <p>chitchat messenger</p>
          </div>
        </div>
        <div className={logincss.rightContainer}>
          <div className={logincss.frame}>
            <div className={logincss.signInTitle}>LOG-IN</div>
            <div className={logincss.form}>
              <div className={logincss.emailInput}>
                <SiMinutemailer className={logincss.icon}></SiMinutemailer>
                <input ref={emailref} placeholder="Enter email id"></input>
              </div>
              <div className={logincss.passwordInput}>
                <RiLockPasswordLine
                  className={logincss.icon}
                ></RiLockPasswordLine>
                <input ref={passwordref} placeholder="Enter password"></input>
              </div>
            </div>
            <div className={logincss.forgetPassword}>
              <NavLink to="/forget">forget password</NavLink>
            </div>
            <div className={logincss.button}>
              <button
                className={logincss.loginbutton}
                onClick={logindetailHandler}
              >
                Signin
              </button>
            </div>
            <h3>or</h3>
            <div className={logincss.button}>
              <button className={logincss.signupbutton} onClick={signuppageRediecter}>SignUp</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
