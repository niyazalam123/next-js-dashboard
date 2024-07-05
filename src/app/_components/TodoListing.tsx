"use client";
import React, { useEffect, useState } from "react";

const TodoListing = () => {
  const [allTodos, setTodos] = useState<any>([]);
  useEffect(() => {
    async function getAlluser() {
      const headers: HeadersInit | any = {
        "x-api-key": process.env.GET_API_ROUTE_USER,
      };
      try {
        const users = await fetch("/api/getalldata", {
          headers: headers,
          "cache":"no-store"
        });
        const result = await users.json();
        setTodos(result);
      } catch (error) {
        console.log("error", error);
      }
    }
    getAlluser();
  },[]);
  console.log("allTodos",allTodos)
  return <div>TodoListing</div>;
};

export default TodoListing;
