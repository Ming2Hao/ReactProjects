import React from 'react'
import { useState,useEffect } from 'react'
import { setRoute } from '../app/routeSlice';
import { useDispatch } from 'react-redux';

const Historytransaksi = (props) => {
    const dispatch = useDispatch()
    var x=props.transaksi.filter(item2 => item2.pembeli==props.loginsekarang)
    console.log("ini transaksi",x)
    function back(){
        dispatch(setRoute("homeuser"));
        // props.setRoute("homeuser");
    }
    function detail(x){
        dispatch(setRoute("detailtransaksi"));
        // props.setRoute("detailtransaksi");
        props.setItemterpilih(x);
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
            {x.map((item) => {
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

export default Historytransaksi