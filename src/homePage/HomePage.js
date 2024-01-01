import axios from "axios";
import { useEffect, useState } from "react";
import homepagecss from "./HomePage.module.css";
import ChatWindow from "../chat/chatWindow";
import GroupList from "../groups/groupList";

import SidePanel from "../sidePanel/sidepanel";

import { useDispatch, useSelector } from "react-redux";
import { dataSliceActions } from "../store/data";
// import { io } from "socket.io-client";
import socket, { updateSocketConnection } from "../socket/socket";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const Navigate=useNavigate();
  // const socket=io("http://localhost:4000")
  const [openAddGroup, setOpenAddGroup] = useState(false);
  const dispatch = useDispatch();
  const grouplists = useSelector((state) => state.data.groupList);
  

  useEffect(() => {
    axios
      .get("http://localhost:4000/user/verify", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        localStorage.setItem("myId", res.data.user.id);
      })
      .catch((err) => {
        
        localStorage.setItem("isLoggedIn",false)
        dispatch(dataSliceActions.reset())
        Navigate("/login");
        //console.log(err.response.data.msg);
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
  // useEffect(() => {
  //   console.log(grouplists);
 
  //   grouplists.forEach((current) => {
  //     console.log(current[0].id);
  //     socket.emit("join-room", current[0].id);
  //   });
  // }, [grouplists, socket]);

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
