"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const SaveNotesInDb = () => {
  const [value, setValue] = useState("");
  const [name, setName] = useState("");

  const modules = {
    toolbar: [
      [
        { header: "1" },
        { header: "2" },
        { header: "3" },
        { header: "4" },
        { header: "5" },
        { header: "6" },
        { font: [] },
      ],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const handleChange = (html: string) => {
    setValue(html);
  };
  return (
    <>
      <style jsx>{`
        ._parent1 {
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
      <div className="_parent1">
        <h1 className="_parent2">Save Notes</h1>
        <form className="_parent3">
          <label htmlFor="_one1">Enter Name</label>
          <input
            type="text"
            placeholder="Enter Your Name..."
            required
            onChange={(e: any) => setName(e.target.value)}
          />
          <h3 className="_parent4">Enter Html</h3>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={handleChange}
            modules={modules}
            formats={formats}
          />
          <button className="_parent5">Upload</button>
        </form>
      </div>
    </>
  );
};

export default SaveNotesInDb;
