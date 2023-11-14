import { FaArrowCircleLeft } from "react-icons/fa";
import groupdetailcss from "./groupDetails.module.css";
import { useEffect } from "react";
import { PiUserListFill } from "react-icons/pi";
import { MdCloudDone, MdPersonSearch } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { FcDeleteDatabase } from "react-icons/fc";
import axios from "axios";
import { useState } from "react";
import AddUser from "./addUser";
import UserList from "./userList";
const GroupDetails = (props) => {
  const [searchresult, setSearchResult] = useState([]);
  const backbuttonHandler = () => {
    props.closeDetailPage();
  };
  
  
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

        <div className={groupdetailcss.pageinfo}>
          <div className={groupdetailcss.pagetitle}>title</div>
          <div className={groupdetailcss.pageCreatedBy}>pageCreatedBy</div>
          <div className={groupdetailcss.pageCreatedAt}>CreatedAT</div>
        </div>
      </div>
      <div className={groupdetailcss.pageAction}>
        <div className={groupdetailcss.actionCard}>
          <div className={groupdetailcss.membericon}>
            <PiUserListFill className={groupdetailcss.icon}></PiUserListFill>
            <p>Users</p>
          </div>
          <div className={groupdetailcss.membericon}>
            <MdPersonSearch className={groupdetailcss.icon}></MdPersonSearch>
            <p>Add Users</p>
          </div>
        </div>
      </div>
      <div className={groupdetailcss.pageMemberList}>
     
        <AddUser></AddUser>
        <UserList></UserList>
       
      </div>
    </div>
  );
};
export default GroupDetails;
