import React from 'react'
import { useForm } from "react-hook-form";
import { useState } from 'react'
import client from "./../client"
import {useRef} from 'react';
import { setRoute } from '../app/routeSlice';
import { useDispatch } from 'react-redux';

const Homeadmin = (props) => {
    const dispatch = useDispatch()
    const inputRef = useRef(null);
    const [listbarang,setListbarang]=useState(props.items);
    // console.log(props.items)
    function logout(){
        dispatch(setRoute("login"));
        // props.setRoute("login");
    }
    function tambahstok(terpilih){
        dispatch(setRoute("tambahstok"));
        // props.setRoute("tambahstok");
        props.setItemterpilih(terpilih);
    }
    function search(){
        dispatch(setRoute("laporanbarang"));
        // props.setRoute("laporanbarang");
        props.setItemterpilih(inputRef.current.value)
        // console.log("ini input",inputRef.current.value)
        // var temp=props.items.filter(item => item.nama==inputRef.current.value)
        // console.log("ini temp",temp)
        // props.setItems(temp)
    }
  return (
    <div>
        <h1>HOME ADMIN</h1>
        <button onClick={logout}>Logout</button>
        <br /><br />
        <input type="text" name="" id="" ref={inputRef}/>
        <button onClick={search}>search</button>
        
        <table border="1px">
            <thead>
                <tr>
                    <th>id</th>
                    <th>nama</th>
                    <th>harga</th>
                    <th>qty</th>
                </tr>
            </thead>
            <tbody>
                {listbarang.map((item)=>{
                    return <tr onClick={() => tambahstok(item.id)}>
                        <td>{item.id}</td>
                        <td>{item.nama}</td>
                        <td>{item.harga}</td>
                        <td>{item.qty}{item.qty<10&&<span style={{color:"red"}}>&nbsp;item hampir habis</span>}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Homeadmin