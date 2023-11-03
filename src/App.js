import React from "react";
import SignUp from "./signup/signup";
import Login from "./login/login";
import appcss from "../src/app.module.css";
import { Route, Routes } from "react-router-dom";
import ChatWindow from "./chat/chatWindow";
import HomePage from "./homePage/HomePage";
function App() {
  return (
    <div className={appcss.container}>
      {/* <Login></Login> */}
      <HomePage></HomePage>
      <Routes>
    
     {/* <Route path="/" element={<Login></Login>}  ></Route>  */}
     {/* <Route path="/" element={<SignUp></SignUp>}  ></Route>  */}
     <Route path="/" element={<ChatWindow></ChatWindow>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
