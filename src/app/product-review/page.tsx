import React from 'react'
import ProductsReview from '../_components/ProductsReview'


async function getReviews(){
  try {
    const response = await fetch("http://localhost:3000/api/reviews-system/insert-reviews");
    if (response.ok){
      const result = await response.json();
      return result;
    }
    else{
      console.log("something went wrong")
    }
  } catch (error) {
    console.log("error",error);
  }
}

const page = async() => {
  const allreviews = await getReviews();
  return (
    <>
    <ProductsReview allreviews={allreviews}/>
    </>
  )
}

export default page