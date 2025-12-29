import { useDispatch} from 'react-redux';
import '../../styles/OrderCard.css';
import { useNavigate } from 'react-router-dom';




export default function OrderCard({order}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleClickFull_Info = () => {
        navigate(`/orders/${order.id}`);
    }

    // const handleDeleteOrder = (e) => {
    //     e.stopPropagation();
    //     // dispatch(deleteOrder(order.id));
    //     // dispatch(deleteOrderAsync(order.id));
    // }

    return (
            <>
            
                <div className='order-card' onClick={handleClickFull_Info}>
                    <h2>Order #{order.id}</h2>
                    <div className='order-card-date-box'>
                        <p className='order-card-date-box-p'>Date: </p>
                        <p>{new Date(order.date).toLocaleString("uk-UA", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}</p>
                    </div>
                    <div className='order-card-client-box'>
                        <p className='order-card-client-box-p'>Client:</p>
                        <p>{order.client.name}</p>
                    </div>


                    <div className='order-card-total-box'>
                        <h3>Total: {order.total}₴</h3>
                        
                    </div>
                </div>
                
            </>

       

    )
}