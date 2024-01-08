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
import FileUploader from "../groups/fileUploader";
import FileSelector from "../groups/fileSelector";


const HomePage = () => {
  const Navigate = useNavigate();
  const domain=process.env.REACT_APP_BACKENDURL
 

  const dispatch = useDispatch();
  
  const imageWindowLoader=useSelector(state=>state.data.imageWindowStatus)
  useEffect(() => {
    axios
      .get(`${domain}/user/verify`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        localStorage.setItem("myId", res.data.user.id);
      })
      .catch((err) => {
        localStorage.setItem("isLoggedIn", false);
        dispatch(dataSliceActions.reset());
        Navigate("/login");
       
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${domain}/user/fetchgroup`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
       
        response.data.forEach((current) => {
          dispatch(dataSliceActions.addGroupList(current));
        });
      });
  }, []);

// const imageUploaderModelOpener=()=>{
//   setImageUploader(true)
// }
// const imageUploaderClose=()=>{
//   setImageUploader(false)
// }
  return (
    <div className={homepagecss.main}>
      <div className={homepagecss.navigation}></div>

      <div className={homepagecss.container}>
        <div className={homepagecss.containerBox}>
          {imageWindowLoader&&<FileSelector ></FileSelector>}
          <SidePanel  ></SidePanel>

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
