"use client";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);

  // handle change function
  function handleUserData(e: any) {
    const { name, value } = e.target;
    setUserData((prev: any) => {
      return { ...prev, [name]: value };
    });
  }

  // submit function
  async function handleSubmitData(e: any) {
    e.preventDefault();
    // create api key
    const headers: any = {
      "x-api-key": process.env.NEXT_PUBLIC_USER_CREATE_API_KEY,
    };
    if (
      !userData.name ||
      !userData.email ||
      !userData.number ||
      !userData.password
    ) {
      alert("Please fill all the required fields!!!");
      return;
    }
    try {
      setLoader(true);
      // create an object
      const userObj = {
        name: userData.name,
        email: userData.email,
        number: Number(userData.number),
        password: userData.password,
      };
      const resp = await fetch("/api/auth/auth-learn/user-creation", {
        method: "POST",
        headers,
        body: JSON.stringify(userObj),
      });
      if (!resp.ok) {
        throw new Error("Something went wrong");
      } else {
        setUserData({
          name: "",
          email: "",
          number: "",
          password: "",
        });
        alert("User Create Successfully!!!");
      }
    } catch (error) {
      console.log("error", error);
      alert("Something went wrong!!!");
    } finally {
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
          <form onSubmit={handleSubmitData}>
            <div className="_one3">
              <label htmlFor="_one1">Enter Name</label>
              <input
                type="text"
                placeholder="Enter Name..."
                id="_one1"
                required
                value={userData.name}
                name="name"
                onChange={handleUserData}
              />
            </div>
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
              <label htmlFor="_one3">Enter Number</label>
              <input
                type="text"
                placeholder="Enter Number..."
                id="_one3"
                required
                value={userData.number}
                name="number"
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
              {loader ? "Processing...": "Signup"}
            </button>
          </form>
          <div className="_one5">
            <p>
              Alrady have an account?{" "}
              <Link href="/user-creation-id/signin">Signin</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
