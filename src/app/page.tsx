import Image from "next/image";
import Products from "./_components/Products";
import FilterBasedOnLead from "./_components/FilterBasedOnLead";
import ListingPage from "./_components/listingPage";
import SelectBox from "./_components/SelectBox";


async function GetAllProducts() {
  const allData = await fetch("https://dummyjson.com/products");
  const repon = await allData.json();
  return repon;
}

async function getAlluser(){
  const headers:HeadersInit | any = {'x-api-key':process.env.GET_API_ROUTE_USER}
  try {
    const users = await fetch("http://localhost:3000/api/getalldata",{
      headers:headers
    });
    const result = await users.json();
    console.log(result)
  } catch (error) {
    console.log("error",error)
  }
}

export default async function Home() {
  getAlluser()
  const data = await GetAllProducts();
  return (
    <>
      {/* <Products data={data.products}/> */}
      {/* <FilterBasedOnLead /> */}
      {/* <ListingPage data={data}/> */}
      {/* <SelectBox /> */}
      <h1>Back to home page</h1>
    </>
  );
}
