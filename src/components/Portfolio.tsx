import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from './Loading';
import ImageLightbox from './ImageLightbox';

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
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [minLoadingTime, setMinLoadingTime] = useState(true);
  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedImageTitle, setSelectedImageTitle] = useState<string>('');
  
  console.log('Portfolio images count:', portfolioImages.length);
  console.log('Portfolio images:', portfolioImages);
  
  // Calculate total images (excluding videos for now)
  useEffect(() => {
    const imageCount = portfolioImages.filter(url => 
      !url.endsWith('.mp4') && !url.endsWith('.mov') && !url.endsWith('.avi')
    ).length;
    setTotalImages(imageCount);
    console.log('Total images to load:', imageCount);
    
    // If no images, still show loading for minimum time
    if (imageCount === 0) {
      console.log('No images to load, showing loading screen for minimum time');
    }
    
    // Simulate loading progress for better UX
    const progressInterval = setInterval(() => {
      setSimulatedProgress(prev => {
        if (prev < 90) {
          return prev + Math.random() * 15;
        }
        return prev;
      });
    }, 200);
    
    // Force loading screen to show for at least 2 seconds
    const timer = setTimeout(() => {
      setMinLoadingTime(false);
      console.log('Minimum loading time completed');
    }, 2000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);
  
  // Handle image loading with better detection
  const handleImageLoad = (index: number) => {
    console.log(`Image ${index} loaded, current count:`, loadedImages + 1);
    setLoadedImages(prev => {
      const newCount = prev + 1;
      console.log('New loaded count:', newCount, 'Total:', totalImages);
      return newCount;
    });
  };
  
  // Handle image error
  const handleImageError = (index: number) => {
    console.log(`Image ${index} failed to load, counting as loaded to avoid infinite loading`);
    setLoadedImages(prev => {
      const newCount = prev + 1;
      console.log('New loaded count (after error):', newCount, 'Total:', totalImages);
      return newCount;
    });
  };
  
  // Check if all images are loaded and minimum time has passed
  useEffect(() => {
    if (totalImages === 0 && !minLoadingTime) {
      // No images to load, hide loading after minimum time
      console.log('No images to load, hiding loading screen after minimum time');
      setTimeout(() => setIsLoading(false), 500);
    } else if (totalImages > 0 && loadedImages >= totalImages && !minLoadingTime) {
      // All images loaded and minimum time passed, hide loading screen
      console.log('All images loaded and minimum time passed, hiding loading screen');
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [loadedImages, totalImages, minLoadingTime]);
  
  // Fallback: If minimum time passed and no real progress, force completion
  useEffect(() => {
    if (!minLoadingTime && loadedImages === 0 && totalImages > 0) {
      console.log('Fallback: Minimum time passed but no images loaded, forcing completion');
      setTimeout(() => {
        setLoadedImages(totalImages);
        setIsLoading(false);
      }, 1000);
    }
  }, [minLoadingTime, loadedImages, totalImages]);
  
  // Additional fallback: Check DOM for loaded images
  useEffect(() => {
    if (!minLoadingTime && totalImages > 0) {
      const checkImagesInDOM = () => {
        const images = document.querySelectorAll('img');
        console.log('Images found in DOM:', images.length);
        
        if (images.length >= totalImages) {
          console.log('Images detected in DOM, completing loading');
          setLoadedImages(totalImages);
          setTimeout(() => setIsLoading(false), 500);
        }
      };
      
      // Check after a short delay
      const domCheckTimer = setTimeout(checkImagesInDOM, 500);
      return () => clearTimeout(domCheckTimer);
    }
  }, [minLoadingTime, totalImages]);
  
  // Calculate progress percentage - use real element loading progress
  const progress = loadedImages > 0 
    ? Math.round((loadedImages / totalImages) * 100) 
    : Math.round(simulatedProgress);
  
  // Handle opening lightbox
  const openLightbox = (imageUrl: string, imageTitle?: string) => {
    setSelectedImage(imageUrl);
    setSelectedImageTitle(imageTitle || 'Portfolio image');
    setLightboxOpen(true);
  };
  
  // Handle closing lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage('');
    setSelectedImageTitle('');
  };
  
  console.log('Loading state:', { isLoading, loadedImages, totalImages, progress, minLoadingTime, simulatedProgress });
  
  // Show loading screen while images are loading or minimum time hasn't passed
  if (isLoading || minLoadingTime) {
    return (
      <Loading 
        progress={progress}
        totalImages={totalImages}
        loadedImages={loadedImages}
      />
    );
  }
  
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
                      onLoad={() => handleImageLoad(index)}
                      onError={() => handleImageError(index)}
                      onClick={() => openLightbox(imageUrl, `Portfolio image ${index + 1}`)}
                      style={{ cursor: 'pointer' }}
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
                      onLoad={() => handleImageLoad(index + 3)}
                      onError={() => handleImageError(index + 3)}
                      onClick={() => openLightbox(imageUrl, `Portfolio image ${index + 4}`)}
                      style={{ cursor: 'pointer' }}
                    />
                  )}
                </MosaicItem>
              );
            })}
          </div>
        </PortfolioMosaic>
      </Container>
      
      {/* Image Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        imageUrl={selectedImage}
        imageTitle={selectedImageTitle}
      />
    </PortfolioSection>
  );
};

export default Portfolio;
