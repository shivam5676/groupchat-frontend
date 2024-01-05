import React, { useEffect, useState } from "react";
import SignUp from "./signup/signup";
import Login from "./login/login";
import appcss from "../src/app.module.css";
import { Route, Routes } from "react-router-dom";

import HomePage from "./homePage/HomePage";

import AddGroup from "./groups/addGroup";

import { useDispatch, useSelector } from "react-redux";
import { dataSliceActions } from "./store/data";

function App() {
  const [openAddGroup, setOpenAddGroup] = useState(false);
  const dispatch=useDispatch()
  const openAddGroupHandler = () => {
    setOpenAddGroup(true);
  }; 
  const isLoggedin=useSelector(state=>state.data.isLoggedIn);
  
  useEffect(()=>{
    console.log("app effect")
   if (localStorage.getItem("isLoggedIn")=="true"){
    dispatch(dataSliceActions.login())
   }

  },[])
 
  return (
    <div className={appcss.containers}>
     
      <Routes>
        {isLoggedin ? (
          <>
          <Route path ="/creategroup" element={<AddGroup></AddGroup>}></Route>
            <Route path="*" element={<HomePage></HomePage>}></Route>
           
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
