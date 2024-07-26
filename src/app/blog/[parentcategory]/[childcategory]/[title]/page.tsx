import React from "react";

const page = ({ params }: any) => {
  const {parentcategory,childcategory,title} = params;
  return (
    <>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/blog">blog</a>
        </li>
        <li>
          <a href={`/blog/${parentcategory}`}>{parentcategory}</a>
        </li>
        <li>
          <a href={`/blog/${parentcategory}/${childcategory}`}>{childcategory}</a>
        </li>
        <li>{title}</li>
      </ul>
      <h1>blog title</h1>
    </>
  );
};

export default page;
