import React from "react";
import styled from "styled-components";

const LoadingInsidePage = () => {
  return (
    <StyledWrapper className="w-full h-full items-center justify-center">
      <div className="loading">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loading {
    --speed-of-animation: 0.9s;
    --gap: 8px;
    --first-color: #1e2e4e;
    --second-color: #55a44a;
    --third-color: #f6bb02;
    --fourth-color: #f6bb02;
    --fifth-color: #2196f3;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 140px; /* Increased width */
    height: 140px; /* Increased height */
    gap: var(--gap);
  }

  .loading span {
    width: 6px; /* Increased width */
    height: 80px; /* Increased height */
    background: var(--first-color);
    animation: scale var(--speed-of-animation) ease-in-out infinite;
  }

  .loading span:nth-child(2) {
    background: var(--second-color);
    animation-delay: -0.8s;
  }

  .loading span:nth-child(3) {
    background: var(--third-color);
    animation-delay: -0.7s;
  }

  .loading span:nth-child(4) {
    background: var(--fourth-color);
    animation-delay: -0.6s;
  }

  .loading span:nth-child(5) {
    background: var(--fifth-color);
    animation-delay: -0.5s;
  }

  @keyframes scale {
    0%,
    40%,
    100% {
      transform: scaleY(0.05);
    }

    20% {
      transform: scaleY(1);
    }
  }
`;

export default LoadingInsidePage;
