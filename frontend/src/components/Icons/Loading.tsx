import React, { FunctionComponent } from "react"

interface LoadingProps {}

const Loading: FunctionComponent<LoadingProps> = () => {
  return (
    <svg
      style={{ margin: "auto", background: "none" }}
      width="200"
      height="200"
      display="block"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
    >
      <circle
        cx="50"
        cy="50"
        r="35"
        fill="none"
        stroke="#8860d0"
        strokeDasharray="164.93361431346415 56.97787143782138"
        strokeWidth="10"
        transform="rotate(276.608 50 50)"
      >
        <animateTransform
          attributeName="transform"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          type="rotate"
          values="0 50 50;360 50 50"
        />
      </circle>
    </svg>
  )
}

export default Loading
