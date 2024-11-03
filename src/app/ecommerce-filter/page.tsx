import React from "react";
import FilterPage from "../_components/FilterPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Filter",
  description: "In this page i am making product filter",
};

// get initial data of products
async function GetInitialData(){
  try {
    const resp = await fetch("http://localhost:3000/api/filter-products");
    if (resp.ok){
      const data = await resp.json();
      return data;
    }else{
      return null
    }
  } catch (error) {
    console.log("error",error);
    return null
  }
}
const page = async() => {
  const productsData = await GetInitialData();
  return (
    <>
      <FilterPage productsData={productsData}/>
    </>
  );
};

export default page;
