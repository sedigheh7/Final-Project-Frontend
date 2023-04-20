import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import commentService from '../services/commentService';
function Comment(){
    const [comment, setComment] = useState();
    const {postId} = useParams()

    const getCommentByPostId = async () => {
        const fetchedComment = await commentService.getCommentByPostId(postId)
        if (fetchedComment) {
          setComment(fetchedComment);
        }
      }
      useEffect(() => {
        getCommentByPostId()
     }, []);


     return (
        <div>
            {comment ?
                <>
                <h2>Comment:</h2>
                <Card>
                    <Card.Body>{comment?.content}</Card.Body>
                </Card>

                </>
                : 
                <h1>comment not found</h1>  
        }
        </div>
     )

}
export default Comment