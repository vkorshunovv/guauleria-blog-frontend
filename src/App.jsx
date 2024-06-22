import { useState } from "react";
import axios from "axios";
import "./App.css";
import PostList from "./components/PostList";
import AddPost from "./components/AddPost";

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  const fetchPosts = () => {
    axios
      .get("http://localhost:5005/api/posts")
      .then((response) => {
        setPosts(response.data);
        console.log("Fetching posts success");
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };

  return (
    <div>
      <h1 className="mb-5 text-5xl">Blogs</h1>
      <AddPost newPost={newPost} setNewPost={setNewPost} fetchPosts={fetchPosts}/>
      <PostList posts={posts} fetchPosts={fetchPosts}/>
    </div>
  );
}

export default App;
