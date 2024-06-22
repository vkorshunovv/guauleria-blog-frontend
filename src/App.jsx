import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  useEffect(() => {
    fetchPosts();
  }, []);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5005/api/posts", newPost)
      .then((response) => {
        console.log("Post added:", response.data);
        setNewPost({ title: "", content: "" });
        fetchPosts();
      })
      .catch((error) => {
        console.log("Error adding post:", error);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete("http://localhost:5005/api/posts")
      .then((response) => {
        console.log("Post deleted: ", response.data);
        fetchPosts();
      })
      .catch((error) => {
        console.log("Error deleting post", error);
      });
  };

  return (
    <div>
      <h1>Blogs</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title"> Title:</label>
        <input
          id="title"
          type="text"
          name="title"
          value={newPost.title}
          onChange={handleInputChange}
          required
        />
        <br />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={newPost.content}
          onChange={handleInputChange}
          required
        />
        <br />
        <button type="submit">Add Post</button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
      <br />
      <button type="button" onClick={handleDelete}>
        Delete Post
      </button>
    </div>
  );
}

export default App;
