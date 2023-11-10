import React, { useEffect, useState } from "react";
import SignUp from "./signup/signup";
import Login from "./login/login";
import appcss from "../src/app.module.css";
import { Route, Routes } from "react-router-dom";
import ChatWindow from "./chat/chatWindow";
import HomePage from "./homePage/HomePage";
import GroupList from "./groups/groupList";
import AddGroup from "./groups/addGroup";
import axios from "axios";
function App() {
  const [openAddGroup, setOpenAddGroup] = useState(false);
  const openAddGroupHandler = () => {
    setOpenAddGroup(true);
  };
  // const [isLoggedin,setIsLoggedIn] = useState(false);

  const isLoggedin = localStorage.getItem("isLoggedIn");
  console.log(isLoggedin);
  return (
    <div className={appcss.containers}>
      <Routes>
        {isLoggedin ? (
          <>
          <Route path ="/creategroup" element={<AddGroup></AddGroup>}></Route>
            <Route path="/" element={<HomePage></HomePage>}></Route>
          </>
        ) : (
          <>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/signup" element={<SignUp></SignUp>}></Route>
            <Route path="*" element={<Login></Login>}></Route>
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
