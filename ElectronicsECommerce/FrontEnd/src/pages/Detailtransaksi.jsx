import React from 'react'
import Transaksicard from '../component/Transaksicard'
import { useState } from 'react'
import { useEffect } from 'react'
import client from "./../client"
import { setRoute } from '../app/routeSlice';
import { useDispatch } from 'react-redux';

const Detailtransaksi = (props) => {
    const dispatch = useDispatch()
    var x=props.transaksi.filter(item2 => item2.id==props.itemterpilih)
    const[total,setTotal]=useState(0)
    var temptransaksi={}
    var tempbarang2
    const [isLoading, setIsLoading] = useState(false);

    // async function loadbarang(){
    //     tempbarang2 = await client.get(`/barang`);
    // }
    async function back(){
        await client.get(`/users/${props.loginsekarang}`).then((res)=>{
            if(res.data.role=="KASIR"){
                dispatch(setRoute("homekasir"));
                // props.setRoute("homekasir");
            }
            else if(res.data.role=="PEMBELI"){
                dispatch(setRoute("homeuser"));
                // props.setRoute("homeuser");
            }
        })
    }
    async function fetchtotal(){
        setIsLoading(true)
        console.log("ini hehe barang",x)
        var temptotal=0;
        x[0].barang.map(async (item)=>{
            await client.get(`/barang/${item.id}`).then((res)=>{
                temptotal=temptotal+(res.data.harga*item.qty);
                setTotal(temptotal)
            })
        })
        setIsLoading(false)
    }
    useEffect(()=>{
        fetchtotal()
    },[props.keranjang])
    
  return (
    <div>
        <h1>Detail Transaksi</h1>
        <button onClick={back}>Back</button>
        {/* {console.log("ini x barang",x)} */}
        {console.log("ini x",x)}
        <h3>Status: {x[0].status}</h3>
         {x.map((item,indx)=>{
            return item.barang.map((item2,indx)=>{
                // console.log("ini item2",item2)
                return <Transaksicard id={item2.id} qty={item2.qty} keranjang={props.keranjang} loginsekarang={props.loginsekarang} setKeranjang={props.setKeranjang}/>
            })
        })}
        <h1>total {total}</h1>
        {/* <button onClick={()=>checkout()}>Checkout</button> */}
    </div>
  )
}

export default Detailtransaksi