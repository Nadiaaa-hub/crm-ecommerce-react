import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import "../../styles/ClientCardPage.css";

export default function Profile() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Welcome!</h1>
      <div style={{ marginTop: 16 }}>
        <p>
          <strong>Name:</strong> {user.displayName || "No name"}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
      <button
        className="add-btn"
        onClick={handleLogout}
        style={{ marginTop: 20 }}>
        Logout
      </button>
    </div>
  );
}
