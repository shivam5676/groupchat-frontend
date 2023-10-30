import windowcss from "./chatWindow.module.css";
const ChatWindow = () => {
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
          <input></input>
          <button className={windowcss.sendbtn}>send</button>
        </div>
      </div>
    </div>
  );
};
export default ChatWindow;
