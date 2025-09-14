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
    tags: ["Post-Processing", "Lightroom", "Photoshop", "Workflow"],
    category: "technique",
    createdAt: Date.now() - (30 * 24 * 60 * 60 * 1000), // 30 days ago
    updatedAt: Date.now() - (30 * 24 * 60 * 60 * 1000)
  }
];

// Storage key for localStorage
const STORAGE_KEY = 'lvkinhas_blog_posts';

// Blog service class
class BlogService {
  private posts: BlogPost[] = [];

  constructor() {
    this.loadPosts();
  }

  // Load posts from localStorage or use defaults
  private loadPosts(): void {
    try {
      const storedPosts = localStorage.getItem(STORAGE_KEY);
      if (storedPosts) {
        this.posts = JSON.parse(storedPosts);
      } else {
        // Initialize with default posts
        this.posts = [...DEFAULT_BLOG_POSTS];
        this.savePosts();
      }
    } catch (error) {
      console.error('Error loading blog posts:', error);
      this.posts = [...DEFAULT_BLOG_POSTS];
    }
  }

  // Save posts to localStorage
  private savePosts(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.posts));
    } catch (error) {
      console.error('Error saving blog posts:', error);
    }
  }

  // Get all posts
  getAllPosts(): BlogPost[] {
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

  // Add new post
  addPost(postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): BlogPost {
    const newPost: BlogPost = {
      ...postData,
      id: this.generateId(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    this.posts.unshift(newPost); // Add to beginning
    this.savePosts();
    return newPost;
  }

  // Update existing post
  updatePost(id: number, updates: Partial<BlogPost>): BlogPost | null {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      return null;
    }

    this.posts[postIndex] = {
      ...this.posts[postIndex],
      ...updates,
      updatedAt: Date.now()
    };

    this.savePosts();
    return this.posts[postIndex];
  }

  // Delete post
  deletePost(id: number): boolean {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      return false;
    }

    this.posts.splice(postIndex, 1);
    this.savePosts();
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

  // Generate unique ID
  private generateId(): number {
    const existingIds = this.posts.map(post => post.id);
    let newId = Date.now();
    while (existingIds.includes(newId)) {
      newId++;
    }
    return newId;
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
export type { BlogPost };
export { DEFAULT_BLOG_POSTS };
