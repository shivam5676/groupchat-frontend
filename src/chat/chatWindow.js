import { useEffect, useRef, useState } from "react";
import windowcss from "./chatWindow.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { FaArrowCircleLeft } from "react-icons/fa";
import GroupDetails from "../groups/GroupDetails";
import { dataSliceActions } from "../store/data";
import socket from "../socket/socket";
// import io from "socket.io-client";
const ChatWindow = () => {
  const dispatch = useDispatch();
  const messageref = useRef();
  const [pageDetail, setPageDetail] = useState(false);

  const [chatArray, setChatArray] = useState([]);
  const groupId = useSelector((state) => {
    return state.data.groupId;
  });
  const allmessage = useSelector((state) => {
    return state.data.Allmsg[groupId];
  });
  console.log("allmessage", allmessage);
  const groupName = useSelector((state) => {
    return state.data.groupName;
  });
  const chatWindowOpen = useSelector((state) => {
    return state.data.isWindowOpen;
  });
  console.log(groupId);

  const sendmsgHandler = () => {
    const messageData = messageref.current.value;
    console.log(messageData);

    socket.emit("sendmsg", { message: messageData, groupid: groupId });
  };

  useEffect(() => {
    socket.on("getMsg", (data) => {
      console.log(data);
      dispatch(dataSliceActions.addMsg(data));
    });
  }, [socket]);

  useEffect(() => {
    // const chats = useSelector(state=>state.data.allmsg[groupId])//JSON.parse(localStorage.getItem(`chat${groupId}`));
    const chats = allmessage;
    console.log("chats", chats);
    if (chats) {
      const newarray = chats.map((current) => {
        const dates = new Date(current.createdAt);

        // Get hours and minutes from the Date object
        const hours = dates.getHours();
        const minutes = dates.getMinutes();

        // Format the time in hh:mm format
        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;

        if (current.user.id == localStorage.getItem("myId")) {
          const dates = new Date(current.createdAt);

          return (
            <div
              className={windowcss.sendermsg}
              key={dates + current.messageid}
            >
              <div className={windowcss.sendermsgLeft}>
                <div className={windowcss.senderMessageBox}>
                

                  <p>{current.text} </p>

                  <p className={windowcss.messagetime}>{formattedTime}</p>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div
              className={windowcss.recievermsg}
              key={dates + current.messageid}
            >
              <div className={windowcss.recieverMessageBox}>
                <div className={windowcss.recieverdetails}>
                  <p>{current.user.name}</p> <p>{current.user.mobile}</p>
                </div>
                <p className={windowcss.usermessage}>{current.text} </p>
                <p className={windowcss.messagetime}>{formattedTime}</p>
              </div>
            </div>
          );
        }
      });
      setChatArray(newarray);
    }
  }, [groupId, allmessage]);
  const pageDetailsViewer = () => {
    setPageDetail(true);
  };
  const backbuttonHandler = () => {
    setPageDetail(false);
  };
  const chatWindowCloseHandler = () => {
    dispatch(dataSliceActions.deactivateChatWindow());
  };
  return (
    <div className={windowcss.chatBox}>
      {chatWindowOpen && (
        <div className={windowcss.chatBoxContainer}>
          {!pageDetail ? (
            <>
              <div className={windowcss.chatProfile}>
                <div
                  className={windowcss.backbtn}
                  onClick={chatWindowCloseHandler}
                >
                  <IoArrowBackCircleSharp
                    className={windowcss.backbtnicon}
                  ></IoArrowBackCircleSharp>
                </div>
                <div
                  className={windowcss.groupName}
                  onClick={pageDetailsViewer}
                >
                  {groupName}
                </div>
              </div>
              <div className={windowcss.chatWindow}>
                <div className={windowcss.activeUser}>
                  <p>shivam5676 joined</p>
                </div>

                {allmessage ? chatArray : "no message"}
              </div>
              <div className={windowcss.chatInput}>
                <input ref={messageref}></input>
                <button className={windowcss.sendbtn} onClick={sendmsgHandler}>
                  send
                </button>
              </div>
            </>
          ) : (
            <GroupDetails closeDetailPage={backbuttonHandler}></GroupDetails>
          )}
        </div>
      )}
    </div>
  );
};
export default ChatWindow;
