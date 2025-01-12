import React from 'react'
import { useState,useEffect } from 'react'
import client from "./../client"
import { set } from 'react-hook-form';
import { setRoute } from '../app/routeSlice';
import { useDispatch } from 'react-redux';

const Itemcard = (props) => {
    const [kategoris,setKategoris]=useState("");
    const [merks,setMerks]=useState("");
    const [isLoading, setIsLoading] = useState(false)
    var kategori="";
    var merk="";
    var kategori2=props.kategori;
   async function fetchKategori(){
        
        // console.log(props.kategori)
        
        if(Array.isArray(kategori2)){
            var xx=""
            setKategoris("")
            kategori2.map(async(item)=>{
                await client.get(`/kategori/${item}`).then((res)=>{
                    xx=xx+res.data.nama+" "
                    setKategoris(xx)
                })
            })
            // setKategoris(xx)
        }
        else{
            console.log(props.kategori)
            await client.get(`/kategori/${props.kategori}`).then((res)=>{
                setKategoris(res.data.nama)
            })
        }
        
        await client.get(`/merk/${props.merk}`).then((res)=>{
            setMerks(res.data.nama)
        })
        
    }
    async function fetchMerk(){
        await client.get(`/merk/${props.merk}`).then((res)=>{
            setMerks(res.data.nama)
        })
    }
    useEffect(()=>{
        setIsLoading(true)
        fetchKategori()
        fetchMerk()
        setIsLoading(false)
    },[props.afterfilter])
    
    useEffect(()=>{
        setIsLoading(true)
        fetchKategori()
        fetchMerk()
        setIsLoading(false)
    },[])
    const dispatch = useDispatch()
    function diklik(){
        dispatch(setRoute("detailbarang"))
        // props.setRoute("detailbarang")

        props.setItemterpilih(props.id)
    }
  return (
    <>
        
        <div className='border col-4' onClick={diklik}>
            <h1>{props.id}</h1>
            <h3>{props.nama}</h3>
            <h3>{props.harga}</h3>
            <h3>{props.qty}</h3>
            <h3>kategori {isLoading && <div>Loading...</div>}{!isLoading && (kategoris)}</h3>
            <h3>merk {isLoading && <div>Loading...</div>}{!isLoading && (merks)}</h3>
        </div>
    </>
  )
}

export default Itemcard