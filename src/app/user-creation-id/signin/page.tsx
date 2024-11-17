"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);
  const route = useRouter();

  // handle change function
  function handleUserData(e: any) {
    const { name, value } = e.target;
    setUserData((prev: any) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit(e:any){
    e.preventDefault();
    try {
      setLoader(true);
      const resp = await signIn("credentials",{
        email:userData.email,
        password:userData.password,
        redirect:false,
      });
      if (resp?.error){
        alert("Invalid Credntials");
        return;
      }
      route.push("/");
    } catch (error) {
      console.log("error",error)
    }
    finally{
      setLoader(false);
    }
  }

  return (
    <>
      <style jsx>{`
        ._one1 {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100vh;
        }
        ._one2 {
          max-width: 400px;
          width: 100%;
          background: #cccccc70;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 20px;
        }
        ._one3 {
          margin-bottom: 15px;
        }
        ._one3 label {
          display: block;
          font-size: 13px;
          color: #121212;
          font-weight: 500;
          padding-left: 3px;
        }
        ._one3 input {
          background: #f9f9f9;
          border: 1px solid #ccc;
          width: 100%;
          padding: 10px;
          border-radius: 4px;
          outline: none;
        }
        ._one4 {
          width: 100%;
          background: #44d;
          color: #f9f9f9;
          cursor: pointer;
          padding: 8px 10px;
          border: none;
          border-radius: 4px;
          font-size: 16px;
        }
        ._one5 {
          margin-top: 10px;
          font-size: 13px;
          color: #333;
        }
      `}</style>
      <div className="_one1">
        <div className="_one2">
          <form onSubmit={handleSubmit}>
            <div className="_one3">
              <label htmlFor="_one2">Enter Email</label>
              <input
                type="email"
                placeholder="Enter Email..."
                id="_one2"
                required
                value={userData.email}
                name="email"
                onChange={handleUserData}
              />
            </div>
            <div className="_one3">
              <label htmlFor="_one4">Enter Password</label>
              <input
                type="password"
                placeholder="Enter Password..."
                id="_one4"
                required
                value={userData.password}
                name="password"
                onChange={handleUserData}
              />
            </div>
            <button className="_one4" type="submit" disabled={loader}>
              {loader ? "Processing..." : "Signin"}
            </button>
          </form>
          <div className="_one5">
            <p>
              Don't have an account?{" "}
              <Link href="/user-creation-id/signup">SignUp</Link>
            </p>
          </div>
          <div className="_one5">
            <p>
              Reset Your Password
              <Link href="/user-creation-id/forgot-password">Forgot Password</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
