import { PostItem, PostTags } from "../../components";
import { Button, CircularProgress } from "@mui/material";
import useFetchPosts from "./hooks/useFetchPosts";
import useAuthRedirect from "./../../hooks/useAuthRedirect";
import { userStatuses } from "../../constants/auth";
import { useDispatch, useSelector } from "../../redux";

const Home = (): JSX.Element => {
  const dispatch = useDispatch();
//   const {
//     post: { posts },
// } = useSelector((state) => state);
  const {posts} = useFetchPosts();
  useAuthRedirect(userStatuses.UNAUTHORIZATED, "/login");
  
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <PostTags />
      </div>

      {posts.length ? (
        <div style={{display:"grid",gridTemplateColumns:"auto auto", justifyContent:"center", gridGap:"15px"}} >{posts.map((post) => <PostItem key={post.id} post={post} />)}</div>
      ) : (
        <CircularProgress sx={{ display: "block", margin: "120px auto" }} />
      )}
    </div>
  );
};

// <Button onClick={updatePosts} variant='contained' style={{ display: 'block', margin: '0 auto', marginBottom: '15px', marginTop: '20px' }}>UPDATE FEED</Button>
export default Home;
