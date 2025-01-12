import React from 'react'
import { useState } from 'react'
import { setRoute } from '../app/routeSlice';
import { useDispatch } from 'react-redux';

const Tambahstok = (props) => {
    var itemterpilih2=props.items.filter(item => item.id.includes(props.itemterpilih))
    itemterpilih2=itemterpilih2[0]
    function back(){
        dispatch(setRoute("homeadmin"));
        // props.setRoute("homeadmin");
    }
    function tambah(){
        const temp = props.items.map((item, index) => {
            if (index === props.items.indexOf(itemterpilih2)) {
              item.qty = item.qty + 1;
              return item;
            } else {
              return item;
            }
          });
          props.setItems(temp);
        // back()
    }
  return (
    <div>
        <h1>Tambah Stok</h1>
        <button onClick={back}>Back</button>
        <h3>id: {itemterpilih2.id}</h3>
        <h3>nama: {itemterpilih2.nama}</h3>
        <h3>harga: {itemterpilih2.harga}</h3>
        <h3>qty: {itemterpilih2.qty}</h3>
        <button onClick={tambah}>tambah stok</button>
    </div>
  )
}

export default Tambahstok