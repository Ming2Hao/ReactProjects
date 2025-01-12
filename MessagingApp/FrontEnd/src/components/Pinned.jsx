
import React from 'react'
import { useParams } from 'react-router-dom';
import userHandler from '../handler/UserHandler';
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Pinned = () => {
    const { getMessagesWithId, } = userHandler;
    const { id } = useParams();
    const [message,setMessage]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [tujuan,setTujuan]=useState();
    const navigate = useNavigate();
    
    async function getMessages2() {
        try {
          setIsLoading(true);
          const res = await getMessagesWithId({ id: id });
          const tempisi = res.data;
        //   console.log("ini tempisizzz", tempisi);
          setMessage(tempisi);
        //   console.log("ini messagezzz", tempisi);
        } catch (error) {
          console.log("Error fetching messages:", error);
        } finally {
          setIsLoading(false);
        }
      }
    
    function kembali(){
        navigate(`/home/chat/${id}`)
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
        <div className="d-flex">
          <button onClick={kembali}>kembali</button>
          <h3>{message.user1==localStorage.getItem("currentUser")?message.user2:message.user1} (pinned)</h3>
        </div>
        {/* {isLoading ? <div>Loading...</div>:message.messages.map((item)=>{return <h3>{item.message}</h3>})} */}
        {/* {message.messages.map((item)=>{return <h3>{item.message}</h3>})} */}
        {isLoading ? <div>Loading...</div>:message.messages.map((item)=>{return <h3>{item.pinned==true&&item.message}</h3>})}
        {/* {isLoading ? <div>Loading...</div>:console.log(message)} */}
    </div>
  )
}

export default Pinned