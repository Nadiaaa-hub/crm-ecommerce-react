import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import "../../styles/ClientCardPage.css";

export default function Profile() {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading || !user) return;
  <div style={{ padding: 20 }}>Loading...</div>;

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Welcome, {user.displayName || user.email}</h1>
      <button className="add-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
