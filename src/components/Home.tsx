import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/pit-below-full.png') center/cover;
  opacity: 1;
  z-index: 1;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 4;
  max-width: 800px;
  padding: 0 2rem;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 5.5rem;
  font-family: 'Bitcount Grid Single', monospace;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 
    0 0 8px rgba(255, 255, 255, 0.6), 
    0 0 16px rgba(255, 255, 255, 0.4), 
    0 0 24px rgba(255, 255, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  animation: pulseGlow 3s ease-in-out infinite alternate;
  transform-origin: center;
  will-change: transform, text-shadow;
  
  &:hover {
    transform: scale(1.03) !important;
  }
  
  @keyframes pulseGlow {
    0% {
      text-shadow: 
        0 0 8px rgba(255, 255, 255, 0.6), 
        0 0 16px rgba(255, 255, 255, 0.4), 
        0 0 24px rgba(255, 255, 255, 0.3);
    }
    100% {
      text-shadow: 
        0 0 12px rgba(255, 255, 255, 0.7), 
        0 0 20px rgba(255, 255, 255, 0.5), 
        0 0 28px rgba(255, 255, 255, 0.4);
    }
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 0.8rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 1;
  color: white;
  text-shadow: 
    0 0 4px rgba(255, 255, 255, 0.4), 
    0 0 8px rgba(255, 255, 255, 0.2);
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.2));
  transition: all 0.3s ease;
  cursor: pointer;
  font-family: "Turret Road", sans-serif;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
  -webkit-text-stroke: 0.5px rgba(255, 255, 255, 0.3);
  text-stroke: 0.5px rgba(255, 255, 255, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
`;

const InteractiveWord = styled.span<{ wordIndex: number }>`
  display: inline-block;
  margin: 0 0.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.1);
    color: white;
    text-shadow: 
      0 0 6px rgba(255, 255, 255, 0.5), 
      0 0 12px rgba(255, 255, 255, 0.3),
      0 0 18px rgba(255, 255, 255, 0.2);
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
  }
  
  &:nth-child(2):hover {
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff8000,
      #ffff00,
      #80ff00,
      #00ff00,
      #00ff80,
      #00ffff,
      #0080ff,
      #0000ff,
      #8000ff,
      #ff00ff,
      #ff0080
    );
    background-size: 400% 400%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: rainbowFlow 2s ease-in-out infinite;
    text-shadow: 
      0 0 8px rgba(255, 255, 255, 0.6), 
      0 0 16px rgba(255, 255, 255, 0.4),
      0 0 24px rgba(255, 255, 255, 0.3);
    filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.5));
  }
  
  &:first-child {
    margin-left: 0;
  }
  
  &:last-child {
    margin-right: 0;
  }
  
  @keyframes rainbowFlow {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }
`;

const HeroButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2.5rem;
  background: transparent;
  color: white;
  border: 2px solid white;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1.1rem;
  font-family: "Turret Road", sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  will-change: transform, box-shadow, background;
  
  &:hover {
    background: 
      linear-gradient(45deg, #e6f3ff, #f0f8ff),
      url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E");
    color: #333;
    border-color: #e6f3ff;
    transform: translateY(-5px) scale(1.05);
    text-shadow: 0 0 20px rgba(51, 51, 51, 0.8);
    box-shadow: 
      0 0 30px rgba(230, 243, 255, 0.8),
      0 0 50px rgba(230, 243, 255, 0.6),
      0 0 70px rgba(230, 243, 255, 0.4);
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem 2rem;
    font-size: 1rem;
    width: 100%;
    max-width: 280px;
    text-align: center;
  }
`;

const FeaturedSection = styled.section`
  padding: 5rem 0;
  background: url('https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/000029370021-3.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(135deg, rgba(10, 10, 10, 0.6) 0%, rgba(26, 26, 26, 0.5) 50%, rgba(15, 15, 15, 0.6) 100%),
      url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: 3rem;
  color: white;
  font-size: 4rem;
  font-weight: 700;
  font-family: 'Bitcount Grid Single', monospace;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 
    0 0 10px rgba(255, 255, 255, 0.6),
    0 0 20px rgba(255, 255, 255, 0.4);
  position: relative;
  cursor: pointer;
  transition: all 0.4s ease;
  transform-origin: center;
  filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.2));
  
  &:hover {
    transform: scale(1.03) !important;
    filter: drop-shadow(0 0 40px rgba(255, 255, 255, 0.4));
  }
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 1.5rem;
  }
`;

const FeaturedCard = styled(motion.div)`
  background: rgba(20, 20, 20, 0.8);
  border: 2px solid rgba(135, 206, 235, 0.3);
  border-radius: 15px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(135, 206, 235, 0.05), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(135, 206, 235, 0.8);
    box-shadow: 
      0 0 30px rgba(135, 206, 235, 0.3),
      0 0 60px rgba(135, 206, 235, 0.2);
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const CardImage = styled.div`
  height: 250px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #87ceeb;
  font-size: 3rem;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E");
    opacity: 0.3;
  }
`;

const CardContent = styled.div`
  padding: 2rem;
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 0 8px rgba(135, 206, 235, 0.4);
`;

const CardText = styled.p`
  color: #b0b0b0;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-size: 1rem;
`;

const CardButton = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: #87ceeb;
  border: 2px solid rgba(135, 206, 235, 0.5);
  border-radius: 6px;
  font-weight: 600;
  font-family: "Turret Road", sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(135, 206, 235, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    background: rgba(135, 206, 235, 0.1);
    color: white;
    border-color: #87ceeb;
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(135, 206, 235, 0.4);
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const MediaGallery = styled.div`
  position: relative;
  margin-top: 3rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const NavigationButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border-style: solid;
    animation: pulseGlow 2s ease-in-out infinite;
  }
  
  &:nth-child(1)::before {
    border-width: 8px 12px 8px 0;
    border-color: transparent white transparent transparent;
  }
  
  &:nth-child(3)::before {
    border-width: 8px 0 8px 12px;
    border-color: transparent transparent transparent white;
  }
  
  &:hover {
    transform: scale(1.1);
    
    &::before {
      animation: pulseGlow 1s ease-in-out infinite;
    }
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    
    &::before {
      animation: none;
    }
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
    
    &::before {
      border-width: 6px 9px 6px 0;
    }
    
    &:nth-child(3)::before {
      border-width: 6px 0 6px 9px;
    }
  }
  
  @keyframes pulseGlow {
    0% {
      filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.8));
    }
    50% {
      filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.6));
    }
    100% {
      filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.8));
    }
  }
`;

const MediaContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  position: relative;
  
  @media (max-width: 768px) {
    min-height: 300px;
  }
`;

const MediaItem = styled(motion.div)`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.4s ease;
  
  img, video {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
    transition: all 0.4s ease;
  }
  
  &:hover {
    transform: scale(1.02);
    
    img, video {
      box-shadow: 
        0 0 30px rgba(255, 255, 255, 0.5),
        0 0 60px rgba(255, 255, 255, 0.3),
        0 0 90px rgba(255, 255, 255, 0.2);
    }
  }
`;

const MediaCounter = styled.div`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  color: #87ceeb;
  font-size: 0.9rem;
  font-weight: 500;
  text-shadow: 0 0 8px rgba(135, 206, 235, 0.4);
`;

const Home: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Sample media items from your R2 bucket - you can add more URLs here
  const mediaItems = [
    {
      url: 'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/mccy.mp4',
      type: 'video',
      title: 'Portrait Photography'
    },
    {
      url: 'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/000029370022.jpg',
      type: 'image',
      title: 'Real Estate Photography'
    },
    {
      url: 'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/DADAFINAL12-1-10.jpg',
      type: 'image',
      title: 'Wedding Photography'
    }
  ];
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  };
  
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };
  
  return (
    <>
      <HeroSection className="homepage">
        <HeroBackground />
        <HeroContent>
          <HeroTitle
            className="hero-title"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.4, 0, 0.2, 1],
              scale: { duration: 1.0, ease: "easeOut" }
            }}
          >
            LUCAS CAVALLINI
          </HeroTitle>
          <HeroSubtitle
            className="hero-subtitle"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.0, 
              delay: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <InteractiveWord wordIndex={0}>Texture.</InteractiveWord>
            <InteractiveWord wordIndex={1}>Color.</InteractiveWord>
            <InteractiveWord wordIndex={2}>Movement.</InteractiveWord>
          </HeroSubtitle>
          <HeroButtons
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.0, 
              delay: 0.6,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <HeroButton className="button-text" to="/portfolio">View Portfolio</HeroButton>
            <HeroButton className="button-text" to="/contact">Get in Touch</HeroButton>
          </HeroButtons>
        </HeroContent>
      </HeroSection>

      <FeaturedSection>
        <Container>
          <SectionTitle
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            What I Do
          </SectionTitle>
          
          <MediaGallery>
            <NavigationButton
              onClick={() => handlePrevious()}
              disabled={currentIndex === 0}
            >
            </NavigationButton>
            
            <MediaContainer>
              <MediaItem
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {mediaItems[currentIndex]?.type === 'video' ? (
                  <video
                    src={mediaItems[currentIndex]?.url}
                    autoPlay
                    muted
                    loop
                    preload="auto"
                    playsInline
                    controls={false}
                    style={{ width: '100%', height: 'auto' }}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={mediaItems[currentIndex]?.url}
                    alt={mediaItems[currentIndex]?.title || 'Photography work'}
                  />
                )}
              </MediaItem>
            </MediaContainer>
            
            <NavigationButton
              onClick={() => handleNext()}
              disabled={currentIndex === mediaItems.length - 1}
            >
            </NavigationButton>
          </MediaGallery>
        </Container>
      </FeaturedSection>
    </>
  );
};

export default Home;
