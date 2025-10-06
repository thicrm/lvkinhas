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
    title: "Capturing São Paulo's Nightlife: A Photographer's Journey",
    date: "December 15, 2024",
    readTime: "8 min read",
    excerpt: "São Paulo's vibrant nightlife scene offers a unique blend of energy, culture, and artistic expression that's perfect for street photography. From the underground clubs in Vila Madalena to the sophisticated bars in Jardins, each venue tells a different story. This post explores my approach to capturing the essence of São Paulo after dark, including techniques for low-light photography, composition strategies for crowded environments, and how to blend into the scene while getting authentic shots.",
    content: "São Paulo's vibrant nightlife scene offers a unique blend of energy, culture, and artistic expression that's perfect for street photography. From the underground clubs in Vila Madalena to the sophisticated bars in Jardins, each venue tells a different story.\n\n## The Art of Night Photography\n\nCapturing the essence of São Paulo after dark requires more than just technical skill—it demands an understanding of the city's rhythm and the ability to blend into the scene while getting authentic shots.\n\n### Low-Light Techniques\n\n- Use wide apertures (f/1.4 - f/2.8) for shallow depth of field\n- Increase ISO carefully to avoid excessive noise\n- Embrace the grain for artistic effect\n- Use fast shutter speeds to freeze motion\n\n### Composition Strategies\n\nWhen working in crowded environments, composition becomes crucial. Look for leading lines, reflections, and moments of contrast between light and shadow.\n\n## Conclusion\n\nNight photography in São Paulo is about capturing the city's soul—its energy, its people, and its unique character that only emerges after the sun sets.",
    tags: ["Street Photography", "Nightlife", "São Paulo", "Low Light"],
    category: "street",
    createdAt: Date.now() - (5 * 24 * 60 * 60 * 1000), // 5 days ago
    updatedAt: Date.now() - (5 * 24 * 60 * 60 * 1000)
  },
  {
    id: 2,
    title: "The Art of Fashion Photography: From Concept to Final Image",
    date: "December 10, 2024",
    readTime: "12 min read",
    excerpt: "Fashion photography is more than just taking pictures of clothes - it's about storytelling, mood creation, and artistic vision. In this comprehensive guide, I share my process from initial concept development to final image delivery. We'll cover everything from mood boards and location scouting to lighting setups and post-processing techniques. Whether you're working with models, stylists, or creating editorial spreads, understanding the collaborative nature of fashion photography is key to producing compelling work.",
    content: "Fashion photography is more than just taking pictures of clothes - it's about storytelling, mood creation, and artistic vision.\n\n## The Creative Process\n\nFrom initial concept development to final image delivery, every step requires careful planning and execution.\n\n### Mood Boards and Concept Development\n\nCreating compelling fashion imagery starts with a strong concept. Mood boards help visualize the final result and guide the entire creative process.\n\n### Location Scouting\n\nWhether shooting in studio or on location, the environment plays a crucial role in setting the mood and supporting the narrative.\n\n## Technical Considerations\n\n### Lighting Setups\n\n- Natural light for soft, flattering portraits\n- Studio lighting for controlled environments\n- Mixed lighting for dynamic results\n\n### Post-Processing Techniques\n\nUnderstanding the collaborative nature of fashion photography is key to producing compelling work that resonates with both clients and audiences.",
    tags: ["Fashion", "Editorial", "Portraiture", "Lighting"],
    category: "fashion",
    createdAt: Date.now() - (10 * 24 * 60 * 60 * 1000), // 10 days ago
    updatedAt: Date.now() - (10 * 24 * 60 * 60 * 1000)
  },
  {
    id: 3,
    title: "Analog vs Digital: Why I Still Shoot Film in 2024",
    date: "December 5, 2024",
    readTime: "10 min read",
    excerpt: "Despite the incredible advances in digital photography, I continue to shoot film for both personal and professional projects. This isn't just nostalgia - there are tangible benefits to film photography that digital still can't replicate. From the unique grain structure and color rendition to the deliberate approach it requires, film photography teaches patience and intentionality. I'll share my favorite film stocks, development processes, and how I integrate analog techniques into my digital workflow.",
    content: "Despite the incredible advances in digital photography, I continue to shoot film for both personal and professional projects.\n\n## Why Film Still Matters\n\nThis isn't just nostalgia - there are tangible benefits to film photography that digital still can't replicate.\n\n### Unique Characteristics\n\n- **Grain Structure**: Film grain adds texture and character\n- **Color Rendition**: Natural color palette that's hard to replicate digitally\n- **Dynamic Range**: Film handles highlights and shadows differently\n\n### The Deliberate Approach\n\nFilm photography teaches patience and intentionality. Every frame counts, forcing you to slow down and think more carefully about composition and exposure.\n\n## My Favorite Film Stocks\n\n- **Kodak Portra 400**: Perfect for portraits and skin tones\n- **Fuji Superia 200**: Great for everyday shooting\n- **Ilford HP5**: Excellent black and white option\n\n## Integration with Digital Workflow\n\nI'll share how I integrate analog techniques into my digital workflow, creating a hybrid approach that combines the best of both worlds.",
    tags: ["Analog", "Film", "Technique", "Workflow"],
    category: "technique",
    createdAt: Date.now() - (15 * 24 * 60 * 60 * 1000), // 15 days ago
    updatedAt: Date.now() - (15 * 24 * 60 * 60 * 1000)
  },
  {
    id: 4,
    title: "Event Photography: Capturing Moments That Matter",
    date: "November 30, 2024",
    readTime: "6 min read",
    excerpt: "Event photography is about being in the right place at the right time while maintaining artistic integrity. Whether it's a corporate event, wedding, or cultural celebration, the key is to blend documentary style with creative vision. I'll share my approach to event coverage, including equipment choices, positioning strategies, and how to capture authentic moments without being intrusive. The goal is to tell the complete story of an event through a series of carefully curated images.",
    content: "Event photography is about being in the right place at the right time while maintaining artistic integrity.\n\n## The Documentary Approach\n\nWhether it's a corporate event, wedding, or cultural celebration, the key is to blend documentary style with creative vision.\n\n### Equipment Choices\n\n- **Fast lenses**: For low-light situations\n- **Multiple camera bodies**: For different focal lengths\n- **External flash**: For controlled lighting\n\n### Positioning Strategies\n\n- Anticipate key moments\n- Move around the space\n- Capture different perspectives\n- Stay unobtrusive\n\n## Capturing Authentic Moments\n\nThe goal is to tell the complete story of an event through a series of carefully curated images that capture both the energy and the emotion of the occasion.",
    tags: ["Events", "Documentary", "Weddings", "Corporate"],
    category: "events",
    createdAt: Date.now() - (20 * 24 * 60 * 60 * 1000), // 20 days ago
    updatedAt: Date.now() - (20 * 24 * 60 * 60 * 1000)
  },
  {
    id: 5,
    title: "Portrait Photography: Connecting with Your Subject",
    date: "November 25, 2024",
    readTime: "9 min read",
    excerpt: "Great portrait photography goes beyond technical perfection - it's about capturing the essence of a person. This requires building trust, creating a comfortable environment, and understanding how to direct subjects naturally. I'll share my approach to portrait sessions, including pre-session consultations, lighting setups for different face shapes, and techniques for putting subjects at ease. The most successful portraits often come from genuine moments of connection rather than forced poses.",
    content: "Great portrait photography goes beyond technical perfection - it's about capturing the essence of a person.\n\n## Building Trust and Connection\n\nThis requires building trust, creating a comfortable environment, and understanding how to direct subjects naturally.\n\n### Pre-Session Consultation\n\n- Discuss goals and expectations\n- Understand the subject's comfort level\n- Plan the session approach\n- Address any concerns\n\n### Lighting for Different Face Shapes\n\n- **Round faces**: Use side lighting to create definition\n- **Square faces**: Soften angles with diffused light\n- **Oval faces**: Most versatile, works with various setups\n- **Heart-shaped faces**: Balance with bottom lighting\n\n## Techniques for Comfort\n\nThe most successful portraits often come from genuine moments of connection rather than forced poses. Creating a relaxed atmosphere is key to capturing authentic expressions.",
    tags: ["Portraits", "Lighting", "Psychology", "Connection"],
    category: "portraits",
    createdAt: Date.now() - (25 * 24 * 60 * 60 * 1000), // 25 days ago
    updatedAt: Date.now() - (25 * 24 * 60 * 60 * 1000)
  },
  {
    id: 6,
    title: "Post-Processing Workflow: From Raw to Final",
    date: "November 20, 2024",
    readTime: "15 min read",
    excerpt: "Post-processing is where the magic happens in digital photography. It's not about fixing bad photos, but rather enhancing good ones to reach their full potential. I'll walk through my complete workflow from importing raw files to final export, including color grading, retouching techniques, and how to develop a consistent style. We'll cover both Lightroom and Photoshop workflows, with tips for efficient batch processing and maintaining quality across large projects.",
    content: "Post-processing is where the magic happens in digital photography. It's not about fixing bad photos, but rather enhancing good ones to reach their full potential.\n\n## The Complete Workflow\n\nI'll walk through my complete workflow from importing raw files to final export.\n\n### Import and Organization\n\n- Use consistent naming conventions\n- Apply metadata and keywords\n- Organize by project and date\n- Create backup copies\n\n### Color Grading\n\n- Establish a consistent color palette\n- Use color grading tools effectively\n- Maintain skin tone accuracy\n- Create mood through color\n\n### Retouching Techniques\n\n- Skin retouching with frequency separation\n- Dodge and burn for dimension\n- Selective color adjustments\n- Sharpening and noise reduction\n\n## Developing a Consistent Style\n\nWe'll cover both Lightroom and Photoshop workflows, with tips for efficient batch processing and maintaining quality across large projects.",
    tags: ["Post-Processing", "Lightroom", "Photoshop", "Workflow"],
    category: "technique",
    createdAt: Date.now() - (30 * 24 * 60 * 60 * 1000), // 30 days ago
    updatedAt: Date.now() - (30 * 24 * 60 * 60 * 1000)
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

