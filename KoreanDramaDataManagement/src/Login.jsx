import React from 'react'
import { useForm } from "react-hook-form";
import { useState } from 'react'

//untuk menggunakan joi sebagai validator form, kita perlu import 2 hal ini
import Joi, { isRef } from "joi"
import { joiResolver } from "@hookform/resolvers/joi"

const Login = (props) => {
    const { register, handleSubmit, reset,formState: { errors } } = useForm();
    const[salah,setSalah]=useState(false);
    function guest(){
        props.setRoute("homeuser");
    }
    const masuk = data => {
        console.log(data);
        if(data.username!="admin"||data.password!="admin"){
            setSalah(true);
        }
        else{
            props.setRoute("homeadmin");
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
                        {salah==true && <span style={{color:"red"}}>USERNAME/PASSWORD SALAH <br /></span>}
                        <br />
                    </form>
                        <button class="btn btn-primary" onClick={guest}>Login as Guest</button>
                </div>
            </div>
        </>
    )
}

export default Login