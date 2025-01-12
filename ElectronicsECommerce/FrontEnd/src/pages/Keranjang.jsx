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
    var total=0
    var temptransaksi={}
    var tempbarang2
    var jumlahbarang=0
    const [total2,setTotal2]=useState(0)
    const [isLoading, setIsLoading] = useState(false);
    const [jumlahbarang2, setJumlahbarang2] = useState(0);
    const [confirm, setConfirm] = useState(false);
    async function loadbarang(){
        tempbarang2 = await client.get(`/barang`);
    }
    function konfirmasi(){
        setConfirm(!confirm)
    }
    function back(){
        dispatch(setRoute("homeuser"));
        // props.setRoute("homeuser");
    }
    async function temp(){
        total=0
        jumlahbarang=0
        await x[0].barang.map(async (item, index) => {
            console.log("ini item eheheheheh ", index)
            var tempbarang = await client.get(`/barang/${item.id}`)
            tempbarang=tempbarang.data
            total=total+(item.qty*tempbarang.harga)
            jumlahbarang=jumlahbarang+item.qty
            console.log("ini total",total)
            setJumlahbarang2(jumlahbarang)
            setTotal2(total)
        })
            
    }
    useEffect(()=>{
        setIsLoading(true)
        loadbarang()
        setIsLoading(false)
    },[])
    useEffect(()=>{
        setIsLoading(true)
        temp()
        // console.log("ini totalwbdaisudh",total)
        setIsLoading(false)
      },[props.keranjang,total2,jumlahbarang2])
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
                temptransaksi={
                    pembeli:props.loginsekarang,
                    id:"TR"+(props.transaksi.length+1).toString().padStart(3, '0'),
                    tanggal:new Date(),
                    total:total2,
                    status:"pending",
                    barang:x[0].barang
                }
                props.setTransaksi([...props.transaksi,temptransaksi])
                
                    var idx = props.keranjang.findIndex(item => item.pemilik === props.loginsekarang)
                    const arrKeranjang = [...props.keranjang]
                    arrKeranjang.splice(idx, 1)
                    props.setKeranjang(arrKeranjang)
                    // console.log(idx)

                // props.setRoute("history");
                dispatch(setRoute("history"));
            }
        }
    }
  return (
    <div>
        <h1>Keranjang</h1>
        <button onClick={back}>Back</button>
        {/* {console.log("ini x barang",x)} */}
        {/* {console.log("ini x",x)} */}
         {x.map((item)=>{
            return item.barang.map((item2)=>{
                // console.log("ini item2",item2)
                return <Keranjangcard id={item2.id} qty={item2.qty}/>
            })
        })}
        <h1>total {total2}</h1>
        <h1>jumlah barang dibeli {jumlahbarang2}</h1>
        <button onClick={konfirmasi}>checkout</button>
        <br />
        {confirm==true&&<><span style={{color:"red"}}>apakah anda yakin?</span>
        <br/>
        <button onClick={()=>checkout()}>yes</button><button onClick={konfirmasi}>No</button></>}
        <div className='mb-4'></div>
    </div>
  )
}

export default Keranjang