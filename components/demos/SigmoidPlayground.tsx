"use client";

import { useId, useState } from "react";

const W = 560;
const H = 220;
const X_RANGE = 6; // x from -6 to 6

/**
 * Example of an interactive demo inside a post: a single neuron
 * σ(w·x + b), with sliders for the weight and the bias.
 */
export function SigmoidPlayground() {
  const [w, setW] = useState(1);
  const [b, setB] = useState(0);
  const id = useId();

  const toX = (x: number) => ((x + X_RANGE) / (2 * X_RANGE)) * W;
  const toY = (y: number) => H - 12 - y * (H - 24);

  let d = "";
  for (let i = 0; i <= 200; i++) {
    const x = -X_RANGE + (i / 200) * 2 * X_RANGE;
    const y = 1 / (1 + Math.exp(-(w * x + b)));
    d += `${i === 0 ? "M" : "L"}${toX(x).toFixed(1)} ${toY(y).toFixed(1)} `;
  }

  return (
    <div className="demo">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Sigmoid curve with w = ${w}, b = ${b}`}>
        <line x1={0} x2={W} y1={toY(0.5)} y2={toY(0.5)} className="demo-grid" />
        <line x1={toX(0)} x2={toX(0)} y1={0} y2={H} className="demo-grid" />
        <path d={d} className="demo-curve" />
      </svg>
      <div className="demo-controls">
        <label htmlFor={`${id}-w`}>
          weight <span>w = {w.toFixed(1)}</span>
        </label>
        <input id={`${id}-w`} type="range" min={-5} max={5} step={0.1} value={w} onChange={(e) => setW(+e.target.value)} />
        <label htmlFor={`${id}-b`}>
          bias <span>b = {b.toFixed(1)}</span>
        </label>
        <input id={`${id}-b`} type="range" min={-5} max={5} step={0.1} value={b} onChange={(e) => setB(+e.target.value)} />
      </div>
    </div>
  );
}
