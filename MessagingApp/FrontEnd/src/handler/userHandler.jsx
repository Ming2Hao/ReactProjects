
import { redirect } from "react-router-dom";
import client from "../../client";
import axios from "axios";

const login = async (data) => {
    // console.log("masuk sini");
    // const formData = await data.request.formData();
    // const newItem = Object.fromEntries(formData);

    let temp={username:data.username,password:data.password}
    // console.log("ini temp",temp);
    
    let result=await client.post(`/users`,temp).catch((err)=>{console.log(err);});
    // let result=await axios.get('http://localhost:3002/users',{username:data.username,password:data.password})
    // console.log(result);
    return result;
}
const getMessages = async (data) => {

    let result=await client.get(`/messages/${data.username}`).catch((err)=>{console.log(err);});
    return result;
}
const getMessagesWithId = async (data) => {

    let result=await client.get(`/messages/chat/${data.id}`).catch((err)=>{console.log(err);});
    return result;
}

const readMessages = async (data) => {
    let result=await client.post(`/messages/read/${data.id}/${data.user}`).catch((err)=>{console.log(err);});
    return result;
}
const pinMessages = async (data) => {
    let result=await client.post(`/messages/pin/${data.id}/${data.index}`).catch((err)=>{console.log(err);});
    return result;
}

const unsendMessages = async (data) => {
    let result=await client.post(`/messages/unsend/${data.id}/${data.index}`).catch((err)=>{console.log(err);});
    return result;
}

const chatting = async (data) => {
    // console.log("ini data",data.messages);
    let temporari={message:data.messages}
    let result=await client.post(`/messages/chatting/${data.id}/${data.user}`,temporari).catch((err)=>{console.log(err);});
    return result;
}

const addFriend = async (data) => {
    let result=await client.post(`/users/addfriend/${data.user1}/${data.user2}`).catch((err)=>{console.log(err);});
    return result;

}
const getUsers = async (data) => {
    let result=await client.get(`/users/${data.username}`).catch((err)=>{console.log(err);});
    return result;
}

export default { login,getMessages,getMessagesWithId,readMessages,pinMessages,unsendMessages,chatting,addFriend,getUsers };