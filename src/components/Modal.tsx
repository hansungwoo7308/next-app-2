import { useState } from "react";
import { Background, Box } from "@/styles/components/Modal.styled";
export default function Modal({ close, create }: any) {
  // export default function Modal({ modalRef, createPost, closeModal }: any) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const create = (e: any) => {
  //   e.preventDefault();
  //   // external
  //   createPost({ title, content });
  //   closeModal();
  //   // internal
  //   setTitle("");
  //   setContent("");
  // };
  const handleCreate = (e: any) => {
    e.preventDefault();
    create({ title, content });
    close();
  };
  return (
    <Background onClick={close}>
      <Box onClick={(e) => e.stopPropagation()}>
        <form>
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
          <div>
            <button onClick={handleCreate}>Create a post</button>
            <button onClick={close}>Close</button>
          </div>
        </form>
      </Box>
    </Background>
  );
}

{
  /* <div>
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
    </div> */
}
