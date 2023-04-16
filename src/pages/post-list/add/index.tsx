import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "lib/store/postsSlice";
import { selectAllUsers } from "lib/store/userSlice";

const AddPost = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  return (
    <>
      <main className="add-post">
        <section>
          <div className="add-post-form">
            <h2>Add a New Post</h2>
            <form>
              <label htmlFor="postTitle">Title :</label>
              <input
                type="text"
                id="postTitle"
                name="postTitle"
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
              />

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

              <label htmlFor="postContent">Content :</label>
              <textarea
                id="postContent"
                name="postContent"
                value={content}
                onChange={(e: any) => setContent(e.target.value)}
              />

              <button
                type="button"
                onClick={() => {
                  if (canSave) {
                    try {
                      setAddRequestStatus("pending");
                      dispatch(
                        addNewPost({ title, body: content, userId })
                      ).unwrap();
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
      </main>
    </>
  );
};

export default AddPost;
