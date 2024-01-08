import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import upcss from "./updatePassword.module.css";
import { GiCrossMark } from "react-icons/gi";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePassword = () => {
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const domain=process.env.REACT_APP_BACKENDURL;
  const navigate=useNavigate();
  const param = useParams();
  const uuid = param.uuid;
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const updatePasswordHandler = () => {
    const myobj = {
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
      uuid: uuid,
    };

    axios
      .post(`${domain}/user/resetpassword`, myobj)
      .then((res) => {
        setMessage(res.data.message);
        if (res.data.status === "success") {
          setSuccess(true);
        }
        setTimeout(()=>{
          navigate("/")
        },3000)
        
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };

  return (
    <div className={upcss.main}>
      <div className={upcss.container}>
        <div className={upcss.title}>
          <h3>forgot password</h3>
        </div>
        <div className={upcss.close} >
          <button onClick={()=>navigate("/")}>
            <GiCrossMark className={upcss.icon}></GiCrossMark>
          </button>
        </div>
        <div className={upcss.form}>
          <RiLockPasswordFill className={upcss.envicon}></RiLockPasswordFill>

          <div className={upcss.inputlabel}>
            <div>password</div>

            <input placeholder="Enter New Password" ref={passwordRef}></input>
          </div>

          <RiLockPasswordLine className={upcss.envicon}></RiLockPasswordLine>

          <div className={upcss.inputlabel}>
            <div>Confirm Password</div>

            <input
              placeholder="Re-type password"
              ref={confirmPasswordRef}
            ></input>
          </div>
        </div>
        <div className={upcss.message}>{message}</div>
        {!success?<div className={upcss.recoverybtn}>
          <button onClick={updatePasswordHandler}>update Password</button>
        </div>:<div className={upcss.recoverybtn}>
          <button onClick={()=>navigate("/")}>login now</button>
        </div>}
      </div>
    </div>
  );
};
export default UpdatePassword;
