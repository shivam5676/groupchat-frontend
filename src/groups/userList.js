import { FcDeleteDatabase } from "react-icons/fc";
import { MdCloudDone } from "react-icons/md";
import userListCss from "./userList.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { HiMiniShieldCheck } from "react-icons/hi2";
import { toast } from "react-toastify";
import { Vortex } from "react-loader-spinner";

const UserList = () => {
  const [totalUser, settotalUser] = useState([]);
  const [loader, setLoader] = useState(true);
  const domain = process.env.REACT_APP_BACKENDURL;
  const currentgroupId = useSelector((state) => {
    return state.data.groupId;
  });
  const addAdminHandler = (userId) => {
    axios
      .get(
        `${domain}/user/makeAdmin?userid=${userId}&groupid=${currentgroupId}`,

        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then((result) => {
        toast.success("new admin added...plz refresh page to see changes");
      })
      .catch((err) => toast.error(err.response.data.msg));
  };
  const deleteUserHandler = (userId) => {
    axios
      .get(
        `${domain}/user/deleteUser?userid=${userId}&groupid=${currentgroupId}`,

        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then((result) => {
        toast(
          "user deleted successfully...refresh page and see updated result"
        );
      })
      .catch((err) => toast.error(err.response.data.msg));
  };
  const groupId = useSelector((state) => {
    return state.data.groupId;
  });
  useEffect(() => {
    axios
      .get(`${domain}/user/getuser?&groupid=${groupId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        const newArray = response.data.map((current) => {
          return (
            <div className={userListCss.memberCard} key={current.userId}>
              <div className={userListCss.memberDetails}>
                <div className={userListCss.memberImg}>
                  {current.isAdmin && (
                    <HiMiniShieldCheck
                      className={userListCss.adminIcon}
                    ></HiMiniShieldCheck>
                  )}
                  <img src={current.usersdata.profileImage} alt="img" />
                </div>
                <div className={userListCss.memberdetailsText}>
                  {" "}
                  <div className={userListCss.memberName}>
                    {current.usersdata.name}
                    {/* {current.isAdmin && (
                      <HiMiniShieldCheck
                        className={userListCss.adminIcon}
                      ></HiMiniShieldCheck>
                    )} */}
                  </div>
                  <div className={userListCss.memberPhone}>
                    {current.usersdata.mobile}
                  </div>
                </div>
              </div>{" "}
              <div className={userListCss.memberActions}>
                {!current.isAdmin ? (
                  <div
                    className={userListCss.actionIcon}
                    onClick={() => {
                      addAdminHandler(current.userId);
                    }}
                  >
                    <MdCloudDone className={userListCss.icon}></MdCloudDone>
                    Add admin
                  </div>
                ) : (
                  ""
                  // <div className={userListCss.adminmsg}>admin</div>
                )}
                <div
                  className={userListCss.actionIcon}
                  onClick={() => {
                    deleteUserHandler(current.userId);
                  }}
                >
                  <FcDeleteDatabase
                    className={userListCss.icon}
                  ></FcDeleteDatabase>{" "}
                  <div>
                    {" "}
                    <p>delete</p>
                    <p>user</p>
                  </div>
                  {/* del user */}
                </div>
              </div>
            </div>
          );
        });
        settotalUser(newArray);
        setLoader(false);
      })
      .catch((err) => {
      
        setLoader(false);
      });
  }, []);
  return (
    <>
      {!loader && totalUser}
      {loader &&<div className={userListCss.loader}> <Vortex></Vortex>getting list and styling...</div>}
    </>
  );
};
export default UserList;
