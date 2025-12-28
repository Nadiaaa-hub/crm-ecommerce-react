import "../../styles/Dashboard.css";

function formatMoney(value) {
  const num = Number(value || 0);
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "UAH", 
    maximumFractionDigits: 0,
  }).format(Number.isFinite(num) ? num : 0);
}

function IconRevenue() {
  return (
    <svg viewBox="0 0 24 24" className="kpi__svg" aria-hidden="true">
      <path
        d="M12 1.75c-2.9 0-5.25 2.35-5.25 5.25v2.5c0 .41.34.75.75.75h9c.41 0 .75-.34.75-.75V7c0-2.9-2.35-5.25-5.25-5.25Zm0 1.5c2.07 0 3.75 1.68 3.75 3.75v1.75h-7.5V7c0-2.07 1.68-3.75 3.75-3.75Z"
        fill="currentColor"
      />
      <path
        d="M6 11.5h12c.97 0 1.75.78 1.75 1.75v5c0 1.93-1.57 3.5-3.5 3.5h-8.5c-1.93 0-3.5-1.57-3.5-3.5v-5c0-.97.78-1.75 1.75-1.75Zm0 1.5a.25.25 0 0 0-.25.25v5c0 1.1.9 2 2 2h8.5c1.1 0 2-.9 2-2v-5a.25.25 0 0 0-.25-.25H6Z"
        fill="currentColor"
      />
      <path
        d="M12 14.25c.41 0 .75.34.75.75v2c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-2c0-.41.34-.75.75-.75Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconOrders() {
  return (
    <svg viewBox="0 0 24 24" className="kpi__svg" aria-hidden="true">
      <path
        d="M6.5 3.75h11c1.24 0 2.25 1.01 2.25 2.25v12c0 1.24-1.01 2.25-2.25 2.25h-11c-1.24 0-2.25-1.01-2.25-2.25V6c0-1.24 1.01-2.25 2.25-2.25Zm0 1.5c-.41 0-.75.34-.75.75v12c0 .41.34.75.75.75h11c.41 0 .75-.34.75-.75V6c0-.41-.34-.75-.75-.75h-11Z"
        fill="currentColor"
      />
      <path
        d="M8 8h8c.41 0 .75.34.75.75s-.34.75-.75.75H8A.75.75 0 0 1 8 8Zm0 4h8c.41 0 .75.34.75.75s-.34.75-.75.75H8a.75.75 0 0 1 0-1.5Zm0 4h5c.41 0 .75.34.75.75s-.34.75-.75.75H8a.75.75 0 0 1 0-1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconClients() {
  return (
    <svg viewBox="0 0 24 24" className="kpi__svg" aria-hidden="true">
      <path
        d="M12 3.75a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5Zm0 1.5a2.75 2.75 0 1 1 0 5.5 2.75 2.75 0 0 1 0-5.5Z"
        fill="currentColor"
      />
      <path
        d="M6.5 20.25c.41 0 .75-.34.75-.75 0-2.49 2.11-4.5 4.75-4.5s4.75 2.01 4.75 4.5c0 .41.34.75.75.75s.75-.34.75-.75c0-3.36-2.82-6-6.25-6s-6.25 2.64-6.25 6c0 .41.34.75.75.75Z"
        fill="currentColor"
      />
    </svg>
  );
}

function KpiCard({ variant, title, value, icon }) {
  return (
    <div className="kpi">
      <div className={`kpi__icon kpi__icon--${variant}`}>{icon}</div>
      <div className="kpi__meta">
        <div className="kpi__title">{title}</div>
        <div className="kpi__value">{value}</div>
      </div>
    </div>
  );
}

/**
 * Props:
 * - revenue: number
 * - totalOrders: number
 * - totalClients: number
 */
export default function KpiCards({ revenue, totalOrders, totalClients }) {
  return (
    <div className="kpis">
      <KpiCard
        variant="green"
        title="Revenue"
        value={formatMoney(revenue)}
        icon={<IconRevenue />}
      />
      <KpiCard
        variant="blue"
        title="Total Orders"
        value={String(totalOrders ?? 0)}
        icon={<IconOrders />}
      />
      <KpiCard
        variant="orange"
        title="Total Clients"
        value={String(totalClients ?? 0)}
        icon={<IconClients />}
      />
    </div>
  );
}






