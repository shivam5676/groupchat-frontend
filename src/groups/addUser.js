import axios from "axios";
import addUserCss from "./addUser.module.css";
import { MdCloudDone } from "react-icons/md";
import { useRef, useState } from "react";
import { FaUserCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MagnifyingGlass } from "react-loader-spinner";
import { toast } from "react-toastify";

const AddUser = () => {
  const [searchresult, setSearchResult] = useState([]);
  const [loader, setLoader] = useState(false);
  const [addedloader, setAddedLoader] = useState(false);
  const currentgroupId = useSelector((state) => {
    return state.data.groupId;
  });
  const searchref = useRef();
  const addUserToGroupHandler = (newuserId) => {
    axios
      .get(
        `http://localhost:4000/user/addUser?userId=${newuserId}&groupId=${currentgroupId}`,

        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then((result) => {
        console.log(result);
     toast.success("user added successfully go back and see updated user list")
        setAddedLoader(true);
        
      })
      .catch((err) => toast.error("something went wrong try again"));
  };
  const searchuserHandler = () => {
    setLoader(true);
    setTimeout(() => {
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
                    <div className={addUserCss.memberPhone}>
                      {current.mobile}
                    </div>
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
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
          toast.error(err.response.data.msg)
        });
    }, 1000);
  };

  return (
    <>
      <div className={addUserCss.inputfield}>
        <input ref={searchref} placeholder="hello"></input>
        <button onClick={searchuserHandler}>search</button>
      </div>
      {loader && (
        <div className={addUserCss.glass}>
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
          searching in database
        </div>
      )}

      {!loader && searchresult}
    </>
  );
};
export default AddUser;
