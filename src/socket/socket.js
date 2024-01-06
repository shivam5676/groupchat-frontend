


import { io } from "socket.io-client";




// const Socket = () => {
//   //  const domain=process.env.REACT_APP_BACKENDURL
//   // console.log("token in socket folder",token);
//   const domain=process.env.REACT_APP_BACKENDURL
//   console.log(domain)
//   return io(`${domain}`);
// };
const Socket=io(process.env.REACT_APP_BACKENDURL)
// let useSocket = createSocketConnection(localStorage.getItem("token"));

export default Socket;


  
