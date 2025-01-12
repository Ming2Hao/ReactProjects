import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import userHandler from '../handler/UserHandler';


const Chaticon = (props) => {
    const { readMessages } = userHandler;
    const navigate = useNavigate();
    const [tempterbaca,setTempterbaca]=useState(false);
    async function keMainchat(id){
        props.setRefresh(!props.refresh)
        const res=await readMessages({id:id,user:localStorage.getItem("currentUser")});
        navigate(`/home/chat/${id}`);
    }
    const [userlain,setUserlain]=useState();
    function truncateString(str) {
        if (str.length > 20) {
          return str.substring(0, 20) + '...';
        }
        return str;
      }
    useEffect(() => {
        if(props.chat.user1==localStorage.getItem("currentUser")){
            setUserlain(props.chat.user2);
            setTempterbaca(props.chat.statususer1);
        }
        else{
            setUserlain(props.chat.user1);
            setTempterbaca(props.chat.statususer2);
        }
    }, [])
  return (
    <div>
        <div className='border my-2 ms-1' onClick={()=>keMainchat(props.chat.id)}>
            <div className='d-flex justify-content-between'>
                <h3>{userlain}</h3>
                {tempterbaca==true?<img className="rounded-circle bg-success" width="10px" height="10px"></img>:<></>}
            </div>
            {tempterbaca==true?<><span className='fw-bold'>{truncateString(props.chat.newestMessage)}</span></>:<><span>{truncateString(props.chat.newestMessage)}</span></>}
        </div>
    </div>
  )
}

export default Chaticon