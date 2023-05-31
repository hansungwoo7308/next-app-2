import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, selectPostById, updatePost } from "lib/client/store/postsSlice";
import { selectAllUsers } from "lib/client/store/usersSlice";
import { useRouter } from "next/router";
// import { Box } from "@/styles/components/post/item/PostItemEditForm.styled";
import styled from "styled-components";
// import { selectPostById, updatePost, deletePost } from './postsSlice'
// import { useParams, useNavigate } from 'react-router-dom'
let renderCount = 0;
export default function PostItemEditForm() {
  const router = useRouter();
  const { id } = router.query;
  // const { postId } = useParams()
  // const navigate = useNavigate()

  // get the state in the store
  const post = useSelector((state) => selectPostById(state, Number(id)));
  const users = useSelector(selectAllUsers);
  // set the local state from store
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");
  const dispatch = useDispatch();
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }
  // set the change handler
  const onTitleChanged = (e: any) => setTitle(e.target.value);
  const onContentChanged = (e: any) => setContent(e.target.value);
  const onAuthorChanged = (e: any) => setUserId(Number(e.target.value));
  // set the boolean variable
  const canSave = [title, content, userId].every(Boolean) && requestStatus === "idle";
  // set the save handler
  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        router.push(`/post-list/${id}`);
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };
  // set the elements
  const usersOptions = users.map((user: any) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  // set the delete handler
  const onDeletePostClicked = () => {
    try {
      setRequestStatus("pending");
      dispatch(deletePost({ id: post.id })).unwrap();
      // unwrap : 에러가 생기면 catch문으로 보낼 수 있다.
      // 프라미스의 결과를 추출하는 역할은 한다. (response.data)

      setTitle("");
      setContent("");
      setUserId("");
      router.push("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    } finally {
      setRequestStatus("idle");
    }
  };

  renderCount++;

  return (
    <Box>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged} />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
        <button className="deleteButton" type="button" onClick={onDeletePostClicked}>
          Delete Post
        </button>
      </form>
    </Box>
  );
}
const Box = styled.div`
  > form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 20px;
    > input,
    select,
    textarea {
      margin-bottom: 10px;
    }
    > textarea {
      height: 100px;
    }
    > button {
      height: 40px;
      margin-top: 10px;
    }
  }
`;
