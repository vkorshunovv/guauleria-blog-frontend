import axios from "axios";
import { useEffect } from "react";

function PostList({ posts, fetchPosts }) {
  useEffect(() => {
    fetchPosts();
  }, []);


  const handleDelete = (e, postId) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5005/api/posts/${postId}`)
      .then((response) => {
        fetchPosts();
      })
      .catch((error) => {
        console.log("Error deleting post", error);
      });
  };

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className="border-2 border-rose-500 rounded-lg m-5">
          <h3 className="text-red-800 text-3xl">{post.title}</h3>
          <p>{post.content}</p>
          <button className="bg-slate-200 mt-5 rounded-lg p-5"
            type="button"
            onClick={(e) => {
              handleDelete(e, post.id);
            }}
          >
            Delete Post
          </button>
        </li>
      ))}
    </ul>
  );
}

export default PostList;
