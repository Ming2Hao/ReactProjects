import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useState } from 'react'
import client from "./../client"
import { setRoute } from '../app/routeSlice';
import { useDispatch } from 'react-redux';

const Historykasir = (props) => {
    const dispatch = useDispatch()
    console.log(props.loginsekarang)
    console.log(props.kasir)
    var tempdata=props.kasir.filter(item => item.id==props.loginsekarang)
    var dataall=[];
    console.log("ini tempdata", tempdata)
    function detail(x){
        dispatch(setRoute("detailtransaksi"));
        // props.setRoute("detailtransaksi");
        props.setItemterpilih(x);
    }
    if(tempdata.length==0){
        console.log("senneee")
        // return(<h1>anda tidak pernah mengapprove atau mereject</h1>)
    }
    else{
        console.log("mashoookkk")
        tempdata.map((item) => {
            var temptransaksi=props.transaksi.filter(itemss=>itemss.id==item.transaksi)
            temptransaksi=temptransaksi[0]
            dataall=[...dataall,temptransaksi]
        })
    }
    // var hehe
    console.log(dataall)
    function back(){
        // props.setRoute("homekasir");
        dispatch(setRoute("homekasir"));
    }
  return (
    <div>
        <h1>History Transaksi</h1>
        <button onClick={back}>Back</button>
        <table border="1px">
            <thead>
            <tr>
                <th>id</th>
                <th>tanggal</th>
                <th>total</th>
                <th>status</th>
            </tr>
            </thead>
            <tbody>
                {console.log("ini semu dataalll",dataall)}
            {dataall.length !=0 && dataall.map((item) => {
                console.log("ini item",item)
                return <tr onClick={()=>detail(item.id)}>
                <td>{item.id}</td>
                <td>{item.tanggal.toString()}</td>
                <td>{item.total}</td>
                <td>{item.status}</td>
                </tr>
            })}
            </tbody>
        </table>
    </div>
  )
}

export default Historykasir