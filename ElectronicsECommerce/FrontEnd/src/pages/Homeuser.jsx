import React from 'react'
import Itemcard from '../component/Itemcard'
import { useState,useEffect } from 'react'
import client from "./../client"
import { setRoute } from '../app/routeSlice';
import { useDispatch } from 'react-redux';

const Homeuser = (props) => {
    const [listkategori,setListkategori]=useState([]);
    const [listmerk,setListmerk]=useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [filterkategori,setFilterkategori]=useState("all")
    const [filtermerk,setFiltermerk]=useState("all")
    const [afterfilter,setAfterfilter]=useState([])

    function fungsifilterkategori(e){
        setFilterkategori(e)
        console.log("ini filter hehe",filterkategori)
    }
    function fungsifiltermerk(e){
        setFiltermerk(e)
        console.log("ini filter hehe merk",filtermerk)
    }
    function filtering(){
        if(filterkategori=="all" && filtermerk=="all"){
            setAfterfilter(props.items)
        }
        else{
            if(filtermerk=="all"){
                var tempfinal2=[]
                props.items.map((item)=>{
                    var masukfilter=false;
                    if(Array.isArray(item.kategori)){
                        item.kategori.map((item2)=>{
                            if(item2==filterkategori){
                                masukfilter=true;
                            }
                        })
                    }
                    else{
                        if(item.kategori==filterkategori){
                            masukfilter=true;
                        }
                    }
                    if(masukfilter){
                        tempfinal2=([...tempfinal2,item])
                    }
                })
                // var temp=props.items.filter(item => item.kategori==filterkategori)
                setAfterfilter(tempfinal2)
            }
            else{
                if(filterkategori=="all"){
                    var temp=props.items.filter(item => item.merk==filtermerk)
                    setAfterfilter(temp)
                }
                else{
                    var tempfinal=[]
                    props.items.map((item)=>{
                        var masukfilter=false;
                        if(Array.isArray(item.kategori)){
                            item.kategori.map((item2)=>{
                                if(item2==filterkategori){
                                    masukfilter=true;
                                }
                            })
                        }
                        else{
                            if(item.kategori==filterkategori){
                                masukfilter=true;
                            }
                        }
                        if(masukfilter){
                            tempfinal=[...tempfinal,item]
                        }
                    })
                    var temp=tempfinal.filter(item => item.merk==filtermerk)
                    setAfterfilter(temp)
                }
            }
        }
    }
    async function fetchkategori(){
        setIsLoading(true)
        await client.get(`/kategori`).then((res)=>{
            setListkategori(res.data)
        })
    }
    async function fetchmerk(){
        await client.get(`/merk`).then((res)=>{
            setListmerk(res.data)
        })
        setIsLoading(false)
    }

    const dispatch = useDispatch()
    function kekeranjang(){
        dispatch(setRoute("keranjang"));
        // props.setRoute("keranjang");
    }
    function logout(){
        dispatch(setRoute("login"));
        // props.setRoute("login");
    }
    function history(){
        dispatch(setRoute("history"));
        // props.setRoute("history");
    }

    useEffect(()=>{
        filtering()
        // fetchkategori()
        // fetchmerk()
    },[filterkategori,filtermerk])
    useEffect(()=>{
        fetchkategori()
        fetchmerk()
        filtering()
    },[])

  return (
    <>
        <button onClick={kekeranjang}>keranjang</button>
        <button onClick={logout}>logout</button>
        <button onClick={history}>history transaksi</button>
        <br />
        <br />

        {isLoading && <p>loading...</p>}
        {!isLoading && <>
            <label for="fkategori">Kategori: </label>
            <select name="fkategori" id="fkategori" onChange={(e)=>fungsifilterkategori(e.target.value)}>
                <option value="all">none</option>
                {listkategori.map((item)=>{
                    return <option value={item.id}>{item.nama}</option>
                })}
            </select>
            <br />
            <br />
            <label for="fmerk">Merk: </label>
            <select name="fmerk" id="fmerk" onChange={(e)=>fungsifiltermerk(e.target.value)}>
                <option value="all">none</option>
                {listmerk.map((item)=>{
                    return <option value={item.id}>{item.nama}</option>
                })}
            </select>
            <br /><br />
        </>}
        
        
        <div className='d-flex'>
            <div className="row">
                {afterfilter.map((item)=>{
                    return <Itemcard id={item.id} nama={item.nama} harga={item.harga} qty={item.qty} kategori={item.kategori} merk={item.merk} setRoute={props.setRoute} setItemterpilih={props.setItemterpilih} afterfilter={afterfilter}/>
                })}
            </div>
        </div>
    </>
  )
}

export default Homeuser