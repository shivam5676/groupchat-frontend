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
import FileUploader from "./fileUploader";
import { dataSliceActions } from "../store/data";
import useCustomDomain from "../useCustomDomain";

const GroupDetails = (props) => {
  const [searchMode, setSearchMode] = useState(false);
const domain=useCustomDomain();
  const [GroupDetails, setGroupDetails] = useState(undefined);
 const dispatch=useDispatch();
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
      .get(`${domain}/user/getGroupInfo?groupId=${groupId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((result) => {
        setGroupDetails(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const imageUploader=()=>{
    // props.imageUploaderOpen()
    dispatch(dataSliceActions.imageWindowLoader())
  }
  return (
    <div className={groupdetailcss.pageDetails}>
      <div className={groupdetailcss.Backbtn}>
        <FaArrowCircleLeft
          className={groupdetailcss.backbtnicon}
          onClick={backbuttonHandler}
        ></FaArrowCircleLeft>
      </div>
      <div className={groupdetailcss.pageData}>
        <div className={groupdetailcss.pageimg}>
          <div onClick={imageUploader}>change</div>
        </div>

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
