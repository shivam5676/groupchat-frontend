import axios from "axios";
import { useRef, useState } from "react";
import addgroupcss from "./addGroup.module.css";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddGroup = () => {
  const useDomain = process.env.REACT_APP_BACKENDURL;
  const navigate = useNavigate();
  const groupNameref = useRef();
  const [msg, setMsg] = useState("");
  const addGroupHandler = () => {
    if (groupNameref.current.value.trim() <= 0) {
      setMsg("group name can not be empty");
      setTimeout(()=>{
        setMsg()
      },3300)
      return;
    }
    axios
      .post(
        `${useDomain}/user/creategroup`,
        {
          grpname: groupNameref.current.value,
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => {
       
        toast("group added successfully....redirecting You to main page");
        setTimeout(() => {
          return navigate(-1);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("something went wrong try again .....");
      });
  };
  function backbuttonHandler() {
    return navigate(-1);
  }
  return (
    <div className={addgroupcss.main}>
      <div className={addgroupcss.container}>
        <div className={addgroupcss.backbtn}>
          <BsFillArrowLeftCircleFill
            className={addgroupcss.backbtnIcon}
            onClick={backbuttonHandler}
          ></BsFillArrowLeftCircleFill>
        </div>
        <div className={addgroupcss.text}>Add Group</div>
        <div className={addgroupcss.input}>
          <input ref={groupNameref}></input>
        </div>
        <button onClick={addGroupHandler} className={addgroupcss.submitbtn}>
          create
        </button>
        <p className={addgroupcss.message}>{msg}</p>
      </div>
    </div>
  );
};
export default AddGroup;
