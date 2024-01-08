import fpcss from "./forgotPassword.module.css";
import { FaEnvelope } from "react-icons/fa";
import { GiCrossMark } from "react-icons/gi";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  
  const[message,setMessage]=useState("")
  const domain=process.env.REACT_APP_BACKENDURL;
  const navigate=useNavigate()
  const emailref = useRef("");
  const forgotPasswordHandler = () => {
    const emailValue = emailref.current.value;
    axios
      .post(`${domain}/user/forgotPassword`, {
        email: emailValue,
      })
      .then((res) => {
        if(res.data.status==="success"){
        
          setMessage(res.data.message)
        }
  
      })
      .catch((err) => {
        setMessage(err.response.data.message)
         setTimeout(()=>{
setMessage("")
   },6000)
      });
  };
  return (
    <div className={fpcss.main}>
      <div className={fpcss.container}>
        <div className={fpcss.title}>
          <h3>forgot password</h3>
        </div>
        <div
          className={fpcss.close}
         
        >
      
       
          <button  onClick={() => {
            navigate(-1);/*we are using -1 to go back to previous page*/
          }}>
            <GiCrossMark className={fpcss.icon}></GiCrossMark>
          </button>
        </div>
        <div className={fpcss.form}>
          <FaEnvelope className={fpcss.envicon}></FaEnvelope>
          <div className={fpcss.inputlabel}>
            <div>email</div>

            <input
              placeholder="enter registered email id"
              ref={emailref}
            ></input>
          </div>
         
        </div><div className={fpcss.message}>{message}</div> 
       {!message&& <div className={fpcss.recoverybtn}>
          <button onClick={forgotPasswordHandler}>Send Password</button>
        </div>}
      </div>
    </div>
  );
};
export default ForgotPassword;
