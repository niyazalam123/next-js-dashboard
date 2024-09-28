"use client";
import React, { useEffect, useState } from "react";

const page = () => {
  const [tabShow, setTabShow] = useState("completed");
  const [formShow, setFormShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [allData, setAllData] = useState<any>([]);
  const [page, setPage] = useState<any>(1);
  const [searchValue, setSearchValue] = useState("");
  const [formData, setFormData] = useState({
    subject: "",
    task: "",
    completedData: "",
  });
  const [fetching, setFetching] = useState(false);
  const [idStore, setIdStore] = useState("");
  const [idStore2, setIdStore2] = useState("");
  const [count,setCount] = useState("");

  //   handle change function to collect all formdata
  function handleChange(e: any) {
    const { name, value } = e.target;
    setFormData((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  //   task assign form submit
  async function handleSubmit(e: any) {
    e.preventDefault();
    // check all fields are empty or not
    if (!formData.subject || !formData.task || !formData.task) {
      setError(true);
      setErrorMessage("Please fill all the fields!!!");
      return;
    }

    // create object
    const savedData = {
      subject: formData.subject,
      task: formData.task,
      timeDuration: formData.completedData,
    };

    // call api
    try {
      setLoader(true);
      const response = await fetch("/api/task-solve", {
        method: "POST",
        body: JSON.stringify(savedData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 409) {
        setError(true);
        setErrorMessage("Subject already exists ! try another name");
        setLoader(false);
      } else if (response.ok) {
        setError(true);
        const para: any = document.querySelector("._error");
        if (para) {
          para.style.color = "green";
        }
        setErrorMessage("FormData submitted successfully!!!");
        setLoader(false);
        formData.completedData = "";
        formData.subject = "";
        formData.task = "";
      } else {
        setError(true);
        setErrorMessage("Internal server error!!! try again");
        setLoader(false);
      }
    } catch (error) {
      console.log("error", error);
      setError(true);
      setErrorMessage(
        "Something went wrong! Please try again after sometimes!!!"
      );
      setLoader(false);
    }
  }

  // get data
  async function getAllData() {
    try {
      setFetching(true);
      const response = await fetch(
        `/api/task-solve?limit=4&page=1&search=${searchValue}`
      );
      if (!response.ok) {
        console.log("unable to fetch data,try again!!");
        setFetching(false);
      } else {
        const result = await response.json();
        setCount(result.count2)
        setAllData(result.data);
        setFetching(false);
      }
    } catch (error) {
      console.log("error", error);
      setFetching(false);
    }
  }

  // useeffect for render when page, and search value page
  useEffect(() => {
    getAllData();
  }, [searchValue]);

  // function to convert db date time to readble date time
  function DateTime(date: any) {
    const finalDate = new Date(date);

    // Define options for formatting the date and time
    const options: any = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Use 12-hour clock
    };
    // Convert the Date object to a readable string
    const readableDate = finalDate.toLocaleString("en-US", options);
    return readableDate;
  }

  // todo complete function
  async function completeTodo(id: any | string) {
    try {
      const response = await fetch(`/api/task-solve/${id}`, {
        method: "PUT",
      });
      if (!response.ok) {
        console.log("something went wrong!!");
        setIdStore("");
      } else {
        alert("todo has been completed!!!");
        setIdStore("false");
      }
    } catch (error) {
      console.log("unable,to mark as done this todo", error);
      setIdStore("");
    }
  }

  // delete todo function

  async function deleteTodo(id: any | string) {
    try {
      const response = await fetch(`/api/task-solve/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        console.log("something is missing!!!");
        setIdStore2("");
      } else {
        alert("todo has been deleted successfully!!!");
        setIdStore2("");
      }
    } catch (error) {
      console.log("something went wrong!!", error);
      setIdStore2("");
    }
  }

  // handle page count

  async function handlePageCount() {
    try {
      if (Number(count) > Number(page) * 4) {
        let pageCount = Number(page);
        ++pageCount
        setPage(pageCount)
        const response = await fetch(
          `/api/task-solve?limit=4&page=${pageCount}`
        );
        if (!response.ok){
          console.log("internal server error")
        }else{
          const result = await response.json();
          const final = result.data;
          setAllData((prev:any)=>{
            return [
              ...prev,
              ...final
            ]
          })
        }
      }
    } catch (error) {
      console.log("error",error)
    }
  }


  return (
    <>
      <style jsx>{`
        ._error {
          text-align: center;
          margin-top: 10px;
          font-size: 15px;
          color: red;
        }
        ._main_todos1 {
          padding: 30px;
          background: aliceblue;
          width: 100%;
          height: 100vh;
        }
        ._main_todos3 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #333333a6;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        ._main_todos4 {
          max-width: 300px;
          width: 100%;
        }
        ._main_todos4 input {
          border: 1px solid #ccc;
          width: 100%;
          padding: 16px 15px;
          font-size: 15px;
          font-weight: 500;
          border-radius: 4px;
        }
        ._main_todos5 {
          max-width: 220px;
          width: 100%;
        }
        ._main_todos5 button {
          background: #44d;
          color: #f9f9f9;
          border: none;
          padding: 12px 15px;
          font-size: 16px;
          letter-spacing: 0.5px;
          border-radius: 10px;
          cursor: pointer;
          width: 100%;
        }
        ._main_todos6 h1 {
          text-align: center;
        }
        ._main_todos7 {
          list-style: none;
          display: flex;
          max-width: 600px;
          width: 100%;
          margin: 20px auto;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding-top: 4px;
          padding-bottom: 4px;
          padding-left: 4px;
          padding-right: 4px;
        }
        ._main_todos7 li {
          flex: 0 0 33.3%;
          width: 33.3%;
          text-align: center;
          padding: 10px 20px;
          color: #000;
          border-radius: 4px;
          transition: all 0.4s ease;
          cursor: pointer;
        }
        ._main_todos7 li.active {
          background: #44d;
          color: #f9f9f9;
        }
        ._main_todos8 {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          list-style-type: none;
          flex-wrap: wrap;
        }
        ._main_todos9 {
          padding: 12px 20px;
          flex: 0 0 25%;
          width: 25%;
        }
        ._main_todos11 {
          border: 1px solid #ccc;
          border-radius: 30px 0px 30px 0px;
          padding: 15px;
          position: relative;
          box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
            rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
        }
        ._main_todos12 {
          color: #44d;
          border-bottom: 1px solid #44d;
          text-align: center;
          padding-bottom: 10px;
          margin-bottom: 10px;
        }
        ._main_todos13 {
          position: absolute;
          background: #44d;
          top: -13px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 27px;
          font-weight: 600;
          color: #f9f9f9;
        }
        ._main_todos14 p {
          font-size: 14px;
          color: #333;
          letter-spacing: 0.5px;
          line-height: 20px;
          margin-bottom: 10px;
          border-bottom: 1px solid #44d;
          padding-bottom: 10px;
        }
        ._main_todos14 span {
          text-align: center;
          display: block;
          border-bottom: 1px solid #44d;
          padding-bottom: 8px;
          margin-bottom: 15px;
          font-size: 14px;
        }
        ._main_todos16 {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        ._main_todos16 button {
          background: #44d;
          border: none;
          color: #f9f9f9;
          font-size: 14px;
          padding: 6px 15px;
          border-radius: 6px;
          flex: 0 0 48%;
          cursor: pointer;
          width: 48%;
        }
        ._task-form1 {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(3px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        ._task-form2 {
          max-width: 500px;
          width: 96%;
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
        }
        ._task-form3 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 20px;
          background: #44d;
          overflow: hidden;
        }
        ._task-form3 span {
          display: block;
          width: 35px;
          height: 35px;
          text-align: center;
          line-height: 35px;
          background: #f9f9f9;
          border-radius: 50%;
          cursor: pointer;
        }
        ._task-form4 {
          padding: 15px 20px;
        }
        ._task-form5 {
          list-style-type: none;
        }
        ._task-form5 li {
          margin-bottom: 15px;
        }
        ._task-form5 li label {
          display: block;
          font-size: 14px;
          padding-left: 4px;
          padding-bottom: 3px;
        }
        ._task-form5 li input,
        ._task-form5 li textarea {
          width: 100%;
          border: 1px solid #ccc;
          padding: 15px 10px;
          border-radius: 6px;
          font-size: 15px;
        }
        ._task-form6 {
          background: #44d;
          width: 200px;
          margin: 0px auto;
          display: block;
          color: #f9f9f9;
          border: none;
          font-size: 16px;
          padding: 8px 15px;
          cursor: pointer;
          letter-spacing: 1px;
          border-radius: 6px;
        }
      `}</style>
      <div className="_main_todos1">
        <div className="_main_todos2">
          <div className="_main_todos3">
            <div className="_main_todos4">
              <input
                type="text"
                placeholder="Search by subject name..."
                value={searchValue}
                name="searchValue"
                onChange={(e: any) => setSearchValue(e.target.value)}
              />
            </div>
            <div className="_main_todos5">
              <button onClick={() => setFormShow(true)}>Add New Task</button>
            </div>
          </div>
          <div className="_main_todos6">
            <h1>All Todos</h1>
            <ul className="_main_todos7">
              <li
                onClick={() => setTabShow("completed")}
                className={`${tabShow === "completed" && "active"}`}
              >
                Completed Todo
              </li>
              <li
                onClick={() => setTabShow("upcoming")}
                className={`${tabShow === "upcoming" && "active"}`}
              >
                Upcoming Todo
              </li>
              <li
                onClick={() => setTabShow("pending")}
                className={`${tabShow === "pending" && "active"}`}
              >
                Pending Todo
              </li>
            </ul>
            {fetching ? (
              "Loading..."
            ) : (
              <ul className="_main_todos8">
                {allData.map((item: any) => (
                  <li className="_main_todos9" key={item._id}>
                    <div className="_main_todos11" style={{backgroundColor:item.isCompleted ? "#00800082" : "#fff"}}>
                      <div className="_main_todos12">{item.subject}</div>
                      <span className="_main_todos13">
                        {item.isCompleted ? "Done" : "Pending"}
                      </span>
                      <div className="_main_todos14">
                        <p>{item.task}</p>
                        <span>{DateTime(item.timeDuration)}</span>
                      </div>
                      <div className="_main_todos16">
                        <button
                          onClick={() => {
                            completeTodo(item._id);
                            setIdStore(item._id);
                          }}
                        >
                          {idStore === item._id ? "Loading..." : "Mark as done"}
                        </button>
                        <button
                          onClick={() => {
                            deleteTodo(item._id);
                            setIdStore2(item._id);
                          }}
                        >
                          {idStore2 === item._id ? "Loading..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <br />
            <br />
            {(!searchValue && Number(count) > Number(page) * 4) && (
              <button
                onClick={handlePageCount}
                style={{
                  display: "block",
                  width: "280px",
                  background: "#44d",
                  border: "none",
                  color: "#f9f9f9",
                  fontSize: "17px",
                  padding: "8px 15px",
                  cursor: "pointer",
                  borderRadius: "6px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
      {/* form for task assign */}
      {formShow && (
        <div className="_task-form1">
          <div className="_task-form2">
            <div className="_task-form3">
              <h3>Task Assign</h3>
              <span onClick={() => setFormShow(false)}>X</span>
            </div>
            <div className="_task-form4">
              <form onSubmit={handleSubmit}>
                <ul className="_task-form5">
                  <li>
                    <label htmlFor="_one1">Enter Subject</label>
                    <input
                      type="text"
                      placeholder="Enter Subject"
                      id="_one1"
                      value={formData.subject}
                      name="subject"
                      onChange={handleChange}
                      required
                    />
                  </li>
                  <li>
                    <label htmlFor="_one2">Select Time</label>
                    <input
                      type="datetime-local"
                      name="completedData"
                      id="_one2"
                      value={formData.completedData}
                      onChange={handleChange}
                      required
                    />
                  </li>
                  <li>
                    <label htmlFor="_one3">Write Task</label>
                    <textarea
                      name="task"
                      id="_one3"
                      placeholder="Write Task"
                      required
                      value={formData.task}
                      onChange={handleChange}
                    ></textarea>
                  </li>
                </ul>
                <button
                  className="_task-form6"
                  disabled={loader ? true : false}
                  style={{
                    cursor: loader ? "no-drop" : "pointer",
                    opacity: loader ? ".85" : "1",
                  }}
                >
                  {loader ? "Loading..." : "Create Task"}
                </button>
                {error && <p className="_error">{errorMessage}</p>}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
