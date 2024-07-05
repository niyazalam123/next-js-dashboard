"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const IsAssign = () => {
  const [allUser, setAllUser] = useState([]);
  const [updatedUsers, setUpdatedUsers] = useState<any>({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function getAllUsers() {
      const resp = await fetch("/api/auth/user", { cache: "no-store" });
      const result = await resp.json();
      setAllUser(result);
    }
    getAllUsers();
  }, []);
  const handleChange = (id: any) => {
    setAllUser((prevUsers: any) =>
      prevUsers.map((user: any) =>
        user._id === id ? { ...user, isAssign: !user.isAssign } : user
      )
    );

    setUpdatedUsers((prevUpdatedUsers: any) => ({
      ...prevUpdatedUsers,
      [id]: !prevUpdatedUsers[id],
    }));
  };

  const handleUpdate = async () => {
    setLoader(true);
    const userToUpdates = allUser.filter(
      (user: any) => updatedUsers[`${user._id}`] !== undefined
    );
    console.log("userToUpdates", userToUpdates);
    try {
      if (userToUpdates.length == 0) {
        toast.warn("No changes", { position: "top-center", theme: "colored" });
        return;
      }
      const resp = await fetch("/api/auth/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userToUpdates),
      });
      if (resp.ok) {
        toast.success("Update successfully", {
          position: "top-center",
          theme: "colored",
        });
      }
    } catch (error) {
      toast.warn("internal server error", {
        position: "top-center",
        theme: "colored",
      });
    } finally {
      setLoader(false);
    }
  };
  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        label {
          position: relative;
          width: 56px;
          height: 30px;
          cursor: pointer;
          display: block;
        }

        label input {
          position: relative;
          z-index: 1;
          appearance: none;
        }

        label span {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #fe0000;
          border-radius: 80px;
          transition: 0.5s;
          box-shadow: 0 15px 25px #fe000066;
        }

        label input:checked ~ span {
          background: #05be05;
          box-shadow: 0 15px 25px #05be0566;
        }

        label span i {
          position: absolute;
          top: 5px;
          left: 8px;
          width: 20px;
          height: 20px;
          background: #fff;
          border-radius: 50%;
          transition: 0.5s;
        }

        label input:checked ~ span i {
          right: 8px;
          left: auto;
        }
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }
        ._task_ass1 {
          max-width: 700px;
          background: #fff;
          border: 1px solid #ccc;
          margin-left: auto;
          margin-right: auto;
          margin-top: 70px;
          padding: 15px;
        }
        ._task_ass2 {
          list-style: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-top: 20px;
        }
        ._task_ass3 {
          padding-right: 15px;
          padding-bottom: 15px;
        }
      `}</style>
      <div className="_task_ass1">
        <h2>Assign</h2>
        <ul className="_task_ass2">
          {allUser.map((user: any) => (
            <li className="_task_ass3" key={user._id}>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleChange(user._id)}
                  checked={user.isAssign}
                />
                <span>
                  <i></i>
                </span>
              </label>
              <span>{user.name}</span>
            </li>
          ))}
        </ul>
        <button onClick={handleUpdate}>
          {loader ? "Loading..." : "update"}
        </button>
      </div>
      <ToastContainer position="top-center" theme="colored" />
    </>
  );
};

export default IsAssign;
