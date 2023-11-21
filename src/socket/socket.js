import { io } from "socket.io-client";

const createSocketConnection = (token) => {
  return io("http://localhost:4000", {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: token,
        },
      },
    },
  });
};

const socket = createSocketConnection(localStorage.getItem("token"));
export default socket;

export const updateSocketConnection = (newToken) => {
  // Close the existing socket connection
  socket.disconnect();

  // Create a new socket connection with the new token
  const newSocket = createSocketConnection(newToken);

  // Update the exported socket with the new connection
  Object.assign(socket, newSocket);
};