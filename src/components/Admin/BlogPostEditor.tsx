import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ReactQuill from 'react-quill';
import { blogService, BlogPost } from '../../services/blogService';

// Import Quill CSS
import 'react-quill/dist/quill.snow.css';

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

const TagsInput = styled.input`
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

const QuillWrapper = styled.div`
  .ql-toolbar {
    background: rgba(255, 255, 255, 0.1) !important;
    border: 2px solid rgba(255, 255, 255, 0.2) !important;
    border-bottom: none !important;
    border-radius: 8px 8px 0 0 !important;
  }

  .ql-container {
    background: rgba(255, 255, 255, 0.1) !important;
    border: 2px solid rgba(255, 255, 255, 0.2) !important;
    border-top: none !important;
    border-radius: 0 0 8px 8px !important;
    color: white !important;
  }

  .ql-editor {
    color: white !important;
    font-size: 1rem !important;
    min-height: 300px !important;
  }

  .ql-editor.ql-blank::before {
    color: rgba(255, 255, 255, 0.5) !important;
    font-style: normal !important;
  }

  .ql-toolbar .ql-stroke {
    stroke: white !important;
  }

  .ql-toolbar .ql-fill {
    fill: white !important;
  }

  .ql-toolbar .ql-picker-label {
    color: white !important;
  }

  .ql-toolbar .ql-picker-options {
    background: #1a1a1a !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
  }

  .ql-toolbar .ql-picker-item {
    color: white !important;
  }

  .ql-toolbar .ql-picker-item:hover {
    background: rgba(255, 255, 255, 0.1) !important;
  }

  .ql-toolbar button:hover {
    background: rgba(255, 255, 255, 0.1) !important;
  }

  .ql-toolbar button.ql-active {
    background: rgba(255, 255, 255, 0.2) !important;
  }
`;

const ImageUploadSection = styled.div`
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.05);
  }
`;

const ImageUploadInput = styled.input`
  display: none;
`;

const ImageUploadLabel = styled.label`
  display: inline-block;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Handjet", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.6);
  }
`;

const UploadedImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const ImagePreview = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.2);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(255, 107, 107, 0.8);
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  color: white;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const PreviewSection = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
`;

const PreviewTitle = styled.h3`
  color: white;
  margin-bottom: 1rem;
  font-family: "Handjet", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
`;

const PreviewContent = styled.div`
  color: white;
  line-height: 1.6;

  h1, h2, h3, h4, h5, h6 {
    color: white;
    margin: 1rem 0 0.5rem 0;
  }

  p {
    margin: 0.5rem 0;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 1rem 0;
  }

  ul, ol {
    margin: 0.5rem 0;
    padding-left: 2rem;
  }

  blockquote {
    border-left: 4px solid rgba(255, 255, 255, 0.3);
    padding-left: 1rem;
    margin: 1rem 0;
    font-style: italic;
  }
`;

interface BlogPostEditorProps {
  onSave?: (post: any) => void;
  onCancel?: () => void;
}

const BlogPostEditor: React.FC<BlogPostEditorProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('street');
  const [tags, setTags] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { value: 'street', label: 'Street Photography' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'technique', label: 'Technique' },
    { value: 'events', label: 'Events' },
    { value: 'portraits', label: 'Portraits' }
  ];

  const quillModules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['blockquote', 'code-block'],
        [{ 'align': [] }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), []);

  // Custom image handler
  function imageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          const quill = (window as any).quill;
          if (quill) {
            const range = quill.getSelection();
            quill.insertEmbed(range.index, 'image', result);
          }
        };
        reader.readAsDataURL(file);
      }
    };
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result as string;
            setUploadedImages(prev => [...prev, result]);
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
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
        images: uploadedImages
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
      setUploadedImages([]);
      
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('Error saving blog post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EditorContainer>
      <EditorCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <EditorTitle>Create New Blog Post</EditorTitle>
        
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
            <TagsInput
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Photography, Street, São Paulo"
            />
          </FormGroup>

          <FormGroup>
            <Label>Content</Label>
            <QuillWrapper>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={quillModules}
                placeholder="Write your blog post content here..."
                style={{ background: 'transparent' }}
              />
            </QuillWrapper>
          </FormGroup>

          <FormGroup>
            <Label>Upload Images</Label>
            <ImageUploadSection>
              <ImageUploadInput
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
              <ImageUploadLabel htmlFor="image-upload">
                Choose Images to Upload
              </ImageUploadLabel>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginTop: '1rem' }}>
                Upload images that will be available for insertion into your post content.
              </p>
              
              {uploadedImages.length > 0 && (
                <UploadedImages>
                  {uploadedImages.map((image, index) => (
                    <ImagePreview key={index}>
                      <Image src={image} alt={`Upload ${index + 1}`} />
                      <RemoveImageButton onClick={() => removeImage(index)}>
                        ×
                      </RemoveImageButton>
                    </ImagePreview>
                  ))}
                </UploadedImages>
              )}
            </ImageUploadSection>
          </FormGroup>

          {content && (
            <PreviewSection>
              <PreviewTitle>Preview</PreviewTitle>
              <PreviewContent dangerouslySetInnerHTML={{ __html: content }} />
            </PreviewSection>
          )}

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

export default BlogPostEditor;
