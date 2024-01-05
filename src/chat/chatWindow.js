import { useEffect, useRef, useState } from "react";
import windowcss from "./chatWindow.module.css";

import { useDispatch, useSelector } from "react-redux";
import { IoArrowBackCircleSharp } from "react-icons/io5";

import GroupDetails from "../groups/GroupDetails";
import { dataSliceActions } from "../store/data";
// import socket from "../socket/socket";

import { BsFillSendFill } from "react-icons/bs";
import ChatMessage from "./chatMessage";
import { FaRegImages } from "react-icons/fa";
import useSocket from "../socket/socket";

const ChatWindow = () => {
  const socket = useSocket();

  const chatWindowRef = useRef(null);
  const dispatch = useDispatch();

  const messageref = useRef();
  const [pageDetail, setPageDetail] = useState(false);

  const groupId = useSelector((state) => {
    return state.data.groupId;
  });

  const allmessage = useSelector((state) => {
    return state.data.Allmsg[groupId];
  });

  const groupName = useSelector((state) => {
    return state.data.groupName;
  });
  const chatWindowOpen = useSelector((state) => {
    return state.data.isWindowOpen;
  });

  const sendmsgHandler = () => {
    const messageData = messageref.current.value;

    socket.emit("sendmsg", {
      message: messageData,
      groupid: groupId,
      token: localStorage.getItem("token"),
    });

    messageref.current.value = "";
  };

  const pageDetailsViewer = () => {
    setPageDetail(true);
  };
  const backbuttonHandler = () => {
    setPageDetail(false);
  };
  const chatWindowCloseHandler = () => {
    dispatch(dataSliceActions.deactivateChatWindow());
  };
  useEffect(() => {
    // Scroll to the bottom of the chat window when dependency is updated
    if (chatWindowRef.current) {
      console.log("Container Height:", chatWindowRef.current.clientHeight);
      console.log("Scroll Height:", chatWindowRef.current.scrollHeight);
      console.log("Scroll Top:", chatWindowRef.current.scrollTop);
      setTimeout(() => {
        chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
      }, 0);
    }
  }, [allmessage]);
  const imageUploader = () => {
    // props.imageUploaderOpen()
    dispatch(dataSliceActions.imageWindowLoader());
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
                  <div className={windowcss.activeUser}>
                    <p>tap here for more info </p>
                  </div>
                </div>
              </div>

              <div className={windowcss.chatWindow} ref={chatWindowRef}>
                {allmessage ? (
                  <ChatMessage></ChatMessage>
                ) : (
                  "no message found send first msg"
                )}
              </div>

              <div className={windowcss.chatInput}>
                <FaRegImages
                  className={windowcss.imageUpload}
                  onClick={imageUploader}
                />
                <input
                  ref={messageref}
                  className={windowcss.messageTaker}
                ></input>

                <BsFillSendFill
                  className={windowcss.sendbtn}
                  onClick={sendmsgHandler}
                ></BsFillSendFill>
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
