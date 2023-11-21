import axios from "axios";
import { useEffect, useState } from "react";
import homepagecss from "./HomePage.module.css";
import ChatWindow from "../chat/chatWindow";
import GroupList from "../groups/groupList";

import SidePanel from "../sidePanel/sidepanel";

import { useDispatch, useSelector } from "react-redux";
import { dataSliceActions } from "../store/data";
import socket from "../socket/socket";
const HomePage = () => {
  const [openAddGroup, setOpenAddGroup] = useState(false);
  const dispatch = useDispatch();
  const grouplists = useSelector((state) => state.data.groupList);
  const handlesocketlogic = () => {
    
    grouplists.forEach((current) => {
      console.log("join",current[0].id);
      socket.emit("join-room", current[0].id);
    });
  };
  useEffect(() => {
    handlesocketlogic();
  }, [grouplists]);
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
  
  useEffect(() => {
    axios
      .get("http://localhost:4000/user/fetchgroup", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        response.data.forEach((current) => {
          dispatch(dataSliceActions.addGroupList(current));
        });
      });
  }, []);

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
