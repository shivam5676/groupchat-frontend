import { useEffect, useState } from "react";
import groupListcss from "./groupList.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { dataSliceActions } from "../store/data";

import socket from "../socket/socket";
import { Vortex } from "react-loader-spinner";
import { MdOutlineGroupAdd } from "react-icons/md";

const GroupList = (props) => {
  const [groupListData, setGroupListData] = useState([]);
  const [isActive, setActive] = useState(null);
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  const groupHandler = (group) => {
    console.log(group);
    dispatch(dataSliceActions.addGroupId(group.id));
    dispatch(dataSliceActions.addGroupName(group.groupName));
    dispatch(dataSliceActions.activateChatWindow());
    setActive(group.id);
  };

  const AllGroup = useSelector((state) => state.data.Allmsg);
  const grouplist = useSelector((state) => state.data.groupList);
  console.log(grouplist);

  useEffect(() => {
    const newArray = grouplist.map((current) => {
      const currentGrp = AllGroup[current[0].id];
      let lastmsgId;
      let lastmessage;
      if (currentGrp && currentGrp.length > 0) {
        lastmsgId = currentGrp[currentGrp.length - 1].messageid;
        lastmessage = `${currentGrp[currentGrp.length - 1].user.name} : ${
          currentGrp[currentGrp.length - 1].text
        }`;
      } else {
        lastmsgId = null;
        lastmessage = "No messages yet";
      }
      axios
        .get(
          `http://localhost:4000/user/getmsg?groupid=${current[0].id}&lastmsgId=${lastmsgId}`,
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
          className={`${groupListcss.item} ${
            isActive === current[0].id ? groupListcss.active : ""
          }`}
          key={current[0].id}
          onClick={() => groupHandler(current[0])}
        >
          <div className={groupListcss.profileImg}></div>
          <div className={groupListcss.groupInfo}>
            <div className={groupListcss.groupName}>
              <p>{current[0].groupName}</p>
            </div>
            <div className={groupListcss.lastMsg}>{lastmessage}</div>
          </div>
        </div>
      );
    });
    setGroupListData(newArray);
    setLoader(false);
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });
  }, [grouplist]);

  useEffect(() => {
    socket.on("getMsg", (data) => {
      console.log(data);
      dispatch(dataSliceActions.addMsg(data));
    });
  }, []);

  useEffect(() => {
    const handleSocketUpdate = async () => {
      console.log(socket.connected);
      // if (!socket.connected) {
      //   try {
      //     await updateSocketConnection(localStorage.getItem("token"));
      //     console.log("Socket connection updated successfully",socket);
      //   } catch (error) {
      //     console.error("Error updating socket connection:", error);
      //   }
      // }
      console.log(socket);

      grouplist.forEach((current) => {
        console.log(current[0].id);
        socket.emit("join-room", current[0].id);
      });
    };

    handleSocketUpdate();
  }, [grouplist]);

  return (
    <>
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
                colors={["red", "green", "blue", "yellow", "orange", "purple"]}
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
    </>
  );
};
export default GroupList;
