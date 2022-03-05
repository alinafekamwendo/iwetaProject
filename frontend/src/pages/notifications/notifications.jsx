import React,{useState,useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";
//socket
const { io } = require("socket.io-client");

const Notification=()=>{
    const [socket,setSocket]=useState(null);
    const [user,setUser]=useState(null);
    //connecting socket io
  useEffect(()=>{
    setSocket(io("http://localhost:3002"));
    // console.log(socket.on("firstEvent",(msg)=>{
    //   console.log(msg);
    // }));
  
  },[]);

//   useEffect(()=>{
//     socket.emit("newUser",user)
//   },[socket,user]);


    return (
        <div>
           <h1>hello notification</h1>

        </div>
    )

}
export default Notification


