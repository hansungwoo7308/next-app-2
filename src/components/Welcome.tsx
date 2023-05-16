import { useSelector } from "react-redux";
import {
  selectAcessToken,
  selectCurrentUser,
} from "lib/client/store/authSlice";
import Link from "next/link";

const Welcome = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectAcessToken);
  const welcome = user ? `Welcome ${user}!` : "Welcome!";
  const tokenAbbr = `${token.slice(0, 9)}...`;

  return (
    <div className="welcome">
      <h1>{welcome}</h1>
      <p>Token: {tokenAbbr}</p>
      <p>
        <Link href={"/users"}>Go to the Users List</Link>
      </p>
    </div>
  );
};

export default Welcome;
