import { useMemo } from "react";
import { useClients } from "../../context/ClientsContext.jsx";

const LAST_N_ORDERS = 10;

function toNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function dateValue(raw) {
  const t = raw ? new Date(raw).getTime() : NaN;
  return Number.isFinite(t) ? t : 0;
}

export function useDashboardData() {
  const { clients } = useClients();

  const allOrders = useMemo(() => {
    return (clients || []).flatMap((c) =>
      Array.isArray(c.orders)
        ? c.orders.map((o) => ({ ...o, clientName: c.name }))
        : []
    );
  }, [clients]);

  const totalOrders = allOrders.length;

  const revenueLastN = useMemo(() => {
    const last = [...allOrders]
      .sort((a, b) => dateValue(b.date) - dateValue(a.date) || (toNumber(b.id) - toNumber(a.id)))
      .slice(0, LAST_N_ORDERS);

    return last.reduce((sum, o) => sum + toNumber(o.sum), 0); // поле суммы: sum
  }, [allOrders]);

  const newClientsLastMonth = useMemo(() => {
    const now = Date.now();
    const days30 = 30 * 24 * 60 * 60 * 1000;

    return (clients || []).filter((c) => {
      const t = dateValue(c.registrationDate); // у тебя registrationDate
      return t && now - t <= days30;
    }).length;
  }, [clients]);

  const kpi = useMemo(
    () => [
      {
        key: "revenue",
        title: `Revenue (last ${LAST_N_ORDERS} orders)`,
        value: revenueLastN,
        type: "money",
        icon: "💰",
        hint: `Based on ${Math.min(LAST_N_ORDERS, totalOrders)} latest orders`,
      },
      {
        key: "orders",
        title: "Total Orders",
        value: totalOrders,
        type: "number",
        icon: "🧾",
        hint: "All clients",
      },
      {
        key: "clients",
        title: "New Clients (Last Month)",
        value: newClientsLastMonth,
        type: "number",
        icon: "👤",
        hint: "By registrationDate",
      },
    ],
    [revenueLastN, totalOrders, newClientsLastMonth]
  );

  return { loading: false, error: "", kpi };
}
