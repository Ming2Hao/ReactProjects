import React from 'react'
import { setRoute } from '../app/routeSlice';
import { useDispatch } from 'react-redux';

const Detailbarang = (props) => {
    const dispatch = useDispatch()
    console.log("ini keranjang",props.keranjang)
    var itemterpilih2=props.items.filter(item => item.id.includes(props.itemterpilih))
    itemterpilih2=itemterpilih2[0]
    function back(){
        dispatch(setRoute("homeuser"));
        // props.setRoute("homeuser");
    }
    function tambahkeranjang(){
        var tempindex=-1;
        props.keranjang.map((item, index) => {
            if(item.pemilik===props.loginsekarang){
                tempindex=index;
            }
        })
        console.log("ini tempindex",tempindex)
        // var ctr1=0
        // for(var x in props.keranjang){
        //     console.log("ini keranjang",x) 
        //     if(x.pemilik===props.loginsekarang){
        //         tempindex=ctr1;
        //     }
        //     ctr1++
        // }
        // console.log("ini keranjang",tempindex)
        if(tempindex==-1){
            console.log("itemterpilih2",itemterpilih2.id)
            var tempbarang={id:itemterpilih2.id,qty:1}
            var tempkeranjang={
                pemilik:props.loginsekarang,
                barang:[]
            }
            tempkeranjang.barang.push(tempbarang)
            props.setKeranjang([...props.keranjang,tempkeranjang])
            console.log("ini keranjangxx",props.keranjang)
        }
        else{
            var tempindex2=-1;
            
            props.keranjang[tempindex].barang.map((item, index) => {
                if(item.id===itemterpilih2.id){
                    tempindex2=index;
                }
            })
            console.log("ini tempindex2",tempindex2)
            // var ctr2=0
            // console.log("ini barang",tempindex)
            // for(var x in props.keranjang[tempindex].barang){
            //     if(x.id===itemterpilih2.id){
            //         tempindex2=ctr2;
            //     }
            //     ctr2++
            // }
            if(tempindex2==-1){
                var tempbarang={id:itemterpilih2.id,qty:1}
                var tempkeranjang=props.keranjang[tempindex]
                tempkeranjang.barang=[...tempkeranjang.barang,tempbarang]
                // tempkeranjang.barang.push(tempbarang)
                const tempkeranjang2 = [...props.keranjang]
                tempkeranjang2.splice(tempindex, 1)
                props.setKeranjang([...tempkeranjang2,tempkeranjang])
            }
            else{
                var tempkeranjang=props.keranjang[tempindex]
                tempkeranjang.barang[tempindex2].qty=tempkeranjang.barang[tempindex2].qty+1
                const tempkeranjang2 = [...props.keranjang]
                tempkeranjang2.splice(tempindex, 1)
                props.setKeranjang([...tempkeranjang2,tempkeranjang])
            }
            
        }
        alert('sukses menambahkan ke keranjang')
    }
  return (
    <div>

        <h1>Tambah Stok</h1>
        <button onClick={back}>Back</button>
        <h3>id: {itemterpilih2.id}</h3>
        <h3>nama: {itemterpilih2.nama}</h3>
        <h3>harga: {itemterpilih2.harga}</h3>
        <h3>qty: {itemterpilih2.qty}</h3>
        <button onClick={tambahkeranjang}>tambah ke keranjang</button>
    </div>
  )
}

export default Detailbarang