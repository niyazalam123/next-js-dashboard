import React from 'react'
import Review from '../_components/Review'


// fetch data
async function GetAllReview(){
    try {
        const response = await fetch("http://localhost:3000/api/review?limit=4&page=1",{cache:"no-store"});
        if (response.ok){
            const result = await response.json();
            return result;
        }else{
            console.log("unable to fetch data");
        }
    } catch (error) {
        console.log("error",error)
        return null;
    }
}

const page = async() => {
    const reviews = await GetAllReview();
  return (
    <>
    <Review reviews = {reviews}/>
    </>
  )
}

export default page