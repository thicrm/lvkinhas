import React, { useState } from 'react';
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

  const categories = [
    { value: 'street', label: 'Street Photography' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'technique', label: 'Technique' },
    { value: 'events', label: 'Events' },
    { value: 'portraits', label: 'Portraits' }
  ];

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
        readTime: Math.ceil(content.split(' ').length / 200) + ' min read'
      };

      // Save to blog service
      const savedPost = blogService.addPost(postData);
      
      console.log('Blog post saved successfully:', savedPost);
      
      if (onSave) {
        onSave(savedPost);
      }
      
      // Reset form
      setTitle('');
      setContent('');
      setExcerpt('');
      setCategory('street');
      setTags('');
      setSelectedImage(null);
      setImagePreview(null);
      setImageAlt('');
      
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('Error saving blog post. Please try again.');
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

  const insertImageIntoContent = () => {
    if (!selectedImage || !imagePreview) return;

    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    // Create image HTML with alt text
    const imageHtml = `\n\n![${imageAlt}](${imagePreview})\n\n`;
    
    const newContent = content.substring(0, start) + imageHtml + content.substring(end);
    setContent(newContent);

    // Clear image selection
    setSelectedImage(null);
    setImagePreview(null);
    setImageAlt('');
    
    // Focus back to textarea
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + imageHtml.length, start + imageHtml.length);
    }, 100);
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
              <ImageUploadButton>
                📷 Upload Image
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
              Cancel
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
    </EditorContainer>
  );
};

export default TestBlogEditor;
