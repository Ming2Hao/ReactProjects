import React from 'react'
import { useParams } from 'react-router-dom';
import userHandler from '../handler/UserHandler';
import { useState,useEffect,useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

const Mainchat = () => {
  const { register, handleSubmit, reset,formState: { errors } } = useForm();
    const { getMessagesWithId,pinMessages,unsendMessages,chatting } = userHandler;
    const { id } = useParams();
    const [message,setMessage]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [tujuan,setTujuan]=useState();
    const navigate = useNavigate();
    
    async function getMessages2() {
        console.log("masuk getmessages2");
        try {
          setIsLoading(true);
          const res = await getMessagesWithId({ id: id });
          const tempisi = res.data;
        //   console.log("ini tempisizzz", tempisi);
          setMessage(tempisi);
          // console.log("ini messagezzz", message);
        } catch (error) {
          console.log("Error fetching messages:", error);
        } finally {
          setIsLoading(false);
        }
      }
      
      function kembali(){
        navigate("/home")
      }
      function kepinned(){
        navigate(`/home/chat/${id}/pinned`)
      }
      function pin(idx){
        pinMessages({id:id,index:idx})
        getMessages2();
      }
      function unsend(idx){
        unsendMessages({id:id,index:idx})
        getMessages2();
      }
      function chat(data){
        let tempisi={id:id,messages:data.pesan,user:localStorage.getItem("currentUser")}
        chatting(tempisi);
        getMessages2();
        navigate(0)
      }
      useEffect(() => {
        getMessages2();
      }, [id]);
      useEffect(() => {
        if(!isLoading){
            if(message.user1==localStorage.getItem("currentUser")||message.user2==localStorage.getItem("currentUser")){

            }
            else{
                throw new Response('',{ status: 403 })
            }
        }
      }, [isLoading])
  return (
    <div className='col-9'>
        <div className="d-flex px-3 py-3">
          <button onClick={kembali}>kembali</button>
          <h3>{message.user1==localStorage.getItem("currentUser")?message.user2:message.user1}</h3>
          <button onClick={kepinned}>pinned</button>
        </div>
        {/* {isLoading ? <div>Loading...</div>:message.messages.map((item)=>{return <h3>{item.message}</h3>})} */}
        {/* {message.messages.map((item)=>{return <h3>{item.message}</h3>})} */}
        {isLoading ? <div>Loading...</div>:message.messages.map((item,idx)=>{return <div className={item.pinned==true?'bg-warning border mx-3 mb-3 px-3 py-3':'border mx-3 mb-3 px-3 py-3'} onDoubleClick={()=>pin(idx)}>{item.sender==localStorage.getItem("currentUser")?<><span style={{color:"green"}}>{item.message}</span><br /><button onClick={()=>unsend(idx)}>unsend</button></>:<span>{item.message}</span>}</div>})}
        <form onSubmit={handleSubmit(chat)}>
          <input type="text" name="message" id="message" {...register("pesan")}/>
          <button type="submit">kirim</button>
        </form>
        {/* {isLoading ? <div>Loading...</div>:console.log(message)} */}
    </div>
  )
}

export default Mainchat