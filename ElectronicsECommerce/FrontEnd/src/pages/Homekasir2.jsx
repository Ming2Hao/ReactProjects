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
    function historykasir(){
        dispatch(setRoute("historykasir"));
        // props.setRoute("historykasir");
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
        var kasirbaru={id:props.loginsekarang,transaksi:temp.id}
        var templol=props.kasir
        props.setKasir([...templol,kasirbaru])
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
        var templol=props.kasir
        props.setKasir([...templol,kasirbaru])
        setStatus("rejected")
        setTombol("reject")
    }

    const masuk = (data) => {
        var tempindex=-1
        if(data.id==""){
            alert("kosong")
        }
        else{
            props.transaksi.map((item,index)=>{
                console.log(item.id,"---",data.id)
                if(item.id==data.id){
                    tempindex=index
                }
            })
            console.log("ini i de ex",tempindex)
            if(tempindex==-1){
                setStatus("tidakada")
            }
            else{
                setStatus(props.transaksi[tempindex].status)
            }
        }
        setIdx(tempindex)
        setTombol("submit")
      };
      useEffect(() => {
        handleSubmit(masuk)
      }, [tombol])
      
    return (
        <>
            <div className="d-flex">
                <div className="container-fluid mt-3 w-50 warna-3 py-3 edge mb-3 px-4">
                    <form onSubmit={handleSubmit(masuk)}>
                        <button onClick={logout}>LOGOUT</button>
                        <button onClick={historykasir}>history kasir</button>
                        <input type="text" name="id" id="" className="border border-black mb-2 w-1/2 form-control" placeholder="id" {...register("id")}/><br />
                        <button class="btn btn-primary" type='submit'>cek</button>
                        <br />
                        {status=="tidakada" && <span style={{color:"red"}}>transaksi tidak ditemukan <br /></span>}
                        {status=="pending" && <>
                            <h1>{props.transaksi[idx].id}</h1>
                            <h1>{props.transaksi[idx].tanggal.toString()}</h1>
                            <h1>{props.transaksi[idx].total}</h1>
                            <h1>{props.transaksi[idx].status}</h1>
                            <button onClick={reject}>reject</button>
                            <button onClick={confirm}>confirm</button>
                        </>}
                        {status=="confirm" && <>
                        <h1>{props.transaksi[idx].id}</h1>
                        <h1>{props.transaksi[idx].tanggal.toString()}</h1>
                        <h1>{props.transaksi[idx].total}</h1>
                        <h1>{props.transaksi[idx].status}</h1>
                        <span style={{color:"red"}}>Confirmed <br /></span>
                        </>}
                        {status=="rejected" && <>
                        <h1>{props.transaksi[idx].id}</h1>
                        <h1>{props.transaksi[idx].tanggal.toString()}</h1>
                        <h1>{props.transaksi[idx].total}</h1>
                        <h1>{props.transaksi[idx].status}</h1>
                        <span style={{color:"red"}}>Rejected <br />
                        </span>
                        </>}
                        <br />
                        
                    </form>
                </div>
            </div>
        </>
    )
}

export default Homekasir