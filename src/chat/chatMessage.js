import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import chatMessagecss from "./chatMessage.module.css"
const ChatMessage=()=>{
    const [chatArray, setChatArray] = useState([]);
    const groupId = useSelector((state) => {
        return state.data.groupId;
      });
    const allmessage = useSelector((state) => {
        return state.data.Allmsg[groupId];
      });
    useEffect(() => {
        const chats = allmessage;
    
        if (chats) {
          const userChats = chats.map((current, index) => {
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
                <div className={chatMessagecss.sendermsg} key={current.messageid}>
                  <div className={chatMessagecss.sendermsgLeft}>
                    <div className={chatMessagecss.senderMessageBox}>
                      <p>{current.text} </p>
    
                      <p className={chatMessagecss.messagetime}>{formattedTime}</p>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div className={chatMessagecss.recievermsg} key={current.messageid}>
                  <div className={chatMessagecss.recieverMessageBox}>
                    <div className={chatMessagecss.recieverdetails}>
                      <p>{current.user.name}</p> <p>{current.user.mobile}</p>
                    </div>
                    <p className={chatMessagecss.usermessage}>{current.text} </p>
                    <p className={chatMessagecss.messagetime}>{formattedTime}</p>
                  </div>
                </div>
              );
            }
          });
          setChatArray(userChats);
        }
      }, [groupId, allmessage]);
    return(
        <>{chatArray}</>
    )
}
export default ChatMessage