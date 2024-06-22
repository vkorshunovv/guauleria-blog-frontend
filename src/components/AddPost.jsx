import axios from "axios";

function AddPost({ newPost, setNewPost, fetchPosts }) {
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

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title"> Title:</label>
      <br />
      <input
        className="border border-sky-500 m-2 rounded-lg"
        id="title"
        type="text"
        name="title"
        value={newPost.title}
        onChange={handleInputChange}
        required
      />
      <br />
      <label htmlFor="content">Content:</label>
      <br />
      <textarea
        className="border border-sky-500 m-2 rounded-lg"
        id="content"
        name="content"
        value={newPost.content}
        onChange={handleInputChange}
        required
      />
      <br />
      <button type="submit" className="bg-stone-200 mt-5 rounded-lg p-5">
        Add Post
      </button>
    </form>
  );
}

export default AddPost;
