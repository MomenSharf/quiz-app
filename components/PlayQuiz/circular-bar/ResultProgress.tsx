import React from "react";
import "./style.css";
export default function ResultProgress({ progress, score }: { progress: number, score: number }) {
  const radius = 70; // radius of the circle
  const circumference = 2 * Math.PI * radius; // circumference of the circle
  const strokeOffset = circumference - (progress / 100) * circumference; // Calculate the stroke-dashoffset based on progress
  return (
    <div className="">
      <div className="skill">
        <div className="outer border-2 ">
          <div className="inner">
            <div className="flex flex-col items-center">
              <span className="text-4xl">{Math.round(score)}</span>
              <span className="text-xs">Score</span>
            </div>
          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="160px"
          height="160px"
        >
          <defs>
            <linearGradient id="GradientColor">
              <stop offset="0%" stop-color="#e91e63" />
              <stop offset="100%" stop-color="#673ab7" />
            </linearGradient>
          </defs>
          <circle
            cx="80"
            cy="80"
            r={radius}
            transform="rotate(-90 80 80)" /* Rotate circle */
            strokeLinecap="round"
            style={{
              strokeDashoffset: strokeOffset,
            }}
          />
        </svg>
      </div>
    </div>
  );
}
