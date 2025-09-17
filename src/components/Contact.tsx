import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const ContactSection = styled.section`
  padding: 8rem 0 5rem 0;
  background: #fff;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const ContactBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/P1010010%20(2).jpg') center/contain;
  opacity: 1;
  z-index: 1;
  
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
  border: 2px solid #ddd;
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
  border: 2px solid #ddd;
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
  border: none;
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
  border: 2px solid rgba(255, 255, 255, 0.3);
  
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize EmailJS
  useEffect(() => {
    try {
      // 🔧 EMAILJS SETUP REQUIRED:
      // 1. Go to https://www.emailjs.com/ and create account
      // 2. Create Gmail service and get Service ID
      // 3. Create email template and get Template ID  
      // 4. Get your Public Key from Account → API Keys
      // 5. Replace the values below with your actual IDs
      emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key
    } catch (error) {
      console.warn('EmailJS initialization failed:', error);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowError(false);
    setErrorMessage('');
    
    try {
      // Check if EmailJS is properly configured
      if (!emailjs || !emailjs.send) {
        throw new Error('Email service not configured');
      }

      // EmailJS template parameters
      const templateParams = {
        to_email: 'lvcascavallini@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email
      };

      // Send email using EmailJS
      const result = await emailjs.send(
        'YOUR_SERVICE_ID', // 🔧 Replace with your EmailJS service ID (e.g., 'service_abc123')
        'YOUR_TEMPLATE_ID', // 🔧 Replace with your EmailJS template ID (e.g., 'template_xyz789')
        templateParams
      );

      if (result.status === 200) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error: any) {
      console.error('Email error:', error);
      
      // Provide more specific error messages
      if (error.message === 'Email service not configured') {
        setErrorMessage('Email service not configured. Please contact directly at lvcascavallini@gmail.com');
      } else if (error.text && error.text.includes('Invalid email')) {
        setErrorMessage('Please check your email address and try again.');
      } else if (error.text && error.text.includes('template')) {
        setErrorMessage('Email service configuration error. Please contact directly.');
      } else {
        setErrorMessage('Failed to send message. Please try again or contact directly at lvcascavallini@gmail.com');
      }
      
      setShowError(true);
      setTimeout(() => setShowError(false), 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactSection>
      <ContactBackground />
      <Container>
        <SectionSubtitle className="section-subtitle">
          
        </SectionSubtitle>

        <ContactForm onSubmit={handleSubmit}>
          <FormTitle className="form-title">
            <i className="bi bi-chat-dots-fill" style={{ marginRight: '10px' }}></i>
            Send me a message
          </FormTitle>
          
          {showSuccess && (
            <SuccessMessage
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              Thank you! Your message has been sent successfully.
            </SuccessMessage>
          )}

          {showError && (
            <ErrorMessage
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {errorMessage}
            </ErrorMessage>
          )}

          <FormGroup>
            <Label className="contact-label" htmlFor="name">Name *</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label className="contact-label" htmlFor="email">Email *</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label className="contact-label" htmlFor="subject">Subject *</Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label className="contact-label" htmlFor="message">Message *</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell me about your photography needs..."
            />
          </FormGroup>

          <SubmitButton className="button-text" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </SubmitButton>
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
