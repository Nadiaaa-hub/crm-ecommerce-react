import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

const menu = [
  { path: "/dashboard", name: "Dashboard" },
  { path: "/products", name: "Catalog" },
  { path: "/clients", name: "Clients" },
  { path: "/orders", name: "Orders" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>

      <nav className="sidebar-nav">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }>
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
