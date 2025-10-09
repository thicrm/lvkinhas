// Blog post interface
export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: 'street' | 'fashion' | 'technique' | 'events' | 'portraits';
  tags: string[];
  date: string;
  readTime: string;
  images?: string[];
  imageIds?: string[]; // File storage image IDs
  createdAt?: number;
  updatedAt?: number;
}

// Default blog posts (migrated from the Blog component)
const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Hello World",
    date: "October 9, 2024",
    readTime: "2 min read",
    excerpt: "oiiiiiiiiii",
    content: "Olá a todes, esse é meu primeiro post no blog, onde vou atualizar o espaço com algumas fotos (em progresso) e pensamentos que normalmente não estarão no Instagram, ou Twitter, ou qualquer outra rede. Queria um lugar meu para postar as minhas paradas e tb interagir com vocês. Graças ao Thiago Carmo, finalmente consegui. Muito obrigado pelo site incrível meu mano.\n\nGostaria de convidar vocês a deixarem uma mensagem ao lado no guestbook, e por favor, ignorem os posts testes que fizemos KKKKKKKKKK\n\nAté mais! :)))\n\n![](/100_1147.jpg)\n\n![](/flores.jpg)",
    tags: ["v1.0"],
    category: "events",
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

// Storage key for localStorage
const STORAGE_KEY = 'lvkinhas_blog_posts';

// Import file storage service
import { fileStorageService } from './fileStorageService';

// Blog service class
class BlogService {
  private posts: BlogPost[] = [];
  private fileStorage = fileStorageService;

  constructor() {
    // Initialize asynchronously to avoid blocking
    this.initializeAsync();
  }

  private async initializeAsync() {
    try {
      await this.loadPosts();
    } catch (error) {
      console.error('Error initializing blog service:', error);
    }
  }

  // Load posts from file storage or use defaults
  private async loadPosts(): Promise<void> {
    try {
      // Initialize file storage
      await this.fileStorage.initializeStorage();
      
      // Try to load from file storage first
      const fileStoragePosts = this.fileStorage.getAllPosts();
      
      if (fileStoragePosts.length > 0) {
        this.posts = fileStoragePosts;
        console.log('Posts loaded from file storage');
      } else {
        // Fallback to localStorage
        const storedPosts = localStorage.getItem(STORAGE_KEY);
        if (storedPosts) {
          this.posts = JSON.parse(storedPosts);
          // Migrate to file storage
          await this.migrateToFileStorage();
        } else {
          // Initialize with default posts
          this.posts = [...DEFAULT_BLOG_POSTS];
          await this.migrateToFileStorage();
        }
      }
    } catch (error) {
      console.error('Error loading blog posts:', error);
      this.posts = [...DEFAULT_BLOG_POSTS];
    }
  }

  // Save posts to file storage
  private async savePosts(): Promise<void> {
    try {
      await this.fileStorage.initializeStorage();
      
      // Save each post to file storage
      for (const post of this.posts) {
        await this.fileStorage.savePost(post);
      }
      
      // Also keep localStorage backup
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.posts));
      
      console.log('Posts saved to file storage');
    } catch (error) {
      console.error('Error saving blog posts:', error);
      // Fallback to localStorage only
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.posts));
    }
  }

  // Migrate posts from localStorage to file storage
  private async migrateToFileStorage(): Promise<void> {
    try {
      await this.fileStorage.initializeStorage();
      
      for (const post of this.posts) {
        await this.fileStorage.savePost(post);
      }
      
      console.log('Posts migrated to file storage');
    } catch (error) {
      console.error('Error migrating posts to file storage:', error);
    }
  }

  // Get all posts (with file storage sync)
  getAllPosts(): BlogPost[] {
    // Sync with file storage
    try {
      const fileStoragePosts = this.fileStorage.getAllPosts();
      if (fileStoragePosts.length > 0) {
        this.posts = fileStoragePosts;
      }
    } catch (error) {
      console.error('Error syncing with file storage:', error);
      // Fallback to localStorage if file storage fails
      try {
        const storedPosts = localStorage.getItem(STORAGE_KEY);
        if (storedPosts) {
          this.posts = JSON.parse(storedPosts);
        }
      } catch (localError) {
        console.error('Error loading from localStorage fallback:', localError);
        // Ultimate fallback to default posts
        if (this.posts.length === 0) {
          this.posts = [...DEFAULT_BLOG_POSTS];
        }
      }
    }
    
    return [...this.posts].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  }

  // Get post by ID
  getPostById(id: number): BlogPost | undefined {
    return this.posts.find(post => post.id === id);
  }

  // Get posts by category
  getPostsByCategory(category: string): BlogPost[] {
    if (category === 'all') {
      return this.getAllPosts();
    }
    return this.getAllPosts().filter(post => post.category === category);
  }

  // Search posts
  searchPosts(query: string): BlogPost[] {
    const lowercaseQuery = query.toLowerCase();
    return this.getAllPosts().filter(post => 
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  // Add new post (with file storage)
  async addPost(postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    const newPost: BlogPost = {
      ...postData,
      id: this.fileStorage.generatePostId(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    this.posts.unshift(newPost); // Add to beginning
    
    try {
      // Save to file storage
      await this.fileStorage.savePost(newPost);
      console.log('New post added to file storage');
      
      // Dispatch event to notify components
      window.dispatchEvent(new CustomEvent('blogPostsUpdated'));
    } catch (error) {
      console.error('Error saving new post to file storage:', error);
    }
    
    return newPost;
  }

  // Update existing post (with file storage)
  async updatePost(id: number, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      return null;
    }

    this.posts[postIndex] = {
      ...this.posts[postIndex],
      ...updates,
      updatedAt: Date.now()
    };

    try {
      // Save to file storage
      await this.fileStorage.savePost(this.posts[postIndex]);
      console.log('Post updated in file storage');
      
      // Dispatch event to notify components
      window.dispatchEvent(new CustomEvent('blogPostsUpdated'));
    } catch (error) {
      console.error('Error updating post in file storage:', error);
    }
    
    return this.posts[postIndex];
  }

  // Delete post (with file storage)
  async deletePost(id: number): Promise<boolean> {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      return false;
    }

    this.posts.splice(postIndex, 1);
    
    try {
      // Delete from file storage
      await this.fileStorage.deletePost(id);
      console.log('Post deleted from file storage');
      
      // Dispatch event to notify components
      window.dispatchEvent(new CustomEvent('blogPostsUpdated'));
    } catch (error) {
      console.error('Error deleting post from file storage:', error);
    }
    
    return true;
  }

  // Get categories with counts
  getCategories(): { id: string; name: string; count: number }[] {
    const categoryMap = new Map<string, number>();
    
    this.posts.forEach(post => {
      const count = categoryMap.get(post.category) || 0;
      categoryMap.set(post.category, count + 1);
    });

    const categoryNames: Record<string, string> = {
      'street': 'Street Photography',
      'fashion': 'Fashion',
      'technique': 'Technique',
      'events': 'Events',
      'portraits': 'Portraits'
    };

    return [
      { id: 'all', name: 'All Posts', count: this.posts.length },
      ...Array.from(categoryMap.entries()).map(([id, count]) => ({
        id,
        name: categoryNames[id] || id,
        count
      }))
    ];
  }

  // Image management methods
  async uploadImage(file: File, alt: string = ''): Promise<string> {
    try {
      const imageRecord = await this.fileStorage.saveImage(file, alt);
      console.log('Image uploaded to file storage:', imageRecord.id);
      return imageRecord.id;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  getImageById(imageId: string) {
    return this.fileStorage.getImageById(imageId);
  }

  getAllImages() {
    return this.fileStorage.getAllImages();
  }

  async deleteImage(imageId: string): Promise<boolean> {
    try {
      return await this.fileStorage.deleteImage(imageId);
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  }

  // Add image to post
  async addImageToPost(postId: number, imageId: string): Promise<boolean> {
    try {
      const post = this.getPostById(postId);
      if (!post) return false;

      const imageIds = post.imageIds || [];
      if (!imageIds.includes(imageId)) {
        imageIds.push(imageId);
        await this.updatePost(postId, { imageIds });
        console.log('Image added to post');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding image to post:', error);
      return false;
    }
  }

  // Remove image from post
  async removeImageFromPost(postId: number, imageId: string): Promise<boolean> {
    try {
      const post = this.getPostById(postId);
      if (!post) return false;

      const imageIds = post.imageIds || [];
      const filteredImageIds = imageIds.filter(id => id !== imageId);
      
      if (filteredImageIds.length !== imageIds.length) {
        await this.updatePost(postId, { imageIds: filteredImageIds });
        console.log('Image removed from post');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error removing image from post:', error);
      return false;
    }
  }

  // Export posts to JSON (for backup)
  exportPosts(): string {
    return JSON.stringify(this.posts, null, 2);
  }

  // Import posts from JSON (for restore)
  importPosts(jsonData: string): boolean {
    try {
      const importedPosts = JSON.parse(jsonData);
      if (Array.isArray(importedPosts)) {
        this.posts = importedPosts;
        this.savePosts();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing blog posts:', error);
      return false;
    }
  }

  // Reset to default posts
  resetToDefaults(): void {
    this.posts = [...DEFAULT_BLOG_POSTS];
    this.savePosts();
  }
}

// Export singleton instance
export const blogService = new BlogService();

// Export types and default posts for use in components
export { DEFAULT_BLOG_POSTS };

