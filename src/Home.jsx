import React from "react";
import "./home.css";

const Home = () => {
  return (
    <div>
      <h1>🧠 Syngentik OS ⚡️</h1>
      <p>
        A live agentic operating system that learns trust from execution<br />
        and optimizes workflows in real time.<br /><br />
        Recursive. Adaptive. Truth-aligned.
      </p>

      <a className="cta" href="/">
        Launch the Live Trust Dashboard
      </a>

      <div className="footer">
        Built by <a href="mailto:erik@syngentik.com">erik@syngentik.com</a>
      </div>
    </div>
  );
};

export default Home;