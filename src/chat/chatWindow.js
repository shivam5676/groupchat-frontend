import { useEffect, useRef } from "react";
import windowcss from "./chatWindow.module.css";
import axios from "axios";

const ChatWindow = () => {
  const messageref = useRef();
  const sendmsgHandler = () => {
    const messageData = messageref.current.value;
    console.log(messageData);
    axios
      .post(
        "http://localhost:4000/user/sendmsg",
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
//   useEffect(() => {
   

//     axios
//       .get(`http://localhost:4000/user/getmsg`, {
//         headers: { Authorization: localStorage.getItem("token") },
//       })
//       .then((response) => {
//         console.log(response);
//         localStorage.setItem("chat", JSON.stringify(response.data));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//  const chatArray = JSON.parse(localStorage.getItem("chat"));
 
//      const lastMessageId=chatArray[0].id
    
    
//     console.log(lastMessageId);
//     const intervalId = setInterval(() => {
//       axios
//         .get(`http://localhost:4000/user/getmsg?lastmsgId=${lastMessageId}`, {
//           headers: { Authorization: localStorage.getItem("token") },
//         })
//         .then((response) => {
//           console.log(response);

//         })
//         .catch((err) => {

//           console.log(err);
//         });
//     }, 3000);
//     return () => {
//       clearInterval(intervalId);
//     };
//   }, []);

  return (
    <div className={windowcss.main}>
      <div className={windowcss.container}>
        <div className={windowcss.chatWindow}>
          <div className={windowcss.activeUser}>
            <p>shivam5676 joined</p>
          </div>
          <div className={windowcss.recievermsg}>
            <p>shivam :helllo</p>
          </div>
          <div className={windowcss.sendermsg}>
            <p>me:hiii</p>
          </div>
        </div>
        <div className={windowcss.chatInput}>
          <input ref={messageref}></input>
          <button className={windowcss.sendbtn} onClick={sendmsgHandler}>
            send
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatWindow;
