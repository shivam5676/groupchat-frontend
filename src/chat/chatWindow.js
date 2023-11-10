import { useEffect, useRef, useState } from "react";
import windowcss from "./chatWindow.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { FaArrowCircleLeft } from "react-icons/fa"
import GroupDetails from "../groups/GroupDetails";

const ChatWindow = () => {
  const messageref = useRef();
  const [pageDetail, setPageDetail] = useState(false);

  const [chatArray, setChatArray] = useState("no data is present");
  const groupId = useSelector((state) => {
    return state.data.groupId;
  });
  const groupName = useSelector((state) => {
    return state.data.groupName;
  });

  console.log(groupId);
  const sendmsgHandler = () => {
    const messageData = messageref.current.value;
    console.log(messageData);
    axios
      .post(
        `http://localhost:4000/user/sendmsg?groupid=${groupId}`,
        { messageData },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      const chatArray = JSON.parse(localStorage.getItem(`chat${groupId}`));

      let lastMessageId;
      if (chatArray && chatArray.length > 0) {
        console.log("execute");
        lastMessageId = chatArray[chatArray.length - 1].messageid;
        console.log("lastmessage", chatArray[chatArray.length - 1]);
      }

      console.log(chatArray);
      console.log("chatArray", lastMessageId);
      axios
        .get(
          `http://localhost:4000/user/getmsg?lastmsgId=${lastMessageId}&groupid=${groupId}`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        )
        .then((response) => {
          console.log("array", response.data);

          if (chatArray) {
            console.log("chatarray", chatArray);
            let mergedarray = chatArray.concat(response.data);
            console.log("mergedarray", mergedarray);
            localStorage.setItem(`chat${groupId}`, JSON.stringify(mergedarray));
          } else {
            localStorage.setItem(
              `chat${groupId}`,
              JSON.stringify(response.data)
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [groupId]);
  useEffect(() => {
    const chats = JSON.parse(localStorage.getItem(`chat${groupId}`));
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
          console.log("createdAt");

          return (
            <div className={windowcss.recievermsg} key={current.messageid}>
              <div className={windowcss.recieverMessageBox}>
                <p>{current.text} </p>
                <p className={windowcss.messagetime}>{formattedTime}</p>
              </div>
            </div>
          );
        }
      });
      setChatArray(newarray);
    }
  }, [groupId]);
  const pageDetailsViewer = () => {
    setPageDetail(true);
  };
const backbuttonHandler=()=>{
  setPageDetail(false);
}
  return (
    <div className={windowcss.chatBox}>
      <div className={windowcss.chatBoxContainer}>
        {!pageDetail ? (
          <>
            <div className={windowcss.chatProfile}>
              <div className={windowcss.backbtn}>
                <IoArrowBackCircleSharp
                  className={windowcss.backbtnicon}
                ></IoArrowBackCircleSharp>
              </div>
              <div className={windowcss.groupName} onClick={pageDetailsViewer}>
                {groupName}
              </div>
            </div>
            <div className={windowcss.chatWindow}>
              <div className={windowcss.activeUser}>
                <p>shivam5676 joined</p>
              </div>

              {chatArray}
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
        {/* <div className={windowcss.pageDetails}>
          <div className={windowcss.Backbtn}><FaArrowCircleLeft className={windowcss.backbtnicon} onClick={backbuttonHandler}></FaArrowCircleLeft></div>
          <div className={windowcss.pageData}>
            <div className={windowcss.pageimg}></div>

            <div className={windowcss.pageTitle}>group details</div>
          </div>
          <div  className={windowcss.pageMemberTitle}>group member</div>
          <div className={windowcss.pageMemberList}></div>
        </div> */}
      </div>
    </div>
  );
};
export default ChatWindow;
