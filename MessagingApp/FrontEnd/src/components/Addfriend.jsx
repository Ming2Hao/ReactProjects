import React from 'react'
import { useState,useEffect } from 'react'
import { set, useForm } from "react-hook-form";
import userHandler from '../handler/UserHandler';
import { useNavigate } from 'react-router-dom';

const Addfriend = () => {
    const { register, handleSubmit, reset,formState: { errors } } = useForm();
    const { addFriend,getUsers } = userHandler;
    const [friend,setFriend]=useState("");
    const [found,setFound]=useState(false);
    const navigate = useNavigate();
    
    async function add(){
        if(friend!=""){
            let tempisi={user1:localStorage.getItem("currentUser"),user2:friend.data.username}
            addFriend(tempisi);
            navigate("/home")
            navigate(0)
        }
    }
    async function search(data){
        //getusers
        await getUsers({username:data.friend}).then((res)=>{
            if(res!=null){
                if(res.status==200){
                    let tempnemu=false;
                    if(res.data.username==localStorage.getItem("currentUser")){
                        setFound(false);
                        setFriend("");
                        return;
                    }
                    res.data.friends.map((item)=>{
                        if(item==localStorage.getItem("currentUser")){
                            tempnemu=true;
                        }
                    })
                    if(tempnemu==true){
                        setFound(false);
                        setFriend("");
                        return;
                    }
                    else{
                        setFriend(res);
                        setFound(true);
                    }
                }
            }
            else{
                setFound(false);
                setFriend("");
            }
        })
        // setFriend();
        // if(friend.status!=200){
        //     setFound(false);
        // }
        // else{
        //     setFound(true);
        
        // }
    }
  return (
    <div className='col-9'>
        Addfriend
        <form onSubmit={handleSubmit(search)}>
          <input type="text" name="message" id="message" {...register("friend")}/>
          <button type="submit">kirim</button>
        </form>
        {found==true&&<><h3>{friend.data.username}</h3><br /><button onClick={add}>Add</button></>}
        {found==false&&<span style={{color:"red"}}>Not Found</span>}
        {/* {friend!=[]&&console.log(friend)} */}
    </div>
  )
}

export default Addfriend