import Image from "next/image";
import Products from "./_components/Products";
import FilterBasedOnLead from "./_components/FilterBasedOnLead";
import ListingPage from "./_components/listingPage";
import SelectBox from "./_components/SelectBox";
import TodoListing from "./_components/TodoListing";


async function GetAllProducts() {
  const allData = await fetch("https://dummyjson.com/products");
  const repon = await allData.json();
  return repon;
}

export default async function Home() {
  const data = await GetAllProducts();
  return (
    <>
      {/* <Products data={data.products}/> */}
      {/* <FilterBasedOnLead /> */}
      {/* <ListingPage data={data}/> */}
      {/* <SelectBox /> */}
      <h1>Back to home page</h1>
      <TodoListing />
    </>
  );
}
