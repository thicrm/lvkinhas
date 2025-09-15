import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Loading from './Loading';

const AboutSection = styled.section`
  padding: 8rem 0 0 0;
  background: #000000;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 6rem 0 0 0;
  }
  
  @media (max-width: 480px) {
    padding: 5rem 0 0 0;
  }
`;

const AboutBackgroundVideo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
  }
  
  /* Removed the gray overlay that was causing the ugly background */
`;

const SoundToggleButton = styled.button`
  position: fixed;
  top: 100px;
  right: 30px;
  z-index: 1000;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.8);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
  
  &:hover {
    transform: scale(1.1);
    border-color: rgba(255, 255, 255, 1);
    box-shadow: 
      0 0 20px rgba(255, 255, 255, 0.6),
      0 0 40px rgba(255, 255, 255, 0.4),
      0 0 60px rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 768px) {
    top: 4rem; /* Moved down to avoid overlap with mobile menu button */
    right: 1rem;
    width: 45px;
    height: 45px;
    font-size: 18px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 5rem 2rem;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    padding: 0 2rem 4rem 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 2rem 3rem 2rem;
  }
`;

const SectionTitle = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
  color: white;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  font-family: 'kenpixel', 'Press Start 2P', 'VT323', 'Share Tech Mono', 'Orbitron', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  
  &::before {
    content: '🧙‍♀️🔮';
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.5rem;
    opacity: 0.7;
    transition: all 0.3s ease;
  }
  
  &:hover {
    transform: scale(1.05);
    text-shadow: 
      0 0 10px rgba(255, 255, 255, 0.8),
      0 0 20px rgba(255, 255, 255, 0.6);
    
    &::before {
      transform: translateX(-50%) scale(1.1);
      filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
    }
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  color: white;
  margin-bottom: 4rem;
  font-size: 1.2rem;
  font-family: "Turret Road", sans-serif;
  font-optical-sizing: auto;
  font-weight: 200;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    gap: 2rem;
  }
  
  @media (max-width: 480px) {
    gap: 1.5rem;
  }
`;

const PhotoAndSkills = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
  min-height: 500px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    min-height: auto;
  }
`;

const AboutImage = styled.div`
  height: auto;
  width: 100%;
  max-width: 400px;
  border-radius: 0;
  display: block;
  box-shadow: none;
  cursor: pointer;
  padding: 10px;
  margin: 0 auto;
  
  img {
    width: 100%;
    height: auto;
    display: block;
    transition: all 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.02);
    box-shadow: 
      0 0 30px rgba(139, 0, 0, 0.6),
      0 0 60px rgba(220, 20, 60, 0.4),
      0 0 90px rgba(255, 69, 0, 0.3);
  }
`;

const AboutContent = styled.div``;

const AboutText = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: white;
  margin-bottom: 2rem;
  position: relative;
  font-family: "Turret Road", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
  
  /* Mystical text glow */
  text-shadow: 0 0 1px rgba(120, 0, 255, 0.1);
`;

const SkillsSection = styled.div`
  margin-top: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  align-items: center;
`;



const SkillsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SkillCard = styled(motion.div)`
  background: transparent;
  padding: 1rem;
  text-align: left;
  position: relative;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: scale(1.02);
    
    .skill-name {
      text-shadow: 
        0 0 10px rgba(255, 255, 255, 0.8),
        0 0 20px rgba(255, 255, 255, 0.6);
    }
    
    .skill-bar-fill {
      box-shadow: 
        0 0 20px rgba(139, 0, 0, 0.9),
        0 0 40px rgba(220, 20, 60, 0.7),
        0 0 60px rgba(255, 69, 0, 0.5),
        0 0 12px rgba(255, 255, 255, 0.6),
        0 0 24px rgba(255, 255, 255, 0.4),
        0 0 36px rgba(255, 255, 255, 0.3);
      
      &::after {
        opacity: 1;
      }
    }
    
    .skill-bar-background {
      transform: scale(1.05);
      border-color: rgba(255, 69, 0, 0.8);
      box-shadow: 
        0 0 15px rgba(255, 69, 0, 0.4),
        0 0 8px rgba(255, 255, 255, 0.5),
        0 0 16px rgba(255, 255, 255, 0.3),
        0 0 24px rgba(255, 255, 255, 0.2);
    }
  }
`;

const SkillName = styled.h3`
  font-size: 1rem;
  color: white;
  margin-bottom: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  position: relative;
  z-index: 2;
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
  font-family: "Turret Road", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
`;

const SkillDescription = styled.p`
  color: white;
  line-height: 1.5;
  position: relative;
  z-index: 2;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  font-family: "Turret Road", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
`;

const SkillBarContainer = styled.div`
  position: relative;
  z-index: 2;
  margin-top: 0.8rem;
`;

const SkillBarBackground = styled.div`
  width: 100%;
  height: 16px;
  background: #f0f0f0;
  border-radius: 8px;
  position: relative;
  border: 1px solid #ddd;
`;

const SkillBarFill = styled.div<{ level: number }>`
  height: 100%;
  width: ${props => props.level}%;
  background: 
    linear-gradient(90deg, 
      rgba(139, 0, 0, 0.9) 0%, 
      rgba(178, 34, 34, 1) 30%, 
      rgba(220, 20, 60, 1) 70%, 
      rgba(255, 69, 0, 0.9) 100%
    );
  border-radius: 8px;
  position: relative;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 0 10px rgba(139, 0, 0, 0.7),
    0 0 20px rgba(220, 20, 60, 0.5);
  
  /* Mystical glow effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 8px;
    background: 
      linear-gradient(90deg, 
        transparent 0%, 
        rgba(255,255,255,0.3) 50%, 
        transparent 100%
      );
    animation: shimmer 2s ease-in-out infinite;
  }
  
  /* Grain texture overlay */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 8px;
    background-image: 
      radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
      linear-gradient(45deg, transparent 40%, rgba(0,0,0,0.05) 50%, transparent 60%);
    background-size: 20px 20px, 40px 40px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  @keyframes shimmer {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }
`;

const SkillLevel = styled.div`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0,0,0,0.8);
  z-index: 3;
`;

const About: React.FC = () => {
  const [isMuted, setIsMuted] = React.useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [minLoadingTime, setMinLoadingTime] = useState(true);
  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const [elementsLoaded, setElementsLoaded] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
  // Calculate total elements to load
  useEffect(() => {
    // Count only actual resources that need to load: video + personal image
    const elementCount = 1 + 1; // video + image (skill bars and text are just animations)
    setTotalElements(elementCount);
    console.log('Total elements to load:', elementCount);
  }, []);
  
  // Handle video loading with better detection
  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
    setVideoLoaded(true);
    setElementsLoaded(prev => prev + 1);
  };
  
  // Handle video can play
  const handleVideoCanPlay = () => {
    console.log('Video can play');
    setVideoLoaded(true);
  };
  
  // Handle video actually playing
  const handleVideoPlay = () => {
    console.log('Video started playing');
    setVideoPlaying(true);
  };
  
  // Handle video can play through (fully buffered)
  const handleVideoCanPlayThrough = () => {
    console.log('Video can play through without buffering');
    setVideoLoaded(true);
  };
  
  // Handle video error
  const handleVideoError = () => {
    console.log('Video failed to load, proceeding anyway');
    setVideoLoaded(true);
    setVideoPlaying(true);
    setElementsLoaded(prev => prev + 1);
  };
  
  // Handle personal image load
  const handleImageLoad = () => {
    console.log('Personal image loaded');
    setElementsLoaded(prev => prev + 1);
  };
  
  // Handle personal image error
  const handleImageError = () => {
    console.log('Personal image failed to load, proceeding anyway');
    setElementsLoaded(prev => prev + 1);
  };
  
  // Remove skill bar and text handlers - they're just animations, not loading
  
  // Minimum loading time and progress simulation
  useEffect(() => {
    // Start loading video immediately
    if (videoRef.current) {
      videoRef.current.load();
    }
    
    // Simulate loading progress for better UX
    const progressInterval = setInterval(() => {
      setSimulatedProgress(prev => {
        if (prev < 100) {
          return prev + Math.random() * 20; // Faster progress
        }
        return 100; // Ensure it reaches 100%
      });
    }, 100); // Even faster updates
    
    // Reduced minimum time to 0.5 seconds - just for smooth UX
    const timer = setTimeout(() => {
      setMinLoadingTime(false);
      console.log('Minimum loading time completed');
      
      // Force progress to 100% when minimum time is done
      setSimulatedProgress(100);
    }, 500); // Reduced from 1500ms to 500ms
    
    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);
  
  // Check if all elements are loaded and minimum time has passed
  useEffect(() => {
    if (elementsLoaded >= totalElements && !minLoadingTime) {
      console.log('All elements loaded and minimum time passed, hiding loading screen');
      setTimeout(() => setIsLoading(false), 100); // Faster transition
    }
  }, [elementsLoaded, totalElements, minLoadingTime]);
  
  // New: Only complete loading when video is actually ready and visible
  useEffect(() => {
    if (!minLoadingTime && videoRef.current) {
      const checkVideoStatus = () => {
        const video = videoRef.current;
        if (video) {
          console.log('Video status check:', {
            readyState: video.readyState,
            networkState: video.networkState,
            paused: video.paused,
            currentTime: video.currentTime,
            duration: video.duration,
            videoWidth: video.videoWidth,
            videoHeight: video.videoHeight,
            buffered: video.buffered.length > 0 ? video.buffered.end(0) : 0
          });
          
          // More realistic conditions - video just needs to be ready to display
          // readyState >= 2 = HAVE_CURRENT_DATA (can start playing)
          // OR readyState >= 3 = HAVE_FUTURE_DATA (can play current and next frame)
          // videoWidth > 0 = video has dimensions (is visible)
          if ((video.readyState >= 2 && video.videoWidth > 0) || 
              (video.readyState >= 3)) {
            console.log('Video is ready to display - completing loading!');
            setVideoLoaded(true);
            setVideoPlaying(true);
            setTimeout(() => setIsLoading(false), 200);
          }
        }
      };
      
      // Check video status every 100ms
      const videoCheckInterval = setInterval(checkVideoStatus, 100);
      
      // Add a reasonable timeout to prevent infinite loading
      const maxWaitTimer = setTimeout(() => {
        clearInterval(videoCheckInterval);
        console.log('Max wait time reached (5 seconds), forcing completion');
        setVideoLoaded(true);
        setVideoPlaying(true);
        setTimeout(() => setIsLoading(false), 200);
      }, 5000); // 5 second timeout
      
      return () => {
        clearInterval(videoCheckInterval);
        clearTimeout(maxWaitTimer);
      };
    }
  }, [minLoadingTime]);
  
  // Fallback: If minimum time passed and video has any data, complete loading
  useEffect(() => {
    if (!minLoadingTime && videoRef.current) {
      const video = videoRef.current;
      if (video && (video.readyState >= 1 || video.videoWidth > 0)) {
        console.log('Fallback: Video has some data, completing loading');
        setTimeout(() => {
          setVideoLoaded(true);
          setVideoPlaying(true);
          setIsLoading(false);
        }, 1000); // 1 second delay to ensure video is ready
      }
    }
  }, [minLoadingTime]);
  
  // Simple fallback: Complete loading after minimum time + 1 second
  useEffect(() => {
    if (!minLoadingTime) {
      const simpleFallback = setTimeout(() => {
        console.log('Simple fallback: Minimum time + 1 second passed, completing loading');
        setVideoLoaded(true);
        setVideoPlaying(true);
        setIsLoading(false);
      }, 1000);
      
      return () => clearTimeout(simpleFallback);
    }
  }, [minLoadingTime]);
  
  const toggleSound = () => {
    console.log('Button clicked! Current muted state:', isMuted);
    console.log('Video ref exists:', !!videoRef.current);
    if (videoRef.current) {
      const newMutedState = !isMuted;
      console.log('Setting video muted to:', newMutedState);
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      console.log('Video muted property after change:', videoRef.current.muted);
    } else {
      console.log('Video ref is null!');
    }
  };
  
  const skills = [
    {
      name: "Light Bender",
      description: "The ability to bend light for maximum appeal.",
      level: 95
    },
    {
      name: "Texture Hunter",
      description: "Capable of portraying any texture in the most tactile way possible.",
      level: 88
    },
    {
      name: "Color illusionist",
      description: "Spell that manipulates color to create striking visual effects.",
      level: 92
    },
    {
      name: "Magic",
      description: "Advanced post-processing skills to enhance and perfect every image.",
      level: 90
    }
  ];

  // Calculate progress percentage - use real element loading progress
  const progress = elementsLoaded > 0 
    ? Math.round((elementsLoaded / totalElements) * 100) 
    : Math.round(simulatedProgress);
  
  // Show loading screen while video is loading or minimum time hasn't passed
  if (isLoading || minLoadingTime) {
    return (
      <Loading 
        progress={progress}
        totalImages={totalElements}
        loadedImages={elementsLoaded}
        subtitle="Loading About Page..."
      />
    );
  }

  return (
    <>
      {/* Preload video for faster loading */}
      <link 
        rel="preload" 
        href="https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/Hexen%20(mage)%20-%20Gameplay%20scenes%20and%20moments%20-%20BAZOOKA%20TV%20(720p%2C%20h264).mp4" 
        as="video" 
        type="video/mp4"
      />
      
      <AboutSection>
              <AboutBackgroundVideo>
          <video
            ref={videoRef}
            src="https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/Hexen%20(mage)%20-%20Gameplay%20scenes%20and%20moments%20-%20BAZOOKA%20TV%20(720p%2C%20h264).mp4"
            autoPlay
            muted={isMuted}
            loop
            playsInline
            preload="auto"
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23000000'/%3E%3C/svg%3E"
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            onCanPlay={handleVideoCanPlay}
            onPlay={handleVideoPlay}
            onCanPlayThrough={handleVideoCanPlayThrough}
          />
        </AboutBackgroundVideo>
        
        <SoundToggleButton 
          onClick={toggleSound}
          onMouseDown={() => console.log('Button mouse down')}
          onMouseUp={() => console.log('Button mouse up')}
        >
          <i className={`bi ${isMuted ? 'bi-volume-mute' : 'bi-volume-up'}`}></i>
        </SoundToggleButton>
      <Container>
        <SectionSubtitle className="section-subtitle about-subtitle">
          <div className="about-emojis">🧙‍♀️🔮</div>
          <div className="about-text">Wizard of light and shadow.</div>
        </SectionSubtitle>

        <AboutGrid>
          <PhotoAndSkills>
            <AboutImage>
              <img 
                src="https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/IMG_4577.JPG"
                alt="Lucas Cavallini - Photographer"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </AboutImage>

            <SkillsSection>
              <SkillsGrid>
                {skills.map((skill, index) => (
                  <SkillCard
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <SkillName className="skill-name skills-text">{skill.name}</SkillName>
                    <SkillDescription className="skills-text">{skill.description}</SkillDescription>
                    <SkillBarContainer>
                      <SkillBarBackground className="skill-bar-background">
                        <SkillBarFill className="skill-bar-fill" level={skill.level} />
                        <SkillLevel>{skill.level}%</SkillLevel>
                      </SkillBarBackground>
                    </SkillBarContainer>
                  </SkillCard>
                ))}
              </SkillsGrid>
            </SkillsSection>
          </PhotoAndSkills>

          <AboutContent>
            <AboutText
              className="about-text"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              Lucas Cavallini (AKA LVQKINHAS) is a professional photographer, journalist and all-around creative in the realm of image making. 
              Born in Belém - PA, Lucas came to São Paulo at a very early age and started meddling with analog photography circa 2018. From then, Lucas has turned into a competent professional, mainly photographing events and fashion tied to the current nightlife scene in São Paulo. 
            </AboutText>
            
            <AboutText
              className="about-text"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Lucas is also part of REBU Digital, a transmedia collective uniting creatives who challenge and lead the arts. For 3+ years, it has hosted Lovecore, a party for music, performance, and alternative culture, featuring artists like Meat Computer, Eq, and Agazero. Lucas has contributed in may Lovecores as a photographer and coordinator of the media team as well as one of the producers.
            </AboutText>
            
            <AboutText
              className="about-text"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Lucas has worked with powerful creators of the global south, such as Gabriel KOI, KENYA20hz, dada Joãozinho, André Lima, EQ, AGAZERO, MARIA ESMERALDA and S.E.E.D.
            </AboutText>
          </AboutContent>
        </AboutGrid>
      </Container>
    </AboutSection>
    </>
  );
};

export default About;
