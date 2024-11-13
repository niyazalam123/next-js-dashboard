"use client";
import React, { useCallback, useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const SORT_OPTIONS = [
  {
    name: "Price:Low To High",
    value: "asc",
  },
  {
    name: "Price:High To Low",
    value: "des",
  },
] as const;

const COLOR_OPTIONS = [
  {
    name: "White",
    value: "white",
  },
  {
    name: "Beige",
    value: "beige",
  },
  {
    name: "Blue",
    value: "blue",
  },
  {
    name: "Green",
    value: "green",
  },
  {
    name: "Purple",
    value: "purple",
  },
] as const;

const SIZE_OPTIONS = [
  {
    name: "S",
    value: "s",
  },
  {
    name: "M",
    value: "m",
  },
  {
    name: "L",
    value: "l",
  },
] as const;

const PRICE_OPTIONS = [
  { name: "Under $1000", value: "0-1000" },
  { name: "$1000 to $2000", value: "1000-2000" },
  { name: "$2000 to $3000", value: "2000-3000" },
  { name: "$3000 to $4000", value: "3000-4000" },
  { name: "Custom", value: "custom" },
] as const;
const FilterPage = ({ productsData }: any) => {
  const [filter, setFilter] = useState({ sort: "", color: "", size: "" });
  const route = useRouter();
  const [filterData, setFilterData] = useState<any>([]);
  const [priceRange, setPriceRange] = useState("");
  const [customMin, setCustomMin] = useState(10);
  const [customMax, setCustomMax] = useState(20);
  const minGap = 0;
  const sliderMaxValue = 50000;

  function handleFilter() {}

  useEffect(() => {
    slideOne();
    slideTwo();
  }, [customMin, customMax]);

  const slideOne = useCallback(() => {
    if (customMax - customMin <= minGap) {
      setCustomMin(customMax - minGap);
    }
    fillColor();
  }, [customMin, customMax, minGap]);

  const slideTwo = useCallback(() => {
    if (customMax - customMin <= minGap) {
      setCustomMax(customMin + minGap);
    }
    fillColor();
  }, [customMin, customMax, minGap]);

  const fillColor = () => {
    const percent1 = (customMin / sliderMaxValue) * 100;
    const percent2 = (customMax / sliderMaxValue) * 100;
    const sliderTrack: any = document.querySelector(".slider-track");
    if (sliderTrack) {
      sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
    }
  };

  const handleApply = (e: any) => {
    e.preventDefault();
    // You can add logic here to apply the selected range
    console.log("Applying Min:", customMin, "Max:", customMax);
  };

  return (
    <>
      <style jsx>{`
        ._price_range1 {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        ._price_range1 span {
          display: block;
          margin-left: 20px;
        }
        ._parent_filter1 {
          max-width: 1450px;
          width: 100%;
          padding: 25px;
          margin-left: auto;
          margin-right: auto;
        }
        ._parent_filter122 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #ccc;
          padding-bottom: 10px;
          margin-bottom: 10px;
        }
        ._parent_filter122 h1 {
          color: gray;
          font-size: 26px;
          font-weight: 600;
          letter-spacing: 0.3px;
        }
        ._parent_filter122 select {
          width: 150px;
          background: transparent;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 6px 10px;
          font-size: 15px;
          color: gray;
          cursor: pointer;
        }
        ._parent_filter2 {
          display: flex;
          align-items: flex-start;
        }
        ._parent_filter3 {
          flex: 0 0 300px;
          width: 300px;
          padding: 10px;
          position: sticky;
          top: 10px;
          z-index: 99;
        }
        ._parent_filter5 {
          border-bottom: 1px solid #ccc;
          padding-bottom: 10px;
          padding-top: 10px;
        }
        ._parent_filter6 summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          padding-bottom: 10px;
        }
        ._parent_filter6 summary span:last-child {
          color: gray;
          font-size: 14px;
        }
        ._parent_filter6 ul li:nth-child(2n) {
          margin-bottom: 6px;
          margin-top: 6px;
        }
        ._parent_filter6 ul li input[type="checkbox"] {
          width: 12px;
          height: 12px;
          outline: 1px solid #ccc;
          margin-right: 10px;
        }
        ._parent_filter6 ul li label {
          color: gray;
          font-size: 14px;
        }
        details > summary {
          list-style: none;
        }
        details > summary::-webkit-details-marker {
          display: none;
        }
        ._parent_filter50 {
          flex-grow: 1;
        }
        ._parent_filter51 {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        }
        ._parent_filter52 {
          width: 25%;
          flex: 0 0 25%;
          padding-left: 10px;
          padding-right: 10px;
          padding-bottom: 10px;
        }
        ._parent_filter53 {
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        ._parent_filter54 {
          width: 100%;
          height: 140px;
          overflow: hidden;
          position: relative;
        }
        ._parent_filter55 {
          padding: 15px;
        }
        ._parent_filter56 {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        ._parent_filter57 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 8px;
        }
        ._parent_filter6 ul li input[type="radio"] {
          margin-right: 6px;
        }
        ._parent_filter7 {
          margin-bottom: 15px;
        }
        ._parent_filter8 ._parent_filter80 {
          display: flex;
          align-items: center;
        }
        ._parent_filter8 ._parent_filter80 input {
          border: 1px solid #ccc;
          padding: 4px 6px;
          font-size: 14px;
          border-radius: 4px;
        }
        ._parent_filter8 ._parent_filter80 input,
        ._parent_filter8 ._parent_filter80 button {
          width: 28%;
        }
        ._parent_filter8 ._parent_filter80 span {
          display: block;
          padding-left: 6px;
          padding-right: 6px;
          color: gray;
          font-size: 14px;
        }
        ._parent_filter8 ._parent_filter80 button {
          background: #44d;
          border: none;
          color: #f9f9f9;
          font-size: 15px;
          font-weight: 500;
          margin-left: 10px;
          padding: 4px 6px 5px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        ._parent_filter8 ._parent_filter80 button:hover {
          opacity: 0.85;
        }

        // input type range
        .container122 {
          position: relative;
          width: 100%;
          margin-top: 30px;
        }
        input[type="range"] {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          width: 100%;
          outline: none;
          position: absolute;
          margin: auto;
          top: 0;
          bottom: 0;
          background-color: transparent;
          pointer-events: none;
        }
        .slider-track {
          width: 100%;
          height: 5px;
          position: absolute;
          margin: auto;
          top: 0;
          bottom: 0;
          border-radius: 5px;
        }
        input[type="range"]::-webkit-slider-runnable-track {
          -webkit-appearance: none;
          height: 5px;
        }
        input[type="range"]::-moz-range-track {
          -moz-appearance: none;
          height: 5px;
        }
        input[type="range"]::-ms-track {
          appearance: none;
          height: 5px;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 1.7em;
          width: 1.7em;
          background-color: #3264fe;
          cursor: pointer;
          margin-top: -9px;
          pointer-events: auto;
          border-radius: 50%;
        }
        input[type="range"]::-moz-range-thumb {
          -webkit-appearance: none;
          height: 1.7em;
          width: 1.7em;
          cursor: pointer;
          border-radius: 50%;
          background-color: #3264fe;
          pointer-events: auto;
          border: none;
        }
        input[type="range"]::-ms-thumb {
          appearance: none;
          height: 1.7em;
          width: 1.7em;
          cursor: pointer;
          border-radius: 50%;
          background-color: #3264fe;
          pointer-events: auto;
        }
        input[type="range"]:active::-webkit-slider-thumb {
          background-color: #ffffff;
          border: 1px solid #3264fe;
        }
      `}</style>
      <main className="_parent_filter1">
        <div className="_parent_filter122">
          <h1>Most Trending Products</h1>
          <select name="sort" id="" value={filter.sort} onChange={handleFilter}>
            <option value="">Sort</option>
            {SORT_OPTIONS.map((option: any) => (
              <option value={option?.value} key={option?.name}>
                {option?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="_parent_filter2">
          <aside className="_parent_filter3">
            <div className="_parent_filter4">
              <div className="_parent_filter5">
                <details className="_parent_filter6" open>
                  <summary>
                    <span>Color</span>
                    <span>
                      <FaAngleDown />
                    </span>
                  </summary>
                  <ul>
                    {COLOR_OPTIONS.map((color: any) => (
                      <li key={color.name}>
                        <input
                          type="radio"
                          id={`color-${color.value}`}
                          name="color"
                          onChange={handleFilter}
                          value={color.name}
                          checked={filter.color === color.name}
                        />
                        <label htmlFor={`color-${color.value}`}>
                          {color.name}
                        </label>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
              <div className="_parent_filter5">
                <details className="_parent_filter6" open>
                  <summary>
                    <span>Size</span>
                    <span>
                      <FaAngleDown />
                    </span>
                  </summary>
                  <ul>
                    {SIZE_OPTIONS.map((size: any) => (
                      <li key={size.name}>
                        <input
                          type="radio"
                          id={`size-${size.value}`}
                          name="size"
                          onChange={handleFilter}
                          value={size.name}
                          checked={filter.size === size.name}
                        />
                        <label htmlFor={`size-${size.value}`}>
                          {size.name}
                        </label>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
              <div className="_parent_filter5">
                <details className="_parent_filter6" open>
                  <summary>
                    <span>Price</span>
                    <span>
                      <FaAngleDown />
                    </span>
                  </summary>
                  <ul>
                    {PRICE_OPTIONS?.map((price: any) => (
                      <li key={price?.name}>
                        <input
                          type="radio"
                          id={`price-${price?.name}`}
                          name="price"
                          value={price?.value}
                          onChange={(e: any) => setPriceRange(price?.value)}
                          checked={priceRange === price?.value}
                        />
                        <label htmlFor={`price-${price?.name}`}>
                          {price?.name}
                        </label>
                      </li>
                    ))}
                    {priceRange === "custom" && (
                      <>
                        <li className="_parent_filter7">
                          <div className="_parent_filter8">
                            <form
                              className="_parent_filter80"
                              onSubmit={handleApply}
                            >
                              <input
                                type="number"
                                placeholder="Min"
                                value={customMin}
                                onChange={(e) => {
                                  if (e.target.value.length > 6) {
                                    return;
                                  } else {
                                    setCustomMin(Number(e.target.value));
                                  }
                                }}
                              />
                              <span>To</span>
                              <input
                                type="number"
                                placeholder="Max"
                                value={customMax}
                                onChange={(e) => {
                                  if (e.target.value.length > 6) {
                                    return;
                                  } else {
                                    setCustomMax(Number(e.target.value));
                                  }
                                }}
                              />
                              <button type="submit">Apply</button>
                            </form>
                          </div>
                        </li>
                        <li>
                          <div>Price Range</div>
                          {/* <div className="_price_range1">
                        <span>${customMin}</span>
                        <span>${customMax}</span>
                      </div> */}
                          <div className="container122">
                            <div className="slider-track"></div>
                            <input
                              type="range"
                              min="0"
                              max={sliderMaxValue - 1}
                              value={customMin}
                              id="slider-1"
                              onChange={(e) =>
                                setCustomMin(Number(e.target.value))
                              }
                            />
                            <input
                              type="range"
                              min="1"
                              max={sliderMaxValue}
                              value={customMax}
                              id="slider-2"
                              onChange={(e) =>
                                setCustomMax(Number(e.target.value))
                              }
                            />
                          </div>
                        </li>
                      </>
                    )}
                  </ul>
                </details>
              </div>
            </div>
          </aside>
          <section className="_parent_filter50">
            <ul className="_parent_filter51">
              {filterData.length > 0 ? (
                (filterData ? filterData : productsData).map((item: any) => (
                  <li className="_parent_filter52">
                    <div className="_parent_filter53">
                      <div className="_parent_filter54">
                        <Image
                          src="/dummy-product.webp"
                          alt="Product Image"
                          fill
                          priority
                          objectFit="contain"
                        />
                      </div>
                      <div className="_parent_filter55">
                        <div className="_parent_filter56">
                          <div>{item?.title.slice(0, 10) + "..."}</div>
                          <div>${item?.price}</div>
                        </div>
                        <div className="_parent_filter57">
                          <span>Size {item?.size}</span>
                          <span>{item?.color}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <p>No Data Found</p>
              )}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
};

export default FilterPage;
