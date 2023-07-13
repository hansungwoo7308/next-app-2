import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// import Image from "next/image";
// import { openModal } from "lib/client/store/modalSlice";
export default function OrderList() {
  const { orders }: any = useSelector((store) => store);
  const dispatch = useDispatch();
  return (
    <Box>
      <h1>Order List</h1>
      <table>
        <thead>
          <tr>
            <td>id</td>
            <td>data</td>
            <td>total</td>
            <td>delivered</td>
            <td>action</td>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => (
            <tr key={order._id}>
              <td>
                <Link href={`/commerce/order/${order._id}`}>{order._id}</Link>
              </td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>${order.total}</td>
              {order.delivered ? (
                <td className="delivered">delivered</td>
              ) : (
                <td className="not-delivered">Not delivered</td>
              )}
              {order.paid ? <td className="paid">paid</td> : <td className="not-paid">Not paid</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}
const Box = styled.div`
  > table {
    width: 100%;
    border: 2px solid;
    * {
      padding: 0.5rem;
    }
    td {
      border: 1px solid;
    }
    thead {
      text-transform: uppercase;
    }
  }
  .delivered,
  .paid {
    color: green;
  }
  .not-delivered,
  .not-paid {
    color: red;
  }
  .order {
  }
`;
