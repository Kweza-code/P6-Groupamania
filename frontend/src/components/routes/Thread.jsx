import React, { useEffect, useState } from "react";
import { getPosts } from "../routes/post.actions";

const Thread = () => {
  useEffect(() => {
    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);
    useEffect(() => {
      if (loadPost) {
        dispatch(getPosts());
      }
    });
  });
  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return <li>{post}</li>;
          })}
      </ul>
    </div>
  );
};

export default Thread;
