import { useRef, useState } from "react";
import axios from "axios";
import signupcss from "./signup.module.css";
import { SiMinutemailer } from "react-icons/si";
import { RiLockPasswordLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { ProgressBar } from "react-loader-spinner";
import { toast } from "react-toastify";

const SignUp = () => {
  const [loader, setloader] = useState(false);
  const domain = process.env.REACT_APP_BACKENDURL;
  const navigate = useNavigate();
  const emailref = useRef();
  const passwordref = useRef();
  const nameref = useRef();
  const mobileref = useRef();

  const signupHandler = () => {
    const emailValue = emailref.current.value;
    const mobileValue = mobileref.current.value;
    const nameValue = nameref.current.value;
    const passworValue = passwordref.current.value;

    const myObj = {
      email: emailValue,
      password: passworValue,
      name: nameValue,
      mobile: mobileValue,
    };
    
    setloader(true);

    axios
      .post(`${domain}/user/savedata`, myObj)
      .then((response) => {
        toast.success(response.data.msg);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        setloader(false);
        if (err.response) {
          toast.error(err.response.data.msg);
        } else {
          toast.error(err.message);
        }
      });
  };
  const loginPageRedirecter = () => {
    return navigate("/login");
  };
  return (
    <div className={signupcss.loginmain}>
      {" "}
      <div className={signupcss.container}>
        <div className={signupcss.leftContainer}>
          <div className={signupcss.logoContainer}>
            {" "}
            <div className={signupcss.logo}></div>
          </div>

          <div className={signupcss.welcome}>
            <h1>Welcome User</h1>
            <div className={signupcss.paragraph}>
              <h3>register now on our platform & get all benefits :</h3>
              <ul>
                <li>sending and recieving messages</li>
                <li>manage multiple groups as admin </li>
                <li> RealTime chatting enabled with Profile Image changer</li>
              </ul>
            </div>
            <p className={signupcss.companyname}>chitchat messenger</p>
          </div>
        </div>
        <div className={signupcss.rightContainer}>
          <div className={signupcss.frame}>
            <div className={signupcss.signUpTitle}>SIGN-UP</div>
            <div className={signupcss.form}>
              <div className={signupcss.emailInput}>
                <MdOutlineDriveFileRenameOutline
                  className={signupcss.icon}
                ></MdOutlineDriveFileRenameOutline>
                <input ref={nameref} placeholder="Enter your name"></input>
              </div>
              <div className={signupcss.emailInput}>
                <SiMinutemailer className={signupcss.icon}></SiMinutemailer>
                <input ref={emailref} placeholder="Enter email id"></input>
              </div>
              <div className={signupcss.passwordInput}>
                <RiLockPasswordLine
                  className={signupcss.icon}
                ></RiLockPasswordLine>
                <input ref={passwordref} placeholder="Enter password"></input>
              </div>
            </div>
            <div className={signupcss.passwordInput}>
              <RiLockPasswordLine
                className={signupcss.icon}
              ></RiLockPasswordLine>
              <input ref={mobileref} placeholder="Enter mobile no"></input>
            </div>

            <div className={signupcss.button}>
              {loader ? (
                <ProgressBar
                  height="50"
                  width="70"
                  ariaLabel="progress-bar-loading"
                  wrapperStyle={{}}
                  wrapperClass="progress-bar-wrapper"
                  borderColor="yellow"
                  barColor="yellow"
                />
              ) : (
                <button
                  className={signupcss.loginbutton}
                  onClick={signupHandler}
                >
                  SignUp
                </button>
              )}
            </div>
            <h3>or</h3>
            <div className={signupcss.button}>
              <button
                className={signupcss.signupbutton}
                onClick={loginPageRedirecter}
              >
                SignIn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
