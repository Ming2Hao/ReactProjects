import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useState } from 'react'
import client from "./../client"
import { setRoute } from '../app/routeSlice';
import { useDispatch } from 'react-redux';

const Homekasir = (props) => {
    const dispatch = useDispatch()
    const { register, handleSubmit, reset,formState: { errors } } = useForm();
    const[status,setStatus]=useState("");
    const[idx,setIdx]=useState(-1);
    const [tombol,setTombol]=useState("");

    function logout(){
        dispatch(setRoute("login"));
        // props.setRoute("login");
    }
    function confirm(){
        
        var temp=props.transaksi[idx]
        temp.status="confirm"
        var idx2 = props.transaksi.findIndex(item => item === temp)
        const arrKeranjang = [...props.transaksi]
        arrKeranjang.splice(idx2, 1)
        props.setTransaksi([...arrKeranjang,temp])
        var tempitems=props.items
        temp.barang.map((items)=>{
            var idx3 = tempitems.findIndex(item => item.id == items.id)
            tempitems[idx3].qty=tempitems[idx3].qty-items.qty
        })
        props.setItems(tempitems)
        setStatus("confirmed")
        setTombol("confirm")
    }
    function reject(){
        // setTombol("reject")
        var temp=props.transaksi[idx]
        temp.status="rejected"
        var idx2 = props.transaksi.findIndex(item => item === temp)
        const arrKeranjang = [...props.transaksi]
        arrKeranjang.splice(idx2, 1)
        props.setTransaksi([...arrKeranjang,temp])

        var kasirbaru={id:props.loginsekarang,transaksi:temp.id}
        props.setKasir([...props.kasir,kasirbaru])
        setStatus("rejected")
        setTombol("reject")
    }

    function asd(){
        setIdx(-1)
    }
    function hehe(data){
        
        console.log("ini data aidi",data.id)
        if(data.id==""){
            // alert("kosong")
        }
        else{
            props.transaksi.map((item,index)=>{
                console.log(item)
                if(item.id==data.id){
                    setIdx(index)
                }
            })
            console.log("ini i de ex",idx)
            if(idx==-1){
                setStatus("tidakada")
            }
            else{
                setStatus(props.transaksi[idx].status)
            }
        }
        setTombol("submit")
    }
    const masuk = (data) => {
        hehe(data)
      };
      useEffect(() => {
        handleSubmit(masuk)
      }, [tombol])
      
    return (
        <>
            <div className="d-flex">
                <div className="container-fluid mt-3 w-50 warna-3 py-3 edge mb-3 px-4">
                    <form onSubmit={handleSubmit(masuk)}>
                        <input type="text" name="id" id="" className="border border-black mb-2 w-1/2 form-control" placeholder="id" {...register("id")}/><br />
                        <button class="btn btn-primary" type='submit'>cek</button>
                        <br />
                        {status=="tidakada" && <span style={{color:"red"}}>transaksi tidak ditemukan <br /></span>}
                        {status=="pending" && <>
                            <h1>{props.transaksi[idx].id}</h1>
                            <button onClick={reject}>reject</button>
                            <button onClick={confirm}>confirm</button>
                        </>}
                        {status=="confirm" && <span style={{color:"red"}}>Confirmed <br /></span>}
                        {status=="rejected" && <span style={{color:"red"}}>Rejected <br /></span>}
                        <br />
                        <button onClick={logout}>LOGOUT</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Homekasir