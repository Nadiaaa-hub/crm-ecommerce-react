import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../../components/OrderCard/OrderCard";
import { useEffect } from "react";
import { getOrdersAsync } from "../../features/OrdersReducer";
import { useNavigate } from "react-router-dom";
import "../../styles/OrdersPage.css";


export default function OrdersPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {data: orders} = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(getOrdersAsync())
    }, [])

    const handleAddOrder = () =>{
        navigate('/newOrder')
    }

    return (
        <div>
            <h1>Client Orders</h1>
            <div><button type="button" onClick={handleAddOrder}>Add new order</button></div>
            
            {orders.map(order => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    )
}