import { useState,useEffect } from 'react'
import './App.css'
import Login from './pages/Login'
import Homeadmin from './pages/Homeadmin' 
import Homeuser from './pages/Homeuser'
import Tambahstok from './pages/Tambahstok'
import client from "./client"
import Detailbarang from './pages/Detailbarang'
import Keranjang from './pages/Keranjang'
import Keranjang2 from './pages/Keranjang2'
import History from './pages/Historytransaksi'
import Homekasir from './pages/Homekasir'
import Homekasir2 from './pages/Homekasir2'
import Historykasir from './pages/Historykasir'
import Detailtransaksi from './pages/Detailtransaksi'
import Laporanbarang from './pages/Laporanbarang'
import { setRoute } from './app/routeSlice';
import { useDispatch,useSelector } from 'react-redux';
function App() {
  // const [route, setRoute] = useState('login')
  const route = useSelector((state) => state.route.route)
  const [items, setItems] = useState([])
  const [itemterpilih, setItemterpilih] = useState("")
  const [loginsekarang, setLoginsekarang] = useState("")
  const [keranjang, setKeranjang] = useState([])
  const [transaksi, setTransaksi] = useState([])
  const [kasir, setKasir] = useState([])
  
  const fetchItems = async ()=>{
    const getItems = await client.get("/barang")
    setItems(getItems.data)
  }
  useEffect(()=>{
    fetchItems()
  },[])

  return (
    <div className='container'>
      {route === 'login' && <Login  setLoginsekarang={setLoginsekarang}/> }
      {route === 'homeadmin' && <Homeadmin  items={items} setItems={setItems} itemterpilih={itemterpilih} setItemterpilih={setItemterpilih}/> }
      {route === 'homeuser' && <Homeuser   items={items} setItems={setItems} itemterpilih={itemterpilih} setItemterpilih={setItemterpilih}/> }
      {route === 'tambahstok' && <Tambahstok  items={items} setItems={setItems} itemterpilih={itemterpilih} setItemterpilih={setItemterpilih}/> }
      {route === 'detailbarang' && <Detailbarang  items={items} setItems={setItems} itemterpilih={itemterpilih} setItemterpilih={setItemterpilih} keranjang={keranjang} setKeranjang={setKeranjang} loginsekarang={loginsekarang}/> }
      {/* {route === 'keranjang' && <Keranjang  items={items} setItems={setItems} itemterpilih={itemterpilih} setItemterpilih={setItemterpilih} keranjang={keranjang} setKeranjang={setKeranjang} loginsekarang={loginsekarang} transaksi={transaksi} setTransaksi={setTransaksi}/> } */}
      {route === 'keranjang' && <Keranjang2  items={items} setItems={setItems} itemterpilih={itemterpilih} setItemterpilih={setItemterpilih} keranjang={keranjang} setKeranjang={setKeranjang} loginsekarang={loginsekarang} transaksi={transaksi} setTransaksi={setTransaksi}/> }
      {route==='history'&&<History  items={items} setItems={setItems} itemterpilih={itemterpilih} setItemterpilih={setItemterpilih} keranjang={keranjang} setKeranjang={setKeranjang} loginsekarang={loginsekarang} transaksi={transaksi} setTransaksi={setTransaksi}/>}
      {route==='detailtransaksi'&&<Detailtransaksi  items={items} setItems={setItems} itemterpilih={itemterpilih} setItemterpilih={setItemterpilih} keranjang={keranjang} setKeranjang={setKeranjang} loginsekarang={loginsekarang} transaksi={transaksi} setTransaksi={setTransaksi}/>}
      {route==='homekasir'&&<Homekasir2  items={items} setItems={setItems} itemterpilih={itemterpilih} setItemterpilih={setItemterpilih} keranjang={keranjang} setKeranjang={setKeranjang} loginsekarang={loginsekarang} transaksi={transaksi} setTransaksi={setTransaksi} kasir={kasir} setKasir={setKasir}/>}
      {route==='historykasir'&&<Historykasir  items={items} setItems={setItems} itemterpilih={itemterpilih} setItemterpilih={setItemterpilih} keranjang={keranjang} setKeranjang={setKeranjang} loginsekarang={loginsekarang} transaksi={transaksi} setTransaksi={setTransaksi} kasir={kasir} setKasir={setKasir}/>}
      {route==='laporanbarang'&&<Laporanbarang  items={items} setItems={setItems} itemterpilih={itemterpilih} setItemterpilih={setItemterpilih} keranjang={keranjang} setKeranjang={setKeranjang} loginsekarang={loginsekarang} transaksi={transaksi} setTransaksi={setTransaksi} kasir={kasir} setKasir={setKasir}/>}
    </div>
  )
}

export default App
