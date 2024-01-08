import { AiFillSetting } from "react-icons/ai";
import sidepanelcss from "./sidepanel.module.css";
import { MdOutlineGroupAdd } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dataSliceActions } from "../store/data";
import { FaUserSecret } from "react-icons/fa";


const SidePanel = (props) => {
  
  const dispatch=useDispatch()
  const navigate=useNavigate();
  
  
  const addGroupHandler=()=>{
return navigate("/creategroup")
  }
  const logoutHandler=()=>{
dispatch(dataSliceActions.reset());
localStorage.removeItem("token")
localStorage.removeItem("isLoggedIn")
localStorage.removeItem("myId")
// socket.disconnect()
  }
  const imageUploader=()=>{
    // props.imageUploaderOpen()
    dispatch(dataSliceActions.imageWindowLoader({imageUploadUrl:"http://localhost:4000/user/uploadProfilePhoto"}))
    // dispatch(dataSliceActions.image)
  }
  return (
    <div className={sidepanelcss.sidepanel}>
      <div className={sidepanelcss.iconbox}>
        {" "}
        <div className={sidepanelcss.iconbg}>
        
          <FaUserSecret  className={sidepanelcss.icon} onClick={imageUploader}></FaUserSecret >
        </div>
        <div className={sidepanelcss.iconbg}>
          <MdOutlineGroupAdd className={sidepanelcss.icon} onClick={addGroupHandler}></MdOutlineGroupAdd>
        </div>
        <div className={sidepanelcss.iconbg} onClick={logoutHandler}>
          <FiLogOut className={sidepanelcss.icon}></FiLogOut>
        </div>
      </div>
    </div>
  );
};
export default SidePanel;
