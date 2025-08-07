"use client";

import { useState } from "react";

export default function Home() {
  const [tempo, setTempo] = useState(""); // formato HH:MM:SS
  const [distancia, setDistancia] = useState("");
  const [pace, setPace] = useState("");
  const [velocidade, setVelocidade] = useState("");

  function tempoParaSegundos(tempo: string): number {
    const [h, m, s] = tempo.split(":").map(Number);
    return h * 3600 + m * 60 + s;
  }

  function formatarSegundosParaPace(segundosPace: number): string {
    const minutos = Math.floor(segundosPace / 60);
    const segundos = Math.round(segundosPace % 60);
    return `${minutos}:${segundos.toString().padStart(2, "0")} min/km`;
  }

  function calcular() {
    const totalSegundos = tempoParaSegundos(tempo);
    const km = parseFloat(distancia);
    if (!km || km === 0 || isNaN(totalSegundos) || totalSegundos === 0) {
      setPace("");
      setVelocidade("");
      return;
    }

    const paceEmSegundos = totalSegundos / km;
    const velocidadeEmKmh = (km / (totalSegundos / 3600)).toFixed(2);

    setPace(formatarSegundosParaPace(paceEmSegundos));
    setVelocidade(`${velocidadeEmKmh} km/h`);
  }

  const containerStyle = {
    height: "100dvh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    padding: "20px",
    overflow: "hidden",
  };

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "32px",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "380px",
    textAlign: "center" as const,
    maxHeight: "90vh",
    overflow: "auto",
  };

  const titleStyle = {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: "24px",
    background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const inputGroupStyle = {
    marginBottom: "20px",
    textAlign: "left" as const,
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#4a5568",
    marginBottom: "6px",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    fontSize: "1rem",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    outline: "none",
    transition: "all 0.3s ease",
    background: "#f8fafc",
    boxSizing: "border-box" as const,
    color: "black",
  };

  const inputFocusStyle = {
    borderColor: "#34495e",
    background: "#ffffff",
    transform: "translateY(-1px)",
    boxShadow: "0 6px 20px rgba(52, 73, 94, 0.15)",
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px 28px",
    fontSize: "1rem",
    fontWeight: "600",
    color: "white",
    background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "6px",
    marginBottom: "20px",
  };

  const buttonHoverStyle = {
    transform: "translateY(-1px)",
    boxShadow: "0 8px 25px rgba(52, 73, 94, 0.3)",
  };

  const resultsStyle = {
    background: "rgba(52, 73, 94, 0.08)",
    borderRadius: "12px",
    padding: "18px",
    marginTop: "16px",
  };

  const resultItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid rgba(52, 73, 94, 0.15)",
    fontSize: "1rem",
  };

  const resultLabelStyle = {
    fontWeight: "600",
    color: "#4a5568",
  };

  const resultValueStyle = {
    fontWeight: "700",
    color: "#2c3e50",
    fontSize: "1.1rem",
  };

  return (
    <main style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Calculadora de Pace</h1>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Tempo (HH:MM:SS)</label>
          <input
            type="text"
            value={tempo}
            onChange={(e) => setTempo(e.target.value)}
            placeholder="00:50:00"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Distância (km)</label>
          <input
            type="number"
            step="0.01"
            value={distancia}
            onChange={(e) => setDistancia(e.target.value)}
            placeholder="10"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
        </div>

        <button
          onClick={calcular}
          style={buttonStyle}
          onMouseEnter={(e) =>
            Object.assign(
              (e.target as HTMLButtonElement).style,
              buttonHoverStyle
            )
          }
          onMouseLeave={(e) =>
            Object.assign((e.target as HTMLButtonElement).style, buttonStyle)
          }
        >
          Calcular
        </button>

        {pace && velocidade && (
          <div style={resultsStyle}>
            <div style={resultItemStyle}>
              <span style={resultLabelStyle}>Pace:</span>
              <span style={resultValueStyle}>{pace || "—"}</span>
            </div>
            <div style={{ ...resultItemStyle, borderBottom: "none" }}>
              <span style={resultLabelStyle}>Velocidade:</span>
              <span style={resultValueStyle}>{velocidade || "—"}</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
