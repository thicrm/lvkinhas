import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { blogService, BlogPost } from '../../services/blogService';

// Dynamic import for ReactQuill to avoid SSR issues
const ReactQuill = React.lazy(() => import('react-quill'));

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

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: white;
  font-family: "Handjet", sans-serif;
  font-size: 1.2rem;
`;

interface WorkingBlogEditorProps {
  onSave?: (post: any) => void;
  onCancel?: () => void;
}

const WorkingBlogEditor: React.FC<WorkingBlogEditorProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('street');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { value: 'street', label: 'Street Photography' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'technique', label: 'Technique' },
    { value: 'events', label: 'Events' },
    { value: 'portraits', label: 'Portraits' }
  ];

  const quillModules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['blockquote', 'code-block'],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ]
  }), []);

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
            <React.Suspense fallback={<LoadingSpinner>Loading editor...</LoadingSpinner>}>
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
            </React.Suspense>
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

export default WorkingBlogEditor;
