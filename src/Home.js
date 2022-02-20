import React, { useEffect, useState } from "react";
import Input from "./components/Input";
import Modal from "./components/Modal";
import Post from "./components/Post";
import useFetch from "./components/useFetch";
import "./styles/home.css";
import { toast } from "react-toastify";
import loadingImg from "./MEBIB.gif";
import Chart from "./components/Chart";
const Home = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const { error, response, isLoading } = useFetch(
    "https://jsonplaceholder.typicode.com/posts/",
    {}
  );

  useEffect(() => {
    if (response) {
      setData(response?.slice(0, 10));
    }
  }, [response]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createPost();
  };

  function createPost() {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        ...formData,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        json.id = data.length + 1;
        setData((prev) => [json, ...prev]);
        setLoading(false);
        handleClose();

        toast.success("Post created successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(() => {
        setLoading(false);

        toast.error("An error occcured", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  const handleClose = () => {
    setOpen(false);
    setFormData({
      title: "",
      body: "",
    });
  };

  if (isLoading) {
    return (
      <div className="loading">
        <img src={loadingImg} alt="loading" />
      </div>
    );
  }

  if (error) {
    return <div>An error occurred while fetching the posts</div>;
  }

  return (
    <div className="container">
      <div className="heading-container">
        <h1 className="heading">All posts ({data.length})</h1>
        <button onClick={() => setOpen(true)} className="create-button">
          Create post
        </button>
      </div>

      {data.map((post, index) => (
        <Post post={post} index={index + 1} key={post.id} setData={setData} />
      ))}

      {open && (
        <Modal close={handleClose} height="400px">
          <h3>Create Post</h3>
          <form onSubmit={handleSubmit}>
            <Input
              name="title"
              handleChange={handleChange}
              value={formData.title}
              placeholder="Enter title here"
              label="Title"
              type="text"
            />
            <Input
              name="body"
              handleChange={handleChange}
              value={formData.body}
              placeholder="Enter body here"
              label="Body"
              type="textarea"
            />
            <button disabled={loading} className="edit-button" type="submit">
              {loading ? "Loading..." : " Create post"}
            </button>
          </form>
        </Modal>
      )}
      <div className="chart-container">
        <Chart />
      </div>
    </div>
  );
};

export default Home;
