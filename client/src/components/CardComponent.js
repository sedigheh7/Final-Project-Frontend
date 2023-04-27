import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import postService from '../services/postService';
function CardComponent({ post }) {
  let navigate = useNavigate();
  const handleClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleClickDownload = async (pPostId)=>{
    await postService.getPostById(pPostId);
    postService.createPdfById()
  } 

  return (
    <Card className='my-1'>
      <Card.Header>posted on   {new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }).format(new Date(post.createdAt))}
      </Card.Header>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Button variant="primary" onClick={() => handleClick(post.id)}>See the post</Button>
        <Button className="btn btn-danger" onClick={()=> handleClickDownload(post.id)}> Download</Button>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;