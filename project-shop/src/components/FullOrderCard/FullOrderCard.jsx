
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteOrder, getOrdersAsync } from "../../features/OrdersReducer";
import "../../styles/FullOrderCard.css";


export default function FullOrderCard() {
    const {orderId} = useParams();
    const {data: orders, loaded} = useSelector((state) => state.orders);
    const navigate = useNavigate();
    const dispatch = useDispatch();


   

    if (!orders || orders.length === 0) return <div>Loading...</div>;
    const order = orders.find(ordr => ordr.id === orderId);

    if (!order) {
        return <div>Order not found</div>;
    };

    const backToOrders = () => {
      navigate('/orders');
    }
  
    // const handleDeleteOrder = () => {
    //   dispatch(deleteOrder(order.id));
    //   navigate('/orders');
    // }

    
    return(
        <>
        <button type="button" onClick={backToOrders}>⬅ Back</button>
      
        <div className="full-order-card" key={order.id}>
          <h2>Order #{order.id}</h2>
          <p>Date: </p>
          <p>{new Date(order.date).toLocaleString("uk-UA", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}</p>

          <div className="full-order-card-client-box">
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