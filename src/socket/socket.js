import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: localStorage.getItem("token"),
        },
      },
    },
  });
  export default socket;