import { useDispatch } from "react-redux";
import { reactionAdded } from "lib/store/postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

const Reactions = ({ post }: any) => {
  const dispatch = useDispatch();

  const reactions = Object.entries(reactionEmoji).map(([key, value]) => {
    return (
      <button
        key={key}
        type="button"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: key }))
        }
      >
        {value} {post.reactions[key]}
      </button>
    );
  });

  return <div>{reactions}</div>;
};
export default Reactions;
