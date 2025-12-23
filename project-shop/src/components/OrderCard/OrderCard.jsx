import { useSelector } from 'react-redux';
import '../../styles/OrderCard.css';
import { useNavigate } from 'react-router-dom';



export default function OrderCard({order}) {

    const navigate = useNavigate();


    const handleClickFull_Info = () => {
        navigate(`/orders/${order.id}`);
    }


    return (
            <>
            
                <div className='order-card' onClick={handleClickFull_Info}>
                    <h2>Order #{order.id}</h2>
                    <p>Date: {order.date}</p>
                    <div>
                        <h3>Client:</h3>
                        <h4>{order.client.name}</h4>
                    </div>


                    <h3>Total: {order.total}₴</h3>
                </div>
                
            </>

       

    )
}