import axios from "axios";
import { useRef, useState } from "react";
import addgroupcss from "./addGroup.module.css";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Vortex } from "react-loader-spinner";

const AddGroup = () => {
  const [loader, setLoader] = useState(false);
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
    setLoader(true);
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
        
        toast.error("something went wrong try again .....");
      }).finally(() => {
        // Hide loader when the request is completed
        setLoader(false);
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
        {loader ? (
          <div className={addgroupcss.loader}>
            <Vortex
              visible={true}
              height="40"
              width="40"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              colors={["#000000"]}
            />
          </div>
        ) : (
          <button onClick={addGroupHandler} className={addgroupcss.submitbtn}>
            Create
          </button>
        )}
        <p className={addgroupcss.message}>{msg}</p>
      </div>
    </div>
  );
};
export default AddGroup;
