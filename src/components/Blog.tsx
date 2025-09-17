import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ThreeJSTitle from './ThreeJSTitle';
import { blogService, BlogPost as BlogPostType } from '../services/blogService';

const BlogContainer = styled.div`
  min-height: 100vh;
  position: relative;
  padding: 2rem;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(0, 150, 255, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(0, 200, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(0, 100, 200, 0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 1;
  }
  
  /* Retro scanlines effect */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      0deg,
        transparent,
      transparent 2px,
      rgba(0, 150, 255, 0.03) 2px,
      rgba(0, 150, 255, 0.03) 4px
      );
    pointer-events: none;
    z-index: 1;
    animation: scanlines 10s linear infinite;
  }
  
  @keyframes scanlines {
    0% { transform: translateY(0); }
    100% { transform: translateY(4px); }
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const BackgroundLayers = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
`;

const BackgroundLayer = styled.div<{ delay: number; duration: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  animation: fadeInOut ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  
  &:nth-child(1) {
    background: 
      radial-gradient(circle at 30% 20%, rgba(0, 100, 200, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(0, 150, 255, 0.2) 0%, transparent 50%);
  }
  
  &:nth-child(2) {
    background: 
      radial-gradient(circle at 80% 30%, rgba(0, 50, 150, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 20% 70%, rgba(0, 200, 255, 0.2) 0%, transparent 50%);
  }
  
  &:nth-child(3) {
    background: 
      radial-gradient(circle at 50% 50%, rgba(0, 100, 255, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 90% 10%, rgba(0, 150, 200, 0.2) 0%, transparent 50%);
  }
  
  @keyframes fadeInOut {
    0%, 100% { opacity: 0; }
    33% { opacity: 1; }
  }
`;

const ColorShiftOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(45deg, 
      rgba(0, 100, 200, 0.1) 0%, 
      transparent 25%, 
      rgba(0, 150, 255, 0.1) 50%, 
      transparent 75%, 
      rgba(0, 100, 200, 0.1) 100%
    );
  background-size: 200% 200%;
  animation: colorShift 12s ease-in-out infinite;
  pointer-events: none;
  z-index: 2;
  
  @keyframes colorShift {
    0%, 100% { 
      background-position: 0% 0%;
      filter: hue-rotate(0deg);
    }
    25% { 
      background-position: 100% 0%;
      filter: hue-rotate(30deg);
    }
    50% { 
      background-position: 100% 100%;
      filter: hue-rotate(60deg);
    }
    75% { 
      background-position: 0% 100%;
      filter: hue-rotate(90deg);
    }
  }
`;

const ThemeSwitcher = styled.div<{ $isFooterVisible: boolean }>`
  position: fixed;
  top: ${props => props.$isFooterVisible ? 'calc(100vh - 980px)' : '120px'};
  right: 200px;
  display: flex;
  flex-direction: column;
  gap: 0;
  z-index: 1001;
  padding: 0;
  transition: top 0.3s ease;
  
  @media (max-width: 768px) {
    top: ${props => props.$isFooterVisible ? 'calc(100vh - 960px)' : '100px'};
    right: 20px;
    transform: translateX(0);
  }
  
  @media (max-width: 480px) {
    right: 10px;
    top: ${props => props.$isFooterVisible ? 'calc(100vh - 960px)' : '80px'};
  }
`;

const MessageBoard = styled.div<{ $isFooterVisible: boolean }>`
  position: fixed;
  top: ${props => props.$isFooterVisible ? 'calc(100vh - 1200px)' : '120px'};
  left: 20px;
  width: 300px;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  padding: 0;
  transition: top 0.3s ease;
  
  @media (max-width: 768px) {
    top: ${props => props.$isFooterVisible ? 'calc(100vh - 1180px)' : '100px'};
    left: 15px;
    width: 250px;
  }
  
  @media (max-width: 1024px) {
    display: none; /* Hide on smaller screens to avoid clutter */
  }
`;

const MessageBoardHeader = styled.div<{ theme?: string }>`
  background: 
    var(--card-bg, rgba(0, 20, 80, 0.95)),
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 4px,
      var(--scanlines-color, rgba(0, 150, 255, 0.1)) 4px,
      var(--scanlines-color, rgba(0, 150, 255, 0.1)) 8px
    );
  border: 2px solid var(--accent-color, #00bfff);
  border-radius: 0;
  padding: 2.5rem;
  margin: 0 0 1rem 0;
  backdrop-filter: blur(5px);
  box-shadow: 
    inset 0 0 20px var(--overlay-color, rgba(0, 100, 200, 0.1));
  box-sizing: border-box;
  width: 100%;
  
  /* Remove backdrop-filter for Chrome specifically */
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    backdrop-filter: none;
  }
`;

const MessageBoardTitle = styled.h3<{ theme?: string }>`
  color: ${props => props.theme === 'white' ? 'black' : 'white'};
  font-size: 1.2rem;
  margin: 0 0 1rem 0;
  text-align: center;
  font-family: 'Bitcount Grid Single', monospace;
`;

const MessageForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const UsernameInput = styled.input<{ theme?: string }>`
  padding: 0.5rem;
  background: ${props => props.theme === 'white' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.theme === 'white' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 4px;
  color: ${props => props.theme === 'white' ? 'black' : 'white'};
  font-size: 0.9rem;
  
  &::placeholder {
    color: ${props => props.theme === 'white' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)'};
  }
  
  &:focus {
    outline: none;
    border-color: var(--accent-color, #00bfff);
  }
`;

const MessageTextarea = styled.textarea<{ theme?: string }>`
  padding: 0.5rem;
  background: ${props => props.theme === 'white' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.theme === 'white' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 4px;
  color: ${props => props.theme === 'white' ? 'black' : 'white'};
  font-size: 0.9rem;
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
  
  &::placeholder {
    color: ${props => props.theme === 'white' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)'};
  }
  
  &:focus {
    outline: none;
    border-color: var(--accent-color, #00bfff);
  }
`;

const SubmitButton = styled.button`
  padding: 0.6rem;
  background: var(--accent-color, #00bfff);
  border: none;
  border-radius: 4px;
  color: black;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--highlight-color, #0080ff);
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const MessagesList = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0;
  min-height: 0;
  
  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for Firefox */
  scrollbar-width: none;
  
  /* Smooth scrolling */
  scroll-behavior: smooth;
`;

const MessageItem = styled.div<{ theme?: string }>`
  background: 
    var(--card-bg, rgba(0, 20, 80, 0.95)),
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 4px,
      var(--scanlines-color, rgba(0, 150, 255, 0.1)) 4px,
      var(--scanlines-color, rgba(0, 150, 255, 0.1)) 8px
    );
  border: 2px solid var(--accent-color, #00bfff);
  border-radius: 0;
  padding: 1.5rem;
  backdrop-filter: blur(5px);
  box-shadow: 
    inset 0 0 20px var(--overlay-color, rgba(0, 100, 200, 0.1));
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, var(--overlay2-color), transparent);
    transition: left 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    border-color: var(--highlight-color, #0080ff);
    box-shadow: 
      inset 0 0 30px var(--overlay-color, rgba(0, 100, 200, 0.1)),
      0 0 30px var(--overlay2-color, rgba(0, 150, 255, 0.1));
  }
  
  &:hover::before {
    left: 100%;
    background: linear-gradient(90deg, transparent, var(--overlay2-color), transparent);
  }
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const MessageUsername = styled.span<{ theme?: string }>`
  color: var(--highlight-color, #0080ff);
  font-weight: 600;
  font-size: 0.9rem;
  font-family: "Turret Road", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
`;

const MessageTime = styled.span<{ theme?: string }>`
  color: ${props => props.theme === 'white' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)'};
  font-size: 0.8rem;
  font-family: "Turret Road", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
`;

const MessageContent = styled.p<{ theme?: string }>`
  color: ${props => props.theme === 'white' ? 'black' : 'white'};
  margin: 0;
  font-size: 0.9rem;
  font-family: "Turret Road", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
  line-height: 1.4;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  max-width: 100%;
`;

const ThemeButton = styled.button<{ active: boolean; themeColor: string }>`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 0;
  background: ${props => {
    if (props.themeColor === 'image') return `url(/stars.webp) center/cover`;
    if (props.themeColor === 'image2') return `url(/evangelion.webp) center/cover`;
    if (props.themeColor === 'image3') return `url(/ryu.webp) center/cover`;
    if (props.themeColor === 'image4') return `url(/Moebiushome.jpg) center/cover`;
    if (props.themeColor === 'image5') return `url(/esteban.jpeg) center/cover`;
    if (props.themeColor === '#00ff41') return '#006400'; // Darker green
    return props.themeColor;
  }};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: ${props => props.active ? '0 0 20px rgba(255, 255, 255, 0.8)' : 'none'};
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.6);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    min-width: 35px;
    min-height: 35px;
  }
  
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    min-width: 32px;
    min-height: 32px;
  }
`;

const BlogContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
`;

const BlogHeader = styled(motion.header)`
  text-align: center;
  padding-top: 5rem;
`;

const BlogTitle = styled.h1<{ theme?: string }>`
  font-size: 4rem;
  color: ${props => props.theme === 'white' ? 'black' : 'white'};
  text-shadow: ${props => props.theme === 'white' ? 
    '0 0 10px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 0, 0, 0.3)' : 
    '0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.3)'
  };
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const BlogSubtitle = styled(motion.p)<{ theme?: string }>`
  font-size: 1.3rem;
  color: ${props => props.theme === 'white' ? 'black' : 'white'};
  text-shadow: ${props => props.theme === 'white' ? '0 0 8px rgba(0, 0, 0, 0.6)' : '0 0 8px rgba(255, 255, 255, 0.6)'};
  font-family: "Turret Road", sans-serif;
  font-optical-sizing: auto;
  font-weight: 200;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
  letter-spacing: 1px;
  opacity: 0.9;
`;

// Search and Filter Section
const SearchSection = styled(motion.div)`
  margin-bottom: 3rem;
  text-align: center;
`;

const SearchInput = styled.input<{ theme?: string }>`
  width: 100%;
  max-width: 500px;
  padding: 1rem 1.5rem;
  background: ${props => props.theme === 'white' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
  border: 2px solid ${props => props.theme === 'white' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 8px;
  color: ${props => props.theme === 'white' ? 'black' : 'white'};
  font-size: 1.1rem;
  backdrop-filter: blur(10px);
  font-family: "Turret Road", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: ${props => props.theme === 'white' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)'};
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme === 'white' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
    box-shadow: ${props => props.theme === 'white' ? '0 0 20px rgba(0, 0, 0, 0.3)' : '0 0 20px rgba(255, 255, 255, 0.3)'};
    background: ${props => props.theme === 'white' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)'};
  }
`;

const FilterTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
`;

const FilterTag = styled.button<{ active: boolean; theme?: string }>`
  padding: 0.5rem 1rem;
  background: ${props => props.theme === 'white' ? 
    (props.active ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)') : 
    (props.active ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)')
  };
  border: 2px solid ${props => props.theme === 'white' ? 
    (props.active ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)') : 
    (props.active ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.3)')
  };
  border-radius: 20px;
  color: ${props => props.theme === 'white' ? 'black' : 'white'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-family: "Turret Road", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
  
  &:hover {
    background: ${props => props.theme === 'white' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
    border-color: ${props => props.theme === 'white' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)'};
    transform: translateY(-2px);
  }
`;

const BlogPostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  position: relative;
  z-index: 1;
  margin-top: 1rem;
`;

const BlogPost = styled(motion.article)<{ theme?: string }>`
  background: 
    rgba(0, 20, 80, 0.95),
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 4px,
      var(--scanlines-color) 4px,
      var(--scanlines-color) 8px
    );
  border: 2px solid var(--accent-color);
  border-radius: 0;
  padding: 2.5rem;
  backdrop-filter: ${props => props.theme === 'image' ? 'none' : 'blur(5px)'};
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 
    inset 0 0 20px var(--overlay-color),
    0 0 20px var(--overlay2-color);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, var(--overlay2-color), transparent);
    transition: left 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-4px);
    border-color: var(--highlight-color);
    box-shadow: 
      inset 0 0 30px var(--overlay-color),
      0 0 30px var(--overlay2-color),
      0 0 60px var(--overlay3-color);
  }
  
  &:hover::before {
    left: 100%;
    background: linear-gradient(90deg, transparent, var(--overlay2-color), transparent);
  }
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const PostTitle = styled.h2`
  font-size: 3.7rem;
  color: #0080ff;
  margin-bottom: 1rem;
  font-weight: 600;
  text-shadow: 0 0 8px rgba(0, 128, 255, 0.6);
  font-family: 'Bitcount Grid Single', monospace;
  line-height: 1.2;
  flex: 1;
  min-width: 300px;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    min-width: auto;
  }
`;

const PostMeta = styled.div`
  text-align: right;
  min-width: 120px;
`;

const PostDate = styled.p`
  color: #00bfff;
  margin-bottom: 0.5rem;
  opacity: 0.8;
  font-family: "Turret Road", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
  border-left: 2px solid rgba(0, 191, 255, 0.3);
  padding-left: 0.8rem;
`;

const PostReadTime = styled.p`
  color: #00bfff;
  opacity: 0.7;
  font-family: "Turret Road", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
`;

const PostContent = styled.div<{ theme?: string }>`
  color: ${props => props.theme === 'white' ? 'black' : 'white'};
  line-height: 1.8;
  margin-bottom: 2rem;
  font-family: "Turret Road", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
  
  p {
    margin-bottom: 1.2rem;
  }
`;

const PostTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 2rem;
`;

const PostTag = styled(motion.span)<{ theme?: string }>`
  background: var(--accent-color);
  color: ${props => props.theme === 'white' ? 'white' : (props.theme === 'image' || props.theme === 'image2' || props.theme === 'image3' || props.theme === 'image4' || props.theme === 'image5' ? 'black' : 'white')};
  padding: 0.25rem 0.75rem;
  border-radius: 0;
  font-size: 0.8rem;
  font-weight: 500;
  display: inline-block;
  font-family: "Turret Road", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--highlight-color);
    transform: translateY(-2px);
  }
`;

const LoadMoreButton = styled(motion.button)`
  display: block;
  margin: 3rem auto 0;
  padding: 1rem 2rem;
  background: var(--overlay-color);
  border: 2px solid var(--accent-color);
  border-radius: 8px;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: var(--overlay2-color);
    border-color: var(--highlight-color);
    transform: translateY(-2px);
    box-shadow: 0 0 20px var(--overlay2-color);
  }
`;

const NoResults = styled.div`
  text-align: center;
  color: white;
  font-size: 1.2rem;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

interface Message {
  id: number;
  username: string;
  content: string;
  timestamp: Date;
}

const Blog: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'image' | 'image2' | 'image3' | 'white' | 'image4' | 'image5'>('image');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      username: "PhotographyFan",
      content: "Love the blog! The nightlife photography tips are amazing. Keep up the great work!",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    }
  ]);
  const [newMessage, setNewMessage] = useState({ username: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const messagesListRef = React.useRef<HTMLDivElement>(null);
  const messageBoardRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Method 2: Intersection Observer to detect footer visibility
  useEffect(() => {
    const footer = document.querySelector('footer');
    const messageBoard = messageBoardRef.current;
    
    if (!footer || !messageBoard) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Footer is visible, adjust message board position
          console.log('Footer visible: top: calc(100vh - 1064px)');
          setIsFooterVisible(true);
        } else {
          // Footer not visible, return to normal position
          console.log('Footer not visible: top: 120px');
          setIsFooterVisible(false);
        }
      });
    }, {
      threshold: 0.1, // Trigger when 10% of footer is visible
      rootMargin: '0px 0px -100px 0px' // Start detecting 100px before footer
    });

    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, []); // No dependencies needed for Intersection Observer

  // Set CSS custom property for header text color based on theme
  useEffect(() => {
    if (currentTheme === 'white') {
      document.body.style.setProperty('--header-text-color', 'black');
    } else {
      document.body.style.removeProperty('--header-text-color');
    }
  }, [currentTheme]);

  // Color themes configuration
  const themes = {
    image: {
      primary: '#1a1a1a',
      secondary: '#2d2d2d',
      tertiary: '#0f0f0f',
      quaternary: '#1f1f1f',
      accent: '#ffffff',
      highlight: '#f0f0f0',
      cardBg: 'rgba(26, 26, 26, 0.95)',
      cardBorder: '#ffffff',
      cardHover: '#f0f0f0',
      overlay: 'rgba(255, 255, 255, 0.08)',
      overlay2: 'rgba(255, 255, 255, 0.12)',
      overlay3: 'rgba(255, 255, 255, 0.06)',
      scanlines: 'rgba(255, 255, 255, 0.1)',
      backgroundImage: '/stars.webp',
      pageOverlay: 'rgba(0, 0, 0, 0)',
      pageOverlay2: 'rgba(0, 0, 0, 0)',
      pageOverlay3: 'rgba(0, 0, 0, 0)'
    },
    image2: {
      primary: '#1a1a1a',
      secondary: '#2d2d2d',
      tertiary: '#0f0f0f',
      quaternary: '#1f1f1f',
      accent: '#ffffff',
      highlight: '#f0f0f0',
      cardBg: 'rgba(0, 0, 0, 0.95)',
      cardBorder: '#ffffff',
      cardHover: '#f0f0f0',
      overlay: 'rgba(255, 255, 255, 0.25)',
      overlay2: 'rgba(255, 255, 255, 0.35)',
      overlay3: 'rgba(255, 255, 255, 0.20)',
      scanlines: 'rgba(255, 255, 255, 0.1)',
      backgroundImage: '/evangelion.webp',
      pageOverlay: 'rgba(0, 0, 0, 0)',
      pageOverlay2: 'rgba(0, 0, 0, 0)',
      pageOverlay3: 'rgba(0, 0, 0, 0)',
      backgroundOverlay: 'rgba(80, 80, 80, 0.4)',
      textColor: '#ffffff',
      searchText: '#ffffff',
      headerText: '#ffffff'
    },
    image3: {
      primary: '#1a1a1a',
      secondary: '#2d2d2d',
      tertiary: '#0f0f0f',
      quaternary: '#1f1f1f',
      accent: '#ffffff',
      highlight: '#f0f0f0',
      cardBg: 'rgba(0, 0, 0, 0.95)',
      cardBorder: '#ffffff',
      cardHover: '#f0f0f0',
      overlay: 'rgba(255, 255, 255, 0.25)',
      overlay2: 'rgba(255, 255, 255, 0.35)',
      overlay3: 'rgba(255, 255, 255, 0.20)',
      scanlines: 'rgba(255, 255, 255, 0.1)',
      backgroundImage: '/ryu.webp',
      pageOverlay: 'rgba(0, 0, 0, 0)',
      pageOverlay2: 'rgba(0, 0, 0, 0)',
      pageOverlay3: 'rgba(0, 0, 0, 0)',
      backgroundOverlay: 'rgba(80, 80, 80, 0.4)',
      textColor: '#ffffff',
      searchText: '#ffffff',
      headerText: '#ffffff'
    },
    white: {
      primary: '#ffffff',
      secondary: '#f5f5f5',
      tertiary: '#e8e8e8',
      quaternary: '#f0f0f0',
      accent: '#000000',
      highlight: '#000000',
      cardBg: 'rgba(255, 255, 255, 0.95)',
      cardBorder: '#000000',
      cardHover: '#000000',
      overlay: 'rgba(0, 0, 0, 0.1)',
      overlay2: 'rgba(0, 0, 0, 0.15)',
      overlay3: 'rgba(0, 0, 0, 0.08)',
      scanlines: 'rgba(0, 0, 0, 0.1)',
      backgroundImage: '',
      pageOverlay: 'rgba(0, 0, 0, 0.05)',
      pageOverlay2: 'rgba(0, 0, 0, 0.08)',
      pageOverlay3: 'rgba(0, 0, 0, 0.03)',
      textColor: '#000000',
      searchText: '#000000',
      headerText: '#000000'
    },
    image4: {
      primary: '#1a1a1a',
      secondary: '#2d2d2d',
      tertiary: '#0f0f0f',
      quaternary: '#1f1f1f',
      accent: '#ffffff',
      highlight: '#f0f0f0',
      cardBg: 'rgba(0, 0, 0, 0.95)',
      cardBorder: '#ffffff',
      cardHover: '#f0f0f0',
      overlay: 'rgba(255, 255, 255, 0.25)',
      overlay2: 'rgba(255, 255, 255, 0.35)',
      overlay3: 'rgba(255, 255, 255, 0.20)',
      scanlines: 'rgba(255, 255, 255, 0.1)',
      backgroundImage: '/Moebiushome.jpg',
      pageOverlay: 'rgba(0, 0, 0, 0)',
      pageOverlay2: 'rgba(0, 0, 0, 0)',
      pageOverlay3: 'rgba(0, 0, 0, 0)',
      backgroundOverlay: 'rgba(80, 80, 80, 0.4)',
      textColor: '#ffffff',
      searchText: '#ffffff',
      headerText: '#ffffff'
    },
    image5: {
      primary: '#1a1a1a',
      secondary: '#2d2d2d',
      tertiary: '#0f0f0f',
      quaternary: '#1f1f1f',
      accent: '#ffffff',
      highlight: '#f0f0f0',
      cardBg: 'rgba(0, 0, 0, 0.95)',
      cardBorder: '#ffffff',
      cardHover: '#f0f0f0',
      overlay: 'rgba(255, 255, 255, 0.25)',
      overlay2: 'rgba(255, 255, 255, 0.35)',
      overlay3: 'rgba(255, 255, 255, 0.20)',
      scanlines: 'rgba(255, 255, 255, 0.1)',
      backgroundImage: '/esteban.jpeg',
      pageOverlay: 'rgba(0, 0, 0, 0)',
      pageOverlay2: 'rgba(0, 0, 0, 0)',
      pageOverlay3: 'rgba(0, 0, 0, 0)',
      backgroundOverlay: 'rgba(80, 80, 80, 0.4)',
      textColor: '#ffffff',
      searchText: '#ffffff',
      headerText: '#ffffff'
    },
    green: {
      primary: '#0a2e0a',
      secondary: '#0f1f0f',
      tertiary: '#051505',
      quaternary: '#0a2a0a',
      accent: '#00ff41',
      highlight: '#39ff14',
      cardBg: 'rgba(10, 46, 10, 0.95)',
      cardBorder: '#00ff41',
      cardHover: '#39ff14',
      overlay: 'rgba(0, 255, 65, 0.1)',
      overlay2: 'rgba(57, 255, 20, 0.1)',
      overlay3: 'rgba(0, 255, 0, 0.1)',
      scanlines: 'rgba(0, 255, 65, 0.1)',
      backgroundImage: '',
      pageOverlay: 'rgba(0, 255, 65, 0.1)',
      pageOverlay2: 'rgba(57, 255, 20, 0.1)',
      pageOverlay3: 'rgba(0, 255, 0, 0.1)',
      textColor: '#ffffff',
      searchText: '#ffffff',
      headerText: '#ffffff'
    }
  };

  const currentColors = themes[currentTheme];

  // Load blog posts from service
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    // Load posts from blog service
    const posts = blogService.getAllPosts();
    setBlogPosts(posts);
  }, []);

  // Categories for filtering - now dynamic from blog service
  const categories = blogService.getCategories();

  // Filter and search functionality
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const displayedPosts = filteredPosts.slice(0, visiblePosts);

  const loadMore = () => {
    setVisiblePosts(prev => Math.min(prev + 3, filteredPosts.length));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisiblePosts(6);
  };

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.username.trim() || !newMessage.content.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const message: Message = {
      id: Date.now(),
      username: newMessage.username.trim(),
      content: newMessage.content.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [message, ...prev]);
    setNewMessage({ username: '', content: '' });
    setIsSubmitting(false);
    
    // Auto-scroll to top when new message is added
    setTimeout(() => {
      if (messagesListRef.current) {
        messagesListRef.current.scrollTop = 0;
      }
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMessage(prev => ({ ...prev, [name]: value }));
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <BlogContainer 
      style={{
        background: currentTheme === 'image' || currentTheme === 'image2' || currentTheme === 'image3'
          ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${currentColors.backgroundImage}') repeat`
          : currentTheme === 'image4'
          ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${currentColors.backgroundImage}') repeat`
          : currentTheme === 'image5'
          ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${currentColors.backgroundImage}') repeat`
          : `linear-gradient(135deg, ${currentColors.primary} 0%, ${currentColors.secondary} 25%, ${currentColors.tertiary} 50%, ${currentColors.quaternary} 75%, ${currentColors.primary} 100%)`,
        backgroundSize: currentTheme === 'image4' ? '600px auto' : currentTheme === 'image5' ? '300px auto' : 'auto'
      }}
    >
      <BackgroundLayers>
        <BackgroundLayer 
          delay={0} 
          duration={10} 
          style={{
            background: `
              radial-gradient(circle at 30% 20%, ${currentColors.pageOverlay || currentColors.overlay} 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, ${currentColors.pageOverlay2 || currentColors.overlay2} 0%, transparent 50%)
            `
          }}
        />
        <BackgroundLayer 
          delay={5} 
          duration={15} 
          style={{
            background: `
              radial-gradient(circle at 80% 30%, ${currentColors.pageOverlay3 || currentColors.overlay3} 0%, transparent 50%),
              radial-gradient(circle at 20% 70%, ${currentColors.pageOverlay || currentColors.overlay} 0%, transparent 50%)
            `
          }}
        />
        <BackgroundLayer 
          delay={10} 
          duration={20} 
          style={{
            background: `
              radial-gradient(circle at 50% 50%, ${currentColors.pageOverlay2 || currentColors.overlay2} 0%, transparent 50%),
              radial-gradient(circle at 90% 10%, ${currentColors.pageOverlay3 || currentColors.overlay3} 0%, transparent 50%)
            `
          }}
        />
      </BackgroundLayers>
      <ColorShiftOverlay 
        style={{
          background: `linear-gradient(45deg, ${currentColors.pageOverlay || currentColors.overlay} 0%, transparent 25%, ${currentColors.pageOverlay2 || currentColors.overlay2} 50%, transparent 75%, ${currentColors.pageOverlay || currentColors.overlay} 100%)`
        }}
      />
      
      {/* Theme Switcher */}
      <ThemeSwitcher $isFooterVisible={isFooterVisible}>
        <ThemeButton 
          active={currentTheme === 'image'}
          themeColor="image"
          onClick={() => setCurrentTheme('image')}
        />
        <ThemeButton 
          active={currentTheme === 'image2'}
          themeColor="image2"
          onClick={() => setCurrentTheme('image2')}
        />
        <ThemeButton 
          active={currentTheme === 'image3'}
          themeColor="image3"
          onClick={() => setCurrentTheme('image3')}
        />
        <ThemeButton 
          active={currentTheme === 'white'}
          themeColor="#ffffff"
          onClick={() => setCurrentTheme('white')}
        />
        <ThemeButton 
          active={currentTheme === 'image4'}
          themeColor="image4"
          onClick={() => setCurrentTheme('image4')}
        />
        <ThemeButton 
          active={currentTheme === 'image5'}
          themeColor="image5"
          onClick={() => setCurrentTheme('image5')}
        />
      </ThemeSwitcher>

      {/* Message Board */}
      <MessageBoard ref={messageBoardRef} $isFooterVisible={isFooterVisible}>
        <MessageBoardHeader 
          theme={currentTheme}
          style={{
            '--card-bg': currentColors.cardBg,
            '--accent-color': currentColors.accent,
            '--overlay-color': currentColors.overlay,
            '--overlay2-color': currentColors.overlay2,
            '--scanlines-color': currentColors.scanlines,
          } as React.CSSProperties}
        >
          <MessageBoardTitle theme={currentTheme} className="message-board-title">
            Message Board
          </MessageBoardTitle>
          
          <MessageForm onSubmit={handleMessageSubmit}>
            <UsernameInput
              type="text"
              name="username"
              placeholder="Your username..."
              value={newMessage.username}
              onChange={handleInputChange}
              theme={currentTheme}
              maxLength={20}
            />
            <MessageTextarea
              name="content"
              placeholder="Leave a comment..."
              value={newMessage.content}
              onChange={handleInputChange}
              theme={currentTheme}
              maxLength={200}
            />
            <SubmitButton 
              type="submit" 
              disabled={isSubmitting || !newMessage.username.trim() || !newMessage.content.trim()}
            style={{
                '--accent-color': currentColors.accent,
                '--highlight-color': currentColors.highlight,
              } as React.CSSProperties}
            >
              {isSubmitting ? 'Posting...' : 'Post Message'}
            </SubmitButton>
          </MessageForm>
        </MessageBoardHeader>

        <MessagesList ref={messagesListRef}>
          {messages.map((message) => (
                        <MessageItem 
              key={message.id}
              theme={currentTheme}
                style={{
                '--card-bg': currentColors.cardBg,
                '--accent-color': currentColors.accent,
                '--overlay-color': currentColors.overlay,
                '--overlay2-color': currentColors.overlay2,
                '--overlay3-color': currentColors.overlay3,
                '--scanlines-color': currentColors.scanlines,
                '--highlight-color': currentColors.highlight,
              } as React.CSSProperties}
            >
              <MessageHeader>
                <MessageUsername 
                  className="message-board-text"
                  theme={currentTheme}
                  style={{
                    '--highlight-color': currentColors.highlight,
                  } as React.CSSProperties}
                >
                  {message.username}
                </MessageUsername>
                <MessageTime className="message-board-text" theme={currentTheme}>
                  {formatTime(message.timestamp)}
                </MessageTime>
              </MessageHeader>
              <MessageContent className="message-board-text" theme={currentTheme}>
                {message.content}
              </MessageContent>
            </MessageItem>
          ))}
          
                    {messages.length === 0 && (
            <MessageItem 
              theme={currentTheme}
                style={{
                '--card-bg': currentColors.cardBg,
                '--accent-color': currentColors.accent,
                '--overlay-color': currentColors.overlay,
                '--overlay2-color': currentColors.overlay2,
                '--overlay3-color': currentColors.overlay3,
                '--scanlines-color': currentColors.scanlines,
                '--highlight-color': currentColors.highlight,
              } as React.CSSProperties}
            >
              <MessageContent theme={currentTheme}>
                No messages yet. Be the first to comment!
              </MessageContent>
            </MessageItem>
          )}
        </MessagesList>
      </MessageBoard>

      <BlogContent>
        <BlogHeader
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ThreeJSTitle theme={currentTheme} />
        </BlogHeader>

        {/* Search and Filter Section */}
        <SearchSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SearchInput
            className="search-bar-text"
            type="text"
            placeholder="Search articles, tags, or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            theme={currentTheme}
          />
          
          <FilterTags>
            {categories.map((category) => (
              <FilterTag
                key={category.id}
                className="tag-text"
                active={selectedCategory === category.id}
                onClick={() => handleCategoryChange(category.id)}
                theme={currentTheme}
              >
                {category.name} ({category.count})
              </FilterTag>
            ))}
          </FilterTags>
        </SearchSection>

        {/* Blog Posts */}
        {displayedPosts.length > 0 ? (
        <BlogPostsList>
            {displayedPosts.map((post, index) => (
            <BlogPost
              key={post.id}
                theme={currentTheme}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{
                background: `${currentColors.cardBg}, repeating-linear-gradient(45deg, transparent, transparent 4px, ${currentColors.scanlines} 4px, ${currentColors.scanlines} 8px)`,
                  borderColor: currentColors.cardBorder,
                  '--highlight-color': currentColors.highlight,
                  '--accent-color': currentColors.accent,
                  '--overlay-color': currentColors.overlay,
                  '--overlay2-color': currentColors.overlay2,
                  '--overlay3-color': currentColors.overlay3,
                  '--scanlines-color': currentColors.scanlines,
                } as React.CSSProperties}
              >
                <PostHeader>
              <PostTitle className="post-title" style={{ color: currentColors.highlight, textShadow: `0 0 8px ${currentColors.highlight}40` }}>
                {post.title}
              </PostTitle>
                  <PostMeta>
              <PostDate className="post-date" style={{ color: currentColors.accent, borderLeftColor: `${currentColors.accent}40` }}>
                {post.date}
              </PostDate>
                    <PostReadTime className="post-read-time" style={{ color: currentColors.accent }}>
                      {post.readTime}
                    </PostReadTime>
                  </PostMeta>
                </PostHeader>
                
                <PostContent className="post-content" theme={currentTheme}>
                <p>{post.excerpt}</p>
              </PostContent>
                
              <PostTags>
                {post.tags.map((tag, tagIndex) => (
                  <PostTag 
                    key={tagIndex}
                    className="tag-text"
                      theme={currentTheme}
                    style={{
                        '--accent-color': currentColors.accent,
                        '--highlight-color': currentColors.highlight,
                        '--overlay-color': currentColors.overlay,
                        '--overlay2-color': currentColors.overlay2,
                      } as React.CSSProperties}
                  >
                    {tag}
                  </PostTag>
                ))}
              </PostTags>
            </BlogPost>
          ))}
        </BlogPostsList>
        ) : (
          <NoResults>
            <h3>No posts found</h3>
            <p>Try adjusting your search terms or category filter.</p>
          </NoResults>
        )}

        {/* Load More Button */}
        {visiblePosts < filteredPosts.length && (
          <LoadMoreButton
            onClick={loadMore}
            style={{
              '--accent-color': currentColors.accent,
              '--highlight-color': currentColors.highlight,
              '--overlay-color': currentColors.overlay,
              '--overlay2-color': currentColors.overlay2,
            } as React.CSSProperties}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More Posts
          </LoadMoreButton>
        )}
      </BlogContent>
    </BlogContainer>
  );
};

export default Blog;
