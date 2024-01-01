// import { io } from "socket.io-client";

import { useSelector } from "react-redux";
import { io } from "socket.io-client";

// const createSocket = () => {
//   const token = localStorage.getItem("token");

//   const socket = io("http://localhost:4000", {
//     transportOptions: {
//       polling: {
//         extraHeaders: {
//           Authorization: token,
//         },
//       },
//     },
//   });

//   console.log("Token:", token);

//   return socket;
// };

// const socket = createSocket();

// export default socket;


// const socket = io("http://localhost:4000", {
    
//   transportOptions: {
//     polling: {
//       extraHeaders: {
//         Authorization: localStorage.getItem("token"),
//       },
//     },
//   },
// });
// console.log("token")
// export default socket;

const createSocketConnection = (token) => {
   // const states=useSelector((state)=>{console.log(state.data)})
  console.log("token in socket folder",token);
  return io("http://localhost:4000", {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hpdmFtIHNpbmdoIiwibW9iaWxlIjoiOTU1OTkyMzI4NiIsImlkIjoyLCJpYXQiOjE3MDQxMTA4MjV9.j4gGUKgbjn9W6K6o-aLsyOYoF6njdNDx2iBzabS8jOY",
        },
      },
    },
  });
};

let socket = createSocketConnection(localStorage.getItem("token"));
console.log(socket)
export default socket;

// export const updateSocketConnection = (newToken) => {
//     return new Promise((resolve, reject) => {
//       // Close the existing socket connection
//       socket.disconnect();
  
//       console.log("token", newToken);
  
//       // Create a new socket connection with the new token
//       const newSocket = createSocketConnection(newToken);
  
//       // Wait for the new connection to be established
//       newSocket.on("connect", () => {
//         // Assign the new socket to the exported variable
//         socket = newSocket;
//         resolve();
//       });
  
//       // Handle connection errors
//       newSocket.on("connect_error", (error) => {
//         console.error("Error connecting to socket:", error);
//         reject(error);
//       });
//     });
//   };
  
