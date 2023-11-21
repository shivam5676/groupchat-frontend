import { FaArrowCircleLeft } from "react-icons/fa";
import groupdetailcss from "./groupDetails.module.css";
import { useEffect } from "react";
import { PiUserListFill } from "react-icons/pi";
import { MdPersonSearch } from "react-icons/md";

import axios from "axios";
import { useState } from "react";
import AddUser from "./addUser";
import UserList from "./userList";
import { useDispatch, useSelector } from "react-redux";

const GroupDetails = (props) => {
  const dispatch = useDispatch();
  const [searchMode, setSearchMode] = useState(false);

  const [GroupDetails, setGroupDetails] = useState(undefined);
  console.log(GroupDetails);
  const groupId = useSelector((state) => state.data.groupId);
  const backbuttonHandler = () => {
    props.closeDetailPage();
  };
  const searchModeOnHandler = () => {
    setSearchMode(true);
  };
  const searchModeOffHandler = () => {
    setSearchMode(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/user/getGroupInfo?groupId=${groupId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((result) => {
       
        setGroupDetails(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={groupdetailcss.pageDetails}>
      <div className={groupdetailcss.Backbtn}>
        <FaArrowCircleLeft
          className={groupdetailcss.backbtnicon}
          onClick={backbuttonHandler}
        ></FaArrowCircleLeft>
      </div>
      <div className={groupdetailcss.pageData}>
        <div className={groupdetailcss.pageimg}></div>

        {GroupDetails && (
          <div className={groupdetailcss.pageinfo}>
            <div className={groupdetailcss.pageTitle}>
              {GroupDetails.groupName}
            </div>
            <div className={groupdetailcss.pageCreatedBy}>
              createdBy : {GroupDetails.users[0].name}
            </div>
            <div className={groupdetailcss.pageCreatedAt}>
              {" "}
              on:{" "}
              {new Date(GroupDetails.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        )}
      </div>
      <div className={groupdetailcss.pageAction}>
        <div className={groupdetailcss.actionCard}>
          <div
            className={groupdetailcss.membericon}
            onClick={searchModeOffHandler}
          >
            <PiUserListFill className={groupdetailcss.icon}></PiUserListFill>
            <p>Users</p>
          </div>
          <div
            className={groupdetailcss.membericon}
            onClick={searchModeOnHandler}
          >
            <MdPersonSearch className={groupdetailcss.icon}></MdPersonSearch>
            <p>Add Users</p>
          </div>
        </div>
      </div>
      <div className={groupdetailcss.pageMemberList}>
        {searchMode ? <AddUser></AddUser> : <UserList></UserList>}
      </div>
    </div>
  );
};
export default GroupDetails;
