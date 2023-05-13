import { useState } from "react";
import { Background, Box } from "@/styles/components/Modal.styled";
export default function Modal({ closeModal, createItem }: any) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <Background onClick={closeModal}>
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
            <button
              onClick={(e: any) => {
                e.preventDefault();
                createItem({ title, content });
                closeModal();
              }}
            >
              Create a post
            </button>
            <button onClick={closeModal}>Close</button>
          </div>
        </form>
      </Box>
    </Background>
  );
}
