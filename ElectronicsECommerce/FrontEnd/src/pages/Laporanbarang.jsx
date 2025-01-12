import React from 'react'
import { set, useForm } from "react-hook-form";
import { useState,useEffect } from 'react'
import client from "./../client"
import {useRef} from 'react';
import { setRoute } from '../app/routeSlice';
import { useDispatch } from 'react-redux';

const Laporanbarang = (props) => {
    const dispatch = useDispatch()
    const inputRef = useRef(null);
    const [listbarang,setListbarang]=useState(props.transaksi);
    const [totalsemua,setTotalsemua]=useState(0)
    // console.log(props.items)
    function logout(){
        dispatch(setRoute("login"));
        // props.setRoute("login");
    }
    function back(){
        dispatch(setRoute("homeadmin"));    
        // props.setRoute("homeadmin");
    }
    function tambahstok(terpilih){
        dispatch(setRoute("tambahstok"));
        // props.setRoute("tambahstok");
        props.setItemterpilih(terpilih);
    }
    async function search(){
        var temp=props.transaksi
        var temp2=[]
        var total=0
        await temp.map((item)=>{
            var diikutkan=false;
            item.barang.map((item2,iddxx)=>{
                if(item2.id==props.itemterpilih){
                    diikutkan=true;
                    console.log("ini item.barang.qty",item.barang[iddxx].qty)
                    total=total+item.barang[iddxx].qty
                }
            })
            if(diikutkan){
                temp2=([...temp2,item])
            }
        })
        await client.get(`/barang/${props.itemterpilih}`).then((res)=>{
            total=total*res.data.harga
            console.log("ini total",total)
        })
        await setTotalsemua(total)
        await setListbarang(temp2)
    }
    useEffect(()=>{
        search()
    },[])
  return (
    <div>
        <h1>HOME ADMIN</h1>
        <button onClick={logout}>Logout</button>
        <button onClick={back}>back</button>
        
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
            {listbarang.map((item) => {
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
        <h1>Total: {totalsemua}</h1>
    </div>
  )
}

export default Laporanbarang