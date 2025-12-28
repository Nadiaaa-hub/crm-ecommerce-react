import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersAsync } from "../../features/OrdersReducer.js";
import KpiCards from "./KpiCards.jsx";
import RecentClients from "./RecentClients.jsx";
import "../../styles/Dashboard.css";

const API_BASE = "http://localhost:5051";

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString();
}

function RecentOrders({ orders, loading }) {
  console.log("RecentOrders.orders:", orders);
  console.log("RecentOrders.loading:", loading);

  if (loading) return <div className="dash__empty">Loading…</div>;
  if (!orders?.length) return <div className="dash__empty">No orders yet</div>;

  return (
    <div className="tableWrap">
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: 140 }}>ID</th>
            <th>Date</th>
            <th style={{ textAlign: "right" }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td className="mono">{String(o.id).slice(0, 8)}</td>
              <td>{formatDate(o.date || o.createdAt)}</td>
              <td style={{ textAlign: "right" }}>
                {new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(
                  Number(o.total || 0)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default function Dashboard() {
  const dispatch = useDispatch();

  const orders = useSelector((s) => s.orders?.data ?? []);
  const ordersLoaded = useSelector((s) => Boolean(s.orders?.loaded));

  const [clientsCount, setClientsCount] = useState(null); // null = loading

  useEffect(() => {
    dispatch(getOrdersAsync());
  }, [dispatch]);

  useEffect(() => {
    fetch(`${API_BASE}/clients`)
      .then((r) => r.json())
      .then((data) => setClientsCount(Array.isArray(data) ? data.length : 0))
      .catch((e) => {
        console.error("clients fetch error", e);
        setClientsCount(0);
      });
  }, []);

  const revenue = useMemo(() => {
    return (orders || []).reduce((sum, o) => {
      const t = Number(o?.total);
      return sum + (Number.isFinite(t) ? t : 0);
    }, 0);
  }, [orders]);

  const totalOrders = orders?.length ?? 0;

  const recentOrders = useMemo(() => {
    const copy = [...(orders || [])];
    copy.sort((a, b) => {
      const da = new Date(a?.date || a?.createdAt || 0).getTime();
      const db = new Date(b?.date || b?.createdAt || 0).getTime();
      return db - da;
    });
    return copy.slice(0, 5);
  }, [orders]);

  const isOrdersLoaded = Boolean(ordersLoaded);
  const isClientsLoaded = clientsCount !== null && clientsCount !== undefined;
  const loading = !isOrdersLoaded || !isClientsLoaded;

  // ✅ логи про clientsCount/revenue/totalOrders — ТОЛЬКО тут
  console.log("Dashboard.orders:", orders);
  console.log("Dashboard.clientsCount:", clientsCount);
  console.log("Dashboard.revenue:", revenue, "Dashboard.totalOrders:", totalOrders);

  return (
    <div className="dash">
      <div className="dash__header">
        <h1 className="dash__title">Dashboard</h1>
      </div>

      <KpiCards
        revenue={loading ? 0 : revenue}
        totalOrders={loading ? 0 : totalOrders}
        totalClients={loading ? 0 : Number(clientsCount)}
      />

      <div className="dash__grid">
        <section className="dash__panel">
          <div className="dash__panelHeader">
            <h3 className="dash__panelTitle">Recent Orders</h3>
          </div>
          <RecentOrders orders={recentOrders} loading={loading} />
        </section>

        <section className="dash__panel">
          <div className="dash__panelHeader">
            <h3 className="dash__panelTitle">Recent Clients</h3>
          </div>
          <RecentClients limit={4} />
        </section>
      </div>
    </div>
  );
}
