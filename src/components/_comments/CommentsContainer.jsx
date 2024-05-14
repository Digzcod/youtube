import React from 'react'
import Comments from './Comments'
import CommentList from './CommentList'
import db from "../../utils/commentsDB.json" 

const CommentsContainer = () => {
  return (
    <section className='m-5 p-3'>
      <h1 className='text-[1.3rem] font-bold'>Comments:</h1>
        <CommentList data={db} />
    </section>
  )
}

export default CommentsContainer