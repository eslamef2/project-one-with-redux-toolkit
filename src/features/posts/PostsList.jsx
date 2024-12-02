import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addPost } from "./postsSlice";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { deletePost } from "../../network/postsApis";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const PostsList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
  });
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsData.posts);
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
  });
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const handleAddPost = () => {
    // dispatch action
    // dispatch(addPost(newPost)).then(() => {
    //   setNewPost({ title: "", body: "" });
    //   toast.success("Post added successfully");
    // });
  };

  const handleDeletePost = (postId) => {
    console.log(postId);
    dispatch(deletePost(postId)).then(() => {
      toast.success("Post deleted successfully");
    });
  };

  const onSubmit = () => {
    dispatch(addPost(newPost)).then(() => {
      setNewPost({ title: "", body: "" });
      toast.success("Post added successfully");
    });
    reset();
  };

  function onerror(e) {
    // e.preventDefault()
  }

  return (
    <>
      <div className="posts-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {posts &&
                posts.map((post) => (
                  <Link to={`/post/${post.id}`} className="text-decoration-none">
                    <div className="card post-item" key={post.id}>
                      <div className="card-body">
                        <h5>
                          {post.id} - {post.title}
                        </h5>
                        <p className="card-text">{post.body}</p>
                        <div className="postControlButtons">
                          <button className="btn btn-primary">
                            <FontAwesomeIcon icon={faEdit} /> Update
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>

            <div className="col-lg-4">
              <form
                className="add-post-form"
                onSubmit={handleSubmit(onSubmit, onerror)}
              >
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Title"
                  {...register("title", {
                    required: "The title is required.",
                    pattern: {
                      value: /^[a-zA-Z0-9 ]+$/,
                      message:
                        "The title must contain only letters and numbers.",
                    },
                  })}
                  value={newPost.title}
                  onChange={(e) => {
                    setNewPost({ ...newPost, title: e.target.value });
                  }}
                />
                {errors.title && (
                  <p className="text-danger">{errors.title.message}</p>
                )}
                <textarea
                  className="form-control mb-2"
                  placeholder="Body"
                  rows="4"
                  {...register("body", {
                    required: "Text is required.",
                    minLength: {
                      value: 10,
                      message: "The text must be at least 10 characters long.",
                    },
                  })}
                  value={newPost.body}
                  onChange={(e) => {
                    setNewPost({ ...newPost, body: e.target.value });
                  }}
                />
                {errors.body && (
                  <p className="text-danger">{errors.body.message}</p>
                )}
                <button
                  className="btn btn-success"
                  onClick={handleAddPost}
                  disabled={!isValid}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default PostsList;
