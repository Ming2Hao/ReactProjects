import React from 'react'
import { useForm } from "react-hook-form";
import { useState } from 'react'
import client from "./../client"   
import { setRoute } from '../app/routeSlice';
import { useDispatch } from 'react-redux';


const Login = (props) => {
    const dispatch = useDispatch()
    const { register, handleSubmit, reset,formState: { errors } } = useForm();
    const[salah,setSalah]=useState("");
    function guest(){
        dispatch(setRoute("homeuser"));
        // props.setRoute("homeuser");
    }
    const masuk = async (data) => {
        console.log(data);
        if(data.username==""||data.password==""){
            setSalah("kosong");
        }
        else{
            if(data.username=="admin"&&data.password=="admin"){
                // props.setRoute("homeadmin");
                dispatch(setRoute("homeadmin"));
            }
            else{
                const getUser = await client.get(`/users`,{
                    params:{
                      username:data.username,
                    }
                  })
                if(getUser.data.length==0){
                    setSalah("username");
                }
                else{
                    if(getUser.data[0].password!=data.password){
                        setSalah("password");
                    }
                    else{
                        props.setLoginsekarang(getUser.data[0].id);
                        if(getUser.data[0].role=="KASIR"){
                            dispatch(setRoute("homekasir"));
                            // props.setRoute("homekasir");
                        }
                        else{
                            dispatch(setRoute("homeuser"));
                            // props.setRoute("homeuser");
                        }
                    }
                }
                console.log(getUser.data);
            }
        }
      };
    return (
        <>
            <div className="d-flex">
                <div className="container-fluid mt-3 w-50 warna-3 py-3 edge mb-3 px-4">
                    <form onSubmit={handleSubmit(masuk)}>
                        <input type="text" name="Username" id="" className="border border-black mb-2 w-1/2 form-control" placeholder="Username" {...register("username")}/><br />
                        <input type="text" name="passwords" id="" className="border border-black mb-2 w-1/2 form-control" placeholder="password" {...register("password")}/><br />
                        <button class="btn btn-primary" type='submit'>Submit</button>
                        <br />
                        {salah=="username" && <span style={{color:"red"}}>USERNAME tidak ditemukan <br /></span>}
                        {salah=="kosong" && <span style={{color:"red"}}>semua field harus diisi <br /></span>}
                        {salah=="password" && <span style={{color:"red"}}>PASSWORD SALAH <br /></span>}
                        <br />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login