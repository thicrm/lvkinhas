import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { blogService, BlogPost } from '../../services/blogService';

const EditorContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const EditorCard = styled(motion.div)`
  background: rgba(26, 26, 26, 0.95);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const EditorTitle = styled.h2`
  color: white;
  font-size: 2rem;
  margin-bottom: 2rem;
  font-family: 'kenpixel', 'Press Start 2P', 'VT323', 'Share Tech Mono', 'Orbitron', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Label = styled.label`
  color: white;
  font-family: "Handjet", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
  font-size: 1.3rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  min-height: 200px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Select = styled.select`
  padding: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  }

  option {
    background: #1a1a1a;
    color: white;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const Button = styled(motion.button)<{ variant?: 'primary' | 'secondary' }>`
  padding: 1rem 2rem;
  border: 2px solid ${props => props.variant === 'primary' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 8px;
  background: ${props => props.variant === 'primary' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  color: white;
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
    background: ${props => props.variant === 'primary' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const FormattingToolbar = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const FormatButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ImageUploadButton = styled.label`
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  input[type="file"] {
    display: none;
  }
`;

const ImagePreview = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  text-align: center;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const ImageInfo = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ImageActions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`;

const SmallButton = styled.button`
  padding: 0.3rem 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const InsertButton = styled(SmallButton)`
  background: rgba(0, 191, 255, 0.2);
  border-color: rgba(0, 191, 255, 0.4);

  &:hover {
    background: rgba(0, 191, 255, 0.3);
  }
`;

const RemoveButton = styled(SmallButton)`
  background: rgba(255, 107, 107, 0.2);
  border-color: rgba(255, 107, 107, 0.4);

  &:hover {
    background: rgba(255, 107, 107, 0.3);
  }
`;

const ImageLibraryModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`;

const ImageLibraryContent = styled.div`
  background: rgba(26, 26, 26, 0.95);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  backdrop-filter: blur(10px);
`;

const ImageLibraryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ImageLibraryTitle = styled.h3`
  color: white;
  font-size: 1.5rem;
  font-family: "Handjet", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
`;

const CloseButton = styled.button`
  background: rgba(255, 107, 107, 0.2);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 4px;
  color: #ff6b6b;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 107, 107, 0.3);
  }
`;

const ImageLibraryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const LibraryImageCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(0, 191, 255, 0.5);
    background: rgba(0, 191, 255, 0.1);
  }
`;

const LibraryImagePreview = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const LibraryImageInfo = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
  font-family: "Handjet", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
  text-align: center;
`;

const SuccessMessage = styled.div`
  background: rgba(81, 207, 102, 0.2);
  border: 1px solid rgba(81, 207, 102, 0.4);
  border-radius: 8px;
  color: #51cf66;
  padding: 1rem;
  margin-bottom: 1rem;
  font-family: "Handjet", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
  text-align: center;
`;

interface TestBlogEditorProps {
  onSave?: (post: any) => void;
  onCancel?: () => void;
}

const TestBlogEditor: React.FC<TestBlogEditorProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('street');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [boldActive, setBoldActive] = useState(false);
  const [italicActive, setItalicActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageAlt, setImageAlt] = useState('');
  const [showImageLibrary, setShowImageLibrary] = useState(false);
  const [storedImages, setStoredImages] = useState<any[]>([]);
  const [saveMessage, setSaveMessage] = useState<string>('');

  const categories = [
    { value: 'street', label: 'Street Photography' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'technique', label: 'Technique' },
    { value: 'events', label: 'Events' },
    { value: 'portraits', label: 'Portraits' }
  ];

  // Load stored images when component mounts
  useEffect(() => {
    const images = blogService.getAllImages();
    setStoredImages(images);
  }, []);

  const insertStoredImageIntoContent = (image: any) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    // Create markdown image syntax with the stored image URL
    const imageMarkdown = `\n\n![${image.alt}](${image.url})\n\n`;
    
    const newContent = content.substring(0, start) + imageMarkdown + content.substring(end);
    setContent(newContent);

    // Close image library
    setShowImageLibrary(false);
    
    // Focus back to textarea
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + imageMarkdown.length, start + imageMarkdown.length);
    }, 100);
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Prepare post data
      const postData = {
        title,
        content,
        excerpt,
        category: category as BlogPost['category'],
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        readTime: Math.ceil(content.split(' ').length / 200) + ' min read',
        imageIds: [] // Images are already embedded in content as markdown
      };

      // Save to blog service (now async)
      const savedPost = await blogService.addPost(postData);
      
      console.log('Blog post saved successfully:', savedPost);
      
      // Show success message
      setSaveMessage('Post saved successfully! You can continue editing or go back to dashboard.');
      
      // Clear success message after 5 seconds
      setTimeout(() => setSaveMessage(''), 5000);
      
      if (onSave) {
        onSave(savedPost);
      }
      
      // Don't reset form automatically - let user decide when to start new post
      // setTitle('');
      // setContent('');
      // setExcerpt('');
      // setCategory('street');
      // setTags('');
      // setSelectedImage(null);
      // setImagePreview(null);
      // setImageAlt('');
      
    } catch (error) {
      console.error('Error saving blog post:', error);
      // Don't use alert as it can cause navigation issues
      console.error('Error saving blog post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const insertFormatting = (format: string) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        setBoldActive(!boldActive);
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        setItalicActive(!italicActive);
        break;
      case 'header':
        formattedText = `## ${selectedText}`;
        break;
      default:
        formattedText = selectedText;
    }
    
    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image file size must be less than 5MB.');
      return;
    }

    setSelectedImage(file);
    setImageAlt(file.name.split('.')[0]); // Use filename as default alt text

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const insertImageIntoContent = async () => {
    if (!selectedImage || !imagePreview) return;

    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    try {
      // Show loading state
      setIsLoading(true);
      
      // Upload image to file storage first
      const imageId = await blogService.uploadImage(selectedImage, imageAlt);
      const storedImage = blogService.getImageById(imageId);
      
      if (storedImage) {
        // Create markdown image syntax with the stored image URL
        const imageMarkdown = `\n\n![${imageAlt}](${storedImage.url})\n\n`;
        
        const newContent = content.substring(0, start) + imageMarkdown + content.substring(end);
        setContent(newContent);

        // Clear image selection
        setSelectedImage(null);
        setImagePreview(null);
        setImageAlt('');
        
        // Focus back to textarea
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(start + imageMarkdown.length, start + imageMarkdown.length);
        }, 100);
        
        // Show success message without alert (which can cause issues)
        console.log('Image uploaded and inserted into post content!');
        
        // Update stored images list
        const images = blogService.getAllImages();
        setStoredImages(images);
        
      } else {
        throw new Error('Failed to retrieve uploaded image');
      }
    } catch (error) {
      console.error('Error uploading and inserting image:', error);
      // Don't use alert as it can cause navigation issues
      console.error('Error uploading image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setImageAlt('');
  };

  return (
    <EditorContainer>
      <EditorCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <EditorTitle>Create New Blog Post (Test Editor)</EditorTitle>
        
        {saveMessage && <SuccessMessage>{saveMessage}</SuccessMessage>}
        
        <Form>
          <FormGroup>
            <Label htmlFor="title">Post Title</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog post title"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Input
              id="excerpt"
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description of your post"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="category">Category</Label>
            <Select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Photography, Street, São Paulo"
            />
          </FormGroup>

          <FormGroup>
            <Label>Content</Label>
            <FormattingToolbar>
              <FormatButton 
                active={boldActive}
                onClick={() => insertFormatting('bold')}
              >
                Bold
              </FormatButton>
              <FormatButton 
                active={italicActive}
                onClick={() => insertFormatting('italic')}
              >
                Italic
              </FormatButton>
              <FormatButton onClick={() => insertFormatting('header')}>
                Header
              </FormatButton>
              <FormatButton onClick={() => setShowImageLibrary(true)}>
                🖼️ Image Library
              </FormatButton>
              <ImageUploadButton>
                📷 Upload New Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </ImageUploadButton>
            </FormattingToolbar>
            <TextArea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post content here..."
              required
            />
            
            {/* Image Preview and Insertion */}
            {imagePreview && (
              <ImagePreview>
                <PreviewImage src={imagePreview} alt="Preview" />
                <ImageInfo>
                  {selectedImage?.name} ({(selectedImage?.size || 0 / 1024 / 1024).toFixed(2)} MB)
                </ImageInfo>
                <Input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Alt text for the image"
                  style={{ marginBottom: '1rem', fontSize: '0.9rem' }}
                />
                <ImageActions>
                  <InsertButton onClick={insertImageIntoContent}>
                    Insert into Post
                  </InsertButton>
                  <RemoveButton onClick={removeSelectedImage}>
                    Remove
                  </RemoveButton>
                </ImageActions>
              </ImagePreview>
            )}
          </FormGroup>

          <ButtonGroup>
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Dashboard
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleSave}
              disabled={!title || !content || !excerpt || isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? 'Saving...' : 'Save Post'}
            </Button>
          </ButtonGroup>
        </Form>
      </EditorCard>

      {/* Image Library Modal */}
      {showImageLibrary && (
        <ImageLibraryModal>
          <ImageLibraryContent>
            <ImageLibraryHeader>
              <ImageLibraryTitle>Select Image from Library</ImageLibraryTitle>
              <CloseButton onClick={() => setShowImageLibrary(false)}>
                Close
              </CloseButton>
            </ImageLibraryHeader>
            
            {storedImages.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)', padding: '2rem' }}>
                No images in library. Upload some images first!
              </div>
            ) : (
              <ImageLibraryGrid>
                {storedImages.map((image) => (
                  <LibraryImageCard 
                    key={image.id} 
                    onClick={() => insertStoredImageIntoContent(image)}
                  >
                    <LibraryImagePreview src={image.url} alt={image.alt} />
                    <LibraryImageInfo>
                      <div><strong>{image.originalName}</strong></div>
                      <div>Click to insert</div>
                    </LibraryImageInfo>
                  </LibraryImageCard>
                ))}
              </ImageLibraryGrid>
            )}
          </ImageLibraryContent>
        </ImageLibraryModal>
      )}
    </EditorContainer>
  );
};

export default TestBlogEditor;
