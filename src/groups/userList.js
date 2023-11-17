import { FcDeleteDatabase } from "react-icons/fc";
import { MdCloudDone } from "react-icons/md";
import userListCss from "./userList.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { HiMiniShieldCheck } from "react-icons/hi2"
const UserList = () => {
  const [totalUser, settotalUser] = useState([]);
  const currentgroupId = useSelector((state) => {
    return state.data.groupId;
  });
  const addAdminHandler = (userId) => {
    console.log(userId);
    axios
      .get(
        `http://localhost:4000/user/makeAdmin?userid=${userId}&groupid=${currentgroupId}`,

        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  };
  const deleteUserHandler = (userId) => {
    console.log(userId);
    axios
      .get(
        `http://localhost:4000/user/deleteUser?userid=${userId}&groupid=${currentgroupId}`,

        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  };
  const groupId = useSelector((state) => {
    return state.data.groupId;
  });
  useEffect(() => {
    axios
      .get(`http://localhost:4000/user/getuser?&groupid=${groupId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        const newArray = response.data.map((current) => {
          console.log(current.isAdmin);
          return (
            <div className={userListCss.memberCard} key={current.userId}>
              <div className={userListCss.memberDetails}>
                <div className={userListCss.memberImg}></div>
                <div className={userListCss.memberdetailsText}>
                  {" "}
                  <div className={userListCss.memberName}>
                    {current.usersdata.name}{current.isAdmin&&<HiMiniShieldCheck className={userListCss.adminIcon}></HiMiniShieldCheck>}
                  </div>
                  <div className={userListCss.memberPhone}>
                    {current.usersdata.mobile}
                  </div>
                </div>
              </div>{" "}
              <div className={userListCss.memberActions}>
                {!current.isAdmin?<div
                  className={userListCss.actionIcon}
                  onClick={() => {
                    addAdminHandler(current.userId);
                  }}
                >
                  <MdCloudDone className={userListCss.icon}></MdCloudDone>
                  admin
                </div>:<div className={userListCss.adminmsg}>admin</div>}
                <div className={userListCss.actionIcon}>
                  <FcDeleteDatabase
                    className={userListCss.icon}
                    onClick={() => {
                      deleteUserHandler(current.userId);
                    }}
                  ></FcDeleteDatabase>{" "}
                  user
                </div>
              </div>
            </div>
          );
        });
        settotalUser(newArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <>{totalUser}</>;
};
export default UserList;
