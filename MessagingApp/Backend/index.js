
const express = require('express');
const app = express();
const port = 3002;
const cors = require("cors");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
var users=[
    {
        username:"adi",
        password:"adi",
        friends:["ida","bob_jones"],
    },
    {
        username:"ida",
        password:"ida",
        friends:["adi"],
    },
    {
        username: "john_doe",
        password: "john123",
        friends: ["jane_smith", "alice_green"],
      },
      {
        username: "jane_smith",
        password: "smith456",
        friends: ["john_doe", "alice_green"],
      },
      {
        username: "alice_green",
        password: "green789",
        friends: ["jane_smith", "john_doe"],
      },
      {
        username: "bob_jones",
        password: "bob987",
        friends: ["susan_white"],
      },
      {
        username: "susan_white",
        password: "white654",
        friends: ["bob_jones"],
      },
]
var messages=[
    {
        id:1,
        user1:"adi",
        user2:"ida",
        newestMessage:"halo4",
        statususer1:true,
        statususer2:false,
        messages:[
            {
                sender:"adi",
                message:"halo1",
                pinned:true
            },
            {
                sender:"ida",
                message:"halo2",
                pinned:false
            },
            {
                sender:"ida",
                message:"halo3",
                pinned:true
            },
            {
                sender:"adi",
                message:"halo4",
                pinned:false
            }
        ]
    },
    {
        id: 2,
        user1: "john_doe",
        user2: "jane_smith",
        newestMessage: "Hello, how are you?",
        statususer1:true,
        statususer2:false,
        messages: [
          {
            sender: "john_doe",
            message: "Hello, how are you?",
            pinned:true
            
          },
          {
            sender: "jane_smith",
            message: "I'm good, thanks! How about you?",
            pinned:false
            
          },
          {
            sender: "john_doe",
            message: "I'm doing well too!",
            pinned:false
            
          },
          {
            sender: "jane_smith",
            message: "That's great to hear!",
            pinned:false
            
          },
        ],
      },
      {
        id: 3,
        user1: "alice_green",
        user2: "bob_jones",
        newestMessage: "Are you coming to the party?",
        statususer1:true,
        statususer2:false,
        messages: [
          {
            sender: "alice_green",
            message: "Are you coming to the party?",
            pinned:false
            
          },
          {
            sender: "bob_jones",
            message: "Yes, I'll be there!",
            pinned:false
            
          },
          {
            sender: "alice_green",
            message: "Great! What time will it start?",
            pinned:false
            
          },
          {
            sender: "bob_jones",
            message: "Around 7 PM.",
            pinned:false
            
          },
        ],
      },
      {
        id: 4,
        user1: "adi",
        user2: "bob_jones",
        newestMessage: "Are you coming to the party?",
        statususer1:true,
        statususer2:false,
        messages: [
          {
            sender: "adi",
            message: "Are you coming to the party?",
            pinned:false
            
          },
          {
            sender: "bob_jones",
            message: "Yes, I'll be there!",
            pinned:true
            
          },
          {
            sender: "adi",
            message: "Great! What time will it start?",
            pinned:false
            
          },
          {
            sender: "bob_jones",
            message: "Around 7 PM.",
            pinned:false
          },
        ],
      },
]
// Define your endpoint here
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//body: username,password
app.post('/users',(req, res)=>{
    // return res.status(200).send(req.body.username)
    let { username, password } = req.body;
    let index=users.findIndex((user)=>user.username==username&&user.password==password)
    // console.log("ini user pass",username,"  ",password)
    if(index==-1){
        return res.status(404).send("not found");
    }
    else{
        return res.status(200).send(users[index])
    }
})
app.get('/users/:username',(req, res)=>{
    let { username } = req.params;
    let index=users.findIndex((user)=>user.username==username)
    if(index==-1){
        return res.status(404).send("not found");
    }
    else{
        return res.status(200).send(users[index])
    }
})

app.get('/messages/:username',(req, res)=>{
    let { username } = req.params;
    let data=messages.filter((message)=>message.user1==username||message.user2==username)
    let index=users.findIndex((user)=>user.username==username)
    let nomessage=[]
    if(index==-1){
        // console.log("gagal")
        return res.status(404).send("not found");
    }
    else{
        users[index].friends.forEach((friend)=>{
            let index2=data.findIndex((message)=>message.user1==friend||message.user2==friend)
            if(index2==-1){
                nomessage.push(friend)
            }
        })
        let result={
            data:data,
            nomessage:nomessage
        }
        // console.log(result)
        return res.status(200).send(result)
    }

})

app.get('/messages/chat/:id',(req, res)=>{
    let { id } = req.params;
    let index=messages.findIndex((message)=>message.id==id)
    if(index==-1){
        return res.status(404).send("not found");
    }
    else{
        return res.status(200).send(messages[index])
    }

})
app.post('/messages/read/:id/:user',(req, res)=>{
    // console.log("terpanggil")
    let { id,user } = req.params;
    let index=messages.findIndex((message)=>message.id==id)
    if(index==-1){
        return res.status(404).send("not found");
    }
    else{
        if(messages[index].user1==user){
            messages[index].statususer1=false
        }
        else{
            messages[index].statususer2=false
        }
        return res.status(200).send(messages[index])
        // console.log("terbaca")
    }

})
app.post('/messages/pin/:id/:index',(req, res)=>{
    let { id,index } = req.params;
    let index2=messages.findIndex((message)=>message.id==id)
    if(index2==-1){
        return res.status(404).send("not found");
    }
    else{
        messages[index2].messages[index].pinned=!messages[index2].messages[index].pinned
        return res.status(200).send(messages[index2])
    }
})

app.post('/messages/unsend/:id/:index',(req, res)=>{
    let { id,index } = req.params;
    let index2=messages.findIndex((message)=>message.id==id)
    if(index2==-1){
        return res.status(404).send("not found");
    }
    else{
        messages[index2].messages.splice(index,1)
        return res.status(200).send(messages[index2])
    }
})
app.post('/messages/chatting/:id/:sender',(req, res)=>{
    let { id,sender } = req.params;
    let { message } = req.body;
    console.log(message)
    let index=messages.findIndex((message)=>message.id==id)
    if(index==-1){
        return res.status(404).send("not found");
    }
    else{
        messages[index].messages.push({
            sender:sender,
            message:message,
            pinned:false
        })
        messages[index].newestMessage=message
        if(messages[index].user1==sender){
            messages[index].statususer2=true
            messages[index].statususer1=false
        }
        else{
            messages[index].statususer1=true
            messages[index].statususer2=false
        }
        //splice the message[index] to the last index
        let temp=messages[index]
        messages.splice(index,1)
        messages.unshift(temp)
        return res.status(200).send(messages[index])
    }
})
app.post('/users/addfriend/:user1/:user2',(req, res)=>{
    let { user1,user2 } = req.params;
    let index=users.findIndex((user)=>user.username==user1)
    let index2=users.findIndex((user)=>user.username==user2)
    if(index==-1||index2==-1){
        return res.status(404).send("not found");
    }
    else{
        users[index].friends.push(user2)
        users[index2].friends.push(user1)
        messages.push({
            id:messages.length+1,
            user1:user1,
            user2:user2,
            newestMessage:"",
            statususer1:false,
            statususer2:false,
            messages:[]
        })
        return res.status(200).send(users[index])
    }
})

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
