import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import "../../styles/ClientCardPage.css";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((usr) => {
      setUser(usr);
      setLoading(false);
      if (!usr) navigate("/auth");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/auth");
  };

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;

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
