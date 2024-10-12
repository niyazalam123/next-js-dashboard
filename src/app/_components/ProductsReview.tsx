"use client";
import React from "react";
import { FaStar } from "react-icons/fa6";
import { BiDislike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import ReplyReview from "./ReplyReview";

const ProductsReview = ({ allreviews }: any) => {
  const totalReview = allreviews.length;
  let count5 = 0,
    count4 = 0,
    count3 = 0,
    count2 = 0,
    count1 = 0;
  let totalRatings = 0; // Sum of all ratings
  // Count ratings and sum up total
  allreviews.forEach((review: any) => {
    totalRatings += review.rating; // Sum of all ratings
    switch (review.rating) {
      case 5:
        count5++;
        break;
      case 4:
        count4++;
        break;
      case 3:
        count3++;
        break;
      case 2:
        count2++;
        break;
      case 1:
        count1++;
        break;
      default:
        break;
    }
  });
  const maxCount = Math.max(count5, count4, count3, count2, count1);
  // Calculate average rating
  const averageRating = totalRatings / totalReview;

  const percent5 = (count5 / maxCount) * 100 + "%";
  const percent4 = (count4 / maxCount) * 100 + "%";
  const percent3 = (count3 / maxCount) * 100 + "%";
  const percent2 = (count2 / maxCount) * 100 + "%";
  const percent1 = (count1 / maxCount) * 100 + "%";


  async function likeBtn(id:any){
    try {
      const response = await fetch(`/api/reviews-system/insert-reviews?id=${id}&actionBtn=like`,{
        method:"PUT"
      })
      if (response.ok){
        alert("you liked the review!!!")
      }
    } catch (error) {
      console.log("error",error)
    }
  }
  async function disLikeBtn(id:any){
    try {
      const response = await fetch(`/api/reviews-system/insert-reviews?id=${id}&actionBtn=disLike`,{
        method:"PUT"
      })
      if (response.ok){
        alert("you disLiked the review!!!")
      }
    } catch (error) {
      console.log("error",error)
    }
  }

  return (
    <>
      <style jsx>{`
        ._reply_1 {
          margin-left: 20px;
          margin-top: 10px;
        }
        ._reviews1 {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding-top: 40px;
          padding-bottom: 40px;
        }
        ._reviews2 {
          flex-grow: 1;
          padding-right: 20px;
        }
        ._review1 {
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        ._review2 {
          padding-left: 15px;
          padding-right: 15px;
          padding-top: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid #ccc;
        }
        ._review2:last-child {
          border-bottom: none;
        }
        ._review4 {
          display: flex;
          align-items: center;
        }
        ._review5 {
          width: 35px;
          flex: 0 0 35px;
          height: 25px;
          background: green;
          text-align: center;
          line-height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          margin-right: 6px;
          color: #f9f9f9;
          border-radius: 3px;
        }
        ._review5 span:last-child {
          display: block;
          font-size: 11px !important;
          padding-top: 3px;
          padding-left: 1px;
        }
        ._review4 > span {
          font-weight: 600;
          font-size: 17px;
          letter-spacing: 0.3px;
        }
        ._review6 {
          margin-top: 15px;
          margin-bottom: 0px;
          font-size: 15px;
          line-height: 21px;
          color: #121212;
          font-weight: 500;
        }
        ._reviews3 {
          max-width: 330px;
          width: 100%;
          align-self: flex-start;
          position: sticky;
          top: 20px;
        }
        ._reviews3 h1 {
          text-align: center;
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #000;
        }
        ._reviews4 {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 15px;
        }
        ._reviews5 {
          font-size: 20px;
          display: flex;
          align-items: center;
        }
        ._reviews5 span:first-child {
          color: #000;
          font-weight: 600;
          margin-right: 3px;
          font-size: 22px;
        }
        ._reviews5 span:last-child {
          color: green;
          font-size: 17px;
          display: block;
          padding-top: 4px;
        }
        ._reviews4 p {
          font-size: 17px;
          color: gray;
          font-weight: 500;
          letter-spacing: 0.3px;
          margin-top: 3px;
        }
        ._reviews6 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 97.7px;
        }
        ._review18 {
          display: flex;
          align-items: center;
        }
        ._review8 {
          display: flex;
          align-items: center;
          margin-right: 15px;
        }
        ._review8 span:first-child {
          width: 15px;
          height: 15px;
          background: gray;
          text-align: center;
          line-height: 18px;
          font-size: 9px;
          color: #f9f9f9;
          border-radius: 50%;
        }
        ._review8 span:last-child {
          color: gray;
          font-size: 13px;
          font-weight: 500;
          margin-left: 2px;
        }
        ._review9 {
          color: gray;
          font-size: 13px;
          font-weight: 500;
        }
        ._review10 {
          margin-top: 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        ._review11 {
          border: none;
          background: #4444dd3b;
          color: #44d;
          padding: 4px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.3px;
        }
        ._review12 {
          max-width: 300px;
          flex: 0 0 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        ._review12 button {
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          font-size: 14px;
        }
        ._review12 button:first-child {
          margin-right: 40px;
        }
        ._review12 button span:first-child {
          display: block;
          padding-top: 5px;
          padding-right: 3px;
          color: gray;
        }
        ._review12 button span:last-child {
          color: gray;
          font-size: 13px;
          font-weight: 500;
        }
        ._reviews8 {
          flex-grow: 1;
          padding-left: 10px;
          padding-right: 10px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        ._reviews8 > li > div {
          width: 100%;
          height: 5px;
          background: #f0f0f0;
          position: relative;
          border-radius: 100px;
          margin-top: 8px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        ._reviews8 > li > div > span {
          position: absolute;
          left: 0px;
          top: 0px;
          bottom: 0px;
        }
        ._reviews8 > li:first-child > div > span,
        ._reviews8 > li:nth-child(2) > div > span,
        ._reviews8 > li:nth-child(3) > div > span {
          background: green;
        }
        ._reviews8 > li:nth-child(4) > div > span {
          background: orange;
        }
        ._reviews8 > li:nth-child(5) > div > span {
          background: red;
        }
        ._reviews8 li {
          flex: 0 0 20%;
        }
      `}</style>
      <div className="container">
        <div className="_reviews1">
          <div className="_reviews2">
            <ul className="_review1">
              {allreviews?.map((review: any) => (
                <li className="_review2" key={review._id}>
                  <div className="_review3">
                    <div className="_review4">
                      <div className="_review5">
                        <span>{review?.rating}</span>
                        <span>
                          <FaStar />
                        </span>
                      </div>
                      <span>{review?.name}</span>
                    </div>
                    <div className="_review6">{review.review}</div>
                    <div className="_review7">
                      <div className="_review18">
                        <div className="_review8">
                          <span>
                            <FaCheck />
                          </span>
                          <span>Verified</span>
                        </div>
                        <div className="_review9">12 September 2024</div>
                      </div>
                      <div className="_review10">
                        <button className="_review11">Reply</button>
                        <div className="_review12">
                          <button onClick={()=>likeBtn(review._id)}>
                            <span>
                              <BiLike />
                            </span>
                            <span>{review.like}</span>
                          </button>
                          <button onClick={()=>disLikeBtn(review._id)}>
                            <span>
                              <BiDislike />
                            </span>
                            <span>{review.disLike}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul className="_reply_1">
                    {review?.replies.map((reply: any) => (
                      <ReplyReview key={reply?._id} reply={reply} />
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <div className="_reviews3">
            <h1>User Reviews</h1>
            <div className="_reviews4">
              <div className="_reviews5">
                <span>{averageRating.toFixed(1)}</span>
                <span>
                  <FaStar />
                </span>
              </div>
              <p>Based on {totalReview} Reviews</p>
            </div>
            <div className="_reviews6">
              <ul className="_reviews7">
                <li>
                  <span>5</span>
                  <span>
                    <FaStar />
                  </span>
                </li>
                <li>
                  <span>4</span>
                  <span>
                    <FaStar />
                  </span>
                </li>
                <li>
                  <span>3</span>
                  <span>
                    <FaStar />
                  </span>
                </li>
                <li>
                  <span>2</span>
                  <span>
                    <FaStar />
                  </span>
                </li>
                <li>
                  <span>1</span>
                  <span>
                    <FaStar />
                  </span>
                </li>
              </ul>
              <ul className="_reviews8">
                <li>
                  <div>
                    <span style={{ width: percent5 }}></span>
                  </div>
                </li>
                <li>
                  <div>
                    <span style={{ width: percent4 }}></span>
                  </div>
                </li>
                <li>
                  <div>
                    <span style={{ width: percent3 }}></span>
                  </div>
                </li>
                <li>
                  <div>
                    <span style={{ width: percent2 }}></span>
                  </div>
                </li>
                <li>
                  <div>
                    <span style={{ width: percent1 }}></span>
                  </div>
                </li>
              </ul>
              <ul className="_reviews9">
                <li>
                  <span>{count5}</span>
                </li>
                <li>
                  <span>{count4}</span>
                </li>
                <li>
                  <span>{count3}</span>
                </li>
                <li>
                  <span>{count2}</span>
                </li>
                <li>
                  <span>{count1}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsReview;
