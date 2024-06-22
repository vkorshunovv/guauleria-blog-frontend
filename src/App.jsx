import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [post, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((response) => {
        setPosts(response.data);
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
      .post("http://localhost:5000/api/posts", newPost)
      .then((response) => {
        console.log("Post added:", response.data);
        setNewPost({ title: "", content: "" });
        fetchPosts();
      })
      .catch((error) => {
        console.log("Error adding post:", error);
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
        {posts.map((post) => {
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>;
        })}
      </ul>
    </div>
  );
}

export default App;
