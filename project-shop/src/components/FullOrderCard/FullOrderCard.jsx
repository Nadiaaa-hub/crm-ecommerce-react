import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrdersAsync } from "../../features/OrdersReducer";

export default function FullOrderCard() {
  const { orderId } = useParams();
  const { data: orders, loaded } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  if (!orders || orders.length === 0) return <div>Loading...</div>;
  const order = orders.find((ordr) => ordr.id === orderId);

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <>
      <div key={order.id}>
        <h2>Order #{order.id}</h2>
        <p>Date: {order.date}</p>

        <div>
          <h3>Client:</h3>
          <h4>{order.client?.name}</h4>
          <p>{order.client?.phone}</p>
          <p>{order.client?.postOffice}</p>
          <p>{order.client?.email}</p>
        </div>

        <div>
          <h3>Items:</h3>
          {order.items?.map((item) => (
            <div className="item-sec" key={item.id}>
              <p>Title: {item.title}</p>
              <p>Price: {item.price} ₴</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>

        <h3>Total: {order.total} ₴</h3>
      </div>
    </>
  );
}
