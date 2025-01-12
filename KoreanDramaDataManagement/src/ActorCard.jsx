import React from 'react'
import { useState } from 'react'

const ActorCard = (props) => {
    const [terpencet,setTerpencet]=useState("container-fluid border bg-primary d-flex w-100 mb-3");
    const [tempPemain,setTempPemain]=useState(props.pemain);
    var counter=0;
    function klik(){
        
        if(terpencet=="container-fluid border bg-primary d-flex w-100 mb-3"){

            setTerpencet("container-fluid border bg-danger d-flex w-100 mb-3");
            const newData = {
                ...props.actor.id
              }
              props.setPemain([...props.pemain,props.actor.id])

        }
        else{
            setTerpencet("container-fluid border bg-primary d-flex w-100 mb-3");
            const index = props.pemain.findIndex((item)=>item === props.actor.id)
            props.pemain.splice(index,1)
            props.setPemain([...props.pemain])
        }
        console.log(props.pemain)
    }
  return (
    <div className={terpencet} onClick={klik}>
        {
            props.drama.map((item2,index2)=>{
                item2.cast.map((item3,index3)=>{
                    if(props.actor.id==item3){
                        counter++;
                    }
                })
            })
        }
        <div className="row pt-2">
            <div className="col px-0 d-flex justify-content-center">
                <img src={props.actor.img} alt="" width="150px" height="150px"/>
            </div>
            <div className="col px-1">
                <h5>{props.actor.name}</h5>
                <h5>Played in {counter} drama</h5>
            </div>
        </div>
    </div>
  )
}

export default ActorCard