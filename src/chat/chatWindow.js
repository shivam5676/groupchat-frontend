import { useEffect, useRef, useState } from "react";
import windowcss from "./chatWindow.module.css";

import { useDispatch, useSelector } from "react-redux";
import { IoArrowBackCircleSharp } from "react-icons/io5";

import GroupDetails from "../groups/GroupDetails";
import { dataSliceActions } from "../store/data";
import socket from "../socket/socket";

import { BsFillSendFill } from "react-icons/bs";

const ChatWindow = () => {
  const chatWindowRef = useRef(null);
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

  const sendmsgHandler = () => {
    const messageData = messageref.current.value;

    socket.emit("sendmsg", { message: messageData, groupid: groupId });

    messageref.current.value=""
  };
 
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:4000/user/getGroupInfo?groupId=${groupId}`, {
  //       headers: { Authorization: localStorage.getItem("token") },
  //     })
  //     .then((result) => {
       
  //       setGroupDetails(result.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  useEffect(() => {
    const chats = allmessage;

    if (chats) {
      const newarray = chats.map((current, index) => {
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
            <div className={windowcss.sendermsg} key={current.messageid}>
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
            <div className={windowcss.recievermsg} key={current.messageid}>
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
  useEffect(() => {
    // Scroll to the bottom of the chat window when chatArray is updated
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chatArray]);
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
                  <p>online and tap here for more info </p>
                </div>
                </div>
              </div>

              <div className={windowcss.chatWindow} ref={chatWindowRef}>
                {allmessage ? chatArray : "no message found send first msg"}
              </div>

              <div className={windowcss.chatInput}>
                <input ref={messageref}></input>

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
