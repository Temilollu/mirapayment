import { FaPen, FaTrashAlt } from "react-icons/fa";
import Modal from "./Modal";
import React, { useState } from "react";
import Input from "./Input";
import { toast } from "react-toastify";
const Post = ({ post, index, setData }) => {
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    title: post.title,
    body: post.body,
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: "DELETE",
      });
      setOpen(false);
      setData((prev) => prev.filter((item) => item.id !== post.id));
      setIsLoading(false);
      toast.success("Post deleted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occcured", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const postData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${post.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            ...formData,
            id: post.id,
            userId: post.userId,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const json = await res.json();
      setOpen(false);
      setData((prev) =>
        prev.map((item) => (item.id === post.id ? { ...json } : item))
      );
      setIsLoading(false);
      toast.success("Post edited successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occcured", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <div className="posts-container">
        <h4>
          {index}. {post.title}
        </h4>
        <div className="icons">
          <FaPen fontSize={14} onClick={() => setOpen(true)} />
          <FaTrashAlt fontSize={14} onClick={() => setDeleteModal(true)} />
        </div>
      </div>
      {open && (
        <Modal close={() => setOpen(false)} height="400px">
          <h3>Edit Post</h3>
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
            <button disabled={isLoading} className="edit-button" type="submit">
              {isLoading ? "Loading..." : " Edit post"}
            </button>
          </form>
        </Modal>
      )}

      {deleteModal && (
        <Modal close={() => setDeleteModal(false)} height="200px" width="400px">
          <h1 className="delete-heading">
            Are you sure you want to <br /> delete this post?
          </h1>
          <div className="delete-buttons-container">
            <button onClick={() => setDeleteModal(false)} className="cancel">
              Cancel
            </button>
            <button
              disabled={isLoading}
              className="delete"
              onClick={handleDelete}
            >
              {" "}
              {isLoading ? "Loading..." : " Delete"}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Post;
