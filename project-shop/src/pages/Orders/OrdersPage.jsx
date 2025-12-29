import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../../components/OrderCard/OrderCard";
import { useEffect, useState } from "react";
import { getOrdersAsync, setSearch } from "../../features/OrdersReducer";
import { useNavigate } from "react-router-dom";
import "../../styles/OrdersPage.css";



export default function OrdersPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: orders, loaded, search, filtered } = useSelector((state) => state.orders);
    const [input , setInput] = useState('');

    useEffect(() => {
        dispatch(getOrdersAsync())
    }, [])

    const handleAddOrder = () =>{
        navigate('/newOrder')
    }

    const handleSearch = () => {
        dispatch(setSearch(input));
    }

    const ordersToRender = search ? filtered : orders;
    return (
        <div>
            <div className="search-box">

                <div><button type="button" onClick={handleAddOrder}>Add new order</button></div>

                <div className="search-box-right">
                    <input className="search-box-search" type="text" value={input} onChange={e => setInput(e.target.value)} />
                    <button type="button" onClick={handleSearch}>Search</button>
                </div>
            </div>

            <div className="orders-page-title">

               <h1 className="orders-title" onClick={() => {
                    setInput("");           
                    dispatch(setSearch("")); 
                }}>Client Orders</h1>
                
            </div>


            
            {ordersToRender.map(order => (
                <OrderCard key={order.id} order={order} />
            ))}
            
        </div>
    )
}