import axios from "axios";
import { useEffect } from "react";
import homepagecss from "./HomePage.module.css";
import ChatWindow from "../chat/chatWindow";
import GroupList from "../groups/groupList";

import SidePanel from "../sidePanel/sidepanel";

import { useDispatch, useSelector } from "react-redux";
import { dataSliceActions } from "../store/data";

import { useNavigate } from "react-router-dom";

import FileSelector from "../groups/fileSelector";
import useWindowSize from "../windowSize";

const HomePage = () => {
  const Navigate = useNavigate();
  const domain = process.env.REACT_APP_BACKENDURL;
  const { width } = useWindowSize();
  let chatWindowOpenState = useSelector((state) => {
    return state.data.isWindowOpen;
  });
  const dispatch = useDispatch();

  const imageWindowLoader = useSelector(
    (state) => state.data.imageWindowStatus
  );
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
  console.log(
    chatWindowOpenState === false,
    "width ",
    width,
    " chatwindow",
    chatWindowOpenState
  );
  return (
    <div className={homepagecss.main}>
      {console.log("rendering", width <= 600)}
      <div className={homepagecss.navigation}></div>

      <div className={homepagecss.container}>
        <div className={homepagecss.containerBox}>
          {imageWindowLoader && <FileSelector></FileSelector>}
          <SidePanel></SidePanel>

          <div className={homepagecss.mainBox}>
            {" "}
            {width <= 600 && chatWindowOpenState == false ? (
              <GroupList></GroupList>
            ) : (
              width <= 600 && <ChatWindow></ChatWindow>
            )}
            {width > 600 && (
              <>
                <GroupList></GroupList>
                <ChatWindow></ChatWindow>
              </>
            )}
            {/* <GroupList></GroupList>
            <ChatWindow></ChatWindow> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
