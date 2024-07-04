"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
    const [user,setUser] = useState({
        email:"",
        password:"",
    })
    const [loading,setLoading] = useState(false);
    const route = useRouter();
    function handleChange(event:any){
        let {name,value} = event.target;
        setUser((prev:any)=>(
            {
                ...prev,
                [name]:value
            }
        ))
    };

    // handleSubmit
    async function handleSubmit(e:any){
        e.preventDefault();
        if(!user.email || !user.password){
            toast.warn("All fields are required",{position: "top-center",theme: "colored"});
            return;
        }
        try {
            setLoading(true);
            const response = await fetch("/api/auth/login",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });
            if (response.status==505){
                toast.error("Access blocked! contact admin",{position: "top-center",theme: "colored"});
                return;
            }
            if(response.ok){
                toast.success("Login Successfully",{position: "top-center",theme: "colored"});
                user.email="";
                user.password="";
                route.push("/")
            }
        } catch (error) {
            toast.error("try again!",{position: "top-center",theme: "colored"});
        }finally{
            setLoading(false)
        }
    }
  return (
    <>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter email" required onChange={handleChange} name="email" value = {user.email}/>
        <br />
        <br />
        <input type="password" placeholder="Enter Password" required onChange={handleChange} name="password" value={user.password}/>
        <br />
        <br />
        <button>{loading?"Loading...":"Login here"}</button>
      </form>
      <p>Dont have account ? <Link href="/auth/signup">Signup</Link></p>
        <ToastContainer position="top-center" theme="colored"/>
    </>
  );
};

export default Login;
