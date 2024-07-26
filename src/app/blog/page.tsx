"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const [blogData, setBlogData] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState([1, 2, 3, 4]);
  const blogsPerPage = 4; // Number of blogs per page
  const totalPages = Math.ceil(blogData.totalBlogs / blogsPerPage);
  const router = useRouter();

  function getIndiaTime(createdAt: any) {
    const date = new Date(createdAt);
    const indiaTime = date.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    return indiaTime;
  }

  useEffect(() => {
    // get blog
    async function getBlog() {
      try {
        const resp = await fetch(
          `http://localhost:3000/api/blog?page=${currentPage}&limit=4`
        );
        const blog = await resp.json();
        setBlogData(blog);
      } catch (error) {
        throw new Error("internal server error");
      }
    }
    getBlog();
  }, [currentPage]);

  const handleClick = (page: any) => {
    setCurrentPage(page);
    updatePageRange(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      updatePageRange(nextPage);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      updatePageRange(prevPage);
    }
  };

  const updatePageRange = (page: any) => {
    const start = Math.floor((page - 1) / 4) * 4 + 1;
    const newRange = [start, start + 1, start + 2, start + 3].filter(
      (p) => p <= totalPages
    );
    setPageRange(newRange);
  };
  return (
    <>
      <style jsx>{`
        ._parent1 {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        }
        ._parent2 {
          flex: 0 0 25%;
          width: 25%;
          padding: 15px;
          list-style-type: none;
        }
        ._parent3 {
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 6px 10px;
          overflow: hidden;
        }
        ._parent4 {
          position: relative;
          width: 100%;
          height: 160px;
          overflow: hidden;
          border-radius: 4px;
          margin-bottom: 8px;
        }
        ._parent5 {
          color: gray;
          font-size: 14px;
          font-weight: 500;
          display: block;
          margin-bottom: 6px;
        }
        ._parent6 {
          font-size: 14px;
          color: #333;
          font-weight: 600;
          margin-bottom: 4px;
          line-height: 20px;
        }
        ._pagina {
          display: flex;
          align-items: center;
          justify-content: center;
          list-style-type: none;
          margin-top: 15px;
          margin-bottom: 15px;
        }
        ._pagina li {
          width: 32px;
          height: 32px;
          text-align: center;
          border-radius: 50%;
          line-height: 32px;
          font-size: 14px;
          font-weight: 500;
        }
        ._pagina li:first-child,
        ._pagina li:last-child {
          background: transparent !important;
        }
        ._pagina li.active {
          background: #44d;
        }
      `}</style>
      <ul className="_parent1">
        {blogData?.blogs?.map((item: any) => (
          <li className="_parent2" key={item._id}>
            <div className="_parent3">
              <div className="_parent4">
                <Image
                  src={item?.img}
                  alt={item?.title}
                  fill
                  objectFit="contain"
                />
              </div>
              <span className="_parent5">
                <span>Published : </span>
                <span>{getIndiaTime(item?.createdAt)}</span>
              </span>
              <div className="_parent6">{item?.title}</div>
              <div className="_parent7">{item?.metaDescription}</div>
            </div>
          </li>
        ))}
      </ul>
      {blogData?.totalBlogs > 12 && (
        <ul className="_pagina">
          {currentPage >= 4 && (
            <li>
              <Link href={`?page=${currentPage - 1}`} onClick={handlePrev}>
                Prev
              </Link>
            </li>
          )}
          {pageRange.map((page: any) => (
            <li key={page} className={currentPage === page ? "active" : ""}>
              <Link href={`?page=${page}`} onClick={() => handleClick(page)}>
                {page}
              </Link>
            </li>
          ))}
          {currentPage >= totalPages - 4 && (
            <li>
              <Link href={`?page=${currentPage + 1}`} onClick={handleNext}>
                Next
              </Link>
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default page;
