import React from 'react'
import Keranjangcard from '../component/Keranjangcard'
import { useState } from 'react'
import { useEffect } from 'react'
import client from "./../client"
import { setRoute } from '../app/routeSlice';
import { useDispatch } from 'react-redux';

const Keranjang = (props) => {
    const dispatch = useDispatch()
    var x=props.keranjang.filter(item2 => item2.pemilik==props.loginsekarang)
    const[total,setTotal]=useState(0)
    var temptransaksi={}
    var tempbarang2
    const [isLoading, setIsLoading] = useState(false);
    const [iseng, setIseng] = useState(false);

    // async function loadbarang(){
    //     tempbarang2 = await client.get(`/barang`);
    // }
    function back(){
        dispatch(setRoute("homeuser"));
        // props.setRoute("homeuser");
    }
    async function fetchtotal(){
        setIsLoading(true)
        console.log("ini hehe barang",x[0].barang)
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
    },[iseng])
    function checkout(){
        if(setIsLoading==true){
            alert("loading")
            return
        }
        else{
            if(x.length==0){
                alert("keranjang kosong")
                return
            }
            else{
                // setTotal(total/2)
                temptransaksi={
                    pembeli:props.loginsekarang,
                    id:"TR"+(props.transaksi.length+1).toString().padStart(3, '0'),
                    tanggal:new Date(),
                    total:total,
                    status:"pending",
                    barang:x[0].barang
                }
                props.setTransaksi([...props.transaksi,temptransaksi])
                
                    var idx = props.keranjang.findIndex(item => item.pemilik === props.loginsekarang)
                    const arrKeranjang = [...props.keranjang]
                    arrKeranjang.splice(idx, 1)
                    props.setKeranjang(arrKeranjang)
                    // console.log(idx)

                // props.setRoute("homeuser");
                dispatch(setRoute("homeuser"));
            }
        }
    }
  return (
    <div>
        <h1>Keranjang</h1>
        <button onClick={back}>Back</button>
        {/* {console.log("ini x barang",x)} */}
        {/* {console.log("ini x",x)} */}
         {x.map((item,indx)=>{
            return item.barang.map((item2,indx)=>{
                // console.log("ini item2",item2)
                return <Keranjangcard iseng={iseng} setIseng={setIseng} id={item2.id} qty={item2.qty} keranjang={props.keranjang} loginsekarang={props.loginsekarang} setKeranjang={props.setKeranjang}/>
            })
        })}
        <h1>total {total}</h1>
        <button onClick={()=>checkout()}>Checkout</button>
    </div>
  )
}

export default Keranjang