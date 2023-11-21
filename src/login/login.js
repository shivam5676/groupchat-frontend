import axios from "axios";
import { useRef, useState } from "react";
import logincss from "../login/login.module.css";
import { SiMinutemailer } from "react-icons/si";
import { RiLockPasswordLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dataSliceActions } from "../store/data";
import { ProgressBar } from "react-loader-spinner";
import { toast } from "react-toastify";
import socket, { updateSocketConnection } from "../socket/socket";
const Login = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailref = useRef();
  const passwordref = useRef();
  const logindetailHandler = async () => {
    setLoader(true);
    const myobj = {
      email: emailref.current.value,
      password: passwordref.current.value,
    };

    setTimeout(async() => {
      try {
        const res = await axios.post("http://localhost:4000/user/login", myobj);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isLoggedIn", true);
        dispatch(dataSliceActions.login());
        updateSocketConnection(res.data.token);

        await new Promise((resolve) => socket.once("connect", resolve));
        navigate("/home");
      } catch (err) {
        setLoader(false);
        toast.error(err.response.data.msg);
      }
    }, 1000);
  };
  const signuppageRediecter = () => {
    navigate("/signup");
  };
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
              {" "}
              {loader ? (
                <ProgressBar
                  height="50"
                  width="80"
                  ariaLabel="progress-bar-loading"
                  wrapperStyle={{}}
                  wrapperClass="progress-bar-wrapper"
                  borderColor="#51E5FF"
                  barColor="#51E5FF"
                />
              ) : (
                <button
                  className={logincss.loginbutton}
                  onClick={logindetailHandler}
                >
                  signIn
                </button>
              )}
            </div>
            <h3>or</h3>
            <div className={logincss.button}>
              <button
                className={logincss.signupbutton}
                onClick={signuppageRediecter}
              >
                SignUp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
