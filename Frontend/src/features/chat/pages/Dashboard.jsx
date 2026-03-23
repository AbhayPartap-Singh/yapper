// src/features/chat/pages/Dashboard.jsx
import React, { useEffect } from "react";
import { useAuth } from "../../auth/hook/useAuth";

const Dashboard = () => {
  const { handleGetMe } = useAuth();

  useEffect(() => {
    handleGetMe();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
    </div>
  );
};

export default Dashboard;