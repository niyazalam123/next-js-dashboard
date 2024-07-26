import React from "react";

const page = ({ params }: any) => {
  const { parentcategory, childcategory } = params;
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
        <li>{childcategory}</li>
      </ul>
      <h1>child category</h1>
    </>
  );
};

export default page;
