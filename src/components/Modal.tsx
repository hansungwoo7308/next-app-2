import { useState } from "react";
import { Box } from "@/styles/components/Modal.styled";
export default function Modal({ modalRef, createPost, closeModal }: any) {
  // internal
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const create = (e: any) => {
    e.preventDefault();
    // external
    createPost({ title, content });
    closeModal();
    // internal
    setTitle("");
    setContent("");
  };
  return (
    <Box ref={modalRef}>
      <form onSubmit={create}>
        <div>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
          />
          <textarea
            name="content"
            id="content"
            cols={30}
            rows={10}
            placeholder="Content"
            value={content}
            onChange={(e: any) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button>Create a post</button>
      </form>
    </Box>
  );
}
