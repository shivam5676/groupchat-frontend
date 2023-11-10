import { useRef } from "react";
import axios from "axios";
import signupcss from "./signup.module.css";
import { SiMinutemailer } from "react-icons/si";
import { RiLockPasswordLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
const SignUp = () => {
  const navigate=useNavigate();
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
    console.log(myObj);
    axios
      .post("http://localhost:4000/user/savedata", myObj)
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          navigate("/login")
        }, 3000);

      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loginPageRedirecter=()=>{
    return navigate("/login")
  }
  return (
    <div className={signupcss.loginmain}>
      {" "}
      <div className={signupcss.container}>
        <div className={signupcss.leftContainer}>
          <div className={signupcss.logoContainer}> <div className={signupcss.logo}></div></div>
         
          <div className={signupcss.welcome}>
            <h1>Welcome User</h1>
            <div className={signupcss.paragraph}>
              <h3>register now on our platform & get all benefits :</h3>
             <ul>
              <li>sending and recieving messages</li>
              <li>manage multiple groups as admin </li>
              <li>and other premium features</li>
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
                <MdOutlineDriveFileRenameOutline className={signupcss.icon}></MdOutlineDriveFileRenameOutline>
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
              <button className={signupcss.loginbutton} onClick={signupHandler}>
                SignUp
              </button>
            </div>
            <h3>or</h3>
            <div className={signupcss.button}>
              <button className={signupcss.signupbutton} onClick={loginPageRedirecter}>SignIn</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};
export default SignUp;
