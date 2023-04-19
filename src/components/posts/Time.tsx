import { parseISO, formatDistanceToNow } from "date-fns";

const Time = ({ timestamp }: any) => {
  let timeAgo = "";

  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span>
      <i>{timeAgo}</i>
    </span>
  );
};
export default Time;
