import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { blogService } from '../../services/blogService';
import { StoredImage } from '../../services/fileStorageService';

const ImageManagerContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ManagerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 0;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
`;

const ManagerTitle = styled.h2`
  color: white;
  font-size: 2rem;
  font-family: 'kenpixel', 'Press Start 2P', 'VT323', 'Share Tech Mono', 'Orbitron', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
`;

const UploadSection = styled.div`
  background: rgba(26, 26, 26, 0.95);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
`;

const UploadTitle = styled.h3`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-family: "Handjet", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
`;

const UploadArea = styled.div`
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 3rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.1);
  }
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadText = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  margin-bottom: 1rem;
  font-family: "Handjet", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
`;

const UploadButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: rgba(0, 191, 255, 0.2);
  border: 2px solid rgba(0, 191, 255, 0.4);
  border-radius: 8px;
  color: #00bfff;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  font-family: "Handjet", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;

  &:hover {
    background: rgba(0, 191, 255, 0.3);
    border-color: rgba(0, 191, 255, 0.6);
    box-shadow: 0 0 20px rgba(0, 191, 255, 0.3);
  }
`;

const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ImageCard = styled.div`
  background: rgba(26, 26, 26, 0.95);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const ImageInfo = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  font-family: "Handjet", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
`;

const ImageActions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const ActionButton = styled(motion.button)<{ variant?: 'danger' }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.variant === 'danger' ? 'rgba(255, 107, 107, 0.3)' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 6px;
  background: ${props => props.variant === 'danger' ? 'rgba(255, 107, 107, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.variant === 'danger' ? '#ff6b6b' : 'white'};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Handjet", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;

  &:hover {
    background: ${props => props.variant === 'danger' ? 'rgba(255, 107, 107, 0.3)' : 'rgba(255, 255, 255, 0.2)'};
    border-color: ${props => props.variant === 'danger' ? 'rgba(255, 107, 107, 0.5)' : 'rgba(255, 255, 255, 0.4)'};
  }
`;

const StatsSection = styled.div`
  background: rgba(26, 26, 26, 0.95);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

const StatNumber = styled.div`
  color: white;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-family: "Handjet", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.6);
  font-family: "Handjet", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
`;

interface ImageManagerProps {
  onBack: () => void;
}

const ImageManager: React.FC<ImageManagerProps> = ({ onBack }) => {
  const [images, setImages] = useState<StoredImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    setIsLoading(true);
    try {
      const allImages = blogService.getAllImages();
      setImages(allImages);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageId = await blogService.uploadImage(file, file.name.split('.')[0]);
      console.log('Image uploaded successfully:', imageId);
      
      // Reload images
      await loadImages();
      
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setUploading(false);
      // Reset input
      event.target.value = '';
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (window.confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
      try {
        const success = await blogService.deleteImage(imageId);
        if (success) {
          await loadImages();
          alert('Image deleted successfully!');
        } else {
          alert('Error deleting image. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting image:', error);
        alert('Error deleting image. Please try again.');
      }
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = {
    totalImages: images.length,
    totalSize: images.reduce((sum, img) => sum + img.size, 0),
    imageTypes: [...new Set(images.map(img => img.type))].length
  };

  return (
    <ImageManagerContainer>
      <ManagerHeader>
        <ManagerTitle>Image Manager</ManagerTitle>
        <ActionButton
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Dashboard
        </ActionButton>
      </ManagerHeader>

      {/* Statistics */}
      <StatsSection>
        <StatsGrid>
          <StatItem>
            <StatNumber>{stats.totalImages}</StatNumber>
            <StatLabel>Total Images</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>{formatFileSize(stats.totalSize)}</StatNumber>
            <StatLabel>Total Size</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>{stats.imageTypes}</StatNumber>
            <StatLabel>Image Types</StatLabel>
          </StatItem>
        </StatsGrid>
      </StatsSection>

      {/* Upload Section */}
      <UploadSection>
        <UploadTitle>Upload New Image</UploadTitle>
        <UploadArea onClick={() => document.getElementById('imageUpload')?.click()}>
          <UploadInput
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
          />
          <UploadText>
            {uploading ? 'Uploading...' : 'Click here or drag and drop to upload an image'}
          </UploadText>
          <UploadButton
            disabled={uploading}
            whileHover={{ scale: uploading ? 1 : 1.05 }}
            whileTap={{ scale: uploading ? 1 : 0.95 }}
          >
            {uploading ? 'Uploading...' : 'Choose File'}
          </UploadButton>
        </UploadArea>
      </UploadSection>

      {/* Images Grid */}
      {isLoading ? (
        <LoadingSpinner>Loading images...</LoadingSpinner>
      ) : images.length === 0 ? (
        <LoadingSpinner>No images found. Upload your first image to get started!</LoadingSpinner>
      ) : (
        <ImagesGrid>
          {images.map((image) => (
            <ImageCard key={image.id}>
              <ImagePreview src={image.url} alt={image.alt} />
              <ImageInfo>
                <div><strong>Name:</strong> {image.originalName}</div>
                <div><strong>Size:</strong> {formatFileSize(image.size)}</div>
                <div><strong>Type:</strong> {image.type}</div>
                <div><strong>Uploaded:</strong> {formatDate(image.uploadedAt)}</div>
                <div><strong>Alt Text:</strong> {image.alt}</div>
              </ImageInfo>
              <ImageActions>
                <ActionButton
                  variant="danger"
                  onClick={() => handleDeleteImage(image.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Delete
                </ActionButton>
              </ImageActions>
            </ImageCard>
          ))}
        </ImagesGrid>
      )}
    </ImageManagerContainer>
  );
};

export default ImageManager;
