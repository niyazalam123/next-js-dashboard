"use client";
import React from "react";

const Products = ({ data }: any) => {
  return (
    <>
      <style jsx>{`
        ._hero {
          display: flex;
          align-items: center;
        }
        ._hero li {
          margin-right: 60px;
          list-style: none;
        }
        .container {
          padding: 15px 20px;
        }
        ._hero2 {
          list-style: none;
          border-bottom: 1px solid #ddd;
          padding: 12px 5px;
        }
        .hero5 {
            display: flex;
            list-style: none;
            align-items: center;
            justify-content: space-between;
            margin-top: 12px;
          }
          .hero3 {
            display: flex;
            align-content: center;
            justify-content: space-between;
          }
          ._hero1 {
            max-height: 500px;
            overflow-y: scroll;
            height: 500px;
          }
      `}</style>
      <div className="container">
        <div className="hero3">
          <div>
            <select name="" id="">
              <option value="25">15</option>
              <option value="50">20</option>
              <option value="100">30</option>
            </select>
          </div>
          <div>
            <input type="text" placeholder="search by name id price" />
          </div>
        </div>

        <ul className="_hero1">
          {data.slice(0,15).map(
            (item: any) => (
              (
                <li key={`${item.sku}`} className="_hero2">
                  <ul className="_hero">
                    <li>{item.brand}</li>
                    <li>{item.category}</li>
                    <li>{item.price}</li>
                    <li>{item.rating}</li>
                    <li>{item.sku}</li>
                    <li>{item.stock}</li>
                    <li>{item.title}</li>
                  </ul>
                </li>
              )
            )
          )}
        </ul>
        <ul className="hero5">
          <li>total showing 20 item out of 2020</li>
          <li>
            <div>
              <button>Prev</button>
              <button>Next</button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Products;
