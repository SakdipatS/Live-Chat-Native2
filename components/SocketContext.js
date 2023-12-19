import React, { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { selectUser } from "../store/Reducer";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const register = useSelector(selectUser);
  const url = "https://api.spinixslot.io";
  const path = "/backend-chat-dev-service/socket.io";
  
  useEffect(() => {
    const newSocket = io(url, {
      path: path,
      pingInterval: 10000,
      pingTimeout: 5000,
      transports: ["websocket"],
      query: { ...register },
    });

    // Attach event listeners to handle responses
    newSocket.on("connect", (data) => {
      console.log("Connected to the socket");
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [register]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

