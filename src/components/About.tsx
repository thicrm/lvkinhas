import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutSection = styled.section`
  padding: 8rem 0 5rem 0;
  background: #f8f9fa;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 6rem 0 4rem 0;
  }
  
  @media (max-width: 480px) {
    padding: 5rem 0 3rem 0;
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
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
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
    top: 1.5rem;
    right: 1.5rem;
    width: 45px;
    height: 45px;
    font-size: 18px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
  color: white;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  
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
  font-style: italic;
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
`;

const SkillDescription = styled.p`
  color: white;
  line-height: 1.5;
  position: relative;
  z-index: 2;
  margin-bottom: 1rem;
  font-size: 0.85rem;
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
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
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

  return (
    <AboutSection>
              <AboutBackgroundVideo>
          <video
            ref={videoRef}
            src="https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/Hexen_%20Beyond%20Heretic%20(Fighter)%20-%2002%20Seven%20Portals%201%20-%20No%20Commentary.mp4"
            autoPlay
            muted={isMuted}
            loop
            playsInline
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
        <SectionTitle>About Me</SectionTitle>
        <SectionSubtitle>
          Wizard of light and shadow.
        </SectionSubtitle>

        <AboutGrid>
          <PhotoAndSkills>
            <AboutImage>
              <img 
                src="https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/IMG_4577.JPG"
                alt="Lucas Cavallini - Photographer"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </AboutImage>

            <SkillsSection>
              <SkillsGrid>
                {skills.map((skill, index) => (
                  <SkillCard
                    key={skill.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <SkillName className="skill-name">{skill.name}</SkillName>
                    <SkillDescription>{skill.description}</SkillDescription>
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
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Lucas Cavallini (AKA LVQKINHAS) is a professional photographer, journalist and all-around creative in the realm of image making. 
              Born in Belém - PA, Lucas came to São Paulo at a very early age and started meddling with analog photography circa 2018. From then, Lucas has turned into a competent professional, mainly photographing events and fashion tied to the current nightlife scene in São Paulo. 
            </AboutText>
            
            <AboutText
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Lucas is also part of REBU Digital, a transmedia collective uniting creatives who challenge and lead the arts. For 3+ years, it has hosted Lovecore, a party for music, performance, and alternative culture, featuring artists like Meat Computer, Eq, and Agazero. Lucas has contributed in may Lovecores as a photographer and coordinator of the media team as well as one of the producers.
            </AboutText>
            
            <AboutText
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Lucas has worked with powerful creators of the global south, such as Gabriel KOI, KENYA20hz, dada Joãozinho, André Lima, EQ, AGAZERO, MARIA ESMERALDA and S.E.E.D.
            </AboutText>
          </AboutContent>
        </AboutGrid>
      </Container>
    </AboutSection>
  );
};

export default About;
