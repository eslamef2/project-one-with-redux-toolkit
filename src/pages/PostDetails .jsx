import { useParams} from "react-router-dom";

function PostDetails() {
  const {id} = useParams()
  return (
      <div>
        <h1>Post Details</h1>
        <p>Post ID: {id}</p>
      </div>
  )
}

export default PostDetails;
