import axios from "axios";
import { useRef } from "react";
import addgroupcss from "./addGroup.module.css";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AddGroup = () => {
  const navigate = useNavigate();
  const groupNameref = useRef();
  const addGroupHandler = () => {
    axios
      .post(
        "http://localhost:4000/user/creategroup",
        {
          grpname: groupNameref.current.value,
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        toast("group added successfully....redirecting You to main page")
        setTimeout(()=>{
          return navigate(-1);
        },3000)
      })
      .catch((err) => {
        console.log(err);
        toast.error("something went wrong try again .....")
      });

    
  };function backbuttonHandler() {
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
      </div>
    </div>
  );
};
export default AddGroup;
