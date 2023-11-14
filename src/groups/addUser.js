import axios from "axios";
import addUserCss from "./addUser.module.css";
import { MdCloudDone } from "react-icons/md";
import { useRef, useState } from "react";
import { FaUserCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

const AddUser = () => {
  const [searchresult, setSearchResult] = useState([]);
  const currentgroupId = useSelector((state) => {
    return state.data.groupId;
  });
  const searchref=useRef()
  const addUserToGroupHandler = (newuserId) => {
    console.log(newuserId);
    axios
      .get(
        `http://localhost:4000/user/addUser?userId=${newuserId}&groupId=${currentgroupId}`,

        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  };
  const searchuserHandler = () => {
    axios
      .get(
        `http://localhost:4000/user/fetchalluser?search=${searchref.current.value}`,

        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then((response) => {
        const newArray = response.data.map((current) => {
          return (
            <div className={addUserCss.memberCard} key={current.id}>
              <div className={addUserCss.memberDetails}>
                <div className={addUserCss.memberImg}></div>
                <div className={addUserCss.memberdetailsText}>
                  {" "}
                  <div className={addUserCss.memberName}>{current.name}</div>
                  <div className={addUserCss.memberPhone}>{current.mobile}</div>
                </div>
              </div>{" "}
              <div className={addUserCss.memberActions}>
                <div
                  className={addUserCss.actionIcon}
                  onClick={() => addUserToGroupHandler(current.id)}
                >
                  <FaUserCheck className={addUserCss.icon}></FaUserCheck>
                  Add
                </div>
              </div>
            </div>
          );
        });

        setSearchResult(newArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={addUserCss.inputfield}>
        <input ref={searchref}></input>
        <button onClick={searchuserHandler}>search</button>
      </div>
      {searchresult}
    </>
  );
};
export default AddUser;
