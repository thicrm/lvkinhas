import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% { transform: rotateY(0deg); }
  25% { transform: rotateY(90deg); }
  50% { transform: rotateY(180deg); }
  75% { transform: rotateY(270deg); }
  100% { transform: rotateY(360deg); }
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: transparent;
  perspective: 1000px;
  margin-bottom: 5px;
`;

const Text3D = styled.div`
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffff00;
  text-shadow: 
    2px 2px 0px #000000,
    4px 4px 0px #000000,
    6px 6px 0px #000000,
    8px 8px 0px #000000,
    10px 10px 0px #000000,
    12px 12px 0px #000000,
    0 0 10px #ffff00,
    0 0 20px #ffff00,
    0 0 30px #ffff00,
    0 0 40px #ffaa00;
  transform-style: preserve-3d;
  animation: ${float} 8s linear infinite;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    animation-play-state: paused;
    transform: scale(1.1) rotateY(0deg);
    text-shadow: 
      3px 3px 0px #000000,
      6px 6px 0px #000000,
      9px 9px 0px #000000,
      12px 12px 0px #000000,
      15px 15px 0px #000000,
      18px 18px 0px #000000,
      0 0 15px #ffff00,
      0 0 20px #ffff00,
      0 0 45px #ffff00,
      0 0 60px #ffaa00;
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

interface ThreeJSTitleProps {
  theme?: string;
}

const ThreeJSTitle: React.FC<ThreeJSTitleProps> = ({ theme }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TitleContainer>
      <Text3D
        theme={theme}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        welcome to lvqkinhas's blog ;)
      </Text3D>
    </TitleContainer>
  );
};

export default ThreeJSTitle;