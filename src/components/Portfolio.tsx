import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const PortfolioSection = styled.section`
  padding: 8rem 0 5rem 0;
  background: #fff;
  
  @media (max-width: 768px) {
    padding: 6rem 0 4rem 0;
  }
  
  @media (max-width: 480px) {
    padding: 5rem 0 3rem 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 3rem;
  font-size: 1.2rem;
`;



const PortfolioMosaic = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0 15px;
  }
  
  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

const MosaicItem = styled(motion.div)`
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  break-inside: avoid;
  margin-bottom: 10px;
  padding: 2px;

  
  /* Ensure first row items start at the same baseline */
  &:nth-child(-n+3) {
    margin-top: 0;
  }
  

  
  img, video {
    width: 100%;
    height: auto;
    display: block;
    transition: all 0.3s ease;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    isolation: isolate;
  }
  
  &:hover img {
    transform: scale(1.01);
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.6));
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.4);
    z-index: 25;
    transform-origin: center;
  }
  
  /* Disable hover effects for specific problematic images */
  img[src*="casamodadia2-23.jpg"],
  img[src*="lifeafterlifefinal-9.jpg"] {
    &:hover {
      transform: none !important;
      filter: none !important;
      box-shadow: none !important;
    }
  }
  
  &:hover video {
    transform: scale(1.01);
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.6));
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.4);
    z-index: 15;
  }
`;





// All your portfolio images from R2 bucket
const portfolioImages = [
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/000029370017-3.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/000029370022.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/DADAFINAL12-1-10.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/mccy.mp4',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/casamodadia2-8.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/000029370021-3.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/DADAFINAL12-1-13.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/DADAFINAL12-1-8.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/DADAFINAL12-14.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/DADAFINAL12-15.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/DADAFINAL12-7.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/P1010010%20(2).jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/PBVERDE-4.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/RET%205.png',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/RETICULADA.png',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/casamodadia2-2.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/casamodadia2-23.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/casamodadia2-40.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/dada-10.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/dada-12.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/dada-14.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/dada-3.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/lifeafterlifefinal-10.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/lifeafterlifefinal-16-2.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/lifeafterlifefinal-18-2.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/lifeafterlifefinal-23.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/lifeafterlifefinal-4.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/lifeafterlifefinal-7.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/lifeafterlifefinal-9.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/maluqyuce-3.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/maluqyuce-4.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/man-in-the-water-full.png',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/metal.png',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/pit-below-full.png',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/rebutestedit2-1.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/rebutestedit2-15.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/rebutestedit2-17.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/rebutestedit2-21.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/rebutestedit2-30.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/rebutestedit2-35.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/untitled%20shoot-007.jpg',
  'https://pub-a631c92817904ed48eeddf13a23f12bb.r2.dev/tika%20site%202025/untitled%20shoot-030.jpg',
  
  
];



const Portfolio: React.FC = () => {
  console.log('Portfolio images count:', portfolioImages.length);
  console.log('Portfolio images:', portfolioImages);
  
  return (
    <PortfolioSection>
      <Container>
        <SectionTitle>Portfolio</SectionTitle>
        <SectionSubtitle>
          Explore my latest work and creative vision
        </SectionSubtitle>

        <PortfolioMosaic>
          {/* First Row - Perfectly Aligned Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '12px', 
            marginBottom: '12px' 
          }}>
            {portfolioImages.slice(0, 3).map((imageUrl, index) => {
              const isVideo = imageUrl.endsWith('.mp4') || imageUrl.endsWith('.mov') || imageUrl.endsWith('.avi');
              
              return (
                <MosaicItem
                  key={`first-row-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  {isVideo ? (
                    <video
                      src={imageUrl}
                      controls
                      autoPlay={true}
                      muted
                      loop
                    />
                  ) : (
                    <img
                      src={imageUrl}
                      alt={`Portfolio image ${index + 1}`}
                      loading="lazy"
                    />
                  )}
                </MosaicItem>
              );
            })}
          </div>
          
          {/* Rest of Images - Mosaic Layout */}
          <div style={{ 
            columnCount: 3, 
            columnGap: '12px', 
            columnFill: 'balance' 
          }}>
            {portfolioImages.slice(3).map((imageUrl, index) => {
              const isVideo = imageUrl.endsWith('.mp4') || imageUrl.endsWith('.mov') || imageUrl.endsWith('.avi');
              
              return (
                <MosaicItem
                  key={`mosaic-${index + 3}`}

                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: (index + 3) * 0.05 }}
                >
                  {isVideo ? (
                    <video
                      src={imageUrl}
                      controls
                      autoPlay={true}
                      muted
                      loop
                    />
                  ) : (
                    <img
                      src={imageUrl}
                      alt={`Portfolio image ${index + 4}`}
                      loading="lazy"
                    />
                  )}
                </MosaicItem>
              );
            })}
          </div>
        </PortfolioMosaic>
      </Container>
    </PortfolioSection>
  );
};

export default Portfolio;
