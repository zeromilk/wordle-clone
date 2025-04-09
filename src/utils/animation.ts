import { keyframes, css } from "@emotion/react";

export const shakeKeyframes = keyframes`
  10%, 90% { 
    transform: translate3d(-1px, 0, 0); 
  }
  20%, 80% { 
    transform: translate3d(2px, 0, 0); 
  }
  30%, 50%, 70% { 
    transform: translate3d(-4px, 0, 0); 
  }
  40%, 60% { 
    transform: translate3d(4px, 0, 0); 
  }
`;

export const shakeAnimation = css`
  animation: ${shakeKeyframes} 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
`;

const flipBackwordKeyframes = keyframes`
  0% {
    transform: rotateX(0deg);
  }
  50% {
    transform: rotateX(90deg);
  }
  100% {
    transform: rotateX(0deg);
  }
`;

export const flipBackwordAnimation = css`
  animation: ${flipBackwordKeyframes} 0.5s ease-in forwards;
`;
