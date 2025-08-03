import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrustDashboard = () => {
  const [agents, setAgents] = useState([]);
  const [filter, setFilter] = useState('all');
  const [resetting, setResetting] = useState(false);

  const fetchStatus = async () => {
    try {
      const res = await axios.get("https://syngentik-api.onrender.com/status");
      setAgents(res.data.trust_status);
    } catch (err) {
      console.error("Failed to fetch trust status", err);
    }
  };

  const handleReset = async () => {
    setResetting(true);
    try {
      await axios.post("https://syngentik-api.onrender.com/reset");
      await fetchStatus();
    } catch (err) {
      console.error("Reset failed", err);
    } finally {
      setResetting(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredAgents = agents.filter(agent =>
    filter === 'all' || agent.tier === filter
  );

  return (
    <div style={{ padding: 40, fontFamily: 'Arial, sans-serif' }}>
      <h1>🧠 Syngentik Trust Dashboard</h1>
      <p>Live trust tiers — updated every 5 seconds</p>

      <div style={{ marginBottom: 20 }}>
        <button onClick={handleReset} disabled={resetting} style={{ marginRight: 10 }}>
          {resetting ? "Resetting..." : "Reset Trust"}
        </button>

        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">Show All</option>
          <option value="trusted">Trusted Only</option>
          <option value="suppressed">Suppressed Only</option>
        </select>
      </div>

      {filteredAgents.map((agent, i) => (
        <div key={i} style={{
          margin: '10px 0',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: 6,
          background:
            agent.tier === "trusted" ? "#d1ffd6" :
            agent.tier === "caution" ? "#fff7cc" :
            "#ffd1d1"
        }}>
          <strong>{agent.agent}</strong>  
          <span style={{ marginLeft: 10 }}>Score: {agent.score}</span>  
          <span style={{ marginLeft: 10 }}>Tier: {agent.tier}</span>
        </div>
      ))}
    </div>
  );
};

export default TrustDashboard;