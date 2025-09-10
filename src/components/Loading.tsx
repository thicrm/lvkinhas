import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.5s ease-in;
`;

const LoadingContent = styled.div`
  text-align: center;
  color: white;
`;

const LoadingTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: white;
  font-family: 'kenpixel', 'Press Start 2P', 'VT323', 'Share Tech Mono', 'Orbitron', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  text-shadow: 
    0 0 10px rgba(255, 255, 255, 0.6),
    0 0 20px rgba(255, 255, 255, 0.4),
    0 0 30px rgba(255, 255, 255, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const LoadingSubtitle = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 3rem;
  animation: ${pulse} 2s ease-in-out infinite;
  font-family: "Handjet", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
`;

const LoadingBar = styled.div`
  width: 300px;
  height: 4px;
  background: #333;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    width: 250px;
  }
`;

const LoadingProgress = styled.div<{ progress: number }>`
  height: 100%;
  background: linear-gradient(90deg, #fff, #ccc);
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
  box-shadow: 
    0 0 10px rgba(255, 255, 255, 0.6),
    0 0 20px rgba(255, 255, 255, 0.4);
`;

const LoadingText = styled.div`
  font-size: 1rem;
  color: #999;
  margin-top: 1rem;
`;

interface LoadingProps {
  progress: number;
  totalImages: number;
  loadedImages: number;
  subtitle?: string;
}

const Loading: React.FC<LoadingProps> = ({ progress, totalImages, loadedImages, subtitle = "Loading..." }) => {
  return (
    <LoadingContainer>
      <LoadingContent>
        <LoadingTitle className="loading-title">LVQKINHAS</LoadingTitle>
        <LoadingSubtitle className="loading-subtitle">{subtitle}</LoadingSubtitle>
        
        <LoadingBar>
          <LoadingProgress progress={progress} />
        </LoadingBar>
        
        {/* Removed the element loading text - not useful */}
      </LoadingContent>
    </LoadingContainer>
  );
};

export default Loading;
