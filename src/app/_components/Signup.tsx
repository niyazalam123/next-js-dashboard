"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    number:"",
  });
  const [loading,setLoading] = useState(false);
  const route = useRouter();

  //   handleChange
  function handleChange(e: any) {
    let {name, value} = e.target;
    setUser((prev: any) => ({ ...prev, [name] : value }));
  }

  // handleSubmit
  async function handleSubmit(e: any) {
    e.preventDefault();
    if(!user.name || !user.email || !user.password || !user.number){
        toast.warn("All fields are required",{position: "top-center",theme: "colored"});
        return;
    }
    try {
        setLoading(true);
        // create new user
        const newUser = {
            name:user.name,
            email:user.email,
            number:Number(user.number),
            password:user.password
        }
        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.NEXT_PUBLIC_USER_REGISTER_API_KEY!
            },
            body: JSON.stringify(newUser)
        });
        if(response.ok){
            toast.success("Account created successfully",{position: "top-center",theme: "colored"});
            user.name="";
            user.email="";
            user.number="",
            user.password =""
            route.push("/auth/login");
        }
    } catch (error) {
        toast.error("try again!",{position: "top-center",theme: "colored"});
    }finally{
        setLoading(false);
    }
  }
  return (
    <>
      <div>
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter name"
            required
            onChange={handleChange}
            name="name"
            value={user.name}
          />
          <br />
          <br />
          <input
            type="email"
            placeholder="enter email"
            required
            onChange={handleChange}
            name="email"
            value={user.email}
          />
          <br /><br />
          <input type="number" placeholder="Enter Number" required value={user.number} name="number" onChange={handleChange}/>
          <br />
          <br />
          <input
            type="password"
            placeholder="enter password"
            required
            onChange={handleChange}
            name="password"
            value={user.password}
          />
          <br />
          <br />
          <button>{loading?"Loading...":"Create Account"}</button>
        </form>
        <p>
          Already have an account? <Link href="/auth/login">Login</Link>
        </p>
      </div>
      <ToastContainer position="top-center" theme="colored"/>
    </>
  );
};

export default Signup;
