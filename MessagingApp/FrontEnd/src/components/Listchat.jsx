import React from 'react'
import { Outlet } from "react-router-dom";
import { Form, useFetcher, useLoaderData, useSubmit,useNavigate } from "react-router-dom";
import Chaticon from './Chaticon';
import { useState,useEffect } from 'react'
import userHandler from '../handler/UserHandler';
import { get } from 'react-hook-form';



const Listchat = () => {
    const { getMessages } = userHandler;
    const [message,setMessage]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [refresh,setRefresh]=useState(true);
    const navigate = useNavigate();
    
    async function getMessages2() {
        try {
          setIsLoading(true);
          const res = await getMessages({ username: localStorage.getItem("currentUser") });
          const tempisi = res.data;
        //   console.log("ini tempisi", tempisi);
          setMessage(tempisi);
        //   console.log("ini message", tempisi);
        } catch (error) {
          console.log("Error fetching messages:", error);
        } finally {
          setIsLoading(false);
        }
      }
      function addFriend(){
        navigate("/home/addfriend")
      }
      useEffect(() => {
        getMessages2();
      }, [refresh]);
    // async function getMessages2(){
    //     let tempisi=[];
    //     await getMessages({username:localStorage.getItem("currentUser")}).then(async (res)=>{
    //         let tempisi=res.data;
    //         console.log("ini tempisi",tempisi);
    //         setMessage(tempisi);
    //         console.log("ini message",message);
    //     });
    // }
    // useEffect(() => {
    //     setIsLoading(true);
    //     getMessages2();
    //     setIsLoading(false);
    // },[])
  return (
    <div className='col-3 border'>
      <div className="d-flex my-2">
        <h1>Home</h1>
        <button onClick={addFriend}>Add Friend</button>
      </div>
        {isLoading ? <div>Loading...</div>:(message.data.map((item)=>{return <Chaticon chat={item} refresh={refresh} setRefresh={setRefresh}></Chaticon>}))}
        {/* {isLoading ? <div>Loading...</div>:(message.nomessage.map((item)=>{return <Chaticon2 username={item}></Chaticon2>}))} */}
        {/* message.data.map((item)=>{return <Chaticon username={item.id}></Chaticon>}) */}
        {/* <Chaticon></Chaticon>
        <Chaticon></Chaticon>
        <Chaticon></Chaticon>
        <Chaticon></Chaticon> */}
    </div>
  )
}

export default Listchat