// File-based storage service for blog posts and images
import { BlogPost } from './blogService';

export interface StoredImage {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  alt: string;
  size: number;
  type: string;
  uploadedAt: number;
}

export interface FileStorageConfig {
  postsDirectory: string;
  imagesDirectory: string;
  maxImageSize: number; // in bytes
  allowedImageTypes: string[];
}

class FileStorageService {
  private config: FileStorageConfig = {
    postsDirectory: '/blog-posts',
    imagesDirectory: '/blog-images',
    maxImageSize: 5 * 1024 * 1024, // 5MB
    allowedImageTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  };

  private postsKey = 'lvkinhas_blog_posts_file';
  private imagesKey = 'lvkinhas_blog_images_file';

  // Initialize storage directories
  async initializeStorage(): Promise<void> {
    try {
      // Create posts directory structure in localStorage
      const postsData = localStorage.getItem(this.postsKey);
      if (!postsData) {
        localStorage.setItem(this.postsKey, JSON.stringify([]));
      }

      // Create images directory structure in localStorage
      const imagesData = localStorage.getItem(this.imagesKey);
      if (!imagesData) {
        localStorage.setItem(this.imagesKey, JSON.stringify([]));
      }

      console.log('File storage initialized successfully');
    } catch (error) {
      console.error('Error initializing file storage:', error);
      throw error;
    }
  }

  // Save blog post to file storage
  async savePost(post: BlogPost): Promise<string> {
    try {
      await this.initializeStorage();
      
      const posts = this.getAllPosts();
      const existingIndex = posts.findIndex(p => p.id === post.id);
      
      if (existingIndex >= 0) {
        posts[existingIndex] = { ...post, updatedAt: Date.now() };
      } else {
        posts.push({ ...post, createdAt: Date.now(), updatedAt: Date.now() });
      }

      localStorage.setItem(this.postsKey, JSON.stringify(posts));
      
      const filename = `post_${post.id}_${Date.now()}.json`;
      console.log(`Post saved to file storage: ${filename}`);
      
      return filename;
    } catch (error) {
      console.error('Error saving post to file storage:', error);
      throw error;
    }
  }

  // Load all posts from file storage
  getAllPosts(): BlogPost[] {
    try {
      const postsData = localStorage.getItem(this.postsKey);
      if (!postsData) return [];
      
      const posts = JSON.parse(postsData);
      return posts.sort((a: BlogPost, b: BlogPost) => (b.createdAt || 0) - (a.createdAt || 0));
    } catch (error) {
      console.error('Error loading posts from file storage:', error);
      return [];
    }
  }

  // Load specific post by ID
  getPostById(id: number): BlogPost | null {
    const posts = this.getAllPosts();
    return posts.find(post => post.id === id) || null;
  }

  // Delete post from file storage
  async deletePost(id: number): Promise<boolean> {
    try {
      const posts = this.getAllPosts();
      const filteredPosts = posts.filter(post => post.id !== id);
      
      localStorage.setItem(this.postsKey, JSON.stringify(filteredPosts));
      
      console.log(`Post ${id} deleted from file storage`);
      return true;
    } catch (error) {
      console.error('Error deleting post from file storage:', error);
      return false;
    }
  }

  // Save uploaded image
  async saveImage(file: File, alt: string = ''): Promise<StoredImage> {
    try {
      await this.initializeStorage();

      // Validate file
      if (!this.validateImageFile(file)) {
        throw new Error('Invalid image file');
      }

      // Generate unique filename
      const timestamp = Date.now();
      const extension = file.name.split('.').pop();
      const filename = `img_${timestamp}.${extension}`;
      const imageId = `img_${timestamp}`;

      // Convert file to base64 for storage
      const base64Data = await this.fileToBase64(file);
      const dataUrl = `data:${file.type};base64,${base64Data}`;

      // Create image record
      const imageRecord: StoredImage = {
        id: imageId,
        filename,
        originalName: file.name,
        url: dataUrl,
        alt: alt || file.name.split('.')[0],
        size: file.size,
        type: file.type,
        uploadedAt: Date.now()
      };

      // Save to storage
      const images = this.getAllImages();
      images.push(imageRecord);
      localStorage.setItem(this.imagesKey, JSON.stringify(images));

      console.log(`Image saved to file storage: ${filename}`);
      return imageRecord;
    } catch (error) {
      console.error('Error saving image to file storage:', error);
      throw error;
    }
  }

  // Get all stored images
  getAllImages(): StoredImage[] {
    try {
      const imagesData = localStorage.getItem(this.imagesKey);
      if (!imagesData) return [];
      
      return JSON.parse(imagesData);
    } catch (error) {
      console.error('Error loading images from file storage:', error);
      return [];
    }
  }

  // Get image by ID
  getImageById(id: string): StoredImage | null {
    const images = this.getAllImages();
    return images.find(img => img.id === id) || null;
  }

  // Delete image from storage
  async deleteImage(id: string): Promise<boolean> {
    try {
      const images = this.getAllImages();
      const filteredImages = images.filter(img => img.id !== id);
      
      localStorage.setItem(this.imagesKey, JSON.stringify(filteredImages));
      
      console.log(`Image ${id} deleted from file storage`);
      return true;
    } catch (error) {
      console.error('Error deleting image from file storage:', error);
      return false;
    }
  }

  // Validate image file
  private validateImageFile(file: File): boolean {
    // Check file type
    if (!this.config.allowedImageTypes.includes(file.type)) {
      throw new Error(`Invalid file type. Allowed types: ${this.config.allowedImageTypes.join(', ')}`);
    }

    // Check file size
    if (file.size > this.config.maxImageSize) {
      throw new Error(`File too large. Maximum size: ${this.config.maxImageSize / (1024 * 1024)}MB`);
    }

    return true;
  }

  // Convert file to base64
  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data:image/...;base64, prefix
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  }

  // Export all data (for backup)
  async exportData(): Promise<{ posts: BlogPost[]; images: StoredImage[] }> {
    return {
      posts: this.getAllPosts(),
      images: this.getAllImages()
    };
  }

  // Import data (for restore)
  async importData(data: { posts: BlogPost[]; images: StoredImage[] }): Promise<boolean> {
    try {
      if (data.posts && Array.isArray(data.posts)) {
        localStorage.setItem(this.postsKey, JSON.stringify(data.posts));
      }
      
      if (data.images && Array.isArray(data.images)) {
        localStorage.setItem(this.imagesKey, JSON.stringify(data.images));
      }
      
      console.log('Data imported successfully');
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  // Get storage statistics
  getStorageStats(): { postsCount: number; imagesCount: number; totalSize: number } {
    const posts = this.getAllPosts();
    const images = this.getAllImages();
    
    const totalSize = images.reduce((sum, img) => sum + img.size, 0);
    
    return {
      postsCount: posts.length,
      imagesCount: images.length,
      totalSize
    };
  }

  // Clear all data
  async clearAllData(): Promise<void> {
    localStorage.removeItem(this.postsKey);
    localStorage.removeItem(this.imagesKey);
    console.log('All data cleared from file storage');
  }

  // Generate unique ID for posts
  generatePostId(): number {
    const posts = this.getAllPosts();
    const existingIds = posts.map(post => post.id);
    let newId = Date.now();
    while (existingIds.includes(newId)) {
      newId++;
    }
    return newId;
  }
}

// Export singleton instance
export const fileStorageService = new FileStorageService();

// Types are already exported inline above, no need to re-export
