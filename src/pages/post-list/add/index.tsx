import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "lib/client/store/postsSlice";
import { selectAllUsers } from "lib/client/store/usersSlice";
import { Main as PublicMain } from "@/styles/public/main.styled";
import styled from "styled-components";
// import { Main } from "@/styles/pages/post-item-create.styled";
export default function Page() {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === "idle";
  return (
    <>
      <Main>
        <section>
          <div>
            <h2>Create a New Post</h2>
            <form>
              <div>
                <label htmlFor="postTitle">Title :</label>
                <input
                  type="text"
                  id="postTitle"
                  name="postTitle"
                  value={title}
                  onChange={(e: any) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="postAuthor">Author :</label>
                <select
                  id="postAuthor"
                  value={userId}
                  onChange={(e: any) => setUserId(e.target.value)}
                >
                  <option value=""></option>
                  {users.map((user: any) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="postContent">Content :</label>
                <textarea
                  id="postContent"
                  name="postContent"
                  value={content}
                  onChange={(e: any) => setContent(e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  if (canSave) {
                    try {
                      setAddRequestStatus("pending");
                      dispatch(addNewPost({ title, body: content, userId })).unwrap();
                      // unwrap is redux-toolkit api.
                      // dispatch returns a promise.
                      // and then adds an unwrap to it.
                      // unwrap method returns a new promise that has the action payload if it is resolved.
                      // or throws the error if it is rejected.

                      setTitle("");
                      setContent("");
                      setUserId("");
                    } catch (err) {
                      console.error("Failed to save the post", err);
                    } finally {
                      setAddRequestStatus("idle");
                    }
                  }

                  // if (title && content) {
                  //   dispatch(postAdded(title, content, userId));
                  //   setTitle("");
                  //   setContent("");
                  // }
                }}
                disabled={!canSave}
              >
                Save Post
              </button>
            </form>
          </div>
        </section>
      </Main>
    </>
  );
}
const Main = styled(PublicMain)`
  > section {
    > div {
      width: 70%;
      max-width: 700px;
      height: 70vh;
      display: flex;
      flex-direction: column;
      gap: 20px;
      > form {
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        > div {
          display: flex;
          flex-direction: column;
          :nth-of-type(3) {
            height: 40%;
            textarea {
              height: 100%;
            }
          }
        }
        > button:disabled {
          cursor: not-allowed;
        }
      }
    }
  }
`;
