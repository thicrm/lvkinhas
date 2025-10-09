import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ContactSection = styled.section`
  padding: 8rem 0 5rem 0;
  background: #fff;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const ContactBackground = styled.div<{ $isLoaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/P1010010%20(2).jpg') center/contain;
  opacity: ${props => props.$isLoaded ? 1 : 0};
  z-index: 1;
  transition: opacity 0.8s ease-in-out;
  
  /* Light source glow - similar to LUCAS CAVALLINI text */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 
      0 0 12px rgba(255, 255, 255, 0.8),
      0 0 24px rgba(255, 255, 255, 0.6),
      0 0 36px rgba(255, 255, 255, 0.5),
      0 0 48px rgba(255, 255, 255, 0.4),
      0 0 60px rgba(255, 255, 255, 0.3),
      0 0 80px rgba(255, 255, 255, 0.2);
    z-index: 1;
    pointer-events: none;
  }
  
  /* Subtle gray overlay for text readability */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 3;
    pointer-events: none;
  }
  
  /* Film grain overlay */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.3;
    pointer-events: none;
    z-index: 4;
    mix-blend-mode: overlay;
    animation: grainMove 4s steps(8) infinite;
  }
  
  @keyframes grainMove {
    0%, 100% { transform: translate(0, 0); }
    10% { transform: translate(-5%, -3%); }
    20% { transform: translate(-3%, 5%); }
    30% { transform: translate(5%, -3%); }
    40% { transform: translate(-5%, 3%); }
    50% { transform: translate(5%, -3%); }
    60% { transform: translate(-3%, -5%); }
    70% { transform: translate(3%, 5%); }
    80% { transform: translate(-5%, -3%); }
    90% { transform: translate(5%, 3%); }
  }
`;



const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 5;
`;

const SectionTitle = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
  color: white;
  font-size: 4rem;
  font-weight: 700;
  transition: all 0.4s ease;
  cursor: pointer;
  font-family: 'Bitcount Grid Single', monospace;
  -webkit-text-stroke: 0.5px #000;
  
  &:hover {
    transform: scale(1.03);
    text-shadow: 
      0 0 8px rgba(255, 255, 255, 0.6), 
      0 0 16px rgba(255, 255, 255, 0.4), 
      0 0 24px rgba(255, 255, 255, 0.3);
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  color: white;
  margin-bottom: 4rem;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  cursor: pointer;
  font-family: "Turret Road", sans-serif;
  font-optical-sizing: auto;
  font-weight: 200;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
  -webkit-text-stroke: 0.3px #000;
  
  &:hover {
    transform: scale(1.02);
    text-shadow: 
      0 0 6px rgba(255, 255, 255, 0.5), 
      0 0 12px rgba(255, 255, 255, 0.3),
      0 0 18px rgba(255, 255, 255, 0.2);
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
  }
`;

const ContactGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  max-width: 600px;
  margin: 0 auto;
`;

const ContactForm = styled.form`
  padding: 2.5rem;
`;

const FormTitle = styled.h2`
  margin-bottom: 2rem;
  color: white;
  font-size: 2.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  font-family: 'Bitcount Grid Single', monospace;
  -webkit-text-stroke: 0.5px #000;
  
  &:hover {
    transform: scale(1.02);
    text-shadow: 
      0 0 6px rgba(255, 255, 255, 0.5), 
      0 0 12px rgba(255, 255, 255, 0.3),
      0 0 18px rgba(255, 255, 255, 0.2);
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: white;
  font-weight: 500;
  font-family: "Turret Road", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #000;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid #000;
  border-radius: 10px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.3s ease;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  border: 1px solid #000;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  font-family: "Turret Road", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const InfoCard = styled(motion.div)`
  padding: 1.5rem;
  text-align: center;
  min-width: 150px;
`;

const InfoIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.2);
    text-shadow: 
      0 0 8px rgba(255, 255, 255, 0.6), 
      0 0 16px rgba(255, 255, 255, 0.4), 
      0 0 24px rgba(255, 255, 255, 0.3);
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
  }
`;

const InfoTitle = styled.h3`
  margin-bottom: 1rem;
  color: white;
  font-size: 2.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  font-family: 'Bitcount Grid Single', monospace;
  -webkit-text-stroke: 0.5px #000;
  
  &:hover {
    transform: scale(1.05);
    text-shadow: 
      0 0 6px rgba(255, 255, 255, 0.5), 
      0 0 12px rgba(255, 255, 255, 0.3),
      0 0 18px rgba(255, 255, 255, 0.2);
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
  }
`;

const InfoText = styled.p`
  color: white;
  line-height: 1.6;
  font-family: "Turret Road", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
  transition: all 0.3s ease;
  cursor: pointer;
  -webkit-text-stroke: 0.3px #000;
  
  &:hover {
    transform: scale(1.02);
    text-shadow: 
      0 0 4px rgba(255, 255, 255, 0.4), 
      0 0 8px rgba(255, 255, 255, 0.2);
    filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.3));
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  display: inline-block;
  width: 40px;
  height: 40px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  
  &:hover {
    transform: translateY(-2px) scale(1.1);
    text-shadow: 
      0 0 8px rgba(255, 255, 255, 0.6), 
      0 0 16px rgba(255, 255, 255, 0.4),
      0 0 24px rgba(255, 255, 255, 0.3);
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
    color: #fff;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  text-align: center;
`;

const ErrorMessage = styled(motion.div)`
  background: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  text-align: center;
`;

const Contact: React.FC = () => {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  // Preload background image
  useEffect(() => {
    const img = new Image();
    img.src = 'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/P1010010%20(2).jpg';
    img.onload = () => {
      setBackgroundLoaded(true);
    };
  }, []);

  return (
    <ContactSection>
      <ContactBackground $isLoaded={backgroundLoaded} />
      <Container>
        <SectionSubtitle className="section-subtitle">
          
        </SectionSubtitle>

        <ContactForm>
          <FormTitle className="form-title">
            <i className="bi bi-envelope-fill" style={{ marginRight: '10px' }}></i>
            Get in Touch
          </FormTitle>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p style={{ color: 'white', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6', WebkitTextStroke: '0.3px #000' } as React.CSSProperties}>
              Ready to create something amazing together? Let's discuss your photography needs!
            </p>
            
            <SubmitButton 
              className="button-text" 
              type="button"
              onClick={() => window.open('mailto:lvcascavallini@gmail.com?subject=Photography Inquiry&body=Hello Lucas,%0D%0A%0D%0AI would like to discuss a photography project with you.%0D%0A%0D%0APlease let me know your availability and rates.%0D%0A%0D%0AThank you!', '_blank')}
            >
              <i className="bi bi-envelope" style={{ marginRight: '8px' }}></i>
              Send Email Directly
            </SubmitButton>
          </div>
        </ContactForm>

        <ContactInfo>
          <InfoCard
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <InfoIcon>📍</InfoIcon>
            <InfoTitle className="contact-info-title">Location</InfoTitle>
            <InfoText className="contact-info-text">
              Based in São Paulo, serving the greater metropolitan area and available for travel.
            </InfoText>
          </InfoCard>

          <InfoCard
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <InfoIcon>📧</InfoIcon>
            <InfoTitle className="contact-info-title">Email</InfoTitle>
            <InfoText className="contact-info-text">
             lvcascavallini@gmail.com<br />
            </InfoText>
          </InfoCard>

          <InfoCard
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <InfoIcon>📱</InfoIcon>
            <InfoTitle className="contact-info-title">Phone</InfoTitle>
            <InfoText className="contact-info-text">
              +55 11 98104-5537<br />
            </InfoText>
          </InfoCard>

          <InfoCard
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <InfoIcon>🌐</InfoIcon>
            <InfoTitle className="contact-info-title">Follow Me</InfoTitle>
            <InfoText className="contact-info-text">
              Stay updated with my latest work and behind-the-scenes moments.
            </InfoText>
            <SocialLinks>
              <SocialLink href="https://www.instagram.com/lvqkinhas/" aria-label="Instagram"><i className="bi bi-instagram"></i></SocialLink>
              <SocialLink href="https://x.com/lvqkinhas" aria-label="Twitter"><i className="bi bi-twitter-x"></i></SocialLink>
              <SocialLink href="#" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></SocialLink>
            </SocialLinks>
          </InfoCard>
        </ContactInfo>
      </Container>
    </ContactSection>
  );
};

export default Contact;
