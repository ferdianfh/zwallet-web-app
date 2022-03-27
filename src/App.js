import React, { Fragment, useEffect } from "react";
import Router from "./config/Router";
import UserProvider from "./context/UserContext";
// import { io } from "socket.io-client";
import socket from "../src/helpers/socket";

const App = () => {
  useEffect(() => {
    // const socket = io("http://localhost:3300");
    console.log(socket);
  }, []);

  return (
    <Fragment>
      <UserProvider>
        <Router />
      </UserProvider>
    </Fragment>
  );
};

export default App;
