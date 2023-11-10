import axios from "axios";
import { useEffect, useState } from "react";
import homepagecss from "./HomePage.module.css";
import ChatWindow from "../chat/chatWindow";
import GroupList from "../groups/groupList";
import AddGroup from "../groups/addGroup";
import { MdOutlineGroupAdd } from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import SidePanel from "../sidePanel/sidepanel";
const HomePage = () => {
  const [openAddGroup, setOpenAddGroup] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:4000/user/verify", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("myId", res.data.user.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const openAddGroupHandler = () => {
    setOpenAddGroup(true);
  };

  return (
    <div className={homepagecss.main}>
      <div className={homepagecss.navigation}></div>

      <div className={homepagecss.container}>
        <div className={homepagecss.containerBox}>
          <SidePanel></SidePanel>

          <div className={homepagecss.mainBox}>
            <GroupList></GroupList>
            <ChatWindow></ChatWindow>
          </div>
        
        </div>
      </div>
    </div>
  );
};
export default HomePage;
