// const API_BASE = "http://localhost:5051";
// const [orders, setOrders] = useState([]);

// useEffect(() => {
//   fetch(`${API_BASE}/orders`)
//     .then((r) => r.json())
//     .then((data) => setOrders(Array.isArray(data) ? data : (data.orders || [])))
//     .catch((e) => console.error("orders fetch error", e));
// }, []);

// const totalOrders = orders.length;

import RecentClients from "./RecentClients.jsx";


export default function Dashboard() {
    return (
        <div style={{ padding: 24 }}>
            <h1 style={{ margin: 0, marginBottom: 16, fontSize: 32, color: "black" }}>Dashboard</h1>
            <RecentClients limit={4} />
        </div>
    );
}
