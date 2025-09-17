import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const LightboxOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const LightboxContent = styled(motion.div)`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LightboxImage = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
`;

const LightboxVideo = styled.video`
  max-width: 90vw;
  max-height: 90vh;
  width: auto;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: -60px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.8);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10001;
  
  &:hover {
    transform: scale(1.1);
    border-color: rgba(255, 255, 255, 1);
    box-shadow: 
      0 0 15px rgba(255, 255, 255, 0.6),
      0 0 30px rgba(255, 255, 255, 0.4);
  }
`;


interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageTitle?: string;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ 
  isOpen, 
  onClose, 
  imageUrl, 
  imageTitle 
}) => {
  const isVideo = imageUrl.endsWith('.mp4') || imageUrl.endsWith('.mov') || imageUrl.endsWith('.avi');
  
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  
  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown as any);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown as any);
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown as any);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <LightboxOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleOverlayClick}
        >
          <LightboxContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CloseButton onClick={onClose}>
              ✕
            </CloseButton>
            
            {isVideo ? (
              <LightboxVideo
                src={imageUrl}
                controls
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <LightboxImage
                src={imageUrl}
                alt={imageTitle || 'Portfolio image'}
              />
            )}
            
          </LightboxContent>
        </LightboxOverlay>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
