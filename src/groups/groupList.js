import { useEffect, useState } from "react";
import groupListcss from "./groupList.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { dataSliceActions } from "../store/data";

const GroupList = (props) => {
  const [openAddGroup, setOpenAddGroup] = useState(false);
  const [groupListData, setGroupListData] = useState([]);
  const [isActive, setActive] = useState(null);
  const dispatch = useDispatch();

  const groupHandler = (group) => {
    console.log(group);
    dispatch(dataSliceActions.addGroupId(group.id));
    dispatch(dataSliceActions.addGroupName(group.groupName))
    dispatch(dataSliceActions.activateChatWindow())
    setActive(group.id);
  };
  console.log(isActive);

  useEffect(() => {
    axios
      .get("http://localhost:4000/user/fetchgroup", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        const newArray = response.data.map((current) => {
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
                <div className={groupListcss.lastMsg}>
                  i am online come here please djdjk
                </div>
              </div>
            </div>
          );
        });
        setGroupListData(newArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const groupInputHandler = () => {
    props.openAddGroup();
  };
  return (
    <>
      <div className={groupListcss.groupList}>
        <p className={groupListcss.groupTitle}>Chats</p>

        <div className={groupListcss.groups}>{groupListData}</div>
      </div>
    </>
  );
};
export default GroupList;
