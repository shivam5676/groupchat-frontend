import { useEffect, useState } from "react";
import groupListcss from "./groupList.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { dataSliceActions } from "../store/data";

// import socket from "../socket/socket";
import { Vortex } from "react-loader-spinner";
import { MdOutlineGroupAdd } from "react-icons/md";
import GroupListPrint from "./groupListPrint";

// import useSocket from "../socket/socket";
import Socket from "../socket/socket";
import useWindowSize from "../windowSize";

const GroupList = (props) => {
  // const socket=useSocket()
  
 
  const [groupListData, setGroupListData] = useState([]);
  const [isActive, setActive] = useState(null);
  const [loader, setLoader] = useState(true);

  const dispatch = useDispatch();
  const domain = process.env.REACT_APP_BACKENDURL;

  
  const AllGroupMsg = useSelector((state) => state.data.Allmsg);
  const grouplist = useSelector((state) => state.data.groupList);

  let chatWindowOpenState = useSelector((state) => {
    return state.data.isWindowOpen;
  });
  const windowWidth = window.innerWidth;

 if (windowWidth >= 376) {
    chatWindowOpenState = true;
  }
const [windowSizeState, setWindowSizeState] = useState(windowWidth>=376?chatWindowOpenState:true);
// const {width}=useWindowSize();


console.log(windowSizeState)
  const groupHandler = (group) => {
    dispatch(dataSliceActions.addGroupId(group.id));
    dispatch(dataSliceActions.addGroupName(group.groupName));
    dispatch(dataSliceActions.activateChatWindow());
    setActive(group.id);
  };
  useEffect(() => {
    setTimeout(() => {
      let lastmsgId;
      let lastmessage;

      const newArray = grouplist.map((current) => {
        Socket.emit("join-room", current[0].id);
        const currentGrp = AllGroupMsg[current[0].id];

        if (currentGrp && currentGrp.length > 0) {
          lastmsgId = currentGrp[currentGrp.length - 1].messageid;
          lastmessage = `${currentGrp[currentGrp.length - 1].user.name} : ${
            currentGrp[currentGrp.length - 1].text
          }`;
        } else {
          lastmsgId = null;
          lastmessage = "click & check new msg";
        }
        axios
          .get(
            `${domain}/user/getmsg?groupid=${current[0].id}&lastmsgId=${lastmsgId}`,
            {
              headers: { Authorization: localStorage.getItem("token") },
            }
          )
          .then((response) => {
            response.data.forEach((item) => {
              dispatch(dataSliceActions.addMsg(item));
            });
          })
          .catch((err) => {
            setLoader(false);
          });
        //display current group card
        return (
          <div
            className={`${groupListcss.item}`}
            key={current[0].id}
            onClick={() => groupHandler(current[0])}
          >
            <div className={groupListcss.profileImg}>
              <img src={current[0].groupImage} alt="Group Image" />
            </div>
            <div className={groupListcss.groupInfo}>
              <div className={groupListcss.groupName}>
                <p>{current[0].groupName}</p>
              </div>
              <div className={groupListcss.lastMsg}>{lastmessage}</div>
            </div>
          </div>
          // <GroupListPrint key={current[0].id} group={current[0]} lastmessage={lastmessage}></GroupListPrint>
        );
      });
      setGroupListData(newArray);
      setLoader(false);
    }, 1500);
  }, [grouplist]);

  useEffect(() => {
    Socket.on("getMsg", (data) => {
      dispatch(dataSliceActions.addMsg(data));
    });
  }, []);
  console.log(chatWindowOpenState);
  return (
    <>
      {windowSizeState && (
        <div className={groupListcss.groupList}>
          <p className={groupListcss.groupTitle}>Chats</p>

          <div className={groupListcss.groups}>
            {loader ? (
              <div className={groupListcss.loader}>
                <Vortex
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="vortex-loading"
                  wrapperStyle={{}}
                  wrapperClass="vortex-wrapper"
                  colors={[
                    "red",
                    "green",
                    "blue",
                    "yellow",
                    "orange",
                    "purple",
                  ]}
                />
                Fetching...
              </div>
            ) : (
              groupListData
            )}

            {!loader && grouplist.length == 0 ? (
              <div className={groupListcss.loader}>
                <p>
                  create first group by clicking on{" "}
                  <MdOutlineGroupAdd
                    className={groupListcss.grpicon}
                  ></MdOutlineGroupAdd>
                </p>{" "}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default GroupList;
