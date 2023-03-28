import { useRef, useState } from "react";

const Modal = ({ modalRef, createPost, closeModal, getPosts }) => {
  const titleRef = useRef();
  const contentRef = useRef();

  // inputs
  // const [title, setTitle] = useState();
  // const [content, setContent] = useState();

  const create = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const content = contentRef.current.value;
    createPost({ title, content });
    closeModal();
    getPosts();
  };

  return (
    <div className="modal" ref={modalRef}>
      <form>
        <div>
          <input
            type="text"
            name="title"
            id="title"
            ref={titleRef}
            placeholder="Title"
          />
          <div></div>
          <textarea
            name="content"
            id="content"
            cols="30"
            rows="10"
            ref={contentRef}
            placeholder="Content"
          ></textarea>
        </div>
        <button onClick={create}>Create a post</button>
      </form>
    </div>
  );
};

export default Modal;
