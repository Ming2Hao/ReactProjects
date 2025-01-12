import React from 'react'
import { useState } from 'react'
import client from "./../client"
import { useEffect } from 'react'


const Transaksicard = (props) => {
    const [kategoris,setKategoris]=useState("");
    const [merks,setMerks]=useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingm, setIsLoadingm] = useState(false)
    const [item2,setItems2]=useState("");
    const [kuantitas,setKuantitas]=useState(props.qty)
    var kategori="";
    var merk="";
    var item;
    function temp(){
        var udh=props.keranjang.filter(item2 => item2.pemilik==props.loginsekarang)
        var indexs = props.keranjang.findIndex((ll)=>ll==udh[0])
        console.log("hehehe error ini ",props.keranjang[indexs])
        var indexs2 = props.keranjang[indexs].barang.findIndex((meh)=>meh.id=props.id)
        var sementara = props.keranjang[indexs]
        sementara.barang[indexs2].qty=sementara.barang[indexs2].qty-1
        // var sementara2 = props.keranjang[indexs].barang[indexs]
        var sementara2=props.keranjang
        sementara2[indexs]=sementara
        props.setKeranjang(sementara2)
        setKuantitas(sementara.barang[indexs2].qty)
        
    }
    async function fetchAll(){
        await client.get(`/barang/${props.id}`).then((res)=>{
            item=res.data
            setItems2(res.data)
        })
        // console.log(props.kategori)
        
        if(Array.isArray(item.kategori)){
            var xx=""
            setKategoris("")
            item.kategori.map(async(itemx)=>{
                await client.get(`/kategori/${itemx}`).then((res)=>{
                    xx=xx+res.data.nama+" "
                    setKategoris(xx)
                })
            })
            // setKategoris(xx)
        }
        else{
            // console.log(props.kategori)
            await client.get(`/kategori/${item.kategori}`).then((res)=>{
                setKategoris(res.data.nama)
            })
        }
        
        await client.get(`/barang/${props.id}`).then(async (res)=>{
            await client.get(`/merk/${res.data.merk}`).then((res2)=>{
                setMerks(res2.data.nama)
            })
        })
        
    }
    useEffect(()=>{
        setIsLoading(true)
        // console.log("start")
        // fetchItems()
        fetchAll()
        // setItems2(item)
        setIsLoading(false)
        // fetchmerk()
        // console.log("end")
    },[props.keranjang])
  return (
    <>
        {}
        <div className='border'>
            <h1>{props.id}</h1>
            <h3>nama {isLoading && <div>Loading...</div>}{!isLoading && (item2.nama)}</h3>
            <h3>harga {isLoading && <div>Loading...</div>}{!isLoading && (item2.harga)}</h3>
            <h3>qty {kuantitas}</h3>
            <h3>kategori {isLoading && <div>Loading...</div>}{!isLoading && (kategoris)}</h3>
            <h3>merk {isLoading && <div>Loading...</div>}{!isLoading && (merks)}</h3>
            <h3>subtotal {isLoading && <div>Loading...</div>}{!isLoading && (item2.harga*kuantitas)}</h3>
            {/* <button onClick={temp}>mines</button> */}
        </div>
    </>
  )
}

export default Transaksicard