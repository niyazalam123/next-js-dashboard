import React from 'react'

const page = ({params}:any) => {
    const { parentcategory} = params;
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
            {parentcategory}
        </li>
      </ul>
    <h1>blog parent category</h1>
    </>
  )
}

export default page