import React from "react";

const ListingPage = ({ data }: any) => {
  console.log("data", data);
  return (
    <>
      <div>
        <ul>
          <li>
            <label htmlFor="">
              <label htmlFor="">select</label>
              <select name="" id="">
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="25">25</option>
              </select>
            </label>
          </li>
          <li>
            <input type="text" placeholder="search..." />
          </li>
        </ul>
        <ul className="_alpha">
          <li>s.i</li>
          <li>title</li>
          <li>category</li>
          <li>price</li>
          <li>rating</li>
          <li>sku</li>
          <li>discountPercentage</li>
          <li>weight</li>
        </ul>
        <ul className="_alpha">
          {data?.products.map((item: any) => (
            <li key={item?.id}>
              <ul>
                <li>s.i</li>
                <li>{item?.title}</li>
                <li>{item?.category}</li>
                <li>{item?.price}</li>
                <li>{item?.rating}</li>
                <li>{item?.sku}</li>
                <li>{item?.discountPercentage}</li>
                <li>{item?.weight}</li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ListingPage;
