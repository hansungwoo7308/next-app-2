import { useDispatch } from "react-redux";
import { reactionAdded } from "lib/store/postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionButtons = ({ post }: any) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([key, value]) => {
    return (
      <button
        key={key}
        type="button"
        className="reactionButton"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: key }))
        }
      >
        {value} {post.reactions[key]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
export default ReactionButtons;
