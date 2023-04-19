// modules related to reactjs and nextjs
import { useEffect, useRef, useState } from "react";

// modules related to redux
// get the redux hooks for dispatching actions and selecting store
import { useDispatch, useSelector } from "react-redux";
// get the actions
import {
  increment,
  reset,
  incrementByAmount,
} from "../../lib/store/counterSlice";

const Counter = () => {
  // set the data
  const [amount, setAmount]: any = useState<Number>(0);

  // get the hooks
  const dispatch = useDispatch();
  const counter = useSelector((state: any): any => state.counter.count);

  return (
    <div className="counter">
      <h1>counter : {counter}</h1>
      <button onClick={() => dispatch(increment("counter/increment"))}>
        add
      </button>
      <button onClick={() => dispatch(reset())}>reset the counter</button>
      <input
        type="text"
        value={amount}
        onChange={(e: any) => setAmount(e.target.value)}
      />
      <button
        onClick={() => dispatch(incrementByAmount(Number(amount) || null))}
      >
        add by amount
      </button>
      <button onClick={() => setAmount(0)}>reset the amount</button>
    </div>
  );
};

export default Counter;
