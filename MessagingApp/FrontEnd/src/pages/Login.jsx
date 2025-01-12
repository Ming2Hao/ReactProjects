import { Form, useFetcher, useLoaderData, useSubmit,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import userHandler from '../handler/UserHandler';
import React from 'react'
import client from "../../client";
const Login = () => {
    const { register, handleSubmit, reset,formState: { errors } } = useForm();
    const { login } = userHandler;
    const fetcher = useFetcher();
    const [error,setError]=useState(false);
    const navigate = useNavigate();

    async function submitForm(data) {
        let result=await login(data);
        if(result){
            if(result.status==200){
                localStorage.setItem('currentUser', result.data.username);
                // console.log(localStorage.getItem('currentUser'));
                navigate("/home")//arakhan ke home
            }
            else{
                setError(true);
            }
        }
        else{
            setError(true);
        }
    }

  return (
    <Form onSubmit={handleSubmit(submitForm)} action="" method="post">
        <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" {...register("username")}/>
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password"{...register("password")}/>
        </div>
        {error==true&&<span>USERNAME/PASSWORD SALAH</span>}
        <div>
            <button type="submit">Login</button>
        </div>
    </Form>
  )
}

export default Login