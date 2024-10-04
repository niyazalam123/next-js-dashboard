"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa6";

const Review = ({ reviews }: any) => {
  const [allReview, setAllreview] = useState(reviews);
  const [moreLess, setMoreLess] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const reviewRef = useRef<any>(null); // Reference to the review div
  const [isOverflowing, setIsOverflowing] = useState(false);

  //   rating filter
  function ratingFilter(rate: number) {
    const arr1 = [
      { id: "1", img: <FaStar /> },
      { id: "2", img: <FaStar /> },
      { id: "3", img: <FaStar /> },
      { id: "4", img: <FaStar /> },
      { id: "5", img: <FaStar /> },
    ];
    const star = arr1.slice(0, rate);
    return star;
  }

  //   load more function
  async function loadMore() {
    const newPage = page + 1;
    setLoading(true);
    try {
      const response = await fetch(`/api/review?limit=4&page=${newPage}`);
      if (!response.ok) {
        console.log("something went wrong!!!");
      }
      const data = await response.json();
      if (data.length === 0) {
        setHasMore(true);
      } else {
        setAllreview((prev: any) => [...prev, ...data]);
        setPage(newPage);
      }
    } catch (error) {
      console.log("data fetching error", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Check if the content exceeds the visible height (70px or 4 lines)
    if (reviewRef.current.scrollHeight > reviewRef.current.clientHeight) {
      setIsOverflowing(true); // Set to true if content is overflowing
    }
  }, [allReview]);
  return (
    <>
      <style jsx>{`
        ._review1 {
          padding: 30px;
        }
        ._review3 {
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
        }
        ._review4 {
          flex: 0 0 25%;
          width: 25%;
          padding-right: 12px;
          padding-bottom: 20px;
          list-style-type: none;
        }
        ._review5 {
          box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
            rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
          background: #fff;
          border-radius: 5px;
          padding: 15px;
        }
        ._review6 {
          display: flex;
          align-items: center;
        }
        ._review7 {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          flex: 0 0 45px;
          margin-right: 12px;
          text-align: center;
          line-height: 43px;
          color: #f9f9f9;
          font-size: 18px;
          font-weight: 500;
        }
        ._review8 {
          display: flex;
          flex-direction: column;
        }
        ._review8 span:first-child {
          font-weight: 500;
          display: inline-block;
          font-size: 17px;
          margin-bottom: 2px;
          color: #44d;
        }
        ._review8 span:last-child {
          font-size: 13px;
          font-weight: 500;
        }
        ._review9 {
          color: orange;
          margin-top: 10px;
          margin-bottom: 6px;
        }
        ._review10 div {
          color: #333;
          font-size: 15px;
          font-weight: 500;
          display: -webkit-box;
          text-overflow: ellipsis;
          width: 100%;
          overflow: hidden;
          -webkit-line-clamp: 4;
          line-clamp: 4;
          -webkit-box-orient: vertical;
          max-height: 76px;
        }
        ._review10 div.active {
          max-height: 600px;
          -webkit-line-clamp: unset;
        }
        ._review10 span {
          margin-top: 10px;
          display: block;
          color: #333;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.5s ease-in-out;
        }
        ._review13 {
          width: 191px;
          display: block;
          margin: 10px auto 0px;
          background: #44d;
          color: #f9f9f9;
          border: none;
          font-size: 16px;
          border-radius: 10px;
          cursor: pointer;
          padding: 10px;
          letter-spacing: 0.3px;
        }
      `}</style>
      <div className="_review1">
        <div className="_review2">
          <ul className="_review3">
            {allReview.map((review: any) => (
              <li className="_review4" key={review._id}>
                <div className="_review5">
                  <div className="_review6">
                    <div
                      className="_review7"
                      style={{ background: review.bgColor }}
                    >
                      <span>{review.name.split(" ")[0][0].toLowerCase()}</span>
                    </div>
                    <div className="_review8">
                      <span>{review.name}</span>
                      <span>12 September 2024</span>
                    </div>
                  </div>
                  <div className="_review9">
                    {ratingFilter(review.rating).map((items: any) => (
                      <span key={items.id}>{items.img}</span>
                    ))}
                  </div>
                  <div className="_review10">
                    <div className={moreLess ? "active" : ""} ref={reviewRef}>
                      {review?.review}
                    </div>
                    {
                      isOverflowing &&
                    <span onClick={() => setMoreLess(!moreLess)}>
                      {moreLess ? "Hide" : "Read More"}
                    </span>
                    }
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {!hasMore && (
            <button
              className="_review13"
              disabled={loading}
              style={{
                cursor: loading ? "no-drop" : "pointer",
                opacity: loading ? ".85" : "1",
              }}
              onClick={loadMore}
            >
              {
                loading ? "Loading..." : "Read More"
              }
              
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Review;
