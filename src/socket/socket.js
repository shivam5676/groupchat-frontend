


import { io } from "socket.io-client";
import useCustomDomain from "../useCustomDomain";



const useSocket = () => {
   const domain=useCustomDomain()
  // console.log("token in socket folder",token);
  console.log(domain)
  return io(`${domain}`);
};

// let useSocket = createSocketConnection(localStorage.getItem("token"));

export default useSocket;


  
