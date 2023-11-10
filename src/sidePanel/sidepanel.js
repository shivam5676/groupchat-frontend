import { AiFillSetting } from "react-icons/ai";
import sidepanelcss from "./sidepanel.module.css";
import { MdOutlineGroupAdd } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SidePanel = () => {
  const navigate=useNavigate();
  const addGroupHandler=()=>{
return navigate("/creategroup")
  }
  return (
    <div className={sidepanelcss.sidepanel}>
      <div className={sidepanelcss.iconbox}>
        {" "}
        <div className={sidepanelcss.iconbg}>
          <AiFillSetting className={sidepanelcss.icon} ></AiFillSetting>
        </div>
        <div className={sidepanelcss.iconbg}>
          <MdOutlineGroupAdd className={sidepanelcss.icon} onClick={addGroupHandler}></MdOutlineGroupAdd>
        </div>
        <div className={sidepanelcss.iconbg}>
          <FiLogOut className={sidepanelcss.icon}></FiLogOut>
        </div>
      </div>
    </div>
  );
};
export default SidePanel;
