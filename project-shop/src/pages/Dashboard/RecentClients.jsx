import React, { useEffect, useMemo, useState } from "react";
import "../../styles/RecentClients.css";

const API_BASE = "http://localhost:5051";

export default function RecentClients({ limit = 4 }) {
    const [clients, setClients] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${API_BASE}/clients`)
            .then((r) => r.json())
            .then((data) => setClients(Array.isArray(data) ? data : []))
            .catch((e) => {
                console.error(e);
                setError("Failed to load clients");
            });
    }, []);

    const recent = useMemo(() => {
        return [...clients]
            .sort((a, b) => (Number(b.id) || 0) - (Number(a.id) || 0))
            .slice(0, limit);
    }, [clients, limit]);

    return (
        <div className="recentClients">
            <div className="recentClients__header">
                <div className="recentClients__title">Recent Clients</div>
                <div className="recentClients__subtitle">Total: {clients.length}</div>
            </div>

            {error ? (
                <div className="recentClients__empty">{error}</div>
            ) : recent.length === 0 ? (
                <div className="recentClients__empty">No clients yet</div>
            ) : (
                <div className="recentClients__list">
                    {recent.map((c) => {
                        const name =
                            c.name ||
                            c.fullName ||
                            [c.firstName, c.lastName].filter(Boolean).join(" ") ||
                            "Unnamed client";

                        const extra =
                            c.email || c.phone || (c.orders ? `Orders: ${c.orders.length}` : "");

                        return (
                            <div className="clientRow" key={c.id ?? name}>
                                <div className="clientRow__left">
                                    <div className="clientRow__name">{name}</div>
                                    <div className="clientRow__meta">
                                        <span className="clientRow__id">#{c.id ?? "—"}</span>
                                        {extra ? <span className="clientRow__dot">•</span> : null}
                                        {extra ? <span className="clientRow__extra">{extra}</span> : null}
                                    </div>
                                </div>

                                <div className="clientRow__right">
                                    <div className="clientRow__badge">new</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
