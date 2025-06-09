import React, { useState } from "react";

export default function JetScaler() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("https://ai-backend-pdc2.onrender.com/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, platform, description })
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ caption: "Error generating content." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #a0d8ff, #1e3a8a)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "2rem",
      color: "#fff"
    }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>JetScaler</h1>
      <div style={{
        background: "#fff",
        color: "#000",
        padding: "1.5rem",
        borderRadius: "1rem",
        maxWidth: "600px",
        width: "100%",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
      }}>
        <div>
          <label>Video Topic</label>
          <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Scaling to $10k/mo" />
        </div>
        <div>
          <label>Platform</label>
          <input value={platform} onChange={(e) => setPlatform(e.target.value)} placeholder="e.g. YouTube" />
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional details..." />
        </div>
        <button onClick={handleGenerate} disabled={loading} style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
          {loading ? "Generating..." : "Generate Content"}
        </button>
        {result && (
          <div style={{ marginTop: "1rem" }}>
            <p><strong>Caption:</strong> {result.caption}</p>
            <p><strong>Hashtags:</strong> {result.hashtags?.join(" ")}</p>
            <p><strong>Thumbnail:</strong></p>
            <img src={result.thumbnail} alt="Thumbnail" style={{ maxWidth: "100%", borderRadius: "8px" }} />
          </div>
        )}
      </div>
    </div>
  );
}